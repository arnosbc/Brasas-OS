const db = require('../../shared/database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async login(email, password) {
        // 1. Buscar usuario y su rol
        const userQuery = `
            SELECT u.*, r.nombre as rol_nombre 
            FROM usuarios u 
            JOIN roles r ON u.rol_id = r.id 
            WHERE u.email = $1
        `;
        const { rows } = await db.query(userQuery, [email]);
        
        if (rows.length === 0) {
            throw new Error('CREDENTIALS_INVALID');
        }

        const user = rows[0];

        // 2. Verificar si está activo
        if (!user.activo) {
            throw new Error('ACCOUNT_INACTIVE');
        }

        // 3. Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('CREDENTIALS_INVALID');
        }

        // 4. Generar JWT
        const token = jwt.sign(
            { id: user.id, rol: user.rol_nombre },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        // 5. Registrar en la tabla Sesiones (Requisito del Grupo 1)
        await db.query(
            'INSERT INTO sesiones (usuario_id, token, expira_en) VALUES ($1, $2, NOW() + INTERVAL \'8 hours\')',
            [user.id, token]
        );

        return {
            token,
            user: { id: user.id, nombre: user.nombre, rol: user.rol_nombre }
        };
    }
}

module.exports = new AuthService();