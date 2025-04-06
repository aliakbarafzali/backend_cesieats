const ERROR_CODES = {
    // Erreurs générales
    INTERNAL_SERVER_ERROR: {
        code: 'INTERNAL_SERVER_ERROR',
        status: 500,
        message: 'Une erreur interne est survenue'
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        status: 404,
        message: 'Ressource non trouvée'
    },
    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Requête invalide'
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        status: 401,
        message: 'Non autorisé'
    },
    FORBIDDEN: {
        code: 'FORBIDDEN',
        status: 403,
        message: 'Accès interdit'
    },

    // Erreurs spécifiques aux restaurants
    RESTAURANT_NOT_FOUND: {
        code: 'RESTAURANT_NOT_FOUND',
        status: 404,
        message: 'Restaurant non trouvé'
    },
    RESTAURANT_CREATION_ERROR: {
        code: 'RESTAURANT_CREATION_ERROR',
        status: 400,
        message: 'Erreur lors de la création du restaurant'
    },
    RESTAURANT_UPDATE_ERROR: {
        code: 'RESTAURANT_UPDATE_ERROR',
        status: 400,
        message: 'Erreur lors de la mise à jour du restaurant'
    },
    RESTAURANT_DELETE_ERROR: {
        code: 'RESTAURANT_DELETE_ERROR',
        status: 400,
        message: 'Erreur lors de la suppression du restaurant'
    },
    INVALID_RESTAURANT_DATA: {
        code: 'INVALID_RESTAURANT_DATA',
        status: 400,
        message: 'Données du restaurant invalides'
    },

    // Erreurs spécifiques aux articles
    ARTICLE_NOT_FOUND: {
        code: 'ARTICLE_NOT_FOUND',
        status: 404,
        message: 'Article non trouvé'
    },
    ARTICLE_CREATION_ERROR: {
        code: 'ARTICLE_CREATION_ERROR',
        status: 400,
        message: 'Erreur lors de la création de l\'article'
    },
    ARTICLE_UPDATE_ERROR: {
        code: 'ARTICLE_UPDATE_ERROR',
        status: 400,
        message: 'Erreur lors de la mise à jour de l\'article'
    },
    ARTICLE_DELETE_ERROR: {
        code: 'ARTICLE_DELETE_ERROR',
        status: 400,
        message: 'Erreur lors de la suppression de l\'article'
    },
    INVALID_ARTICLE_DATA: {
        code: 'INVALID_ARTICLE_DATA',
        status: 400,
        message: 'Données de l\'article invalides'
    },

    // Erreurs spécifiques aux images
    IMAGE_UPLOAD_ERROR: {
        code: 'IMAGE_UPLOAD_ERROR',
        status: 400,
        message: 'Erreur lors de l\'upload de l\'image'
    },
    IMAGE_DELETE_ERROR: {
        code: 'IMAGE_DELETE_ERROR',
        status: 400,
        message: 'Erreur lors de la suppression de l\'image'
    },
    INVALID_IMAGE_FORMAT: {
        code: 'INVALID_IMAGE_FORMAT',
        status: 400,
        message: 'Format d\'image non supporté'
    },
    IMAGE_SIZE_EXCEEDED: {
        code: 'IMAGE_SIZE_EXCEEDED',
        status: 400,
        message: 'La taille de l\'image dépasse la limite autorisée'
    },

    // Erreurs spécifiques aux adresses
    ADDRESS_CREATION_ERROR: {
        code: 'ADDRESS_CREATION_ERROR',
        status: 400,
        message: 'Erreur lors de la création de l\'adresse'
    },
    ADDRESS_UPDATE_ERROR: {
        code: 'ADDRESS_UPDATE_ERROR',
        status: 400,
        message: 'Erreur lors de la mise à jour de l\'adresse'
    },
    INVALID_ADDRESS_DATA: {
        code: 'INVALID_ADDRESS_DATA',
        status: 400,
        message: 'Données d\'adresse invalides'
    }
};

export default ERROR_CODES; 