import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createReview = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { user_id, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "La note doit être comprise entre 1 et 5." });
    }

    // Vérifier l'existence de l'utilisateur dans l'auth-service
    try {
      const userResponse = await fetch(`http://auth-service:5000/api/users/${user_id}`);
      if (!userResponse.ok) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur:", error);
      return res.status(500).json({ error: "Erreur lors de la vérification de l'utilisateur." });
    }

    // Vérifier si l'utilisateur a déjà donné un avis pour ce restaurant
    const existingReview = await prisma.review.findFirst({
      where: {
        restaurant_id,
        user_id
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: "Vous avez déjà donné un avis pour ce restaurant." });
    }

    // Créer l'avis
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        user_id,
        restaurant_id
      }
    });

    // Mettre à jour la note moyenne et le nombre d'avis du restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id },
      include: { reviews: true }
    });

    const totalRating = restaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
    const newRating = (totalRating + rating) / (restaurant.reviews_count + 1);

    await prisma.restaurant.update({
      where: { restaurant_id },
      data: {
        rating: newRating,
        reviews_count: restaurant.reviews_count + 1
      }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de l'avis." });
  }
};

const getRestaurantReviews = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const reviews = await prisma.review.findMany({
      where: { restaurant_id },
      orderBy: { created_at: 'desc' }
    });

    // Récupérer les informations des utilisateurs pour chaque avis
    const reviewsWithUsers = await Promise.all(reviews.map(async (review) => {
      try {
        const userResponse = await fetch(`http://auth-service:5000/api/users/${review.user_id}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          return {
            ...review,
            user: {
              id: userData.user_id,
              name: userData.user_name,
              email: userData.user_email
            }
          };
        }
        return review;
      } catch (error) {
        console.error(`Erreur lors de la récupération des informations de l'utilisateur ${review.user_id}:`, error);
        return review;
      }
    }));

    res.json(reviewsWithUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des avis." });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "La note doit être comprise entre 1 et 5." });
    }

    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    // Vérifier que l'utilisateur est bien le propriétaire de l'avis
    if (review.user_id !== req.user.user_id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier cet avis." });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        rating,
        comment
      }
    });

    // Mettre à jour la note moyenne du restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id: review.restaurant_id },
      include: { reviews: true }
    });

    const totalRating = restaurant.reviews.reduce((sum, r) => {
      if (r.id === parseInt(id)) {
        return sum + rating;
      }
      return sum + r.rating;
    }, 0);

    const newRating = totalRating / restaurant.reviews_count;

    await prisma.restaurant.update({
      where: { restaurant_id: review.restaurant_id },
      data: { rating: newRating }
    });

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l'avis." });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) }
    });

    if (!review) {
      return res.status(404).json({ error: "Avis non trouvé." });
    }

    // Vérifier que l'utilisateur est bien le propriétaire de l'avis
    if (review.user_id !== req.user.user_id) {
      return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer cet avis." });
    }

    await prisma.review.delete({
      where: { id: parseInt(id) }
    });

    // Mettre à jour la note moyenne et le nombre d'avis du restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id: review.restaurant_id },
      include: { reviews: true }
    });

    if (restaurant.reviews_count > 1) {
      const totalRating = restaurant.reviews.reduce((sum, r) => {
        if (r.id === parseInt(id)) {
          return sum;
        }
        return sum + r.rating;
      }, 0);

      const newRating = totalRating / (restaurant.reviews_count - 1);

      await prisma.restaurant.update({
        where: { restaurant_id: review.restaurant_id },
        data: {
          rating: newRating,
          reviews_count: restaurant.reviews_count - 1
        }
      });
    } else {
      await prisma.restaurant.update({
        where: { restaurant_id: review.restaurant_id },
        data: {
          rating: 0,
          reviews_count: 0
        }
      });
    }

    res.json({ message: "Avis supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'avis." });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Vérifier l'existence de l'utilisateur dans l'auth-service
    try {
      const userResponse = await fetch(`http://auth-service:5000/api/users/${user_id}`);
      if (!userResponse.ok) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur:", error);
      return res.status(500).json({ error: "Erreur lors de la vérification de l'utilisateur." });
    }

    const reviews = await prisma.review.findMany({
      where: { user_id },
      include: {
        restaurant: {
          select: {
            restaurant_id: true,
            restaurant_name: true,
            rating: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des avis de l'utilisateur." });
  }
};

export { createReview, getRestaurantReviews, updateReview, deleteReview, getUserReviews }; 