const Joi = require('joi');

const createSensorSchema = Joi.object({
    location: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'O campo "location" não pode estar vazio.',
        'string.min': 'O campo "location" deve ter pelo menos 3 caracteres',
        'string.max': 'O campo "location" deve ter no máximo 50 caracteres',
        'any.required': 'O campo "location" é obrigatório.',
    }),
    status: Joi.string().valid('active', 'inactive', 'maintenance').required().messages({
        'any.only': 'O campo "status" deve ser "active" ou "inactive" ou "maintenance".',
        'any.required': 'O campo "status" é obrigatório',
    }),
});

const createSensorDataSchema = Joi.object({
    sensorId: Joi.number().integer().positive().required().messages({
        'number.base': 'ID do sensor deve ser um número',
        'number.integer': 'ID do sensor deve ser um número inteiro',
        'number.positive': 'ID do sensor deve ser um número positivo',
        'any.required': 'ID do sensor é obrigatório'
    }),
    temperature: Joi.number().min(-50).max(100).required().messages({
        'number.base': 'O campo "temperature" deve ser um número.',
        'number;min': 'A temperatura mínima permitida é -50ºC.',
        'number.max': 'A temperatura máxima permitida é 100ºC.',
        'any.required': 'O campo "temperature" é obrigatório',
    }),
    co2Level: Joi.number().min(0).max(5000).required().messages({
        'number.base': 'O campo "co2Level" deve ser um número.',
        'number.min': 'O nível mínimo de CO2 permitido é 0.',
        'number.max': 'O nível máximo de CO2 permitido é 5000',
        'any.required': 'O campo "co2Level" é obrigatório.',
    }),
});

module.exports = { 
    createSensorSchema, 
    createSensorDataSchema, 
};