const TodoModel = require("../models/todosModel");

const todoMiddleware = async(req, res, next) => {
    const userId = req.body.userId;
    const {title, status, created_at, priority} = req.body;

    if(title == undefined || status == undefined || !created_at || !priority){
        return res.status(400).send({'msg' : 'All fields are required'});
    }

    const existedTodo = await TodoModel.findOne({title, userId});

    if(existedTodo){
        return res.status(400).send({'msg' : 'Todo is already created'});
    }

    next();
}

module.exports = todoMiddleware;