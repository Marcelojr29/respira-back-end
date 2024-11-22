const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.receiveDataSensor = async (req, res) => {
    const { sensorId, value } = req.body;

    if (!sensorId || !value) {
        return res.status(400).json({ error: 'Sensor ID e valor são obrigatórios.' });
    }

    try {
        const sensor = await prisma.sensor.findUnique({
            where: { id: parseInt(sensorId) }
        });
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor não encontrado.' });
        }

        const data = await prisma.sensorDataEsp.create({
            data: { sensorId: sensorId, value },
        });

        res.status(201).json({ message: 'Dados recebidos com sucesso.', data });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao receber dados do sensor.' });
    }
};
