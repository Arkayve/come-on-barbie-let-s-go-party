// here i display or hide input name in regards of number of players selected
document.getElementById('index__player__number').addEventListener("change", function () {
    const maxPlayer = parseInt(document.getElementById('index__player__number').value);
    for (let i = 1; i < 4; i++) {
        const player = document.getElementById(i === 1 ? 'second-player-name' : i === 2 ? 'third-player-name' : 'fourth-player-name');
        player.classList.toggle('active', i < maxPlayer);
    }
});

// to record name of each player of party in an array
let playerNames = [];

function savePlayerName() {
    const playerNameIdArray = ['first-player-name', 'second-player-name', 'third-player-name', 'fourth-player-name'];
    playerNameIdArray.forEach(playerNameId => {
        const playerName = document.getElementById(playerNameId).value.trim();
        if (playerName !== "" && !playerNames.includes(playerName)) {
            playerNames.push(playerName);
        }
    });
}

// listen btn-category to reveal categories
document.getElementById('index__player__btn-category').addEventListener('click', function () {
    savePlayerName();
    displayCategories();
})

// to reset changes if btn pressed in homepage
document.getElementById('index__player__btn-reset').addEventListener('click', function (event) {
    fromScratch();
})

// function to display categories
function displayCategories() {
    // here we verify if playernames fields aren't empty, and correspond to number of players
    if (playerNames.length == 0 || document.getElementById('index__player__number').value != playerNames.length) return;
    const elementsToHide = ['index__main-title', 'index__img-unicorn', 'index__player', 'index__difficulty-container', 'index__ranking-container', 'index__own-quiz-link'];
    const elementsToShow = ['index__category-container', 'index__category-responsive', 'index__category-container__title', 'index__category-container__nav'];
    hideOrShowElement(elementsToHide, elementsToShow);
    colorCategory();
    removeSelectClassOfDifficultyBtn();
}

// function to color categories in regards of difficulties selected
function colorCategory() {
    let categoryCount = 0;
    alreadySelected.forEach(category => {
        if (categoryName === category.split(', ')[0]) {
            categoryCount++
        }
    })
    if (categoryCount === 0 && categoryName !== undefined) {
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('full-select');
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('partially-select');

    } else if (categoryCount < 3 && categoryName !== undefined) {
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('full-select');
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.add('partially-select');
    } else if (categoryCount === 3) {
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.remove('partially-select');
        document.querySelector(`[data-category-name="${categoryName}"]`).classList.add('full-select');
    }
}

// listen validate / go back buttons of categories
document.getElementById('index__category-container__nav').addEventListener('click', function (event) {
    if (!event.target.classList.contains('index__category-container__nav__img')) return;
    if (event.target.id === 'category-back') {
        returnToIndex();
    }
    if (event.target.id === 'category-validate') {
        mixQuestions(questions);
        runGame();
    }
})

// a function to go back to homepage
function returnToIndex() {
    const elementsToHide = ['index__category-container'];
    const elementsToShow = ['index__main-title', 'index__img-unicorn', 'index__player', 'index__ranking-container', 'index__own-quiz-link'];
    hideOrShowElement(elementsToHide, elementsToShow);
    document.getElementById('index__difficulty-container__title').textContent = '';
}

// get best scores data from local storage
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];

// an array to record each player score
let playerScores = [];

// to record names and scores of ten best players
function saveBestScores() {
    if (playerNames === 1) {
        let player = {
            name: playerNames[0],
            score: playerScores[0]
        };
        scores.push(player);
    } else if (playerNames > 1) {
        playerNames.forEach(i => {
            let player = {};
            player["name"] = playerNames[i];
            player["score"] = playerScores[i];
            scores.push(player);
        })
    }
    scores.sort((a, b) => b.score - a.score);
    const maxScoresToKeep = 10;
    scores = scores.slice(0, maxScoresToKeep);
    localStorage.setItem('bestScores', JSON.stringify(scores));
}

// display best scores on index.html
function displayBestScores(where) {
    if (scores.length > 0) {
        where.innerHTML = '';
        scores.forEach((score, index) => {
            const rank = index + 1;
            const playerInfo = `${rank}. ${score.name} - Score: ${score.score}`;
            const listItem = document.createElement('li');
            listItem.textContent = playerInfo;
            where.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No score recorded.';
        where.appendChild(listItem);
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
let alreadySelectedCount = 0;
// to have a variable with all questions
let questions = [];
// here is two variables to select which quiz we want regarding to difficulty
let categoryName;
let difficulty;

// listen which category of quiz we want
document.getElementById('index__category-container').addEventListener('click', function (event) {
    if (!event.target.classList.contains('index__category-container__btn')) return;
    removeSelectClassOfDifficultyBtn();
    // removing select class for all category
    document.querySelectorAll('.index__category-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
    // get category in a var
    categoryName = event.target.dataset.categoryName;
    document.getElementById('index__difficulty-container__title').textContent = `Select difficulty for ${event.target.textContent}:`
    displayDifficulty();
    // add select class if difficulty already added in questions for this category
    addSelectClassIfAlreadyClick();
})

function displayDifficulty() {
    const elementsToHide = ['index__category-container__nav', 'index__category-responsive', 'index__category-container__title'];
    const elementsToShow = ['index__difficulty-container'];
    hideOrShowElement(elementsToHide, elementsToShow);
}

// listen which difficulty of quiz we want
document.getElementById('index__difficulty-container').addEventListener('click', function (event) {
    if (event.target.dataset.value === 'back') {
        displayCategories();
    }
    if (!event.target.classList.contains('index__difficulty-container__btn')) return;
    if (!categoryName) return;
    difficulty = event.target.getAttribute('id');
    // to remove a quiz if already selected
    if (alreadySelected.includes(categoryName + ', ' + difficulty)) {
        const index = alreadySelected.indexOf(categoryName + ', ' + difficulty);
        alreadySelected.splice(index, 1);
        colorCategory();
        questions.splice(index, 1);
        event.target.classList.remove('select');
        return;
    };
    // and to add it if not already in
    event.target.classList.add('select');
    alreadySelected[alreadySelectedCount] = categoryName + ', ' + difficulty;
    alreadySelectedCount++;
    getQuiz(`assets/json/${categoryName}.json`);
    colorCategory();
    // to display validate btn
    document.getElementById('category-validate').classList.remove('hidden');
})

// function to add select class by category if already clicked
function addSelectClassIfAlreadyClick() {
    alreadySelected.forEach(category => {
        if (categoryName === category.split(', ')[0]) {
            document.querySelectorAll('.index__difficulty-container__btn').forEach(btn => {
                if (btn.id === category.split(', ')[1]) btn.classList.add('select');
            })
        }
    })
}

// function to remove select class of difficulty buttons
function removeSelectClassOfDifficultyBtn() {
    document.querySelectorAll('.index__difficulty-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
}

// here we go !
function runGame() {
    document.getElementById('index__category-container').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
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
    for (let i = 0; i < 4; i++) {
        const answerBtn = document.getElementById('btn-answer-' + i);
        answerBtn.textContent = newQuestion.propositions[i];
    }
}

let round = 0;

function makeRound() {
    if (round === playerNames.length) round = 0;
    document.getElementById('game__who-play').textContent = `Hey ${playerNames[round]}, it's your turn. ${questions.length} question${questions.length > 1 ? 's' : ''} left.`;
}

function loopAnswerBtn(target) {
    for (let i = 0; i < 4; i++) {
        const element = document.getElementById('btn-answer-' + i);
        if (i === target) {
            element.classList.add('select');
        } else {
            element.classList.remove('select');
        }
    }
}

// hey that's a block isn't it ?? her we listen which button (answer) we choose
document.getElementById('game__answer-container').addEventListener('click', function (event) {
    if (!event.target.classList.contains('game__answer-container__btn')) return;
    switch (event.target.id) {
        case 'btn-answer-0':
            // and make it appears glorious
            loopAnswerBtn(0);
            break;
        case 'btn-answer-1':
            loopAnswerBtn(1);
            break;
        case 'btn-answer-2':
            loopAnswerBtn(2);
            break;
        case 'btn-answer-3':
            loopAnswerBtn(3);
            break;
    }
    // we display anecdote for each question
    document.getElementById('game__anecdote').textContent = anecdote;
    const elementsToHide = ['game__who-play', 'game__question', 'game__timer', 'game__answer-container'];
    const elementsToShow = ['game__comments', 'cat-unicorn', 'game__anecdote', 'game__nav'];
    hideOrShowElement(elementsToHide, elementsToShow);
    endTimer();
    // and here we know if you are a potatoe
    if (event.target.textContent === answer) {
        !playerScores[round] ? playerScores[round] = 50 : playerScores[round] += 50;
        playerScores[round] += endTime;
        document.getElementById('game__comments').textContent = `Well done ${playerNames[round]} ! Your actual score is ${playerScores[round]}.`;
    } else {
        if (!playerScores[round]) playerScores[round] = 0;
        document.getElementById('game__comments').textContent = `Soz, maybe next time, ${playerNames[round]}. Your actual score is ${playerScores[round]}.`;
    }
    round++;
})

// to listen game nav btn, hide what have to be hide, remove select class and go to next round
document.getElementById('game__nav').addEventListener('click', function (event) {
    if (!event.target.classList.contains('game__nav__img')) return;
    if (event.target.id == 'game-end') {
        if (playerScores[0] >= 0) {
            endGame();
        } else {
            fromScratch();
        }
    }
    if (event.target.id == 'game-next') {
        const elementsToHide = ['game__comments', 'cat-unicorn', 'game__anecdote', 'game__nav'];
        const elementsToShow = ['game__who-play', 'game__question', 'game__timer', 'game__answer-container'];
        hideOrShowElement(elementsToHide, elementsToShow);
        document.querySelectorAll('.game__answer-container__btn').forEach(btn => {
            btn.classList.remove('select');
        })
        runGame();
    }
})

// here we make magic to display cool infos for players
function endGame() {
    const bestPlayer = [];
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
}

// function to manage hidden class more easily
function hideOrShowElement(arrayToHide, arrayToShow) {
    arrayToHide.forEach(elementId => {
        const element = document.getElementById(elementId);
        element.classList.add('hidden');
    });
    arrayToShow.forEach(elementId => {
        const element = document.getElementById(elementId);
        element.classList.remove('hidden');
    });
}

// here we reset all previous game values
function fromScratch() {
    playerNames = [];
    playerScores = [];
    count = 0;
    alreadySelected = [];
    alreadySelectedCount = 0;
    questions = [];
    categoryName = '';
    difficulty = '';
    anecdote = '';
    answer = '';
    document.querySelectorAll('.index__category-container__btn').forEach(btn => {
        btn.classList.remove('partially-select', 'full-select');
    })
    document.querySelectorAll('.game__answer-container__btn').forEach(btn => {
        btn.classList.remove('select');
    })
    removeSelectClassOfDifficultyBtn();
    document.getElementById('first-player-name').value = '';
    document.getElementById('second-player-name').value = '';
    document.getElementById('third-player-name').value = '';
    document.getElementById('fourth-player-name').value = '';
    document.getElementById('index__difficulty-container__title').textContent = '';
    const elementsToHide = ['endgame', 'game', 'game__comments', 'cat-unicorn', 'game__anecdote', 'game__nav', 'index__category-container', 'index__difficulty-container', 'category-validate'];
    const elementsToShow = ['index__main-title', 'index__img-unicorn', 'game__who-play', 'game__question', 'game__timer', 'game__answer-container', 'index__player', 'index__ranking-container', 'index__own-quiz-link'];
    hideOrShowElement(elementsToHide, elementsToShow);
    displayBestScores(document.getElementById('index__ranking-container__list'));
}

// listen btn go home of ending page
document.getElementById('home-mushroom').addEventListener('click', function (event) {
    fromScratch();
})

// backup of bestScores for test of localstorage functions in another computer
// [{"name":"A","score":500},{"name":"B","score":450},{"name":"C","score":400},{"name":"D","score":350},{"name":"E","score":300},{"name":"F","score":250},{"name":"G","score":200},{"name":"H","score":150},{"name":"I","score":100},{"name":"J","score":50}];

document.getElementById('index__ranking-container__btn-clear').addEventListener('click', function(event) {
    const warningText = "Warning, you're about to clear cache of the game. You won't have any scores store after. Are you sure you want to do that ?";
    if (confirm(warningText)) localStorage.removeItem('bestScores');
    window.location.reload();
})