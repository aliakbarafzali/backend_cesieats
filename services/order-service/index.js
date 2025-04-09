import express from 'express';
import dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes.js';
import promosRoutes from './routes/promoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/promos', promosRoutes);

app.listen(5002, () => {
  console.log('📦 Order service running on port 5002');
});
