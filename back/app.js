require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const sensorRoutes = require('./src/routes/sensorRoutes');
const sensorDataRoutes = require('./src/routes/sensorDataRoutes');
const authRoutes = require('./src/routes/authRoutes');
const alertRoutes = require('./src/routes/alertRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const mapRoutes = require('./src/routes/mapRoutes');

app.use(cors());

app.use(express.json());

app.use('/sensors', sensorRoutes);

app.use('/sensor-data', sensorDataRoutes);

app.use('/auth', authRoutes);

app.use('/alerts', alertRoutes);

app.use('/reports', reportRoutes);

app.use('/map', mapRoutes);

app.get('/', (req, res) => {
    res.send('Respira Back-End API está funcionando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVIDOR ESTÁ RODANDO NA PORTA ${PORT}!`);
});
