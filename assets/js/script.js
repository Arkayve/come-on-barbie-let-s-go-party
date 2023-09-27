// here i display or hide input name in regards of number of players selected
document.getElementById('index__player__number').addEventListener("change", function () {
    switch (document.getElementById('index__player__number').value) {
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

// listen btn-category to reveal categories
document.getElementById('index__player__btn-category').addEventListener('click', function () {
    getName();
    displayCategories();
})

function displayCategories() {
    if (playerNames.length == 0 || document.getElementById('index__player__number').value != playerNames.length) return;
    if (questions.length > 0) {
        document.getElementById('category-validate').classList.remove('hidden');
    }
    document.getElementById('index__player').classList.add('hidden');
    document.getElementById('index__category-container').classList.remove('hidden');
    document.getElementById('index__difficulty-container').classList.add('hidden');
    document.getElementById('index__ranking-container').classList.add('hidden');
    document.getElementById('index__own-quiz-link').classList.add('hidden');
    colorCategory();
    removeSelectClassOfDifficultyBtn();
}

function colorCategory() {
    let categoryCount = 0;
    alreadySelected.forEach(category => {
        console.log(category.split(', ')[0])    
        if (categoryName === category.split(', ')[0]) {
            console.log(category)
            console.log(categoryName)
            categoryCount++
            console.log(categoryCount)
        }
        if (categoryCount < 3) {
            document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('full-select');
            document.querySelector(`[data-category-name="${categoryName}"]`).classList.add('partially-select');
        } else if (categoryCount === 3) {
            document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('partially-select');
            document.querySelector(`[data-category-name="${categoryName}"]`).classList.add('full-select');
        }
    })
}

document.getElementById('index__category-container__nav').addEventListener('click', function(event) {
    if (!event.target.classList.contains('index__category-container__nav__img')) return;
    if (event.target.id === 'category-back') {
        returnToIndex();
    }
})

function returnToIndex() {
    document.getElementById('index__player').classList.remove('hidden');
    document.getElementById('index__category-container').classList.add('hidden');
    document.getElementById('index__ranking-container').classList.remove('hidden');
    document.getElementById('index__own-quiz-link').classList.remove('hidden');
}



// get best scores data from local storage
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];

// an array to record each player score
let playerScores = [];

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
function displayBestScores(where) {
    if (scores) {
        where.innerHTML = '';
        scores.forEach((score, index) => {
            const rank = index + 1;
            const playerInfo = `${rank}. ${score.name} - Score: ${score.score}`;
            const listItem = document.createElement('li');
            listItem.textContent = playerInfo;
            where.appendChild(listItem);
        });
    } else {
        where.textContent = 'No scores recorded.';
    }
}

displayBestScores(document.getElementById('index__ranking-container__list'));

// to have a timer in the game
let endTime;
let s;

function runTimer() {
    let ms = 10;
    s = 19;
    timer = setInterval(function () {
        ms -= 1;
        if (s === 0 && ms === 0) endTimer();
        else if (ms === 0) { ms = 10; s--; }
        document.getElementById('game__timer').textContent = (s < 10 ? '0' + s : s) + ' : ' + (ms < 10 ? '0' + ms : ms);
    }, 100)
}

function endTimer() {
    clearInterval(timer);
    endTime = Math.round(s);
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
            console.error("Error :", error);
        });
}


// function to flat all item and random questions order
// .flat to have unidimensional array ; first .map to add order value which is randomize, and item to store precedent state of object
// .sort to randomize element in array by using order value, then second .map to get back precedent state of each object after randomize them
function mixQuestions(array) {
    questions = array.flat().map(item => ({ item, order: Math.random() })).sort((a, b) => a.order - b.order).map(item => item.item)
}

// to know each quiz already selected
let alreadySelected = [];
// to have a variable with all questions
let questions = [];
// here is two variables to select which quiz we want regarding to difficulty
let categoryName;
let difficulty;

// listen which category of quiz we want
document.getElementById('index__category-container').addEventListener('click', function (event) {
    if (!event.target.classList.contains('index__category-container__btn')) return;
    // removing select class for all category
    document.querySelectorAll('.index__category-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
    // removing select class for all difficulty
    // document.querySelectorAll('.index__difficulty-container__btn').forEach(btn => {
    //     btn.classList.remove('select');
    // })
    // add select class for category clicked
    // event.target.classList.add('select');
    // get category in a var
    categoryName = event.target.dataset.categoryName;
    document.getElementById('index__difficulty-container__title').textContent = `Select difficulty for ${event.target.textContent}:`
    displayDifficulty();
    // add select class if difficulty already added in questions for this category
    addSelectClassIfAlreadyClick();
})

function displayDifficulty() {
    document.getElementById('index__category-container').classList.add('hidden');
    document.getElementById('index__difficulty-container').classList.remove('hidden');
}

// listen which difficulty of quiz we want
document.getElementById('index__difficulty-container').addEventListener('click', function (event) {
    if (event.target.dataset.value === 'back') {
        displayCategories();
    }
    if (!event.target.classList.contains('index__difficulty-container__btn')) return;
    event.target.classList.add('select');
    difficulty = event.target.getAttribute('id');
    // to prevent adding more than one time each quiz
    if (alreadySelected.includes(categoryName + ', ' + difficulty)) return;
    alreadySelected.push(categoryName + ', ' + difficulty);
    getQuiz(`../assets/json/${categoryName}.json`);
})

// function to add select class by category if already clicked
function addSelectClassIfAlreadyClick() {
    alreadySelected.forEach(category => {
        if (categoryName === category.split(', ')[0]) {
            document.querySelectorAll('.index__difficulty-container__btn').forEach(btn => {
                if (btn.id === category.split(', ')[1]) btn.classList.add('select');
            })
        }
        }
    )
}

// function to remove select class of difficulty buttons
function removeSelectClassOfDifficultyBtn() {
    document.querySelectorAll('.index__difficulty-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
}

//***********************************************************************//
//                       ****   **** *   *  ****                         //
//                       *   * *   * ** **  *                            //
//                       *     *   * * * *  ****                         //
//                       *  ** ***** *   *  *                            //
//                       ***** *   * *   *  ****                         //
//***********************************************************************//

// here we go !
function runGame() {
    if (questions.length > 0) {
        makeRound();
        displayQuestion();
        runTimer();
    } else {
        endGame();
    }
}

// function to display question and answer-btn from questions array
let anecdote;
let answer;
function displayQuestion() {
    const newQuestion = questions.shift();
    anecdote = newQuestion.anecdote;
    answer = newQuestion.réponse;
    document.getElementById('game__question').textContent = newQuestion.question;
    document.getElementById('btn-answer-0').textContent = newQuestion.propositions[0];
    document.getElementById('btn-answer-1').textContent = newQuestion.propositions[1];
    document.getElementById('btn-answer-2').textContent = newQuestion.propositions[2];
    document.getElementById('btn-answer-3').textContent = newQuestion.propositions[3];
    console.log(answer);
}

let round = 0;

function makeRound() {
    if (round === playerNames.length) round = 0;
    document.getElementById('game__who-play').textContent = `Hey ${playerNames[round]}, it's your turn`;
}

// hey that's a block isn't it ?? her we listen which button (answer) we choose
document.getElementById('game__answer-container').addEventListener('click', function (event) {
    if (!event.target.classList.contains('game__answer__btn')) return;
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
    document.getElementById('game__anecdote').textContent = anecdote;
    document.getElementById('game__btn-next').classList.remove('hidden');
    document.getElementById('game__anecdote').classList.remove('hidden');
    document.getElementById('game__comments').classList.remove('hidden');
    endTimer();
    // and here we know if you are a potatoe
    if (event.target.textContent === answer) {
        !playerScores[round] ? playerScores[round] = 50 : playerScores[round] += 50;
        playerScores[round] += endTime;
        document.getElementById('game__comments').textContent = `Well done ${playerNames[round]} ! Your actual score is ${playerScores[round]}.`;
        document.getElementById('unicorn').classList.add('good');
    } else {
        if (!playerScores[round]) playerScores[round] = 0;
        document.getElementById('game__comments').textContent = `Soz, maybe next time, ${playerNames[round]}. Your actual score is ${playerScores[round]}.`;
    }
    round++;
})

// to listen next btn, hide what have to be hide, remove choice class and go to next round
document.getElementById('game__btn-next').addEventListener('click', function (event) {
    event.target.classList.add('hidden');
    document.getElementById('game__anecdote').classList.add('hidden');
    document.getElementById('game__comments').classList.add('hidden');
    document.querySelectorAll('.game__answer__btn').forEach(btn => {
        btn.classList.remove('choice');
    })
    runGame();
})

// here we make magic to display cool infos for players
const bestPlayer = [];
function endGame() {
    document.getElementById('game__btn-end-party').classList.add('hidden');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('endgame').classList.remove('hidden');
    // here we make an array of object with names and scores
    for (const i in playerNames) {
        let player = {};
        player["name"] = playerNames[i];
        player["score"] = playerScores[i];
        bestPlayer.push(player);
    }
    // here we sort players by scores
    bestPlayer.sort((a, b) => b.score - a.score);
    document.getElementById('endgame__stats').innerHTML = '';
    // here we loop the array to display each players scores
    for (const i in bestPlayer) {
        const rank = parseInt(i) + 1;
        let playerInfo;
        if (rank === 1) {
            playerInfo = `What a glorious game ${bestPlayer[i].name} ! With a score of ${bestPlayer[i].score}, you are the champion, my friend.`
        } else if (rank === bestPlayer.length) {
            playerInfo = `Well... at least, you tried ${bestPlayer[i].name}. With a score of ${bestPlayer[i].score}, you're a loser baby.`
        } else {
            playerInfo = `${bestPlayer[i].name} finished at position ${rank} with a score of ${bestPlayer[i].score}.`;
        }
        const listItem = document.createElement('li');
        listItem.textContent = playerInfo;
        document.getElementById('endgame__stats').appendChild(listItem);
    }
    // here we add players of the party to best scores, function saveBestScores will keep ten best of all of them
    bestPlayer.forEach(player => {
        scores.push(player);
    })
    saveBestScores();
    displayBestScores(document.getElementById('endgame__ranking-list'));
}

// here we reset all previous game values
function fromScratch() {
    playerNames = [];
    playerScores = [];
    count = 0;
    alreadySelected = [];
    questions = [];
    categoryName = '';
    difficulty = '';
    anecdote = '';
    answer = '';
    document.querySelectorAll('.index__category-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
    document.querySelectorAll('.game__answer__btn').forEach(btn => {
        btn.classList.remove('choice');
    })
    endTimer();
    document.getElementById('first-player-name').value = '';
    document.getElementById('second-player-name').value = '';
    document.getElementById('third-player-name').value = '';
    document.getElementById('fourth-player-name').value = '';
    document.getElementById('game').classList.add('hidden');
    document.getElementById('endgame').classList.add('hidden');
    document.getElementById('index').classList.remove('hidden');
    document.getElementById('index__category-container').classList.add('hidden');
    document.getElementById('game__btn-next').classList.add('hidden');
    document.getElementById('game__anecdote').classList.add('hidden');
    document.getElementById('game__comments').classList.add('hidden');
    displayBestScores(document.getElementById('index__ranking-container__list'));
}

// to go back to homepage and remove all actual game variables values
document.getElementById('game__btn-end-party').addEventListener('click', function (event) {
    if (playerScores[0] >= 0) {
        endGame();
    } else {
        fromScratch();
        document.getElementById('game__btn-end-party').classList.add('hidden');
    }
})

// listen btn go home of ending page
document.getElementById('endgame__btn-home').addEventListener('click', function (event) {
    fromScratch();
})

// backup of bestScores for test of localstorage functions in another computer
// [{"name":"A","score":500},{"name":"B","score":450},{"name":"C","score":400},{"name":"D","score":350},{"name":"E","score":300},{"name":"F","score":250},{"name":"G","score":200},{"name":"H","score":150},{"name":"I","score":100},{"name":"J","score":50}]