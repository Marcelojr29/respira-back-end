const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env_SECRET || process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const tokenn = req.header.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(tokenn, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;