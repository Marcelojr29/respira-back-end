const Joi = require('joi');

const reportSchema = Joi.object({
    title: Joi.string().max(100).required().messages({
        'string.empty': 'O título não pode estar vazio.',
        'string.max': 'O título não pode ter mais de 100 caracteres.',
        'any.required': 'O título é obrigatório.',
    }),
    description: Joi.string().max(255).required().messages({
        'string.empty': 'A descrição não pode estar vazia',
        'string.max': 'A descrição não pode ter mais de 255 caracteres',
        'any.required': 'A descrição é obrigatória',
    }),
    filePath: Joi.string().required().messages({
        'string.empty': 'O caminho do arquivo não pode estar vazio.',
        'any.required': 'O caminho do arquivo é obrigatório.',
    }),
});

module.exports = { reportSchema };