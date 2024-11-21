const jwt = require('jsonwebtoken');

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ error: 'Token não fornecido.' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido.' });
            }

            const { userId, role } = decoded;

            if (!roles.includes(role)) {
                return res.status(403).json({ error: 'Permissão negada.' });
            }

            req.userId = userId;
            req.userRole = role;
            next();
        });
    };
};

module.exports = roleMiddleware;