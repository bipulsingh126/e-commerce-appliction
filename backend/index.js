import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js';

//rest object 
const app = express();

//configure env
dotenv.config();

// database config
connectDB();

//middleware 
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
//rest api

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecomerce app "
    })
})

//PORT

const PORT = process.env.PORT || 5000

// run listen on port

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})