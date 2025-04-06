import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Restaurant Service API',
            version: '1.0.0',
            description: 'API documentation for the Restaurant Service',
        },
        servers: [
            {
                url: 'http://localhost:5001',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les routes
};

const specs = swaggerJsdoc(options);

export default specs; 