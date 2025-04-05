import express from 'express';
import cors from 'cors';
import restaurantRoutes from './routes/restaurants-routes.js';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categories-routes.js';
import ingredientRoutes from './routes/ingredients-routes.js'

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ingredients', ingredientRoutes);

app.listen(PORT, () => {
  console.log(`✅ Restaurant service lancé sur le port ${PORT}`);
});
