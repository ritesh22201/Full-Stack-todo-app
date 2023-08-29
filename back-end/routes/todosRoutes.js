const express = require('express');
const TodoModel = require('../models/todosModel');
const todoMiddleware = require('../middlewares/todo.middleware');
const auth = require('../middlewares/authMiddleware');
const todosRoute = express.Router();

todosRoute.get('/', auth, async (req, res) => {
    const { q } = req.query;
    let page = req.query.page;
    const userId = req.body.userId;
    const limit = req.query.limit;
    try {

        let pageNum = +page || 1;
        let limitPage = +limit;
        const skip = (pageNum - 1)*limit;
        const totalTodos = await TodoModel.countDocuments({userId});

        if (q) {
            const todos = await TodoModel.find({ title: { $regex: q, $options: 'i' }, userId }).skip(skip).limit(limitPage);
            res.status(200).send({todos, totalTodos});
        }
        else {
            const todos = await TodoModel.find({ userId }).skip(skip).limit(limitPage);
            res.status(200).send({todos, totalTodos});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
})

todosRoute.post('/addTodo', auth, todoMiddleware, async (req, res) => {
    try {
        const todo = await TodoModel.create(req.body);
        res.status(200).send({ 'msg': 'Todo added', todo });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

todosRoute.patch('/update/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    const user = await TodoModel.findOne({ _id: id });
    try {
        if (userId === user.userId.toString()) {
            const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            res.status(200).send({ 'msg': 'Todo updated', updatedTodo });
        }
        else {
            res.status(400).send({ 'msg': 'You are not allowed to update' });
        }

    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

todosRoute.delete('/delete/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    const user = await TodoModel.findOne({ _id: id });
    try {
        if (userId === user.userId.toString()) {
            const deletedTodo = await TodoModel.findByIdAndDelete({ _id: id });
            res.status(200).send({ 'msg': 'Todo deleted' });
        }
        else{
            res.status(400).send({'msg' : 'You are not allowed to delete'});
        }
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

module.exports = todosRoute;