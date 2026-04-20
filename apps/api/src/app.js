const express = require('express');
const cors = require('cors');
const authRoutes = require('./features/auth/auth.routes');
const usersRoutes = require('./features/users/users.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Montaje de rutas (Screaming Architecture)
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

module.exports = app;