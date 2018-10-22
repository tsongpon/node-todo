class TodoTransport {
    constructor(title, description, createdAt, updatedAt) {
        this.title = title
        this.description = description
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.createBy = '@Me'
    }
}

module.exports = TodoTransport