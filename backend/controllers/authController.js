import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        if (!name) {
            return res.send({ message: 'Name is required' });
        }
        if (!email) {
            return res.send({ message: 'email is required' });
        }

        if (!password) {
            return res.send({ message: 'password is required' });
        }

        if (!phone) {
            return res.send({ message: 'phone number is required' });
        }

        if (!address) {
            return res.send({ message: 'address is required' });
        }
        if (!answer) {
            return res.send({ message: 'answer is required' });
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
        const hashedPassword = await hashPassword(password)
        // save user
        const newUser = new User({
            name,
            email,
            address,
            phone,
            password: hashedPassword,
            answer
        })
        newUser.save()
        res.status(201).send({
            success: true,
            message: 'User saved successfully',
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error registration',
            error
        })
    }
}

//method post = Login

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate
        if (!email || !password) {
            return res.status(404).send({
                success: true,
                message: "Invalid email or password"
            });
        }
        //check password
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: true,
                message: "Invalid password"
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "login Successfully ",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'login failed',
            error
        });

    }
}
//test controller 

const testController = (req, res) => {
    console.log('protected route')
}

//forgot password --

const forgotPasswordController = async (req, res) => {
    try {
        const [email, answer, newPassword] = req.body
        if (!email) {
            res.status(400).send({
                message: 'Email is required'
            })
        }
        if (!answer) {
            res.status(400).send({
                message: 'question is required'
            })
        }
        if (!newPassword) {
            res.status(400).send({
                message: 'newPassword is required'
            })
        }
        //check
        const user = await User.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'worng Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'something went wrong',
            error
        })

    }

}

export { registerController, loginController, testController, forgotPasswordController };