const express = require("express")


const app = express()
app.use(express.json())

app.get("/courses", (request, response)=>{
    return response.json(["curso A", "Curso V", "Curso C"])
})

app.post("/courses", (request, response)=>{
    return response.json(["curso A", "Curso V", "Curso C"])
})
app.put("/courses/:id", (request, response)=>{
    return response.json(["curso H", "Curso V", "Curso C"])
})
app.patch("/courses/:id", (request, response)=>{
    return response.json(["curso H", "Curso Z", "Curso C"])
})
app.delete("/courses/:id", (request, response)=>{
    return response.json(["curso A", "Curso V"])
})

app.listen(3333, () => console.log("server is running..."))