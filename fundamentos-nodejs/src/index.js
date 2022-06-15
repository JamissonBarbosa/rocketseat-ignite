const { query } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

app.get('/courses', (req, res) => {
    const query = req.query
    console.log(query)
    return res.json(["curso1", "curso2","curso3"])
})


app.post('/courses', (req, res) => {
    const body = req.body
    console.log(body)
    return res.json(["curso1", "curso2","curso3"])
})


app.get('/courses', (req, res) => {
    return res.json(["curso1", "curso2","curso3"])
})


app.put('/courses/:id', (req, res) => {
    const id = req.params
    console.log(id)
    return res.json(["curso1", "curso2","curso3"])
})


app.patch('/courses/:id', (req, res) => {
    return res.json(["curso1", "curso2","curso3"])
})


app.delete('/courses/:id', (req, res) => {
    return res.json(["curso1", "curso2","curso3"])
})
app.listen(3333, () => {
    "server is running on port "
})