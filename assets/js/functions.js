// from lightOrDark array, choose whitch img to display
function changeModeImg() {
    document.querySelector('body').dataset.theme = modeToDisplay;
    lightOrDark.forEach(i => {
        document.getElementById(i.id).setAttribute('src', i.src);
    })
    saveActualMode ();
}

// save actual mode in local storage
function saveActualMode () {
    localStorage.setItem('barbie-display-mode', modeToDisplay);
}

// change game theme
function switchMode() {
    if (document.querySelector('body').dataset.theme === 'light') {
        modeToDisplay = 'dark';
        changeModeImg();
    }
    else if (document.querySelector('body').dataset.theme === 'dark') {
        modeToDisplay = 'light';
        changeModeImg();
    }
}

// function to add or remove hidden class from arrays
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

// display best scores, take location in parameter
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

// save each player name in array playerNames
function savePlayerName() {
    const playerNameIdArray = ['first-player-name', 'second-player-name', 'third-player-name', 'fourth-player-name'];
    const maxPlayer = parseInt(document.getElementById('index__player__number').value);
    for (let i = 0; i < maxPlayer; i++) {
        const playerName = document.getElementById(playerNameIdArray[i]).value.trim();
        if (playerName !== "" && !playerNames.includes(playerName)) {
            playerNames[i] = playerName;
        }
        playerNames.splice(maxPlayer, 3)
    }
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

// function to display categories
function displayCategories() {
    // here we verify if playernames fields aren't empty, and correspond to number of players
    if (playerNames.length === 0 || document.getElementById('index__player__number').value != playerNames.length) return;
    const elementsToHide = ['index__main-title', 'index__switch-mode-container', 'index__img-unicorn', 'index__player', 'index__difficulty-container', 'index__ranking-container', 'index__own-quiz-link'];
    const elementsToShow = ['index__category-container', 'index__category-responsive', 'index__category-container__title', 'index__category-container__nav'];
    hideOrShowElement(elementsToHide, elementsToShow);
    colorCategory();
    removeSelectClassOfDifficultyBtn();
    window.scroll(0, 0);
}

// to display difficulties on mobile, need to manage hidden class on many div
function displayDifficulty() {
    const elementsToHide = ['index__category-container__nav', 'index__category-responsive', 'index__category-container__title'];
    const elementsToShow = ['index__difficulty-container'];
    hideOrShowElement(elementsToHide, elementsToShow);
}

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

// a function to go back to homepage
function returnToIndex() {
    const elementsToHide = ['index__category-container'];
    const elementsToShow = ['index__main-title', 'index__switch-mode-container', 'index__img-unicorn', 'index__player', 'index__ranking-container', 'index__own-quiz-link'];
    hideOrShowElement(elementsToHide, elementsToShow);
    document.getElementById('index__difficulty-container__title').textContent = '';
}

// run game, start timer, count round, and display question
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

function makeRound() {
    if (round === playerNames.length) round = 0;
    document.getElementById('game__who-play').textContent = `Hey ${playerNames[round]}, it's your turn. ${questions.length} question${questions.length > 1 ? 's' : ''} left.`;
}

// function to flat all item and random questions order
// .flat to have unidimensional array ; first .map to add order value which is randomize, and item to store precedent state of object
// .sort to randomize element in array by using order value, then second .map to get back precedent state of each object after randomize them
function mixQuestions(array) {
    questions = array.flat().map(item => ({ item, order: Math.random() })).sort((a, b) => a.order - b.order).map(item => item.item);
}

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

// start new timer
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

// end timer
function endTimer() {
    clearInterval(timer);
    endTime = Math.round(s);
}

// function to add or remove select class from answer buttons
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

// when game ending, sort scores, display who wins, makes personal sentences for players, call saveBestScores
function endGame() {
    const bestPlayer = [];
    document.getElementById('game').classList.add('hidden');
    document.getElementById('endgame').classList.remove('hidden');
    // here we make an array of object with names and scores
    for (const i in playerNames) {
        let playerOfParty = {};
        playerOfParty["name"] = playerNames[i];
        playerOfParty["score"] = playerScores[i];
        bestPlayer.push(playerOfParty);
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
    saveBestScores();
}

// here we reset all game values, all variables
function fromScratch() {
    playerNames = [];
    playerScores = [];
    count = 0;
    alreadySelected = [];
    alreadySelectedCount = 0;
    questions = [];
    questionsAnswered = 0;
    categoryName = undefined;
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
    const elementsToHide = ['endgame', 'game', 'game__comments', 'cat-unicorn', 'game__anecdote', 'game__nav', 'index__category-container', 'index__difficulty-container', 'index__category-container__btn-validate'];
    const elementsToShow = ['index__main-title', 'index__switch-mode-container', 'index__img-unicorn', 'game__who-play', 'game__question', 'game__timer', 'game__answer-container', 'index__player', 'index__ranking-container', 'index__own-quiz-link'];
    hideOrShowElement(elementsToHide, elementsToShow);
    displayBestScores(document.getElementById('index__ranking-container__list'));
    document.getElementById('second-player-name').classList.remove('active');
    document.getElementById('third-player-name').classList.remove('active');
    document.getElementById('fourth-player-name').classList.remove('active');
    document.getElementById('index__player__number').value = 1;
}
