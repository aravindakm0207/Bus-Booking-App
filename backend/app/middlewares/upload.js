const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../cloudinaryConfig');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Replace 'uploads' with your desired Cloudinary folder
    format: async (req, file) => 'jpg', // Specify format (optional)
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, // Unique public ID
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Set up Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
});

module.exports = upload;
