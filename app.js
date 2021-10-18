'use strict'

var gNums = []
var gNumsLength = 16
var gNextNum = 1
var gClicks = 0

var gInterval
var gStartTime

var gName
var gNameBest = null
var gCurrRecord
var gBestRecord = Infinity
var gDiff




function chooseSize(elBtn) {
    var level = elBtn.innerText
    // console.log(elBtn);
    if (level === 'Easy 16') {
        gNumsLength = 16
    } else if (level === 'Medium 25') {
        gNumsLength = 25
    } else gNumsLength = 36
    init()
}


function init() {
    createArray(gNumsLength)
    renderTable()
    gName = prompt('enter your name')
    console.log('gName', gName)
}


function createArray(length) {
    for (var i = 0; i < length; i++) {
        gNums.push(i + 1)
    }
    return gNums
}


function startTimer() {

    gStartTime = Date.now()
    // console.log('gStartTime', gStartTime);
    gInterval = setInterval(updateTime, 20)
}

function updateTime() {
    var currTime = Date.now()
    gDiff = currTime - gStartTime
    // console.log('diff', diff);
    // var centi = (diff / 10 % 100).toFixed(0)
    var centi = Math.floor((gDiff % 1000) / 10)
    //10381/10=1038     1038%100=38    centi=38
    var seconds = Math.floor((gDiff % (1000 * 60)) / 1000)
    //10381%60000=10381     10381/1000=10   seconds=10 
    var minutes = Math.floor((gDiff % (1000 * 60 * 60)) / (1000 * 60))
    //10381%360000=10381    10381/60000=0   minutes=0

    // var seconds = ((diff - centi * 10) / 1000 % 60).toFixed(0)
    //10381-38*10=10001     10001/1000=10     10%60=10    seconds=10

    // var minutes = ((diff - seconds * 60000) / 1000 % 60).toFixed(0)
    //

    document.querySelector('.timer').innerText = `${minutes}:${seconds}:${centi}`


}

function stopTimer() {
    gCurrRecord = gDiff
    console.log('gCurrRecord', gCurrRecord);
    document.querySelector('h1').innerText = 'Winner!';
    document.querySelector('.btn-reset').classList.remove('hidden');
    bestPlayer(gName, gCurrRecord)
    clearInterval(gInterval)
}


function restart() {
    gNextNum = 1
    gClicks = 0
    document.querySelector('.timer').innerText = '00:00:00'
    document.querySelector('.btn-reset').classList.add('hidden');
    init()
}


function bestPlayer(gName, gCurrRecord) {
    //gets the details about this round,
    //compare to the best player
    if (gCurrRecord < gBestRecord) {
        gBestRecord = gCurrRecord
        gNameBest = gName
        document.querySelector('span').innerText = gName;
        console.log('im in!');
    }
}


function cellClicked(elCell) {
    var num = +elCell.innerText

    if (gClicks === 0) startTimer()
    if (gNextNum === gNumsLength) stopTimer()
    if (num === gNextNum) {
        gNextNum++
        elCell.classList.add('clicked')
        // console.log('elCell', elCell);
    }
    gClicks++

}



function renderTable() {
    var strHtml = ''
    for (var i = 0; i < Math.sqrt(gNumsLength); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gNumsLength); j++) {
            shuffle(gNums)
            var num = drawNum();
            strHtml += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this, ${num})">${num}</td>`
        }
        strHtml += '</tr>'
    }
    // console.log('strHtml', strHtml); //ready in the model
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHtml
    return elTable
}





function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}