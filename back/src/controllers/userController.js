const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUsers = async (req, res) => {
    try {
        if (req.userRole  !== 'admin') {
            return res.status(403).json({ error: 'Permissão negada.' });
        }

        const users = await prisma.user.findMany();
        
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Papel inválido. Deve ser "admin" ou "user".' });
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};