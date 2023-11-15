const URL = "http://localhost:3005/financeiro/";



import { totalReceitas, totalDespesas } from './financeiro.js';

// Chame a função calcularBalanço para calcular o balanço geral


    const balancoTotal = totalReceitas - totalDespesas;

  // Atualize os elementos HTML para exibir os valores calculados
  const incomesElement = document.querySelector(".incomes");
  const expensesElement = document.querySelector(".expenses");
  const totalElement = document.querySelector(".total");

  incomesElement.innerText = `${totalReceitas.toFixed(2)}`;
  expensesElement.innerText = `${totalDespesas.toFixed(2)}`;
  totalElement.innerText = `${balancoTotal.toFixed(2)}`;

