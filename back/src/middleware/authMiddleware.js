const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
   try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;

    next()
   } catch (error) {
    console.error('Erro no middleware de autenticação:', error.message);
    res.status(401).json({ error: 'Token inválido ou expirado.' });
   }
};

module.exports = authMiddleware;