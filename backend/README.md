# Hoosty Backend API & Content Management Architecture

Welcome to the backend service for **Hoosty**. This service powers dynamic content management, image asset uploads, and database persistence for the Hoosty business website.

---

## 📁 Directory Structure

```
backend/
├── uploads/                        # Uploaded images (Hero orb, section graphics, etc.)
├── src/
│   ├── config/
│   │   └── [db.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/config/db.js)                  # MongoDB connection with graceful fallback
│   ├── controllers/
│   │   ├── [contentController.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/controllers/contentController.js)  # Content CRUD & section-specific handlers
│   │   └── [uploadController.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/controllers/uploadController.js)    # Multipart image upload handler
│   ├── data/
│   │   ├── [defaultContent.json](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/data/defaultContent.json)    # Default website dataset matching frontend
│   │   └── liveContent.json       # Local store active state
│   ├── middleware/
│   │   ├── [errorHandler.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/middleware/errorHandler.js)        # Centralized JSON error response
│   │   └── [upload.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/middleware/upload.js)              # Multer configuration with validation
│   ├── models/
│   │   └── [Content.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/models/Content.js)               # Mongoose Schema for all website sections
│   ├── routes/
│   │   ├── [contentRoutes.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/routes/contentRoutes.js)         # /api/content endpoints
│   │   └── [uploadRoutes.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/routes/uploadRoutes.js)          # /api/upload endpoint
│   └── [server.js](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/src/server.js)                   # Main Express application entry point
├── [.env](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/.env)
├── [.env.example](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/.env.example)
└── [package.json](file:///c:/Users/acer/OneDrive/Desktop/business%20website%20folder/backend/package.json)
```

---

## ⚙️ Environment Variables (`.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port on which Express server listens |
| `NODE_ENV` | `development` | Runtime environment (`development` / `production`) |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/hoosty_db` | MongoDB connection connection string |
| `CLIENT_URL` | `http://localhost:5173,http://localhost:5174` | Allowed frontend origins for CORS |
| `UPLOAD_DIR` | `uploads` | Directory for uploaded media assets |

---

## 🔌 Database Configuration

### Option A: Local MongoDB
Ensure your local MongoDB daemon is running:
```powershell
mongod
```
The application will automatically detect and connect to `mongodb://127.0.0.1:27017/hoosty_db`.

### Option B: MongoDB Atlas (Cloud)
1. Copy your MongoDB Atlas connection string from MongoDB Atlas dashboard.
2. In `backend/.env`, update `MONGO_URI`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hoosty_db?retryWrites=true&w=majority
```

*Note: If MongoDB is not yet running or configured, the server automatically boots into **Fallback Mode** using `defaultContent.json`, ensuring your API is immediately usable without crashing!*

---

## 📡 API Endpoints Reference

### 1. Health Status
- **`GET /api/health`**
  - Check API status and whether MongoDB is connected.

### 2. Website Content Management
- **`GET /api/content`**
  - Returns complete website content for all sections.
- **`PUT /api/content`**
  - Updates full or partial website content.
- **`GET /api/content/:section`**
  - Retrieves content for a single section (e.g. `/api/content/hero`, `/api/content/about`, `/api/content/services`).
- **`PUT /api/content/:section`**
  - Updates content for a single section (e.g. updating hero headline, subtext, or orb image).
- **`POST /api/content/reset`**
  - Resets content back to default values.

### 3. Image Upload
- **`POST /api/upload`**
  - Upload an image file (multipart/form-data, field: `image`).
  - Returns file URL (e.g. `http://localhost:5000/uploads/hero_orb_1792949000.png`) ready to be saved into the website content.

---

## 🚀 Running the Server

Inside the `backend` folder:

```powershell
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```
