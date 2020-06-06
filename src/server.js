const express = require("express")
const server = express()

// Pegar o bando de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))


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

    // req.query: Query é Strings na url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    
    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // Inserir dados no bando de dados

    //console.log(req.body)
    
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }
    
    db.run(query, values, afterInsertData)

})



// Pagina de pesquisa
server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // Pesquisa vazia
        

        // mostrar a página html com os dados do banco
        return res.render("search-results.html", { total: 0 })
    }
     

    // Consulta dados na tabela
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco
        return res.render("search-results.html", { places: rows, total})
    })
})


// ligar o servidor
server.listen(3000)

