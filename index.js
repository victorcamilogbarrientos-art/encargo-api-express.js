const express = require('express');
const app = express();
const port = 3000;
const rutastareas = require('./routes');

app.use(express.json());

app.use(rutastareas);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
