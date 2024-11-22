const { PrismaClient } = require('@prisma/client');
const { reportSchema } = require('../utils/reportValidator');
const prisma = new PrismaClient();

exports.createReport = async (req, res) => {
    try {
        const { error } = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

    const { title, description, filePath } = req.body;

    const newReport = await prisma.report.create({
        data: { title, description, filePath },
    });

        res.status(201).json({ message: 'Relatório criado com sucesso!', report: newReport });
    } catch (error) {
        console.error('Erro ao criar relatório:', error);
        res.status(500).json({ error: 'Erro ao criar relatório.' });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await prisma.report.findMany();
            res.status(200).json(reports);
    } catch (error) {
        console.error('Erro ao listar relatórios:', error);
        res.status(500).json({ error: 'Erro ao listar relatórios.' });
    }
};

exports.getReportById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID do relatório inválido.' });
    }

    try {
        const report = await prisma.report.findUnique({ where: { id: parseInt(id) } });

        if (!report) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        res.status(200).json(report);
    } catch (error) {
        console.error('Erro ao buscar relatório:', error);
        res.status(500).json({ error: 'Erro ao buscar relatório.' });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = reportSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedReport = await prisma.report.update({
            where: { id: parseInt(id) },
            data: req.body,
        });

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID do relatório inválido.' });
    }

    res.status(200).json({ message: 'Relatório atualizado com sucesso!', report: updatedReport });
    } catch (error) {
        console.error('Erro ao atualizar relatório:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Relatório não encontrado. '});
        }

        res.status(500).json({ error: 'Erro ao atualizar relatório.' });
    }
};

exports.deleteReport = async (req, res) => {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'ID do relatório inválido.' });
    }

    try {
        await prisma.report.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: 'Relatório deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar relatório:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        res.status(500).json({ error: 'Erro ao deletar relatório.' });
    }
};