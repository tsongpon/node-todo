const model = require('../models/index')

exports.listAll = async () => {
    return await model.todo.findAll({})
}

exports.findById = async (id) => {
    return await model.todo.findById(id)
}

exports.create = async (todo) => {
    return await model.todo.create(todo)
}

exports.update = async (todo) => {
    const condition = {
        where: {
            id: todo.id
        }
    }
    return await model.todo.update(todo, condition)
}

exports.delete = async (id) => {
    const condition = {
        where: {
            id: todoId
        }
    }
    return await model.todo.destroy(condition)
}
