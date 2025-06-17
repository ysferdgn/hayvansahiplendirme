// routes/upload.js
const router                = require("express").Router();
const multer                = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary            = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary konfigürasyonu
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pet_images",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "bmp"]
  }
});
const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dosya yüklenemedi" });
  res.json({ imageUrl: req.file.path || req.file.secure_url });
});

module.exports = router;
