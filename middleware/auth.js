import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Expecting 'Bearer TOKEN'

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Attach user data to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default authenticateJWT;