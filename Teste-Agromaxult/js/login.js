const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evite o envio padrão do formulário

    const email = document.getElementById("campoEmail").value;
    const senha = document.getElementById("campoSenha").value;

    // Crie um objeto JavaScript com o email e a senha
    const usuario = {
        email: email,
        senha: senha
    };

    // Envie uma solicitação POST para a URL completa
    const URL = "http://localhost:3005/login/";
    
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login bem-sucedido") {
            alert("Login bem-sucedido!");
            window.location.href = "index.html";
        } else {
            alert("Email ou senha inválidos.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro durante o login.");
    });
});