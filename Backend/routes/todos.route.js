const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const todosController = require('../controllers/todos.controller');

router.post('/add', todosController.addTodo)

router.post('/delete', todosController.deleteTodo)

router.get('/get', todosController.getTodos)

router.post('/toggle', todosController.toggleTodo)

router.put('/update', todosController.updateTodo)

router.post('/delete/completed', todosController.deletedCompleted)

module.exports = router;