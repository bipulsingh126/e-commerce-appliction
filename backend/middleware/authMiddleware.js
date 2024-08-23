import JWT from "jsonwebtoken";

//protected Routes token base

const requiredSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.log(error);
        
        
    }

}


export { requiredSignIn };