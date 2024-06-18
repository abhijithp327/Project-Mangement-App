import jwt from "jsonwebtoken";
import dotEnv from 'dotenv';

// middleware 

const isAuthenticate = async (req, res, next) => {

    try {

        // get token from headers
        const authToken = req.headers.authorization;

        //check token is exist
        if (!authToken || !authToken.startsWith('Bearer')) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: "No Token, Authorized Denied",
            });
        };

        const token = authToken.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        

        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                status: 401,
                success: false,
                message: "Token is expired , please login again",
            });
        };

        res.status(401).json({
            status: 401,
            success: false,
            message: "Invalid Token",
        });

    }

};


export default isAuthenticate;
