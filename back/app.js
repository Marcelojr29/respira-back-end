require('dotenv').config();
const express = require('express');
const app = express();
const sensorRoutes = require('./src/routes/sensorRoutes');
const sensorDataRoutes = require('./src/routes/sensorDataRoutes');
const authRoutes = require('./src/routes/authRoutes');
const alertRoutes = require('./src/routes/alertRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const mapRoutes = require('./src/routes/mapRoutes');

app.use(express.json());

app.use('/api/sensors', sensorRoutes);

app.use('/api/sensor-data', sensorDataRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/alerts', alertRoutes);

app.use('/api/reports', reportRoutes);

app.use('/api/map', mapRoutes);

app.get('/', (req, res) => {
    res.send('Respira Back-End API está funcionando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVIDOR ESTÁ RODANDO NA PORTA ${PORT}!`);
});
