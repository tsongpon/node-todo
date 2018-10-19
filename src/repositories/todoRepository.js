const model = require('../models/index')

exports.listAll = async () => {
    return model.todo.findAll({})
}

exports.findById = async (id) => {
    return model.todo.findById(id)
}

exports.create = async (todo) => {
    return model.todo.create(todo)
}

exports.update = async (todo) => {
    const condition = {
        where: {
            id: todo.id
        }
    }
    return model.todo.update(todo, condition)
}

exports.delete = async (todoId) => {
    const condition = {
        where: {
            id: todoId
        }
    }
    return model.todo.destroy(condition)
}
