const { request } = require('express')
const express = require('express')
const {v4: uuidv4} =require("uuid")
const app = express()

app.use(express.json())

const customers = []

//MiddleWare
function verifyExistAccountCPF(request, response, next) {
    const {cpf} = request.params

    const customer = customers.find((customer) => customer.cpf === cpf)

    if(!customer) {
        return response.status(400).json({error:"Customer not found"})
    }
    request.customer = customer

    return next()
}

function getBalance(){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit'){
            return acc + operation.amount
        }else{
            return acc - operation.amount
        }
    }, 0)
    return balance
}

//Rotas do app
app.post("/account", (request, response) => {
    const {cpf, nome} = request.body
    const id = uuidv4()

    const customerAlreadyExist = customers.some(
        (customer) => customer.cpf === cpf
    )

    if(customerAlreadyExist) {
        return response.status(400).json({error: "Customer already exist!"})
    }

    customers.push({
        cpf, 
        nome,
        id,
        statement: []
    })

    return response.status(201).send()
})

//App chamando middliware
app.use(verifyExistAccountCPF)

app.get("/statement/:cpf",  (request, response) => {
    const customer = request.customer

    return response.json(customer.statement)
})

app.post("/deposit/:cpf", (request, response) => {
    const {description, amount} = request.body
    const {customer} = request

    
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type:"credit"
    }
    customer.statement.push(statementOperation)
    return response.status(201).send()
})

app.post("/withdraw", (request, response)=>{
    const {amount} = request.body
    const {customer} = request

    const balance = getBalance(customer.statement)

    if(balance < amount){
        return response.status(400).json({error: "Insufficient funds!"})
    }
    const statementOperation = {
        amount,
        createdAt: new Date(),
        type:"debit"
    }

    customers.statement.push(statementOperation)

    return response.status(201).send()
})

app.get("/statement/date",  (request, response) => {
    const {customer} = request
    const date = request.query

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter(
        (statement) => {
            statement.created_at.toDateString() ===
            new Date(dateFormat).toDateString()
        }
    )

    return response.json(statement)
})

app.put("/account/:cpf", (request, response)=>{
    const {name} = request.body
    const {customer} = request

    customer.name = name

    return response.status(201).send()
})

app.get('/account/:cpf', (request, response)=>{
    const {customer} = request

    return response.json(customer)
})

app.delete("/account/:cpf", (request,response)=>{
    const {customer} = request

    customers.splice(customer, 1)

    return response.status(200).json(customers)
})

app.get("/balance/:cpf", (request,response)=>{
    const {customer} = request

    const balance = getBalance(customer.statement)

    return response.json(balance)
})

app.listen(3333)