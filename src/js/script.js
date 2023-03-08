"use strict"
let container = document.getElementById("containerContent")
let pos = 0
let hours = 0
let minutes = 0
let seconds = 0
let time = 1000 // Quantidade milésimos que um segundo possue
let timer
let timerStatus
let practiceText
let sec,deCont,decress,minTime


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

function getPoints(){
    sec = seconds + (60*minutes) + (3600*hours)

    if(sec <= minTime){
        deCont = 0
    }

    deCont = (sec/30) - minTime

    decress = deCont*15
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

function changeText(practiceText){
    stop()
    clearTimer()
    start()
    
    if (pos < practiceText.length) {
        console.log("Entrou")
        pos++
        document.getElementById("containerContent")
        container.innerHTML += `<p>${practiceText[pos].paragraph}</p>`

        if (pos == practiceText.length) {
            pos = 0
            container.innerHTML += `<p>${practiceText[pos].paragraph}</p>`
        }
    } 
    console.log("Segundo console.log: " + pos)
}
