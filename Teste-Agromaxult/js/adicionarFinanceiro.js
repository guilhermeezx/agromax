const URLnode = "http://localhost:3005/financeiro/"

var idFinanca = null
lerParametros()

function lerParametros() {
    const urlParams = new URLSearchParams(window.location.search);
    idFinanca = urlParams.get("id");
    var descricao = urlParams.get("descricao");
    var valor = urlParams.get("valor");
    var tipo = urlParams.get("tipo");
    var categoria = urlParams.get("categoria");

    var campoDescricao = document.getElementById("campoDescricao");
    var campoValor = document.getElementById("campoValor");
    var campoTipo = document.getElementById("campoTipo");
    var campoCategoria = document.getElementById("campoCategoria");

    if (idFinanca !== null) {
        // Modo de edição: Preencher os campos com os valores existentes
        campoDescricao.value = descricao;
        campoValor.value = valor;
        campoTipo.value = tipo;
        campoCategoria.value = categoria;
    } else {
        // Modo de adição: Campos vazios
        campoDescricao.value = "";
        campoValor.value = "";
        campoTipo.value = "";
        campoCategoria.value = "";
    }
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    var descFinanca = document.getElementById("campoDescricao").value
    var valorFinanca =  document.getElementById("campoValor").value
    var tipoFinanca =  document.getElementById("campoTipo").value 
    var categoriaFinanca = document.getElementById("campoCategoria").value 

    if( idFinanca != null ){
        console.log("Certo")
        enviaPUT( idFinanca, descFinanca, valorFinanca, tipoFinanca, categoriaFinanca )
        
    }else{
        console.log("errado")
        enviaPOST( descFinanca, valorFinanca, tipoFinanca, categoriaFinanca )
    }
})

function enviaPUT( idFinanca, descFinanca, valorFinanca, tipoFinanca, categoriaFinanca ){
    var header = {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            descricao: descFinanca,
            valor: valorFinanca,
            tipo: tipoFinanca,
            categoria: categoriaFinanca
        })
    }
    fetch(URLnode+idFinanca,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'financeiro.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}

function enviaPOST( descFinanca, valorFinanca, tipoFinanca, categoriaFinanca ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            descricao: descFinanca,
            valor: valorFinanca,
            tipo: tipoFinanca,
            categoria: categoriaFinanca
        })
    }
    fetch(URLnode,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'financeiro.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
};