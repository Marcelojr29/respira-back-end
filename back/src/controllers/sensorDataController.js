const { PrismaClient } =  require('@prisma/client');
const prisma = new PrismaClient();
const { sensorDataSchema } = require('../utils/sensorDataValidator');

exports.createSensorData = async (req, res) => {
    try {
        const { error } = sensorDataSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { sensorId, temperature, co2Level } = req.body;

        if(!sensorId || !temperature || !co2Level) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

        const sensor = await prisma.sensor.findUnique({
            where: { id: parseInt(sensorId) },
          });

        if (!sensor) {
            return res.status(404).json({ error: 'Sensor não encontrado.' });
        }

        const newSensorData = await prisma.sensorData.create({
            data: { sensorId: parseInt(sensorId), temperature, co2Level },         
        });

        if (temperature > 50 || co2Level > 1000) {
            console.log('⚠️ Alerta crítico! Temperatura ou nível de CO2 elevados.');
            // TODO: implementar um serviço de envio de e-mails ou de SMS
        }

        res.status(201).json(newSensorData);
    } catch (error) {
        console.error('Erro ao criar dado de sensor:', error);
        res.status(500).json({ error: 'Erro ao criar dado de sensor.' });
    }
};

exports.getSensorDataBySensorId = async (req, res) => {
    try {
        const { sensorId } = req.params;

        if (isNaN(parseInt(sensorId))) {
            return res.status(400).json({ error: 'ID do sensor inválido.' });
        }

        const data = await prisma.sensorData.findMany({
            where: { sensorId: parseInt(sensorId) },
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao listar dados de sensor:', error);
        res.status(500).json({ error: 'Erro ao listar dados de sensor.' });
    }
};

exports.updateSensorData = async (req, res) => {
    try {
        const { id } = req.params;
        const { temperature, co2Level } = req.body;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID do dado de sensor inválido.' });
        }

        const updatedData = await prisma.sensorData.update({
            where: { id: parseInt(id) },
            data: { temperature, co2Level },
        });

        res.status(200).json(updatedData);
    } catch (error) {
        console.error('Erro ao atualizar dado de sensor:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Dado de sensor não encontrado.' });
        }

        res.status(500).json({ error: 'Erro ao atualizar dado de sensor.' });
    }
};

exports.deleteSensorData = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID do dado de sensor inválido.' });
        }

        await prisma.sensorData.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Dado de sensor deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar dado de sensor:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Dado de sensor não encontrado.' });
        }

        res.status(500).json({ error: 'Erro ao deletar dado de sensor.' });
    }
};

exports.getAllSensorData = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        if (isNaN(pageNum) || pageNum < 1) {
            return res.status(400).json({ error: 'Número de página inválido.' });
        }

        if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
            return res.status(400).json({ error: 'Limite de resultados inválido.' });
        } 

        const sensorData = await prisma.sensorData.findMany({
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
        });

        const totalCount = await prisma.sensorData.count();

        res.status(200).json({
            data: sensorData,
            meta: {
                total: totalCount,
                page: pageNum,
                limit: limitNum,
            },
        });
    } catch (error) {
        console.error('Erro ao buscar dados dos sensores:', error);
        res.status(500).json({ error: 'Erro ao buscar dados dos sensores.' });
    }
};