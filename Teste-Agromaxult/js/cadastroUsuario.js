const URL_AUTH = "https://localhost:3001/auth/register/"

var botaoCadastrar = document.getElementById("botaoFoda")

botaoCadastrar.addEventListener("click",()=>{
    var email = document.getElementById("campoEmail2").value
    var senha = document.getElementById("campoSenha2").value
    enviaPOST(email, senha)
})

function enviaPOST(email, password){
    var header = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            email, password
        })
    }
    fetch(URL_AUTH,header)
    .then(function(response){
        if (!response.ok && response.status === 422) {
            //Deu algum erro Ish
            return response.json();            
        }else if(response.ok && response.status == 201 ) {
            //Cadastrado com sucesso
            window.location.href = "index.html"
        }
        throw new Error('Erro na requisição');
    }).then(function(data){
        console.log(data);
    }).catch(function(error){
        alert(error)
    })
}