import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: 'Product'
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ['Not Process', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);