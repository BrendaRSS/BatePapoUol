
let nomeEscolhido= prompt('Digite seu nick name:');
function escolherNome(){
    while(nomeEscolhido.length<3){
        nomeEscolhido= prompt('Digite seu nick name:');
    }
    
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name: nomeEscolhido});
    promise.then(deucerto);
    promise.catch(mostrarErro);

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
//buscarMessagens();

let ultimaMSG='';
function mensagensChegaram(resposta){
    listaDeMensagens= [];
    listaDeMensagens=resposta.data;
    //console.log(listaDeMensagens);
    ulChat.innerHTML ='';
    //console.log(ulChat.innerHTML);
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
            if(listaDeMensagens[i].to === nomeEscolhido){
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
        //console.log(ulChat.innerHTML.length);
        ultimaMSG = ulChat.lastElementChild;
        console.log(ultimaMSG);
        ativarRolagem();
}

function mostrarErro(erro){
    console.log(erro.response);
}

//let nomeDoUsuario = nomeEscolhido;
//let nomeDoDestinatario= "Todos";
let mensagemDigitada= document.querySelector('input');
//let statusMessage= "message";

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

