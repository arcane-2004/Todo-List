const userModel = require('../models/user.model');
const listModel = require('../models/list.model');
const listService = require('../services/list.service');

const jwt = require('jsonwebtoken');

module.exports.addTodo = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { todo } = req.body;
    const newTodo = await listService.createList({
        todo,
        user: user._id
    });

    user.todos.push(newTodo._id);
    await user.save();

    return res.status(201).json({ message: "Todo added successfully", todo: newTodo });
}

module.exports.deleteTodo = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const { todoId } = req.body;

    await listModel.findByIdAndDelete(todoId);

    user.todos = user.todos.filter(id => id.toString() !== todoId);
    await user.save();

    return res.status(200).json({ message: "Todo deleted successfully" });
}

module.exports.getTodos = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    const todos = await listModel.find({ _id: { $in: user.todos } }).sort({ createdAt: -1 });

    return res.status(200).json({ todos });
}

module.exports.toggleTodo = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { todoId } = req.body;
    try {
        const todoRef = await listModel.findById(todoId);

        const todo = await listModel.findByIdAndUpdate(
            { _id: todoId },
            { done: !todoRef.done }
        )
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json(error.message);
    };

}

module.exports.updateTodo = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { todoId, newTodo } = req.body;
    try {
        const todo = await listModel.findByIdAndUpdate(
            { _id: todoId },
            { todo: newTodo }
        )
        return res.status(200).json(todo)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports.deletedCompleted = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const completedTodos = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email });

        for (let todo of completedTodos) {
            await listModel.findByIdAndDelete(todo._id);

            user.todos = user.todos.filter(id => id.toString() !== todo._id);
        }

        await user.save();
        res.status(200).json({ message: "todos deleted successfully" })
    } catch (error) {
        res.status(500).json(error.message);
    }

}