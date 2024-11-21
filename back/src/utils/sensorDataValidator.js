const Joi = require('joi');

const sensorDataSchema = Joi.object({
    sensorId: Joi.number().integer().required(),
    temperature: Joi.number().required(),
    co2Level: Joi.number().required(),
});

module.exports = { sensorDataSchema };