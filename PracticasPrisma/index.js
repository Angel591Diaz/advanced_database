// Usamos require para importar los módulos
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Creamos instancias de Express y Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// Middleware para que Express entienda JSON
app.use(express.json());

// --- DEFINICIÓN DE RUTAS DE LA API ---

// 1. Ruta para OBTENER todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      // Incluimos el tipo de usuario en la respuesta
      include: {
        type_users: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los usuarios.' });
  }
});

// 2. Ruta para CREAR un nuevo issue (problema)
app.post('/issues', async (req, res) => {
  try {
    const newIssue = await prisma.issues.create({
      data: req.body, // Los datos vienen en el cuerpo de la petición
    });
    res.status(201).json(newIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear el issue.' });
  }
});

// --- INICIAR EL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});