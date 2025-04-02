import axios from 'axios';

export const checkUserIsOwner = async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/users/${user_id}`);
    return response.data.user_type === 3;
  } catch (error) {
    console.error("Erreur lors de la vérification du type utilisateur :", error.message);
    return false;
  }
};
