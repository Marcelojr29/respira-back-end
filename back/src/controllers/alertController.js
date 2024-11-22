const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const alertService = require('../services/alertService');

exports.getAllAlerts = async (req, res) => {
    try {
        const alerts = await alertService.getAllAlerts();
        res.status(200).json(alerts);
    } catch (error) {
        console.error('Erro ao listar alertas:', error);
        res.status(500).json({ error: 'Erro ao listar alertas.' });
    }
};

exports.createAlert = async (req, res) => {
    const { sensorId, message } = req.body;

    if (!sensorId || !message) {
        return res.status(400).json({ error: 'Sensor e mensagem obrigatórios.' });
    }

    try {
        const alert = await alertService.createAlert(sensorId, message);
        res.status(201).json({ message: 'Alerta criado com sucesso!', alert});
    } catch (error) {
        console.error('Erro ao criar alertas:', error);
        res.status(500).json({ error: 'Erro ao criar alertas.' });
    }
};

exports.filterAlerts = async (req, res) => {
    const { sensorId, dateStart, dateEnd } = req.query;

    try {
        const filters = {};
        if (sensorId) filters.sensorId = parseInt(sensorId);
        if (dateStart && dateEnd) {
            const start = new Date(dateStart);
            const end = new Date(dateEnd);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({ error: "Datas inválidas." });
            }

            filters.createdAt = {
                gte: start,
                lte: end,
            };
        }

        const alerts = await prisma.alert.findMany({
            where: filters,
            include: { sensor: true },
        });

        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao filtrar alertas.' });
    }
};

exports.updateAlert = async (req, res) => {
    const { id } = req.params;
    const { message }  = req.body;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID do alerta inválido.' });
    }

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: 'Mensagem não pode estar vazia.' });
    }

    try {
        const existingAlert = await prisma.alert.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingAlert) {
            return res.status(404).json({ error: "Alerta não encontrado." });
        }
        const updatedAlert = await prisma.alert.update({
            where: { id: parseInt(id) },
            data: { message },
        });

        res.status(200).json({ message: 'Alerta atualizado com sucesso.', alert: updatedAlert });
    } catch (error) {
        console.error('Erro ao atualizar alerta.', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Alerta não encontrado.' });
        }

        res.status(500).json({ error: 'Erro ao atualizar alerta.' });
    }
};

exports.deleteAlert = async (req, res) => {
    const {id } = req.params;

    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID do alerta inválido.' });
    }

    try {
        await prisma.alert.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Alerta deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar alerta:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Alerta não encontrado.' });
        }

        res.status(500).json({ error: 'Erro ao deletar alerta.' });
    }
};