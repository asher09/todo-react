const express = require('express');
const { createTodo, updateTodo } = require('./type');
const {todo} = require('./db')
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());


app.listen(port ,() => {
    console.log("Server is running on port " + port);
})


app.get('/todos', async function (req, res) {
    const todos = await todo.find({})
    res.json({
        todos
    })
})

app.post('/todos', async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })
})

app.put('/completed', async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.update({
        _id: req.headers.id
    }, {
        completed: true
    })
    res.json({
        msg: "Todo Completed"
    })
})