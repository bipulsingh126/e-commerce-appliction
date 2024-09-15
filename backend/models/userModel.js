import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
        trim: true
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true,
    },

    phone: {
        type: "string",
        required: true,
    },

    address: {
        type: {},
        required: true,
    },
    answer: {
        type : String,
        required: true
    },
    role: {
        type: "Number",
        default: 0
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema);