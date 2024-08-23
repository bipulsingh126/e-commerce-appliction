import JWT from "jsonwebtoken";
import { User } from "../models/userModel.js";

//protected Routes token base

const requiredSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);


    }

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unAuthorized Access"
            })

        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Access Denied",
            error
        })

    }
}

export { requiredSignIn, isAdmin };