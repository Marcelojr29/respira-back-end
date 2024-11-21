const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
app.use(express.json());

const sensorRoutes = require('./src/routes/sensorRoutes');

app.use('/api/sensors', sensorRoutes);

const sensorDataRoutes = require('./src/routes/sensorDataRoutes');

app.use('/api/sensor-data', sensorDataRoutes);

const authRoutes = require('./src/routes/authRoutes');

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Respira Back-End API está funcionando!');
});

app.listen(PORT, () => {
    console.log(`SERVIDOR ESTÁ RODANDO NA PORTA ${PORT}!`);
});