const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('node:path');
const crypto = require('node:crypto');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    file.originalname = `${basename}-${suffix}`;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'drinkThumb') {
      folder = 'drinks';
    } else {
      folder = 'others';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [
        { height: 350, crop: 'scale' },
        { height: 700, crop: 'scale' },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
