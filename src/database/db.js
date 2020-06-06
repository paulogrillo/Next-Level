// Importar a depedencia do sqlite3
const sqlite3 = require ("sqlite3").verbose()

// criar objeto que irá fazer operações no banco de dados
const  db = new sqlite3.Database ("./src/database/database.db")

module.exports = db

   //utilizar o objeto de banco de dados, pra nossa operações
    
    db.serialize(() => {
    
    
    // Criar uma tabela
   /*  db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // Inserir dados na tabela
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
        "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        "Papéis e Papelão",
        "Rua Celso Garcia",
        "Número 200",
        "São Paulo",
        "São Palo",
        "Resíduos orgânicos"
    ]

    function afterInsertData(err){
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    
    db.run(query, values, afterInsertData)
 

    
     // Consultar dados na tabela
     db.all(`SELECT name FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estão seus registros:")
        console.log(rows)
    })
     */

    //Deletar um dado na tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [23], function(err){
      //  if(err) {
      //  return console.log(err)
      // }
     //   console.log("Registro deletado com sucesso!")
  //}) 
  
})