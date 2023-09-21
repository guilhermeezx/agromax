const URLnode = "http://localhost:3005/patrimonios/"

var idPatrimonio = null
lerParametros()

function lerParametros(){
    const urlParams = new URLSearchParams(window.location.search);
    idPatrimonio = urlParams.get("id")
    var descricao = urlParams.get("descricao")
    var valor = urlParams.get("valor")
    var tipo = urlParams.get("tipo")
    var revisao = urlParams.get("revisao")
    var estado = urlParams.get("estado");

    document.getElementById("campoDescricao").value = descricao
    document.getElementById("campoValor").value = valor
    document.getElementById("campoTipo").value = tipo
    document.getElementById("campoRevisao").value = revisao
    document.getElementById("campoEstado").value = estado
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click", function(){
    var descPatrimonio = document.getElementById("campoDescricao").value
    var valorPatrimonio =  document.getElementById("campoValor").value
    var tipoPatrimonio =  document.getElementById("campoTipo").value 
    var revisaoPatrimonio = document.getElementById("campoRevisao").value 
    var estadoPatrimonio =  document.getElementById("campoEstado").value 

    // Formata a data para o formato aaaa-mm-dd
    var partesData = revisaoPatrimonio.split('/');
    var dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

    if( idPatrimonio != null ){
        console.log("Certo")
        enviaPUT( idPatrimonio, descPatrimonio, valorPatrimonio, tipoPatrimonio, dataFormatada, estadoPatrimonio )
        
    }else{
        console.log("errado")
        enviaPOST( descPatrimonio, valorPatrimonio, tipoPatrimonio, dataFormatada, estadoPatrimonio )
    }
})

function enviaPUT( idPatrimonio, descPatrimonio, valorPatrimonio, tipoPatrimonio, dataFormatada, estadoPatrimonio ){
    var header = {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            descricao: descPatrimonio,
            valor: valorPatrimonio,
            tipo: tipoPatrimonio,
            revisao: dataFormatada,
            estado: estadoPatrimonio
        })
    }
    fetch(URLnode+idPatrimonio,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'patrimonios.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
}

function enviaPOST( descPatrimonio, valorPatrimonio, tipoPatrimonio, dataFormatada, estadoPatrimonio ){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            descricao: descPatrimonio,
            valor: valorPatrimonio,
            tipo: tipoPatrimonio,
            revisao: dataFormatada,
            estado: estadoPatrimonio
        })
    }
    fetch(URLnode,header)
    .then(function(response){
        return response.json()
    }).then(function(data){
        window.location.href = 'patrimonios.html';
    }).catch(function(){
        var mensagemErro = document.getElementById("erro")
        mensagemErro.style.display = "visible"
    })
};


const revisaoInput = document.getElementById('campoRevisao');
const revisaoLabel = revisaoInput.nextElementSibling;

revisaoInput.addEventListener('input', () => {
    if (revisaoInput.value.trim() !== '') {
        revisaoLabel.classList.add('input-filled');
    } else {
        revisaoLabel.classList.remove('input-filled');
    }
});

revisaoInput.addEventListener('focus', () => {
    if (revisaoInput.value === '') {
        revisaoInput.type = 'text';
        revisaoInput.placeholder = 'dd/mm/aaaa';
        revisaoInput.value = ''; // Limpar o valor ao focar
    }
});

revisaoInput.addEventListener('blur', () => {
    if (revisaoInput.value === '') {
        revisaoInput.type = 'text';
        revisaoLabel.classList.remove('input-filled');
    }
});








document.addEventListener("DOMContentLoaded", function() {
    const campoRevisao = document.getElementById("campoRevisao");

    campoRevisao.addEventListener("input", function() {
        let value = this.value.replace(/\D/g, "");

        if (value.length > 8) {
            value = value.slice(0, 8);
        }

        if (value.length > 4) {
            value = value.slice(0, 4) + "/" + value.slice(4);
        }

        if (value.length > 2) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }

        this.value = value;
    });

    // Formatação inicial
    if (campoRevisao.value) {
        let [ano, mes, dia] = campoRevisao.value.split("-");
        campoRevisao.value = `${dia}/${mes}/${ano}`;
    }
});