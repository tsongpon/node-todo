const todoRepository = require('../repositories/todoRepository')

exports.listAll = async (req, res, next) => {
    console.log('Listing all todos')
    try {
        let todos = await todoRepository.listAll()
        res.status(200).json(todos)
    } catch (e) {
        console.error('There is error while listing todos', e)
        next(e)
    }
}

exports.create = async (req, res, next) => {
    console.log('Creating new todo')
    try {
        const todo = {
            title: req.body.title,
            description: req.body.description
        }
        let created = await todoRepository.create(todo)
        res.location('/todos/' + created.id)
        res.status(201).json(created)
    } catch (e) {
        next(e)
    }
}

exports.findById = async (req, res, next) => {
    let id = req.params.id
    try {
        console.log('Getting todo by id: ', id)
        let todo = await todoRepository.findById(id)
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
        const todo = { title: req.body.title, description: req.body.description, id: req.body.id }
        const fromDb = await todoRepository.findById(todoId)
        if (!fromDb) {
            res.status(404).send()
        }
        const updated = await todoRepository.update(todo)
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
    console.log('Deleting todo id: ', todoId)
    try {
        const deleted = await todoRepository.delete(todoId)
        if (deleted > 0) {
            res.status(200).send()
        } else {
            res.status(404).send()
        }
    } catch (e) {
        next(e)
    }
}