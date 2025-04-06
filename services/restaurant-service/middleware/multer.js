import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Vérifier le type de fichier
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non supporté. Seuls les fichiers JPEG, PNG et JPG sont autorisés.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  }
});

export const uploadRestaurantImages = upload.fields([
  { name: 'banner_image', maxCount: 1 },
  { name: 'logo_image', maxCount: 1 }
]);

export const uploadArticleImage = upload.single('article_image');

export default upload; 