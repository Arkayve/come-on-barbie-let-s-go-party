// to listen and get players'number
let numberOfPlayer = document.getElementById('number-of-player');

// here i display or hide input name in regards of number of players selected
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
document.getElementById('get-name').addEventListener('click', function () {
    getName();
    if (playerNames.length > 0 && questions.length > 0) {
        document.getElementById('index').classList.add('hidden');
        document.querySelectorAll('.btn-answer').forEach(btn => {
            btn.classList.remove('hidden');
        })
        runGame();
    }
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
            const playerInfo = `${rank}. ${score.name} - Score: ${score.score}`;
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
let endTime;

let ms = 10;
let s = 19;

function runTimer() {
    timer = setInterval(function () {
        ms -= 1;
        if (s === 0 && ms === 0) endTimer();
        else if (ms === 0) { ms = 10; s--; }
        displayTimer.textContent = (s < 10 ? '0' + s : s) + ' : ' + (ms < 10 ? '0' + ms : ms);
    }, 100)
}

function endTimer() {
    clearInterval(timer);
    endTime = displayTimer.textContent;
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
// .flat to have unidimensional array ; first .map to add order value which is randomize, and item to store precedent state of object
// .sort to randomize element in array by using order value, then second .map to get back precedent state of each object after randomize them
function mixQuestions(array) {
    console.log(array.flat().map(item => ({ item, order: Math.random() })).sort((a, b) => a.order - b.order).map(item => item.item))
    questions = array.flat().map(item => ({ item, order: Math.random() })).sort((a, b) => a.order - b.order).map(item => item.item)
}

// to save futures questions
// to know each quiz already selected
let alreadySelected = [];
// to have a variable with all questions
let questions = [];
// here is two variables to select which quiz we want regarding to difficulty
let quizName;
let difficulty;

// listen which category of quiz we want and make difficulty btn appear
document.getElementById('quiz-choice').addEventListener('mouseover', function (event) {
    if (!event.target.classList.contains('btn-quiz')) return;
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
        btn.classList.remove('select');
        btn.classList.remove('hidden');
    })
    if (event.target.classList.contains('btn-difficulty')) return;
    quizName = event.target.getAttribute('id');
    addSelectClassIfAlreadyClick();
})

// and his difficulty
document.getElementById('quiz-choice').addEventListener('click', function (event) {
    if (!event.target.classList.contains('btn-difficulty')) return;
    event.target.classList.add('select');
    difficulty = event.target.getAttribute('id');
    // to prevent adding more than one time each quiz
    if (alreadySelected.includes(quizName + ', ' + difficulty)) return;
    alreadySelected.push(quizName + ', ' + difficulty);
    getQuiz(`../assets/json/${quizName}.json`);
})

// function to add select class by category if already clicked
function addSelectClassIfAlreadyClick() {
        alreadySelected.forEach(category => {
            if (quizName === category.split(', ')[0]) {
                document.querySelectorAll('.btn-difficulty').forEach(btn => {
                    if (btn.id === category.split(', ')[1]) btn.classList.add('select')
                })
            }
        })
}

// function to hide difficulty btn and remove select class
function hideDifficultyBtnAndRemoveSelectClass() {
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
        btn.classList.add('hidden');
        btn.classList.remove('select');
    })
}

// to hide choice btn
document.querySelector('.quiz-choice').addEventListener('mouseleave', function (event) {
    if (event.target.classList.contains('btn')) return;
    hideDifficultyBtnAndRemoveSelectClass();
})

// adding eventlistener when mouse go down on the page to hide choice btn
document.getElementById('ranking-title').addEventListener('mouseenter', function (event) {
    hideDifficultyBtnAndRemoveSelectClass();
})

//***********************************************************************//
//                       ****   **** *   *  ****                         //
//                       *   * *   * ** **  *                            //
//                       *     *   * * * *  ****                         //
//                       *  ** ***** *   *  *                            //
//                       ***** *   * *   *  ****                         //
//***********************************************************************//

// here we go !
function runGame() {
    makeRound();
    displayQuestion();
    runTimer();
}

// function to display question and answer-btn from questions array
let anecdote;
let answer;
function displayQuestion() {
    const newQuestion = questions.shift();
    anecdote = newQuestion.anecdote;
    answer = newQuestion.réponse;
    document.getElementById('question').textContent = newQuestion.question;
    document.getElementById('btn-answer-0').textContent = newQuestion.propositions[0];
    document.getElementById('btn-answer-1').textContent = newQuestion.propositions[1];
    document.getElementById('btn-answer-2').textContent = newQuestion.propositions[2];
    document.getElementById('btn-answer-3').textContent = newQuestion.propositions[3];
    console.log(answer)
}

let round = 0;

function makeRound() {
    if (round === 4) round = 0;
    document.getElementById('who-play').textContent = `Hey ${playerNames[round]}, it's your turn`;
}

// hey that's a block isn't it ?? her we listen which button (answer) we choose
document.getElementById('btn-answer-container').addEventListener('click', function (event) {
    if (!event.target.classList.contains('btn-answer')) return;
    switch (event.target.id) {
        case 'btn-answer-0':
            // and make it appears glorious
            document.getElementById('btn-answer-0').classList.add('choice');
            document.getElementById('btn-answer-1').classList.remove('choice');
            document.getElementById('btn-answer-2').classList.remove('choice');
            document.getElementById('btn-answer-3').classList.remove('choice');
            break;
        case 'btn-answer-1':
            document.getElementById('btn-answer-0').classList.remove('choice');
            document.getElementById('btn-answer-1').classList.add('choice');
            document.getElementById('btn-answer-2').classList.remove('choice');
            document.getElementById('btn-answer-3').classList.remove('choice');
            break;
        case 'btn-answer-2':
            document.getElementById('btn-answer-0').classList.remove('choice');
            document.getElementById('btn-answer-1').classList.remove('choice');
            document.getElementById('btn-answer-2').classList.add('choice');
            document.getElementById('btn-answer-3').classList.remove('choice');
            break;
        case 'btn-answer-3':
            document.getElementById('btn-answer-0').classList.remove('choice');
            document.getElementById('btn-answer-1').classList.remove('choice');
            document.getElementById('btn-answer-2').classList.remove('choice');
            document.getElementById('btn-answer-3').classList.add('choice');
            break;
        }
    // we display anecdote for each question
    document.getElementById('anecdote').textContent = anecdote;
    round++;
    endTimer();
    // and here we know if you are a potatoe
    if (event.target.textContent === answer) {
        document.getElementById('comments').textContent = 'well done !'
        playerNames[round].score += 50;
        console.log(playerNames);
        console.log(endTime)
    } else {
        document.getElementById('comments').textContent = 'soz, maybe next time.'
    }
})

// function saveBestScores() {
//     playerNames.forEach(i => {
//         let player = {};
//         player["name"] = playerNames[i];
//         player["score"] = playerScores[i];
//         scores.push(player);
//     })
//     scores.sort((a, b) => b.score - a.score);
//     const maxScoresToKeep = 10;
//     scores = scores.slice(0, maxScoresToKeep);
//     localStorage.setItem('bestScores', JSON.stringify(scores));
// }