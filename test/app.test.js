process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/app');
let should = chai.should();

chai.use(chaiHttp)

describe('Todo', () => {
    beforeEach((done) => { //Before each test
        // nothing to do for now
        done()
    });
    /*
      * Test the /GET route
      */
    describe('/GET todos', () => {
        it('it should GET all the todos', (done) => {
            chai.request(server)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET todos/:id', () => {
        it('it should return 404 when get to do that does not exist', (done) => {
            chai.request(server)
                .get('/todos/-99')
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })

    describe('/POST todos', () => {
        it('it should create new todo after POST valid request', (done) => {
            let todo = {
                title: "Learn javascript and nodejs",
                description: "Learn programming javascript and nodejs",
            }
            chai.request(server)
                .post('/todos')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.header('Location');
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('createdAt');
                    res.body.should.have.property('updatedAt');

                    let location = res.header['location']
                    chai.request(server)
                        .get(location)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title').eql('Learn javascript and nodejs');
                            done();
                        })
                });
        });
    });

    describe('/PUT todos/id', () => {
        it('it should update successfully when update exist todo with valid payload', (done) => {
            let toUpdate = {
                title: "Learn how to swim",
                description: "Learn how to swim",
            }
            chai.request(server)
                .post('/todos')
                .send(toUpdate)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.header('Location');
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql('Learn how to swim');
                    res.body.should.have.property('description').eql('Learn how to swim');

                    let location = res.header['location']
                    let createAt = res.body.createdAt
                    let updateAt = res.body.updatedAt
                    let updatingTodo = {
                        id: res.body.id,
                        title: "Learn how to swim",
                        description: "Learn how to swim in the Pacific Ocean",
                    }
                    chai.request(server)
                        .put(location)
                        .send(updatingTodo)
                        .end((err, res) => {
                            res.should.have.status(200)

                            chai.request(server)
                                .get(location)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('createdAt').eql(createAt);
                                    res.body.should.have.property('updatedAt').not.equal(updateAt);
                                    res.body.should.have.property('title').eql('Learn how to swim');
                                    res.body.should.have.property('description').eql('Learn how to swim in the Pacific Ocean');
                                    done();
                                })
                        })
                })
        })
    })

    describe('/PUT todos/id', () => {
        it('it should return 404 when try to update none exist todo', (done) => {
            let updatingTodo = {
                title: "Learn how to swim",
                description: "Learn how to swim in the Pacific Ocean",
            }
            chai.request(server)
                .put('/todos/-99')
                .send(updatingTodo)
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                })
        })
    })

    describe('/DELETE todos/id', () => {
        it('it should successfully delete existing todo', (done) => {
            let newTodo = {
                title: "Learn how to swim",
                description: "Learn how to swim",
            }
            chai.request(server)
                .post('/todos')
                .send(newTodo)
                .end((err, res) => {
                    res.should.have.status(201);

                    let location = res.header['location']
                    chai.request(server)
                        .delete(location)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done()
                        })
                })
        })
    })

    describe('/DELETE todos/id', () => {
        it('it should return 404 when delete not exist todo', (done) => {
            chai.request(server)
                .delete('/todos/-99')
                .end((err, res) => {
                    res.should.have.status(404);
                    done()
                })
        })
    })

});
