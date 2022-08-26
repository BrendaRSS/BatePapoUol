
let nomeEscolhido= prompt('Digite seu nick name:');
while(nomeEscolhido.length<3){
    nomeEscolhido= prompt('Digite seu nick name:');
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

function mensagensChegaram(resposta){
    listaDeMensagens= [];
    listaDeMensagens=resposta.data;
    console.log(listaDeMensagens);
    ulChat.innerHTML ='';
    console.log(ulChat.innerHTML);
    for(i=0; i<listaDeMensagens.length; i++){
        if (listaDeMensagens[i].type === "status"){
            ulChat.innerHTML +=  
                `<li>
                    <div class="message entrouOuSaiu">
                        <span ><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from} </b> ${listaDeMensagens[i].text}</span>
                    </div>
                </li>`;
        }

        if (listaDeMensagens[i].type === "private_message"){
            ulChat.innerHTML +=  
                ` <li>
                    <div class="message reservada">
                        <span><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from}  </b> reservadamente para <b>${listaDeMensagens[i].to}:</b> ${listaDeMensagens[i].text}</span>
                    </div>
                </li>`;
        }
        if (listaDeMensagens[i].type === "message"){
            ulChat.innerHTML +=  
                `<li>    
                    <div class="message">
                        <p><strong class="hora">(${listaDeMensagens[i].time})</strong> <b> ${listaDeMensagens[i].from} </b> para <b>${listaDeMensagens[i].to}:</b> ${listaDeMensagens[i].text}</p>
                    </div>
                </li>`;
        }
    }
        console.log(ulChat.innerHTML.length);

}

function mostrarErro(erro){
    console.log(erro.response);
}


let nomeDoUsuario = '';
let nomeDoDestinatario= '';
let mensagemDigitada= document.querySelector('input');
let statusMessage= '';

function adicionarMensagem(){
    let novaMensagem = {
        from: "nome do usuário",
        to: "nome do destinatário (Todos se não for um específico)",
        text: "mensagem digitada",
        type: "message" // ou "private_message" para o bônus
    }
    listaDeMensagens.push(
    {
        from: "nome do usuário",
        to: "nome do destinatário (Todos se não for um específico)",
        text: "mensagem digitada",
        type: "message" // ou "private_message" para o bônus
    }
    )
}