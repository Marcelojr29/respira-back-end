const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllSensors = async (req, res) => {
    try {
        const sensors = await prisma.sensor.findMany();
        res.status(200).json(sensors);
    } catch (error) {
        console.log('Erro ao listar sensores:', error);
        res.status(500).json({ error: 'Erro ao listar sensores.' });
    }
};

exports.getSensorById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID do sensor inválido.' });
        }

        const sensor = await prisma.sensor.findUnique({
            where: { id: parseInt(id) },
        });

        if (!sensor) {
            return res.status(404).json({ error: 'Sensor não encontrado.' });
        }

        res.status(200).json(sensor);
    } catch (error) {
        console.error('Erro ao buscar sensor:', error);
        res.status(500).json({ error: 'Erro ao buscar sensor.' });
    }
};

exports.createSensor = async (req, res) => {
    try {
        const { location, status } = req.body;

        if(!location || !status) {
            return res.status(400).json({ error: 'Campos obrigatórios não fornecidos.' });
        }

        console.log('Dados recebidos:', { location, status });

        const newSensor = await prisma.sensor.create({
            data: { location, status },
        });

        res.status(201).json(newSensor);
    } catch (error) {
        console.error('Erro ao criar sensor:', error);
        res.status(500).json({ error: 'Erro ao criar sensor.' });
    }
};

exports.updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, status } = req.body;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID do sensor inválido.' });
        }

        const updatedSensor = await prisma.sensor.update({
            where: { id: parseInt(id) },
            data: { location, status },
        });

        res.status(200).json(updatedSensor);
    } catch (error) {
        console.error('Erro ao atualizar sensor:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Sensor não encontrado' });
        }

        res.status(500).json({ error: 'Erro ao atualizar sensor.' });
    }
};

exports.deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Sensor a ser deletado:', { id });

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'ID do sensor inválido.' });
        }

        await prisma.sensor.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Sensor deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar sensor:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Sensor não encontrado' });
        }

        res.status(500).json({ error: 'Erro ao deletar sensor.' });
    }
};

exports.getSensorData = async (req, res) => {
    try {
        console.log('Requisição recebida para /api/sensors/:id/data');
        console.log('Parâmetro ID recebido:', req.params.id);

        const { id } = req.params;

        const sensor = await prisma.sensor.findUnique({
            where: { id: parseInt(id) },
            include: { sensorData: true },
        });

        if (!sensor) {
            console.log('Sensor não encontrado no banco de dados.');
            return res.status(404).json({ error: 'Sensor não encontrado.' });
        }

        res.status(200).json(sensor.sensorData);
    } catch (error) {
        console.error('Erro ao buscar dados do sensor:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do sensor.' });
    }
};