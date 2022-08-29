
let nomeEscolhido= prompt('Digite seu nick name:');
function escolherNome(){
    while(nomeEscolhido.length<3){
        nomeEscolhido= prompt('Digite seu nick name:');
    }
    
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nomeEscolhido});
    promise.then(deucerto);
    promise.catch(mostrarErroNome);

}

escolherNome();

function envioIntermitenteDeFunction(){
    let secondPromise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nomeEscolhido});
 }

function deucerto(){
    setInterval(envioIntermitenteDeFunction, 3000);
 }

let ulChat= document.querySelector('.ul-chat');
let sidebar= document.querySelector('.sidebar');

function apareceSidebar() {
    sidebar.classList.remove('none');
}

function sumirSidebar(){
    sidebar.classList.add('none');
}

let listaDeMensagens= [];
function buscarMessagens(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessa.then(mensagensChegaram);
    promessa.catch(mostrarErro);
}

setInterval(buscarMessagens, 3000);


let ultimaMSG='';
function mensagensChegaram(resposta){
    listaDeMensagens= [];
    listaDeMensagens=resposta.data;
    
    ulChat.innerHTML ='';
    
    for(i=0; i<listaDeMensagens.length; i++){
        if (listaDeMensagens[i].type === "status"){
            ulChat.innerHTML +=  
                `<li>
                    <div class="message entrouOuSaiu">
                        <span ><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from} </b> ${listaDeMensagens[i].text}</span>
                    </div>
                </li>`;
        }

        else if (listaDeMensagens[i].type === "private_message"){
            if("private_message" === nomeEscolhido){
                ulChat.innerHTML +=  
                    ` <li>
                        <div class="message reservada">
                            <span><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from}  </b> reservadamente para <b>${listaDeMensagens[i].to}:</b> ${listaDeMensagens[i].text}</span>
                        </div>
                    </li>`;
            }
        }
        else {
            ulChat.innerHTML +=  
                `<li>    
                    <div class="message">
                        <p><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from} </b> para <b>${listaDeMensagens[i].to}:</b> ${listaDeMensagens[i].text}</p>
                    </div>
                </li>`;
        }
    }
        
        ultimaMSG = ulChat.lastElementChild;
        console.log(ultimaMSG);
        ativarRolagem();
}

function mostrarErro(erro){
    if(erro.response.status=== 404){
        alert("O servidor não pode encontrar o recurso solicitado. Esse link não está disponível ou não existe.");
    }
    if(erro.response.status=== 400){
        alert("Campo vazio ou usuário ausente.");
        window.location.reload();
    }
}

function mostrarErroNome(erroNome){
    if(erroNome.response.status=== 409){
        alert("Esse nome já está em uso. Por favor, escolha outro nome.");
        escolherNome();
    }
    if(erroNome.response.status=== 404){
        alert("O servidor não pode encontrar o recurso solicitado. Esse link não está disponível ou não existe.");
    }
    if(erroNome.response.status=== 400){
        alert("Sintaxe inválida. Por favor, verifique o que digitou.");
    }
    if(erroNome.response.status=== 400){
        alert("Campo vazio. Por favor, digite um nome válido.");
        escolherNome();
    }
}


let mensagemDigitada= document.querySelector('input');


function adicionarMensagem(){

  let segundaPromessa= axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {from: nomeEscolhido,
    to: "Todos",
    text: mensagemDigitada.value,
    type: "message",
    });
    segundaPromessa.then(buscarMessagens);
    segundaPromessa.catch(mostrarErro);
}

function ativarRolagem() {
    ultimaMSG.scrollIntoView();
}

