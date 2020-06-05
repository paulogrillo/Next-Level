const express = require("express")
const server = express()


//configurar pasta public
server.use(express.static("public"))


// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
}) 

// Coonfigurar caminhos da minha aplicação
// Pagina inicial

//Home

server.get("/", (req, res) => {
    return res.render("index.html")
})

// Pagina de cadastro
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

// Pagina de pesquisa
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000)

