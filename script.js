/******** Inicio Funcoes *******/

function InicioJogo(resposta){

    document.querySelector(".principal").innerHTML = "";
    contador = 0;
    if(resposta == "s"){
        numeroCartas = null; 
        while(numeroCartas > 14 || numeroCartas < 4 || numeroCartas%2 !== 0){
            numeroCartas = parseInt(prompt("Escolha um numero par entre 4 e 14"));
        }
        distribuiCartas(numeroCartas);
    }
}

function distribuiCartas(qtdCartas) {
    
    var principal = document.querySelector(".principal");
    listaCartas = [];

    for(let c=0; c<qtdCartas; c++){
        listaCartas.push(c);
        principal.innerHTML += "<div class='carta' data-identifier='card' onclick='comparaCarta(this)'></div>";

        var carta = document.querySelectorAll(".carta");
        carta[c].innerHTML = 
        "<div class='front-face face' data-identifier='front-face'><img src='images/front.png'></div>" +
        "<div class='back-face face' data-identifier='back-face'>Verso</div>";
    }
    formandoPares();
    linkandoCartas();
}

function formandoPares(){  //funcao que forma os pares de cartas
    for(let c=0; c<listaCartas.length; c+=2){
        listaCartas[c+1] = listaCartas[c];
    }
    listaCartas.sort(comparador);
}

function comparador() { // funcao que emabaralha os pares de cartas
    return Math.random() - 0.5; 
}

function linkandoCartas() { // funcao que une a div carta com a array embaralhada
    let cartas = document.querySelectorAll(".carta");
    for(let c=0; c<cartas.length; c++){
        formatando(cartas[c], listaCartas[c]);
    }
}

function formatando(carta, numero){ // funcao que associa a carta ao gif no verso dela 
    if(numero == 0){
        carta.children[1].innerHTML = "<img src='gifs/bobrossparrot.gif'>"; 
    }else if(numero == 2){
        carta.children[1].innerHTML = "<img src='gifs/explodyparrot.gif'>"; 
    }else if(numero == 4){
        carta.children[1].innerHTML = "<img src='gifs/fiestaparrot.gif'>"; 
    }else if(numero == 6){
        carta.children[1].innerHTML = "<img src='gifs/metalparrot.gif'>"; 
    }else if(numero == 8){
        carta.children[1].innerHTML = "<img src='gifs/revertitparrot.gif'>"; 
    }else if(numero == 10){
        carta.children[1].innerHTML = "<img src='gifs/tripletsparrot.gif'>"; 
    }else{
        carta.children[1].innerHTML = "<img src='gifs/unicornparrot.gif'>"; 
    }
}

function comparaCarta(div){

    if(!(div.classList.contains("selecionada")) && pode_jogar){

        div.classList.add("selecionada");

        if(carta1 == null){
            carta1 = div.children[1].innerHTML; //parseInt(div.children[2].innerHTML);// nao preciso disso
        }else if(carta2 == null){
            carta2 = div.children[1].innerHTML; //parseInt(div.children[2].innerHTML); // nao preciso disso
            let cartas_viradas = document.querySelectorAll(".selecionada");   
            if(carta1 == carta2){

                for(let c=0; c<cartas_viradas.length; c++){
                    cartas_viradas[c].classList.remove("selecionada");
                    cartas_viradas[c].classList.add("virada");
                    cartas_viradas[c].removeAttribute("onclick");
                }
                    
            }else{
                pode_jogar = false;
                setTimeout(desvirarCartas, 1000);
            }
            carta1 = null;
            carta2 = null;
            contador++;
        }
    }
    if(contador >= (numeroCartas/2)){
        fimJogo();
    }
}

function desvirarCartas() { // desvira as cartas c atraso de 1seg
    let cartas_viradas = document.querySelectorAll(".selecionada");
    for(let c=0; c<cartas_viradas.length; c++){
        cartas_viradas[c].classList.remove("selecionada");
    }
    pode_jogar = true;
}

function fimJogo() { // anuncia o fim do jogo e pergunta se quer jogar dnovo

    let viradas = document.querySelectorAll(".virada");

    if(viradas.length == numeroCartas){
        setTimeout( () => {
            alert("Parabens, voce ganhou o jogo em " + contador + " jogadas");
            resposta = prompt("quer jogar denovo? [s/n]");
            InicioJogo(resposta);
        }, 200);
    }
}

/******** Fim Funcoes *******/

/***** variaveis e chamadas *******/
let numeroCartas = null;
let listaCartas = [];
let contador = 0;
let carta1 = null;
let carta2 = null;
let resposta = "s";
let pode_jogar = true;

InicioJogo(resposta);