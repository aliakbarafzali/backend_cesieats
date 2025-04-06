import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import restaurantRoutes from './routes/restaurants-routes.js';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categories-routes.js';
import ingredientRoutes from './routes/ingredients-routes.js'
import articleRoutes from './routes/articles-routes.js';
import reviewRoutes from './routes/review-routes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerSpecs from './utils/swagger.js';

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();
app.use(cors());
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/reviews', reviewRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Restaurant service lancé sur le port ${PORT}`);
});
