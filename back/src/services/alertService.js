const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllAlerts = async () => {
    return await prisma.alert.findMany({
        include: { sensor: true },
    });
};

const getAlertById = async (id) => {
    return await prisma.alert.findUnique({
        where: { id: parseInt(id) },
        include: { sensor: true },
    });
};

const createAlert = async (sensorId, message) => {
    const sensorExists = await prisma.sensor.findUnique({ where: { id: sensorId } });
    if (!sensorExists) throw new Error("Sensor associado ao alerta não existe.");

    const existingAlert = await prisma.alert.findFirst({
        where: { sensorId, message },
    });
    if (existingAlert) throw new Error("Alerta duplicado para o mesmo sensor e mensagem.");

    await prisma.sensor.update({
        where: { id: sensorId },
        data: { status: "alert" },
    });

    return await prisma.alert.create({
        data: { sensorId, message },
    });
}

const updateAlert = async (id, message) => {
    return await prisma.alert.update({
        where: { id: parseInt(id) },
        data: { message },
    });
};

const deleteAlert = async (id) => {
    const alert = await prisma.alert.findUnique({ where: {id } });
    if (!alert) throw new Error("Alerta não encontrado.");

    await prisma.sensor.update({
        where: { id: alert.sensorId },
        data: { status: "active" },
    });

    return await prisma.alert.delete({
        where: { id: parseInt(id) },
    });
};

module.exports = { getAllAlerts, getAlertById, createAlert, updateAlert, deleteAlert };