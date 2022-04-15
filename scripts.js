let mensagens = [];
let nomes = {
    name: null
}

nomeDoUser ();
acessarApi ();


function nomeDoUser () {
    nomes.name = prompt("Qual seu nome?")
    const promise = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', nomes)
    promise.then(tratarSucesso)
    promise.catch(tratarErro)
}

function tratarSucesso (resposta) {
    if (resposta.status==200) {
        alert ("Bem vindo " +nomes.name)
        setInterval(function() {
            axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomes)
        }, 5000)
        

    }

}

function tratarErro (erro) {
    if (erro.response.status==400) {
        nomes.name=prompt("O nome desejado ja está em uso, por favor utilize outro.")
        const promise = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants ', nomes)
        promise.then(tratarSucesso)
        promise.catch(tratarErro)
    }

}


function acessarApi () {
    const promise=axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    setInterval (function () {
        promise
    }, 3000);
    promise.then(carregarDados);

}

function carregarDados (response) {
    mensagens=response.data;
    adcMensagens ();
    
}

function adcMensagens () {
    for (let i=0; i<mensagens.length; i++) {
        if (mensagens[i].type=="message") {
            document.querySelector(".mensagens").innerHTML+= `<li class="caixademensagem message">
            ${mensagens[i].time}  <strong>${mensagens[i].from}</strong>  para  <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}
            </li>`
        } else if (mensagens[i].type=="private_message" && mensagens[i].from==nomes.name){
            document.querySelector(".mensagens").innerHTML+= `<li class="caixademensagem privatemessage">
            ${mensagens[i].time}  <strong>${mensagens[i].from}</strong>  para  <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}
            </li>`
        } else if (mensagens[i].type=="status") {
            document.querySelector(".mensagens").innerHTML+= `<li class="caixademensagem status">
            ${mensagens[i].time} <strong>${mensagens[i].from}</strong> ${mensagens[i].text}
            </li>`
        }
    }
}






function enviarMensagem () {
    const mensagem= {
        from: nomes.name,
        to: 'todos',
        text: document.querySelector(".mensagem").value,
        type: 'message'
    }
    let promisse=axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem)
    promisse.then(function(){
        alert ("Mensagem enviada")
    })

}