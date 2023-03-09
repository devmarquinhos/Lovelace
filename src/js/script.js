"use strict"
let container = document.getElementById("containerContent")
let pos = 0
let hours = 0
let minutes = 0
let seconds = 0
let time = 1000 // Quantidade milésimos que um segundo possue
let timer
let timerStatus = "stop"
let practiceText
let sec,deCont,decress,score
let ponto_por_palavra,qtd_de_palavras_chave=5,acertos,resposta

function start() {
    switch (timerStatus) {
        case "play":
            return
        default:
            timerStatus = "play"
            timer = setInterval(() => {
                timerStart()
            }, time); 
            break
    }
}

function stop() {
    timerStatus = "stop"
    clearInterval(timer)
}


function clearTimer(){
    clearInterval(timer)
    hours = 0
    minutes = 0
    seconds = 0

    document.getElementById('timer').innerText = '00:00:00'
}

function timerStart(){
    seconds++

    if (seconds == 60) {
        seconds = 0
        minutes++

        if (minutes == 60) {
            minutes = 0
            hours++
        }
    }

    let formatTimer = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    document.getElementById('timer').innerText = formatTimer

    return formatTimer
}

// Carregar o JSON
fetch('content.json')
  .then(response => response.json()) 
  .then(data => {
    console.log(data)
    practiceText = data.texts

    // Nova Promise para retornar o array
    return new Promise(resolve => {
        resolve()
    })
})
.then(() => {
    changeText(practiceText)
})

// Função para alterar o texto usando Array
function changeText(practiceText){
    stop()
    clearTimer()
    start()
    
    if (pos < practiceText.length) {
        console.log("Entrou")
        container.innerHTML = `<p>${practiceText[pos].paragraph}</p>`
        console.log("Posicao do array: " + pos)
        pos++

        if (pos == practiceText.length) {
            pos = 0
            container.innerHTML = `<p>${practiceText[pos].paragraph}</p>`
        }
    } 
    console.log("Segundo console.log: " + pos)
}


// Fechar modal e parar o tempo
function sendAnswers() {
    stop()

    let resContainer = document.getElementById("resultContainer")
    let answerContainer = document.getElementById("submitAnswer").value
    
    switch (answerContainer) {
        case "":
            alert("Ei! O campo de resposta precisa estar preenchido!")
            console.log("Campo vazio.")
            break;

        default:

    let palavra_acertada = 0,qtd_de_palavras_chave = 5
    let minTime = 60
    let rank

    if(answerContainer.includes("A")){
        palavra_acertada ++
    }
    if(answerContainer.includes("resposta")){
        palavra_acertada ++
    }
    if(answerContainer.includes("certa")){
        palavra_acertada ++
    }
    if(answerContainer.includes("e")){
        palavra_acertada ++
    }
    if(answerContainer.includes("essa")){
        palavra_acertada ++
    }

    ponto_por_palavra = 100 / qtd_de_palavras_chave
    acertos = ponto_por_palavra * palavra_acertada

    sec = seconds + (60*minutes) + (3600*hours)

    if(sec <= minTime){
        score = acertos
    }else{
        deCont = sec - minTime
        decress = (deCont / 30)*10
        score = acertos - decress 
    }

    if(score <= 0){
       rank = "Ruim"
    }else if(score <= 20){
       rank = "Baixo"
    }else if(score <= 40){
       rank = "Bom"
    }else if(score <= 60){
       rank = "Medio"
    }else if(score <= 80){
       rank = "Alto"
    }else if(score <= 100){
       rank = "Advançado"
    }

    document.getElementById("score").innerHTML = Math.round(score);
    document.getElementById("level").innerHTML = rank;

    console.log(score)

    resContainer.classList.add("show")
    resContainer.addEventListener('click', (e) => {
        if (e.target.id =='dontSavePdf') {
            resContainer.classList.remove("show")
            changeText(practiceText)
            answerContainer = document.getElementById("submitAnswer").value=''
        }
    })
            break;
    }
}