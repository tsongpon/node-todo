const model = require('../models/index')

exports.listAll = async (req, res, next) => {
    console.log('Listing all todos')
    try {
        let todos = await model.todo.findAll({})
        res.status(200).json(todos)
    } catch (e) {
        console.error('There is error while listing todos', e)
        next(e)
    }
}

exports.create = async (req, res, next) => {
    console.log('Creating new todo')
    try {
        let todo = {
            title: req.body.title,
            description: req.body.description
        }
        let created = await model.todo.create(todo)
        res.status(201).json(created)
    } catch (e) {
        next(e)
    }
}

exports.findById = async (req, res, next) => {
    let id = req.params.id
    try {
        console.log('Getting todo by id: ', id)
        let todo = await model.todo.findById(id)
        if (todo) {
            res.status(200).json(todo)
        } else {
            res.status(404).send()
        }
    } catch (e) {
        next(e)
    }
}

exports.update = async (req, res, next) => {
    let todoId = req.params.id
    console.log('Updating todo id: ', todoId)
    try {
        const todo = { title: req.body.title, description: req.body.description }
        const condition = {
            where: {
                id: todoId
            }
        }
        const toUpdate = await model.todo.findById(todoId)
        if (!toUpdate) {
            res.status(404).send()
        }
        const updated = await model.todo.update(todo, condition)
        if (updated > 0) {
            res.status(200).send()
        } else {
            res.status(500).send()
        }
    } catch (e) {
        next(e)
    }
}

exports.delete = async (req, res, next) => {
    let todoId = req.params.id
    const condition = {
        where: {
            id: todoId
        }
    }
    console.log('Deleting todo id: ', todoId)
    try {
        const deleted = await model.todo.destroy(condition)
        if (deleted > 0) {
            res.status(200).send()
        } else {
            res.status(404).send()
        }
    } catch (e) {
        next(e)
    }
}