import crypto from 'crypto';
import { User } from '../models/User.js';
import { getDbStatus } from '../config/db.js';

// In-memory token store for lightweight session management
const activeSessions = new Map();

// Helper to seed initial admin if database is empty
export const seedAdminIfMissing = async () => {
  if (!getDbStatus()) return;

  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@hoosty.com').toLowerCase().trim();
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

      const admin = new User({
        name: 'Hoosty Admin',
        email: defaultEmail,
        role: 'admin'
      });
      admin.setPassword(defaultPassword);
      await admin.save();
      console.log(`[Auth] Default Admin initialized: ${defaultEmail} / ${defaultPassword}`);
    }
  } catch (error) {
    console.warn(`[Auth] Could not check or seed admin: ${error.message}`);
  }
};

/**
 * POST /api/auth/login
 * Admin sign-in endpoint
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check in MongoDB if connected
    if (getDbStatus()) {
      let user = await User.findOne({ email: cleanEmail });

      // If database is connected but no admin user exists yet, seed one now
      if (!user) {
        const count = await User.countDocuments();
        if (count === 0) {
          await seedAdminIfMissing();
          user = await User.findOne({ email: cleanEmail });
        }
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isValid = user.validatePassword(password);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate session token
      const token = crypto.randomBytes(32).toString('hex');
      user.lastLogin = new Date();
      await user.save();

      activeSessions.set(token, {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      });

      return res.status(200).json({
        success: true,
        message: 'Signed in successfully',
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    }

    // Fallback if DB is offline (uses .env credentials)
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@hoosty.com').toLowerCase().trim();
    const envAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (cleanEmail === envAdminEmail && password === envAdminPassword) {
      const token = 'fallback-admin-token-' + Date.now();
      return res.status(200).json({
        success: true,
        message: 'Signed in successfully (Fallback Store)',
        token,
        user: {
          id: 'fallback_admin',
          email: cleanEmail,
          name: 'Fallback Administrator',
          role: 'admin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Check current logged in user status
 */
export const getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (token.startsWith('fallback-admin-token-')) {
      return res.status(200).json({
        success: true,
        user: {
          id: 'fallback_admin',
          email: process.env.ADMIN_EMAIL || 'admin@hoosty.com',
          name: 'Administrator',
          role: 'admin'
        }
      });
    }

    const session = activeSessions.get(token);
    if (!session || session.expiresAt < Date.now()) {
      return res.status(401).json({ success: false, message: 'Session expired or invalid' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/credentials
 * Update admin credentials (email or password)
 */
export const updateCredentials = async (req, res, next) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is required to make changes'
      });
    }

    if (getDbStatus()) {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '')?.trim();
      const session = activeSessions.get(token);

      const user = session ? await User.findById(session.userId) : await User.findOne({ role: 'admin' });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Admin user not found' });
      }

      if (!user.validatePassword(currentPassword)) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      if (newEmail && newEmail.trim()) {
        user.email = newEmail.toLowerCase().trim();
      }

      if (newPassword && newPassword.length >= 6) {
        user.setPassword(newPassword);
      }

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Admin credentials updated successfully in MongoDB',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Credentials updated (Note: Please update .env if running offline)'
    });
  } catch (error) {
    next(error);
  }
};
