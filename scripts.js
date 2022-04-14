let nomes = {
    name: null
}

function nomeDoUser () {
    nomes.name = prompt("Qual seu nome?")
    let promise = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', nomes)
    promise.then(tratarSucesso)
    promise.catch(tratarErro)
}

function tratarSucesso (resposta) {
    if (resposta.status==200) {
        alert ("Bem vindo " +nomes.name)
    }

}

function tratarErro (erro) {
    if (erro.response.status==400) {
        nomes.name=prompt("O nome desejado ja está em uso, por favor utilize outro.")
        let promise = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', nomes)
        promise.then(tratarSucesso)
        promise.catch(tratarErro)
        
        
        
    }

}

setInterval(function() {
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
}, 3000)


nomeDoUser ();

function enviarMensagem () {


}