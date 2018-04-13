// Test routes, 
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Put DB in same state before tests

const todos = [{
    _id: new ObjectID(),
    text: 'First text todo'
}, {
    _id: new ObjectID(),
    text: 'Second text todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        //inertMany
        return Todo.insertMany(todos);
    }).then(() => {
        done()
    });
});


// Test POST  of todos
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                })
            });

    });

    // Test for invalid body data
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({
                text: ''
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
        
});

// Test GET of todos
describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);

    });
});

// Test GET of /todos/:id
describe('GET /todos:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            // Need to convert object ID to string - toHexString
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('should return a 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done)
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}111`)
            .expect(404)
            .end(done)
    });
});
