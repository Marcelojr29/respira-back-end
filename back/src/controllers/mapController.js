const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.mapDataSensor = async (req, res) => {
    try {
        const sensors = await prisma.sensor.findMany({
            select: { location: true, status: true },
        });
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter dados de sensores para o mapa.' });
    }
};

exports.alertDataMap = async (req, res) => {
    try {
        const alerts = await prisma.alert.findMany({
            include: { sensor: { select: { location: true } } },
        });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(200).json({ error: 'Erro ao obter dados de alertas para o mapa.' });
    }
};

exports.filterSensors = async (req, res) => {
    try {
        const { status, location } = req.query;

        const filters = {};
        if (status) filters.status = status;
        if (location) filters.location = { contains: location };

        const sensors = await prisma.sensor.findMany({
            where: filters,
            select: {
                id: true,
                location: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        res.status(200).json(sensors);
    } catch (error) {
        console.error('Erro ao filtrar sensores:', error);
        res.status(500).json({ error: 'Erro ao filtrar sensores.' });
    }
};

exports.filterAlerts = async (req, res) => {
    try {
        const { severity, dateStart, dateEnd } = req.query;

        const filters = {};
        if (severity) filters.severity = severity;
        if (dateStart && dateEnd) {
            filters.createdAt = {
            gte: new Date(dateStart),
            lte: new Date(dateEnd),
            };
        }
        
        const alerts = await prisma.alert.findMany({
            where: filters,
            include: { sensor: true },
        });

        res.status(200).json(alerts);
    } catch (error) {
        console.error('Erro ao filtrar alertas:', error);
        res.status(500).json({ error: 'Erro ao filtrar alertas.' });
    }
};
