import express from 'express'
import routerProd from './routes/products.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js';

const PORT = 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/product', routerProd)
app.use('/api/carts', routerCart);

// Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});