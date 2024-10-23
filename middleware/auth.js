import jwt from 'jsonwebtoken';
import { Buffer } from 'buffer';
import dotenv from 'dotenv'
dotenv.config();

const secretKey = Buffer.from(process.env.JWT_SECRET, 'base64');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        // Verifying token with decoded secret and specifying HS256 algorithm
        jwt.verify(token, secretKey, { algorithms: ['HS256'] }, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err);
                return res.status(403).json({ message: 'Forbidden - Invalid or Expired Token' });
            }

            req.user = decoded; // Assuming decoded contains user info
            next();
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }
};

export default authenticateJWT;
