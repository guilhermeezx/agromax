const URLnodeAnimais = "http://localhost:3005/animais/";

var idAnimal = null;
lerParametrosAnimais();

function lerParametrosAnimais() {
    const urlParams = new URLSearchParams(window.location.search);
    idAnimal = urlParams.get("id");
    var nome = urlParams.get("nome");
    var especie = urlParams.get("especie");
    var raca = urlParams.get("raca");
    var nascimento = urlParams.get("nascimento");
    var sexo = urlParams.get("sexo");

    document.getElementById("campoNome").value = nome;
    document.getElementById("campoEspecie").value = especie;
    document.getElementById("campoRaca").value = raca;
    document.getElementById("campoNascimento").value = nascimento;
    document.getElementById("campoSexo").value = sexo;
}

var botaoAdicionarAnimais = document.getElementById("botaoAdicionarAnimais");
botaoAdicionarAnimais.addEventListener("click", function () {
    var nomeAnimal = document.getElementById("campoNome").value;
    var especieAnimal = document.getElementById("campoEspecie").value;
    var racaAnimal = document.getElementById("campoRaca").value;
    var nascimentoAnimal = document.getElementById("campoNascimento").value;
    var sexoAnimal = document.getElementById("campoSexo").value;

    // Formata a data para o formato aaaa-mm-dd
    var partesData = nascimentoAnimal.split('/');
    var dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

    if (idAnimal != null) {
        enviaPUT(idAnimal, nomeAnimal, especieAnimal, racaAnimal, dataFormatada, sexoAnimal);

    } else {
        enviaPOST(nomeAnimal, especieAnimal, racaAnimal, dataFormatada, sexoAnimal);
    }
});

function enviaPUT(idAnimal, nomeAnimal, especieAnimal, racaAnimal, dataFormatada, sexoAnimal) {
    var header = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nomeAnimal,
            especie: especieAnimal,
            raca: racaAnimal,
            nascimento: dataFormatada,
            sexo: sexoAnimal
        })
    };
    fetch(URLnodeAnimais + idAnimal, header)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            window.location.href = 'animais.html';
        }).catch(function () {
            var mensagemErro = document.getElementById("erroAnimais");
            mensagemErro.style.display = "visible";
        });
}

function enviaPOST(nomeAnimal, especieAnimal, racaAnimal, dataFormatada, sexoAnimal) {
    var header = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nomeAnimal,
            especie: especieAnimal,
            raca: racaAnimal,
            nascimento: dataFormatada,
            sexo: sexoAnimal
        })
    };
    fetch(URLnodeAnimais, header)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            window.location.href = 'animais.html';
        }).catch(function () {
            var mensagemErro = document.getElementById("erroAnimais");
            mensagemErro.style.display = "visible";
        });
};

const nascimentoInput = document.getElementById('campoNascimento');
const nascimentoLabel = nascimentoInput.nextElementSibling;

nascimentoInput.addEventListener('input', () => {
    if (nascimentoInput.value.trim() !== '') {
        nascimentoLabel.classList.add('input-filled');
    } else {
        nascimentoLabel.classList.remove('input-filled');
    }
});

nascimentoInput.addEventListener('focus', () => {
    if (nascimentoInput.value === '') {
        nascimentoInput.type = 'text';
        nascimentoInput.placeholder = 'dd/mm/aaaa';
        nascimentoInput.value = ''; // Limpar o valor ao focar
    }
});

nascimentoInput.addEventListener('blur', () => {
    if (nascimentoInput.value === '') {
        nascimentoInput.type = 'text';
        nascimentoLabel.classList.remove('input-filled');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const campoNascimento = document.getElementById("campoNascimento");

    campoNascimento.addEventListener("input", function () {
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
    if (campoNascimento.value) {
        let [ano, mes, dia] = campoNascimento.value.split("-");
        campoNascimento.value = `${dia}/${mes}/${ano}`;
    }
});
