var TodoTransport = require('../transports/todo')

exports.toTransport = (model) => {
    return new TodoTransport(model.title, model.description, model.createdAt, model.updatedAt)
}

exports.toModel = (transport) => {
    return {title: transport.title, description: transport.description}
}