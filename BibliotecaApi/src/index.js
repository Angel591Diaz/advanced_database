const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const libraryRoutes = require('./routes/libraryEndpoints');
const functionRoutes = require('./routes/functionEndpoints');

app.get('/', (req, res) => {
    res.send('API de la Biblioteca Digital funcionando!');
});

app.use('/api', libraryRoutes); 
app.use('/api', functionRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;