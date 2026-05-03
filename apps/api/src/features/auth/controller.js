const authService = require('./auth.service');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error.message === 'CREDENTIALS_INVALID') {
            return res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
        if (error.message === 'ACCOUNT_INACTIVE') {
            return res.status(403).json({ message: 'La cuenta está desactivada' });
        }
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };