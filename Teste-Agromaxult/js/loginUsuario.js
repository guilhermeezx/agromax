const URL_LOGIN = "https://localhost:3001/auth/user/"

var botaoCadastrar = document.getElementById("botaoEntrar")

botaoCadastrar.addEventListener("click", () => {
    var email = document.getElementById("campoEmail").value
    var senha = document.getElementById("campoSenha").value
    enviaPOST2(email, senha)
})

function enviaPOST2(email, password) {
    var header = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email, password,
        })
    }
    let status = 0;
    fetch(URL_LOGIN, header).then(function (response) {
        status = response.status
        return response.json()
    }).then(function (data) {
        if (status == 422) {
            if (data != undefined) {
                //Mostrar erro
                console.log("Parece que um erro ocorreu! Erro "+status);
            }
        } else if (status == 200) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            window.location.href = "index.html"
        }
    }).catch(function (error) {
        console.log(error)
    })
}