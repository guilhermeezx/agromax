const apiKey = "01603d1462868b33edf6324fc2fdefd8";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const bg = document.querySelector(".bg");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

var temperatura = 0;
var umidade = 0;
var vento = 0;


// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  temperatura = parseInt(data.main.temp);
  umidade = parseInt(data.main.humidity);
  vento = parseInt(data.wind.speed);
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  bg.style.backgroundImage = `linear-gradient(274.39deg, rgba(88, 161, 24, 0.664) 0.33%, rgba(118, 175, 32, 0.856) 99.45%), url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");

  showLines()
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});



// const linhas = document.querySelectorAll("tr");
// function exibirLinhas(){
//   for (let i = 0; i < linhas.length; i++) {
//     const linha = linhas[i];
//     if (tempElement.value > 12) {
//       safe.classList.remove("hide")
//     } 
//   }

// }




function criarLinhaTempoCompleted(categoria, imagen, status, riscos, precausoes){
  return `
  <tr id="`+categoria+`">
  <td class="imgCol">
    <img src="img/`+imagen+`.png">
    <p>`+categoria+`</p>
  </td>
  <td><span class="status completed">`+status+`</span></td>
  <td class="colunaText">`+riscos+`</td>
  <td class="colunaText">`+precausoes+`</td>
</tr>
  `
}

function criarLinhaTempoProcess(categoria, imagen, status, riscos, precausoes){
  return `
  <tr id="`+categoria+`">
  <td class="imgCol">
    <img src="img/`+imagen+`.png">
    <p>`+categoria+`</p>
  </td>
  <td><span class="status process">`+status+`</span></td>
  <td class="colunaText">`+riscos+`</td>
  <td class="colunaText">`+precausoes+`</td>
</tr>
  `
}

function criarLinhaTempoPending(categoria, imagen, status, riscos, precausoes){
  return `
  <tr id="`+categoria+`">
  <td class="imgCol">
    <img src="img/`+imagen+`.png">
    <p>`+categoria+`</p>
  </td>
  <td><span class="status pending">`+status+`</span></td>
  <td class="colunaText">`+riscos+`</td>
  <td class="colunaText">`+precausoes+`</td>
</tr>
  `
}



//Weather safe
function criarTodasLinhasTempoBom(){
  var html = ""
  html += criarLinhaTempoCompleted("Animal","Animal","Seguro","Sem nenhum risco corrente","Lembre-se de alimentar corretamente e fornecer água limpa aos animais")
  return html
}

//Weather good
function criarTodasLinhasTemperaBom(){
  var html = ""
  html += criarLinhaTempoCompleted("Animal","Animal","Seguro","Temperatura boa","Lembre-se de alimentar corretamente e fornecer água limpa aos animais")
  return html
}

//Weather low
function criarTodasLinhasTempoBaixa(){
  var html = ""
  html += criarLinhaTempoProcess("Animal","Animal", "Alerta","Temperatura baixa","Manter os animais em ambientes internos aquecidos")
  return html
}

//Weather high
function criarTodasLinhasTempoAlta(){
  var html = ""
  html += criarLinhaTempoProcess("Animal","Animal", "Alerta","Temperatura alta","Manter os animais em ambientes frescos e ventilados")
  return html
}

//Umidity high
function criarTodasLinhasUmidAlta(){
  var html = ""
  html += criarLinhaTempoProcess("Animal","Animal", "Alerta","Umidade alta","Fornecer áreas cobertas, secas e protegidas da chuva")
  return html
}

//Umidity very-high
function criarTodasLinhasUmidMuitoAlta(){
  var html = ""
  html += criarLinhaTempoPending("Animal","Animal", "Risco","Umidade muito alta","Fornecer áreas cobertas, secas e protegidas da chuva")
  return html
}

// Temperature extremely high
function criarTodasLinhasTempoExtremamenteAlta() {
  var html = "";
  html += criarLinhaTempoPending("Animal", "Animal", "Risco", "Temperatura extremamente alta", "Manter os animais hidratados e em locais sombreados");
  return html;
}

// Strong wind
function criarTodasLinhasVentoForte() {
  var html = "";
  html += criarLinhaTempoProcess("Animal", "Animal", "Alerta", "Vento forte", "Proteger os animais de objetos voadores e fornecer abrigo contra o vento");
  return html;
}

// Very strong wind
function criarTodasLinhasVentoMuitoForte() {
  var html = "";
  html += criarLinhaTempoProcess("Animal", "Animal", "Risco", "Vento muito forte", "Manter os animais em locais seguros e resistentes ao vento");
  return html;
}




const safeContainer = document.querySelector("#tabelaLinhasTempo");

const showLines = async (city) => {
  let html = ''; // Variável para armazenar as strings das linhas de tabela

  // Condição: Temperatura entre 18 e 25, umidade entre 40 e 60, vento menor que 30
  if (temperatura > 18 && temperatura < 25 && umidade > 40 && umidade < 60 && vento < 30) {
    html += criarTodasLinhasTempoBom(); // Adiciona as linhas de clima bom
  }

  // Condição: Temperatura entre 18 e 25
  if (temperatura > 18 && temperatura < 25) {
    html += criarTodasLinhasTemperaBom(); // Adiciona as linhas de temperatura boa
  }

  // Condição: Temperatura abaixo de 18 e acima de 10
  if (temperatura < 18 && temperatura > 10) {
    html += criarTodasLinhasTempoBaixa(); // Adiciona as linhas de temperatura baixa
  }

  // Condição: Temperatura entre 25 e 30
  if (temperatura > 25 && temperatura < 30) {
    html += criarTodasLinhasTempoAlta(); // Adiciona as linhas de temperatura alta
  }
  
  // Condição: Umidade entre 60 e 80
  if (umidade > 60 && umidade < 80) {
    html += criarTodasLinhasUmidAlta(); // Adiciona as linhas de umidade alta
  }

  // Condição: Umidade entre 80 e 100
  if (umidade > 80 && umidade < 101) {
    html += criarTodasLinhasUmidMuitoAlta(); // Adiciona as linhas de umidade alta
  }

  // Condição: Temperatura extremamente alta
if (temperatura > 35) {
  html += criarTodasLinhasTempoExtremamenteAlta(); // Adiciona as linhas de temperatura extremamente alta
}

// Condição: Vento forte
if (vento > 30 && vento <= 50) {
  html += criarTodasLinhasVentoForte(); // Adiciona as linhas de vento forte
}

// Condição: Vento muito forte
if (vento > 50) {
  html += criarTodasLinhasVentoMuitoForte(); // Adiciona as linhas de vento muito forte
}

  safeContainer.innerHTML = html; // Atualiza o conteúdo do container com as linhas de tabela concatenadas
};