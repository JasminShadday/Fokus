//selecionando por tag
const html = document.querySelector('html');

//selecionando por class . 
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');

//criando um elemento audio
const musica = new Audio('/sons/luna-rise-part-one.mp3'); 
const musicaTempoFinalizado = new Audio('/sons/beep.mp3');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaPlay = new Audio('/sons/play.wav');

//selecionando por id
const tempoNaTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const imagemComecarPausarBt = document.querySelector('.app__card-primary-butto-icon')

//selecinando por id e tag <span>
const comecarPausarBt = document.querySelector('#start-pause span');

//crônometro 
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//musica de 6 minutos virar um loop
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

//EVENTO DE CLICK, o callback vai ser chamando a função 
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});

//função que passa o parametro e substitui:
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });
    //o valor do atributo da tag data-contexto e src
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    //troca - caso - pare - padrão 
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong"> Faça uma pausa curta. </strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
             `
            break;
        default:
            break;
    };
};

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0 ){
        musicaTempoFinalizado.play()
        alert('tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        musicaPause.play();
        imagemComecarPausarBt.setAttribute('src', `/imagens/play_arrow.png`)
        zerar()
        return
    }
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    comecarPausarBt.textContent = "Pausar" //trocando a palavra começar para pausar
    imagemComecarPausarBt.setAttribute('src', `/imagens/pause.png`)
}

//para o cronometro e reinicia
function zerar(){
    clearInterval(intervaloId)// pausa o temporizador 
    comecarPausarBt.textContent = "Começar" // trocando a palavra
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}` // inserindo o cronometro no html
}

mostrarTempo()