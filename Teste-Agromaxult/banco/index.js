// Configurando os módulos
const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")

const app = express()
const jsonParser = bodyParser.json()


// Configurando a conexão com o banco de dados
var con = mysql.createConnection({
    host:"localhost",
    user:"guilherme",
    password:"senha",
    database:"agromax"
})
con.connect(function(err){
    if(err) throw err;
    console.log("Conectado ao banco de dados")
})
app.listen(3005)



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

// Criando um patrimonio
app.post("/patrimonios/", jsonParser, function(req,res){
    var sql = "INSERT into patrimonios(descricao, valor, tipo, revisao, estado) values(?,?,?,?,?);"
    var values = [req.body.descricao, req.body.valor, req.body.tipo, req.body.revisao, req.body.estado]
    console.log(">>>>>");
    con.query(sql,values,function(err,result){
        if (err) throw err
        const novoPatrimonio ={
            id: result.insertId,
            descricao: req.body.descricao,
            valor: req.body.valor,
            tipo: req.body.tipo,
            revisao: req.body.revisao,
            estado: req.body.estado
        }
        res.send(novoPatrimonio)
    });
});

//Get para ler todos os patrimonios
app.get("/patrimonios/", function (req,res){
    var sql = "SELECT * FROM patrimonios;"
    con.query(sql,function(err, result, fields){
        if(err) throw err;
        console.log(result)
        res.send(result)
    });
});

//Get para ler um patrimonio por Id
app.get("/patrimonios/:id", function(req,res){
    var sql = "SELECT * FROM patrimonios WHERE id = ?;"
    var values = [req.params.id]
    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log(result)
        if(result.length == 0){
            res.status(404).send({})
        }else{
            res.send(result)
        }
    });
});

//Get para ler filtrado por patrimonio 
app.get("/patrimonios/descricao/:descricoes", function(req,res){
    var sql = "SELECT * FROM patrimonios WHERE descricao = ?"
    var values = [req.params.descricoes]
    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log(result)
        if(result.length == 0){
            res.status(404).send({})
        }else{
            res.send(result)
        }
    })
})

//Get para ler filtrado por tipo 
app.get("/patrimonios/tipo/:tipo", function(req,res){
    var sql = "SELECT * FROM patrimonios WHERE tipo = ?;"
    var values = [req.params.local]
    con.query(sql,values,function(err,result){
        if(err) throw err;
        console.log(result)
        if(result.length == 0){
            res.status(404).send({})
        }else{
            res.send(result)
        }
    })
})

app.put("/patrimonios/:id",jsonParser, function(req,res){
    var sql = "UPDATE patrimonios SET descricao = ?, valor = ?, tipo = ?, revisao = ?, estado = ? WHERE id = ?";
    var values = [req.body.descricao, req.body.valor, req.body.tipo, req.body.revisao, req.body.estado, req.params.id]
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      if( result.affectedRows == 0 ){
        res.status( 404 ).send( {} )
      }else{
        const novoPatrimonio = {
            id: req.params.id,
            descricao: req.body.descricao,
            valor: req.body.valor,
            tipo: req.body.tipo,
            revisao: req.body.revisao,
            estado: req.body.estado
        };
        res.send( novoPatrimonio );
      }
    });
  });


  app.delete("/patrimonios/:id", jsonParser, function(req, res){
    var sql = "DELETE FROM patrimonios WHERE id = ?";
    var values = [req.params.id]
    con.query(sql, values, function (err, result) {
      if (err) throw err;
       if( result.affectedRows == 0 ){
        res.status( 404 ).send( {} );
      }else{
        res.status(204).send( {} );
      }
    });
    
  });






  //FINANCEIRO
  // Criando uma finança
app.post("/financeiro/", jsonParser, function(req, res){
    var sql = "INSERT into financeiro(descricao, valor, tipo, categoria) values(?,?,?,?);"
    var values = [req.body.descricao, req.body.valor, req.body.tipo, req.body.categoria]
    console.log(">>>>>");
    con.query(sql, values, function(err, result){
        if (err) throw err;
        const novaFinanca = {
            id: result.insertId,
            descricao: req.body.descricao,
            valor: req.body.valor,
            tipo: req.body.tipo,
            categoria: req.body.categoria
        }
        res.send(novaFinanca);
    });
});

// Obter todas as finanças
app.get("/financeiro/", function(req, res){
    var sql = "SELECT * FROM financeiro;"
    con.query(sql, function(err, result, fields){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Obter uma finança por ID
app.get("/financeiro/:id", function(req, res){
    var sql = "SELECT * FROM financeiro WHERE id = ?;"
    var values = [req.params.id]
    con.query(sql, values, function(err, result){
        if(err) throw err;
        console.log(result);
        if(result.length == 0){
            res.status(404).send({});
        } else {
            res.send(result);
        }
    });
});

// Atualizar uma finança por ID
app.put("/financeiro/:id", jsonParser, function(req, res){
    var sql = "UPDATE financeiro SET descricao = ?, valor = ?, tipo = ?, categoria = ? WHERE id = ?";
    var values = [req.body.descricao, req.body.valor, req.body.tipo, req.body.categoria, req.params.id];
    con.query(sql, values, function(err, result){
        if (err) throw err;
        if (result.affectedRows == 0) {
            res.status(404).send({});
        } else {
            const financaAtualizada = {
                id: req.params.id,
                descricao: req.body.descFinanca,
                valor: req.body.valorFinanca,
                tipo: req.body.tipoFinanca,
                categoria: req.body.categoriaFinanca
            };
            res.send(financaAtualizada);
        }
    });
});

// Excluir uma finança por ID
app.delete("/financeiro/:id", jsonParser, function(req, res){
    var sql = "DELETE FROM financeiro WHERE id = ?";
    var values = [req.params.id]
    con.query(sql, values, function(err, result){
        if (err) throw err;
        if (result.affectedRows == 0) {
            res.status(404).send({});
        } else {
            res.status(204).send({});
        }
    });
});
