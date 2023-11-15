const URL = "http://localhost:3005/patrimonios/"
var listaPatrimonios = []



function calcularEstadoRevisao(dataRevisao) {
    const hoje = new Date();
    const dataRevisaoObj = new Date(dataRevisao);
    const diferencaDias = Math.floor((dataRevisaoObj - hoje) / (1000 * 60 * 60 * 24));

    if (diferencaDias > 30) {
        return '<span class="status completed">Normal</span>';
    } else if (diferencaDias > 1) {
        return '<span class="status process">Alerta</span>';
    } else {
        return '<div><span class="status pending">Revisar</span></div>';
    }
}

function setarImagemPatrimonio(tipo) {
    let imagem = '';
    tipo = tipo.toLowerCase();
    if (tipo === 'trator') {
        imagem = '<img class="icone tipo" src="img/Icone trator.png" alt="trator">';
    } else if (tipo === 'moto') {
        imagem = '<img class="icone tipo" src="img/Icone moto.png" alt="moto">';
    } else if (tipo === 'carro') {
        imagem = '<img class="icone tipo" src="img/Icone carro.png" alt="carro">';
    } else if (tipo === 'implemento') {
        imagem = '<img class="icone tipo" src="img/Icone implemento.png" alt="implemento">';
    } else if (tipo === 'caminhao') {
        imagem = '<img class="icone tipo" src="img/Icone caminhao.png" alt="caminhão">';
    } else {
        imagem = '<img class="icone tipo" src="img/Icone outro.png" alt="outro">'
    }

    return imagem;
}

function criarLinhaPatrimonios(patrimonio){
    const estadoRevisao = calcularEstadoRevisao(patrimonio.revisao);
    const imagemTipo = setarImagemPatrimonio(patrimonio.tipo);
    const dataFormatada = new Date(patrimonio.revisao).toISOString().slice(0, 10);
    return  `<tr>
            <td>
                ${imagemTipo}
                <p>${patrimonio.descricao}</p>
            </td>
            <td>${patrimonio.valor}</td>
            <td>${patrimonio.tipo}</td>
            <td>${estadoRevisao}</td>
            <td><img class="icone lapis" data-id="${patrimonio.id}" data-estado="${patrimonio.estado}" data-revisao="${dataFormatada}" src="img/lapis.png" alt="icone lápis"></td>
            <td><img class="icone lixeira" data-id="${patrimonio.id}" src="img/lixeira.png" alt="icone lixeira"></td>
        </tr>`;
}

function adicionarPatrimonios(){
    var tabelaPatrimonios = document.getElementById("listaPatrimonios")
    // tabelaPatrimonios.innerHTML += iniciarTabela()
    for (let i = 0; i < listaPatrimonios.length; i++) {
        const patrimonio = listaPatrimonios[i];
        tabelaPatrimonios.innerHTML += criarLinhaPatrimonios(patrimonio)
    }
    cadastrarEventosLapis()
    cadastrarEventosLixeira()
}

fetch(URL).then(function(response) {
    return response.json();
}).then(function(data) {
    listaPatrimonios = data
    adicionarPatrimonios()
}).catch(function() {
    console.log("Houve algum problema!");
});

var botaoAdicionar = document.getElementById("botaoAdicionarPatrimonio")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionarPatrimonio.html';
})

function atualizarTela(id){
    listaPatrimonios = listaPatrimonios.filter( p => p.id != id)
    var tabelaPatrimonios = document.getElementById("listaPatrimonios")
    tabelaPatrimonios.innerHTML = ""
    adicionarPatrimonios()
}

function realizarExclusao(id){
    var header = {
        method:"DELETE"
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.text()
    }).then(function(data){
        atualizarTela(id)
    }).catch(function(error){
        alert("Erro ao deletar patrimônio")
    })
}

function cadastrarEventosLixeira(){
    var lixeiras = document.getElementsByClassName("lixeira")
    for (let i = 0; i < lixeiras.length; i++) {
        const l = lixeiras[i];
        l.addEventListener("click",function(event){
            var id = this.dataset.id
            realizarExclusao(id)
        })
    }
}

function editarURL(url, id, descricao, valor, tipo, revisao, estado){
    return url+'?id='+id+'&descricao='+descricao+'&valor='+valor+'&tipo='+tipo+'&revisao='+revisao+'&estado='+estado
}

function cadastrarEventosLapis(){
    var lapis = document.getElementsByClassName("lapis")
    for (let i = 0; i < lapis.length; i++) {
        const l = lapis[i];
        l.addEventListener("click",function(event){
            var id = this.dataset.id
            var descricao = event.target.parentElement.parentElement.children[0].innerText
            var valor = event.target.parentElement.parentElement.children[1].innerText
            var tipo = event.target.parentElement.parentElement.children[2].innerText
            var revisao = this.dataset.revisao
            var estado = this.dataset.estado
            window.location.href = editarURL("adicionarPatrimonio.html",id,descricao,valor,tipo,revisao,estado);
        })
    }
}






