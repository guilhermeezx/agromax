const URL = "http://localhost:3005/financeiro/";
var listaFinancas = [];

function setarIconeTipo(tipo) {
  if (tipo === "entrada") {
    return `<i class="bx bxs-chevron-up-circle"></i>`;
  } else {
    return `<i class="bx bxs-chevron-down-circle"></i>`;
  }
}

function criarLinhaFinancas(financa) {
  const iconeTipo = setarIconeTipo(financa.tipo);
  return `<tr>
    <td>${financa.descricao}</td>
    <td>${financa.valor}</td>
    <td>${iconeTipo}</td>
    <td>${financa.categoria}</td>
    <td><img class="icone lapis" data-id="${financa.id}" data-tipo="${financa.tipo}" src="img/lapis.png" alt="icone lápis"></td>
    <td><img class="icone lixeira" data-id="${financa.id}" src="img/lixeira.png" alt="icone lixeira"></td>
  </tr>`;
}

function adicionarFinancas() {
  var tabelaFinancas = document.getElementById("listaFinancas");
  for (let i = 0; i < listaFinancas.length; i++) {
    const financa = listaFinancas[i];
    tabelaFinancas.innerHTML += criarLinhaFinancas(financa);
  }
  cadastrarEventosLapis();
  cadastrarEventosLixeira();
  calcularBalanço();
  atualizarGrafico();
}

function atualizarGrafico() {
  const valoresEntrada = [];
  const valoresSaida = [];
  const categorias = {};

  listaFinancas.forEach(function (financa) {
    if (financa.categoria) {
      categorias[financa.categoria] = true;
    }
  });

  const categoriasDistintas = Object.keys(categorias);

  listaFinancas.forEach(function (financa) {
    if (financa.tipo === "entrada") {
      valoresEntrada.push(parseFloat(financa.valor));
    } else if (financa.tipo === "saida") {
      valoresSaida.push(parseFloat(financa.valor));
    }
  });

  const xValues = valoresEntrada.map((_, index) => "Transação " + (index + 1));

  const chartData = {
    labels: xValues,
    datasets: [
      {
        label: "Receitas",
        data: valoresEntrada,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Despesas",
        data: valoresSaida,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 20,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Transações",
          },
          max: 100,
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Valores",
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuart",
      },
      responsive: true,
      maintainAspectRatio: false,
      hover: {
        mode: "nearest",
        intersect: true,
      },
    },
  });

  // Criar gráfico de pizza
  const valoresPizza = [valoresEntrada.reduce((a, b) => a + b, 0), valoresSaida.reduce((a, b) => a + b, 0)];
  const coresPizza = ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"];
  const labelsPizza = ["Receitas", "Despesas"];

  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: labelsPizza,
      datasets: [
        {
          data: valoresPizza,
          backgroundColor: coresPizza,
          borderWidth: 2,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue;
              });
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = ((currentValue / total) * 100).toFixed(2) + "%";
              return `${data.labels[tooltipItem.index]}: ${currentValue} (${percentage})`;
            },
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Calcular porcentagens
  const totalReceitas = valoresEntrada.reduce((a, b) => a + b, 0);
  const totalDespesas = valoresSaida.reduce((a, b) => a + b, 0);
  const totalGeral = totalReceitas + totalDespesas;
  const porcentagemReceitas = ((totalReceitas / totalGeral) * 100).toFixed(2);
  const porcentagemDespesas = ((totalDespesas / totalGeral) * 100).toFixed(2);

  // Atualizar resumo
  document.getElementById("porcentagemReceitas").textContent = porcentagemReceitas + "%";
  document.getElementById("porcentagemDespesas").textContent = porcentagemDespesas + "%";

  // Calcular porcentagens para categorias de receitas
  const categoriasReceitas = {};
  valoresEntrada.forEach(function (valor, index) {
    const financa = listaFinancas[index];
    if (financa.categoria && financa.tipo === "entrada") {
      if (!categoriasReceitas[financa.categoria]) {
        categoriasReceitas[financa.categoria] = 0;
      }
      categoriasReceitas[financa.categoria] += valor;
    }
  });

  const porcentagensReceitas = Object.keys(categoriasReceitas).map((categoria) => {
    return {
      categoria,
      porcentagem: ((categoriasReceitas[categoria] / totalReceitas) * 100).toFixed(2),
    };
  });

  // Calcular porcentagens para categorias de despesas
  const categoriasDespesas = {};
  valoresSaida.forEach(function (valor, index) {
    const financa = listaFinancas[index];
    if (financa.categoria && financa.tipo === "saida") {
      if (!categoriasDespesas[financa.categoria]) {
        categoriasDespesas[financa.categoria] = 0;
      }
      categoriasDespesas[financa.categoria] += valor;
    }
  });

  const porcentagensDespesas = Object.keys(categoriasDespesas).map((categoria) => {
    return {
      categoria,
      porcentagem: ((categoriasDespesas[categoria] / totalDespesas) * 100).toFixed(2),
    };
  });

  // Criar gráficos de porcentagem de categorias de receitas
  const categoriasReceitasData = {
    labels: porcentagensReceitas.map((item) => item.categoria),
    datasets: [
      {
        label: "Porcentagem Receitas",
        data: porcentagensReceitas.map((item) => item.porcentagem),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const categoriasReceitasCtx = document.getElementById("categoriasReceitas").getContext("2d");
  new Chart(categoriasReceitasCtx, {
    type: "horizontalBar",
    data: categoriasReceitasData,
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Porcentagem",
          },
          max: 100,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  // Criar gráficos de porcentagem de categorias de despesas
  const categoriasDespesasData = {
    labels: porcentagensDespesas.map((item) => item.categoria),
    datasets: [
      {
        label: "Porcentagem Despesas",
        data: porcentagensDespesas.map((item) => item.porcentagem),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const categoriasDespesasCtx = document.getElementById("categoriasDespesas").getContext("2d");
  new Chart(categoriasDespesasCtx, {
    type: "horizontalBar",
    data: categoriasDespesasData,
    options: {
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Porcentagem",
          },
          max: 100,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    listaFinancas = data;
    adicionarFinancas();
  })
  .catch(function () {
    console.log("Houve algum problema!");
  });

function atualizarTela(id) {
  listaFinancas = listaFinancas.filter((p) => p.id != id);
  var tabelaFinancas = document.getElementById("listaFinancas");
  tabelaFinancas.innerHTML = "";
  adicionarFinancas();
}

function realizarExclusao(id) {
  var header = {
    method: "DELETE",
  };
  fetch(URL + id, header)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      atualizarTela(id);
    })
    .catch(function (error) {
      alert("Erro ao deletar finança");
    });
}

function cadastrarEventosLixeira() {
  var lixeiras = document.getElementsByClassName("lixeira");
  for (let i = 0; i < lixeiras.length; i++) {
    const l = lixeiras[i];
    l.addEventListener("click", function (event) {
      var id = this.dataset.id;
      realizarExclusao(id);
    });
  }
}

function editarURL(url, id, descricao, valor, tipo, categoria) {
  return url + '?id=' + id + '&descricao=' + descricao + '&valor=' + valor + '&tipo=' + tipo + '&categoria=' + categoria;
}

function cadastrarEventosLapis() {
  var lapis = document.getElementsByClassName("lapis");
  for (let i = 0; i < lapis.length; i++) {
    const l = lapis[i];
    l.addEventListener("click", function (event) {
      var id = this.dataset.id;
      var descricao = event.target.parentElement.parentElement.children[0].innerText;
      var valor = event.target.parentElement.parentElement.children[1].innerText;
      var tipo = this.dataset.tipo;
      var categoria = event.target.parentElement.parentElement.children[3].innerText;
      window.location.href = editarURL("financeiro.html", id, descricao, valor, tipo, categoria);
    });
  }
}

function calcularBalanço() {
  let totalReceitas = 0;
  let totalDespesas = 0;

  listaFinancas.forEach(function (financa) {
    if (financa.tipo === "entrada") {
      totalReceitas += parseFloat(financa.valor);
    } else if (financa.tipo === "saida") {
      totalDespesas += parseFloat(financa.valor);
    }
  });

  const balancoTotal = totalReceitas - totalDespesas;

  // Atualize os elementos HTML para exibir os valores calculados
  const incomesElement = document.querySelector(".incomes");
  const expensesElement = document.querySelector(".expenses");
  const totalElement = document.querySelector(".total");

  incomesElement.innerText = `${totalReceitas.toFixed(2)}`;
  expensesElement.innerText = `${totalDespesas.toFixed(2)}`;
  totalElement.innerText = `${balancoTotal.toFixed(2)}`;
  
}

