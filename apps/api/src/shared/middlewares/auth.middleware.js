const jwt = require('jsonwebtoken');

// Verifica que el token sea válido
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardamos los datos del usuario en la request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// Verifica si el usuario tiene un rol específico
const requireRole = (roleNeeded) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado.' });
        }
        if (req.user.rol !== roleNeeded) {
            return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
        }
        next();
    };
};

module.exports = { verifyToken, requireRole };