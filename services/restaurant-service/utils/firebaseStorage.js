import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file, path) => {
  try {
    // Créer une référence pour le fichier
    const storageRef = ref(storage, path);
    
    // Uploader le fichier
    await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype
    });

    // Récupérer l'URL de téléchargement
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    throw error;
  }
};

const deleteImage = async (imageUrl) => {
  try {
    // Extraire le chemin du fichier de l'URL
    const path = imageUrl.split('/o/')[1].split('?')[0];
    const decodedPath = decodeURIComponent(path);
    
    // Créer une référence pour le fichier
    const storageRef = ref(storage, decodedPath);
    
    // Supprimer le fichier
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    throw error;
  }
};

export { uploadImage, deleteImage }; 