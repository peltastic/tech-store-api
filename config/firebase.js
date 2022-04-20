const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
};
