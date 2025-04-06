import ERROR_CODES from '../utils/errorCodes.js';

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Si l'erreur a déjà un format standardisé
    if (err.code && err.status && err.message) {
        return res.status(err.status).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details || null
            }
        });
    }

    // Erreurs Prisma
    if (err.code && err.code.startsWith('P')) {
        return res.status(400).json({
            error: {
                code: 'DATABASE_ERROR',
                message: 'Une erreur de base de données est survenue',
                details: err.message
            }
        });
    }

    // Erreurs Firebase
    if (err.code && err.code.startsWith('storage/')) {
        return res.status(400).json({
            error: {
                code: 'STORAGE_ERROR',
                message: 'Une erreur de stockage est survenue',
                details: err.message
            }
        });
    }

    // Erreur par défaut
    return res.status(500).json({
        error: {
            code: ERROR_CODES.INTERNAL_SERVER_ERROR.code,
            message: ERROR_CODES.INTERNAL_SERVER_ERROR.message,
            details: process.env.NODE_ENV === 'development' ? err.message : null
        }
    });
};

export default errorHandler; 