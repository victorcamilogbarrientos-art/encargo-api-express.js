const express = require('express');
const router = express.Router();
const port = 3000;

let tareas = require('./data');

router.use(express.json());

router.get('/tareas', (req, res) => {
    res.json(tareas);
});

router.get('/tareas/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === idBuscar);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
});

router.post('/tareas', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
    }

    const nuevaTarea = {
        id: tareas.length + 1,
        nombre: nombre,
        descripcion: descripcion,
        completada: false
    };

    tareas.push(nuevaTarea);
    res.status(201).json({mensaje: 'Tarea creada', tarea: nuevaTarea });
});

router.put('/tareas/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const { nombre, descripcion, completada } = req.body;

    const tarea = tareas.find(t => t.id === idBuscar);

    if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (nombre !== undefined) tarea.nombre = nombre;
    if (descripcion !== undefined) tarea.descripcion = descripcion;
    if (completada !== undefined) tarea.completada = completada;

    res.json({ mensaje: 'Tarea actualizada', tarea: tarea });
});

router.delete('/tareas/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === idBuscar);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const tareaEliminada = tareas.splice(index, 1);
    res.json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada[0] });
});

module.exports = router;
