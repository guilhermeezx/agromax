const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

//POSTITS
const content = document.querySelector(".content");
const btnNew = document.querySelector(".addNote-content");

let items_db = localStorage.getItem("items_db")
  ? JSON.parse(localStorage.getItem("items_db"))
  : [];

const colors = [
  "#58A118",
  "#91D62B",
  "#008E9B",
  "#ABA9FF",
  "#FF8066",
  "#BA3CAF",
];
const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

function loadItems() {
  content.innerHTML = "";
  verifyNulls();

  items_db.forEach((item, i) => {
    addHTML(item, i);
  });

  addEvents();
}

btnNew.onclick = () => {
  addHTML();

  addEvents();
};

function addHTML(item) {
  const div = document.createElement("div");

  div.innerHTML = `<div class="item" style="background-color: ${
    item?.color || randomColor()
  }">
    <span class="remove">X</span>
    <textarea>${item?.text || ""}</textarea>
  </div>`;

  content.appendChild(div);
}

function addEvents() {
  const notes = document.querySelectorAll(".item textarea");
  const remove = document.querySelectorAll(".item .remove");

  notes.forEach((item, i) => {
    item.oninput = () => {
      items_db[i] = {
        text: item.value,
        color: items_db[i]?.color || item.parentElement.style.backgroundColor,
      };

      localStorage.setItem("items_db", JSON.stringify(items_db));
    };
  });

  remove.forEach((item, i) => {
    item.onclick = () => {
      content.children[i].remove();
      if (items_db[i]) {
        items_db.splice(i, 1);
        localStorage.setItem("items_db", JSON.stringify(items_db));
      }
      addEvents();
    };
  });
}

function verifyNulls() {
  items_db = items_db.filter((item) => item);
  localStorage.setItem("items_db", JSON.stringify(items_db));
}

loadItems();




//FUNCTIONS BELOW ----------------------------------

const URLAnimais = "http://localhost:3005/animais/";
var listaAnimais = [];

function setarImagemAnimais(especie) {
    let imagem = '';
    especie = especie.toLowerCase();
    if (especie === 'vaca') {
      imagem = '<img class="icone tipo" src="img/Icone vaca.png" alt="vaca">';
  } else if (especie === 'cavalo') {
      imagem = '<img class="icone tipo" src="img/Icone cavalo.png" alt="cavalo">';
  } else if (especie === 'galinha') {
      imagem = '<img class="icone tipo" src="img/Icone galinha.png" alt="galinha">';
  } else if (especie === 'porco') {
      imagem = '<img class="icone tipo" src="img/Icone porco.png" alt="porco">';
  } else if (especie === 'cão') {
      imagem = '<img class="icone tipo" src="img/Icone cachorro.png" alt="cão">';
  } else if (especie === 'gato') {
      imagem = '<img class="icone tipo" src="img/Icone gato.png" alt="gato">';
  } else {
      imagem = '<img class="icone tipo" src="img/Icone outro.png" alt="outro">';
  }  
    return imagem;
}

function criarLinhaAnimais(animal) {
    const imagemEspecie = setarImagemAnimais(animal.especie);
    const dataFormatada = new Date(animal.nascimento).toISOString().slice(0, 10);
    return `<tr>
            <td>
                ${imagemEspecie}
                <p>${animal.nome}</p>
            </td>
            <td>${animal.especie}</td>
            <td>${animal.raca}</td>
            <td>${dataFormatada}</td>
            <td>${animal.sexo}</td>
            <td><img class="icone lapis" data-id="${animal.id}" src="img/lapis.png" alt="icone lápis"></td>
            <td><img class="icone lixeira" data-id="${animal.id}" src="img/lixeira.png" alt="icone lixeira"></td>
        </tr>`;
}

function adicionarAnimais() {
    var tabelaAnimais = document.getElementById("listaAnimais");
    for (let i = 0; i < listaAnimais.length; i++) {
        const animal = listaAnimais[i];
        tabelaAnimais.innerHTML += criarLinhaAnimais(animal);
    }
    cadastrarEventosLapisAnimais();
    cadastrarEventosLixeiraAnimais();
}

fetch(URLAnimais).then(function(response) {
    return response.json();
}).then(function(data) {
    listaAnimais = data;
    adicionarAnimais();
}).catch(function() {
    console.log("Houve algum problema!");
});

var botaoAdicionarAnimais = document.getElementById("botaoAdicionarAnimais");
botaoAdicionarAnimais.addEventListener("click", function() {
    window.location.href = 'adicionarAnimais.html';
});

function atualizarTelaAnimais(id) {
    listaAnimais = listaAnimais.filter(a => a.id != id);
    var tabelaAnimais = document.getElementById("listaAnimais");
    tabelaAnimais.innerHTML = "";
    adicionarAnimais();
}

function realizarExclusaoAnimais(id) {
    var header = {
        method: "DELETE"
    }
    fetch(URLAnimais + id, header)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            atualizarTelaAnimais(id);
        }).catch(function(error) {
            alert("Erro ao deletar animal");
        });
}

function editarURLAnimais(url, id, nome, especie, raca, nascimento, sexo) {
    return url + '?id=' + id + '&nome=' + nome + '&especie=' + especie + '&raca=' + raca + '&nascimento=' + nascimento + '&sexo=' + sexo;
}

function cadastrarEventosLapisAnimais() {
    var lapisAnimais = document.getElementsByClassName("icone lapis");
    
    for (let i = 0; i < lapisAnimais.length; i++) {
        const l = lapisAnimais[i];
        l.addEventListener("click", function(event) {
            var id = this.dataset.id;
            var nome = event.target.parentElement.parentElement.children[0].innerText;
            var especie = event.target.parentElement.parentElement.children[1].innerText;
            var raca = event.target.parentElement.parentElement.children[2].innerText;
            var nascimento = event.target.parentElement.parentElement.children[3].innerText;
            var sexo = event.target.parentElement.parentElement.children[4].innerText;;
            window.location.href = editarURLAnimais("adicionarAnimais.html", id, nome, especie, raca, nascimento, sexo);
        });
    }
}

function cadastrarEventosLixeiraAnimais() {
    var lixeiraAnimais = document.getElementsByClassName("icone lixeira");
    for (let i = 0; i < lixeiraAnimais.length; i++) {
        const l = lixeiraAnimais[i];
        l.addEventListener("click", function(event) {
            var id = this.dataset.id;
            realizarExclusaoAnimais(id);
        });
    }
}


















