// to listen and get players'number
let numberOfPlayer = document.getElementById('number-of-player');

numberOfPlayer.addEventListener("change", function () {
    switch (numberOfPlayer.value) {
        case '1':
            document.getElementById('second-player-name').classList.remove('active');
            document.getElementById('third-player-name').classList.remove('active');
            document.getElementById('fourth-player-name').classList.remove('active');
            break;
        case '2':
            document.getElementById('second-player-name').classList.add('active');
            document.getElementById('third-player-name').classList.remove('active');
            document.getElementById('fourth-player-name').classList.remove('active');
            break;
        case '3':
            document.getElementById('second-player-name').classList.add('active');
            document.getElementById('third-player-name').classList.add('active');
            document.getElementById('fourth-player-name').classList.remove('active');
            break;
        case '4':
            document.getElementById('second-player-name').classList.add('active');
            document.getElementById('third-player-name').classList.add('active');
            document.getElementById('fourth-player-name').classList.add('active');
            break;
    }
});

// to record name of each player of party in an array
let playerNames = [];

function getName() {
    const firstPlayerName = document.getElementById('first-player-name');
    const secondPlayerName = document.getElementById('second-player-name');
    const thirdPlayerName = document.getElementById('third-player-name');
    const fourthPlayerName = document.getElementById('fourth-player-name');
    
    // to erase blank space at start and end, to verify if input are not empty, and to assure we don't have two time the same player name, for each input name we use !==, trim() and includes methods
    if (firstPlayerName.value.trim() !== "" && !playerNames.includes(firstPlayerName.value)) playerNames.push(firstPlayerName.value);
    if (secondPlayerName.value.trim() !== "" && !playerNames.includes(secondPlayerName.value)) playerNames.push(secondPlayerName.value);
    if (thirdPlayerName.value.trim() !== "" && !playerNames.includes(thirdPlayerName.value)) playerNames.push(thirdPlayerName.value);
    if (fourthPlayerName.value.trim() !== "" && !playerNames.includes(fourthPlayerName.value)) playerNames.push(fourthPlayerName.value);
}

// listen get-name btn to call function
document.getElementById('get-name').addEventListener('click', function() {
    getName();
})

// get best scores data from local storage
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];

// an array to record each player score
let playerScores = [];

// ending party time
let gameOverTime = 0;

// to record name, score, time of ten best players
function saveBestScores() {
    playerNames.forEach(i => {
        let player = {};
        player["name"] = playerNames[i];
        player["score"] = playerScores[i];
        scores.push(player);
    })
    scores.sort((a, b) => b.score - a.score);
    const maxScoresToKeep = 10;
    scores = scores.slice(0, maxScoresToKeep);
    localStorage.setItem('bestScores', JSON.stringify(scores));
}

// display best scores on index.html
function displayBestScores() {
    if (scores) {
        const ranking = document.getElementById('ranking');
        ranking.innerHTML = '';

        scores.forEach((score, index) => {
            const rank = index + 1;
            const playerInfo = `${rank}. ${score.name} - Score: ${score.score} - Time: ${score.time}`;
            const listItem = document.createElement('li');
            listItem.textContent = playerInfo;
            ranking.appendChild(listItem);
        });
    } else {
        document.getElementById('ranking').textContent = 'No scores recorded.';
    }
}

saveBestScores();
displayBestScores();

// to have a timer in the game
// where i will display it
const displayTimer = document.getElementById('timer');

let ms = 10;
let s = 19;

function runTimer() {
    timer = setInterval(function() {
        ms -= 1;
        if (s === 0 && ms === 0) endTimer();
        else if (ms === 0) {ms = 10; s--;}
        displayTimer.textContent = (s < 10 ? '0' + s : s) + ' : ' + (ms < 10 ? '0' + ms : ms);
    }, 100)
}

function endTimer() {
    clearInterval(timer);
}

// function to save question following the difficulty in a variable
// possibility to store as many quiz as you wish
let count = 0;
function getQuiz(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            questions[count] = data.quizz.fr[difficulty];
            count++;
            mixQuestions(questions)
        })
        .catch(error => {
            console.error("Une erreur s'est produite :", error);
        });
}

// function to flat all item and random questions order
function mixQuestions(array) {
    console.log(array.flat().map(item => ({item, ordre: Math.random()})).sort((a, b) => a.ordre - b.ordre).map(item => item.item))
    return array.flat().map(item => ({item, ordre: Math.random()})).sort((a, b) => a.ordre - b.ordre).map(item => item.item)
}


// to save futures questions
let questions = [];
let quizName;
let difficulty;

// listen which quiz we want
document.getElementById('quiz-choice').addEventListener('mouseover', function(event) {
    if (!event.target.classList.contains('btn')) return;
    document.querySelectorAll('.hidden').forEach(btn => {
        btn.classList.remove('hidden');
    })
    if (event.target.classList.contains('btn-difficulty')) return;
    quizName = event.target.getAttribute('id');
})

// and his difficulty
document.getElementById('quiz-choice').addEventListener('click', function(event) {
    event.target.classList.add('select');
    difficulty = event.target.getAttribute('id');
    getQuiz(`../assets/json/${quizName}.json`);
})