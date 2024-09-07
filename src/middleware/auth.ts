
import jwt from 'jsonwebtoken'

export const auth = (req:any, res:any, next:any) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token,'testing1234564');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};