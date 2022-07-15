const express = require('express')
const {v4: uuidv4} =require("uuid")
const app = express()

app.use(express.json())

const customers = []

app.post("/account", (req, res) => {
    const {cpf, nome} = req.body
    const id = uuidv4()

    const customerAlreadyExist = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customerAlreadyExist) {
        return res.status(400).json({error: "Customer already exist!"})
    }

    customers.push({
        cpf, 
        nome,
        id,
        statement: []
    })

    return res.status(201).send()
})

app.get("/statement/:cpf", (req, res) => {
    const {cpf} = req.params

    const customer = customers.find((customer) => {
        customer.cpf === cpf
    })
    if(!customer) {
        return res.status(400).json({error:"Customer not found"})
    }
  
    return res.json(customer.statement)
})

app.listen(3333)