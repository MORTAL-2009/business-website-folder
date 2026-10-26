import fs from 'fs';
import path from 'path';
import { Content } from '../models/Content.js';
import { getDbStatus } from '../config/db.js';

const defaultContentPath = path.resolve('src', 'data', 'defaultContent.json');
const liveContentPath = path.resolve('src', 'data', 'liveContent.json');

// Helper to load fallback content
const getLocalContent = () => {
  if (fs.existsSync(liveContentPath)) {
    try {
      const data = fs.readFileSync(liveContentPath, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading liveContent.json:', e.message);
    }
  }

  const defaultData = fs.readFileSync(defaultContentPath, 'utf8');
  return JSON.parse(defaultData);
};

// Helper to save fallback content
const saveLocalContent = (data) => {
  fs.writeFileSync(liveContentPath, JSON.stringify(data, null, 2), 'utf8');
};

/**
 * GET /api/content
 * Retrieve all website content
 */
export const getContent = async (req, res, next) => {
  try {
    if (getDbStatus()) {
      let content = await Content.findOne({ key: 'main_website' });
      if (!content) {
        const defaults = getLocalContent();
        content = await Content.create({ key: 'main_website', ...defaults });
      }
      return res.status(200).json({
        success: true,
        source: 'database',
        data: content
      });
    }

    // Fallback mode
    const content = getLocalContent();
    return res.status(200).json({
      success: true,
      source: 'local_store',
      data: content
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/content
 * Update all or parts of website content
 */
export const updateContent = async (req, res, next) => {
  try {
    const updates = req.body;

    if (getDbStatus()) {
      let content = await Content.findOneAndUpdate(
        { key: 'main_website' },
        { $set: updates },
        { new: true, upsert: true }
      );
      return res.status(200).json({
        success: true,
        message: 'Website content updated in database',
        data: content
      });
    }

    // Fallback store
    const current = getLocalContent();
    const updated = { ...current, ...updates };
    saveLocalContent(updated);

    return res.status(200).json({
      success: true,
      message: 'Website content updated in local store',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/content/:section
 * Retrieve a specific section (e.g. 'hero', 'about', 'services')
 */
export const getSectionContent = async (req, res, next) => {
  try {
    const { section } = req.params;

    if (getDbStatus()) {
      const content = await Content.findOne({ key: 'main_website' });
      if (content && content[section]) {
        return res.status(200).json({
          success: true,
          section,
          data: content[section]
        });
      }
    }

    const localData = getLocalContent();
    if (localData[section] !== undefined) {
      return res.status(200).json({
        success: true,
        section,
        data: localData[section]
      });
    }

    return res.status(404).json({
      success: false,
      message: `Section '${section}' not found`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/content/:section
 * Update a specific section (e.g. updating hero image or text)
 */
export const updateSectionContent = async (req, res, next) => {
  try {
    const { section } = req.params;
    const sectionData = req.body;

    if (getDbStatus()) {
      const updateQuery = {};
      updateQuery[section] = sectionData;

      const content = await Content.findOneAndUpdate(
        { key: 'main_website' },
        { $set: updateQuery },
        { new: true, upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: `Section '${section}' updated successfully in database`,
        data: content[section]
      });
    }

    // Fallback store
    const localData = getLocalContent();
    localData[section] = {
      ...(localData[section] || {}),
      ...sectionData
    };
    saveLocalContent(localData);

    return res.status(200).json({
      success: true,
      message: `Section '${section}' updated successfully in local store`,
      data: localData[section]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/content/reset
 * Reset content back to initial default values
 */
export const resetContent = async (req, res, next) => {
  try {
    const defaultData = JSON.parse(fs.readFileSync(defaultContentPath, 'utf8'));

    if (getDbStatus()) {
      await Content.findOneAndUpdate(
        { key: 'main_website' },
        { $set: defaultData },
        { new: true, upsert: true }
      );
    }

    saveLocalContent(defaultData);

    return res.status(200).json({
      success: true,
      message: 'Website content reset to default settings',
      data: defaultData
    });
  } catch (error) {
    next(error);
  }
};
