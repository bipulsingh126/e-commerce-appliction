import { hashPassword } from "../helpers/authHelper.js";
import { User } from "../models/userModel.js";

const registerController = async () => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: 'email is required' });
        }

        if (!password) {
            return res.send({ error: 'password is required' });
        }

        if (!phone) {
            return res.send({ error: 'phone number is required' });
        }

        if (!address) {
            return res.send({ error: 'address is required' });
        }

        // check user
        const existingUser = await User.findOne({ email });

        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'user already exists please login',

            })
        }
        // register user 
        const  HSPassword = await hashPassword(password)
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error registration',
            error
        })
    }
}

export { registerController };