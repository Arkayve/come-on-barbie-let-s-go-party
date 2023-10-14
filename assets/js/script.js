// get best scores data from local storage
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];
// get theme to display from local storaga
let modeToDisplay = localStorage.getItem('barbie-display-mode') || 'light';
// to change img in regards of theme
let lightOrDark = [
    {
        id: 'index__category-container__btn-back',
        src: `assets/img/go-back-btn-${modeToDisplay}.png`
    },
    {
        id: 'index__category-container__btn-validate',
        src: `assets/img/validate-btn-${modeToDisplay}.png`
    },
    {
        id: 'index__difficulty-container__btn-back',
        src: `assets/img/go-back-btn-${modeToDisplay}.png`
    },
    {
        id: 'game-end',
        src: `assets/img/end-party-btn-${modeToDisplay}.png`
    },
    {
        id: 'game-next',
        src: `assets/img/validate-btn-${modeToDisplay}.png`
    }
];
// to record name of each player
let playerNames = [];
// to record score of each player
let playerScores = [];
// to make ratio
let questionsAnswered = 0;
// to have a timer in the game
let endTime;
let s;
// possibility to store as many quiz as you wish
let count = 0;
// to know each quiz already selected
let alreadySelected = [];
let alreadySelectedCount = 0;
// to have a variable with all questions
let questions = [];
// here is two variables to select which quiz we want regarding to difficulty
let categoryName;
let difficulty;
// to display answer and anecdote
let anecdote;
let answer;
// to know which player has to play
let round = 0;


// to display actual theme
if (localStorage.getItem('barbie-display-mode')) {
    colorElementForMode();
};
if (modeToDisplay === 'light') {
    document.querySelector(':root').style.setProperty('--opacityThemeDisplay', 1);
    document.querySelector(':root').style.setProperty('--opacityThemeHide', 0);
}
else if (modeToDisplay === 'dark') {
    document.querySelector(':root').style.setProperty('--opacityThemeDisplay', 0);
    document.querySelector(':root').style.setProperty('--opacityThemeHide', 1);
    document.querySelector('.moon-logo').style.setProperty('transform', 'translateY(0%) rotateZ(0deg)');
};

// display scores if exist, or small sentences if not
displayBestScores(document.getElementById('index__ranking-container__list'));

// listen switch theme btn
document.getElementById("index__switch-mode-container").addEventListener("click", () => {
    document.querySelector(".sun-logo").classList.toggle("animate-sun");
    document.querySelector(".moon-logo").classList.toggle("animate-moon");
    switchMode()
});

// to animate unicorn on click
document.getElementById('index__img-unicorn').addEventListener('click', function () {
    document.getElementById('index__img-unicorn').classList.toggle('shakeIt');
});

// here we displayed right number of input name element
document.getElementById('index__player__number').addEventListener("change", function () {
    const maxPlayer = parseInt(document.getElementById('index__player__number').value);
    for (let i = 1; i < 4; i++) {
        const player = document.getElementById(i === 1 ? 'second-player-name' : i === 2 ? 'third-player-name' : 'fourth-player-name');
        player.classList.toggle('active', i < maxPlayer);
    }
});

// listen btn-category to reveal categories
document.getElementById('index__player__btn-category').addEventListener('click', function () {
    savePlayerName();
    displayCategories();
});

// to reset changes if btn pressed in homepage
document.getElementById('index__player__btn-reset').addEventListener('click', function (event) {
    fromScratch();
});

// clear ranking
document.getElementById('index__ranking-container__btn-clear').addEventListener('click', function (event) {
    const warningText = "Warning, you're about to clear ranking cache of the game. Are you sure you want to do that ?";
    if (confirm(warningText)) localStorage.removeItem('bestScores');
    window.location.reload();
});

// listen validate / go back buttons of categories
document.getElementById('index__category-container__nav').addEventListener('click', function (event) {
    if (!event.target.classList.contains('index__category-container__nav__img')) return;
    if (event.target.id === 'index__category-container__btn-back') {
        window.scroll(0, 0);
        playerNames = [];
        returnToIndex();
    }
    if (event.target.id === 'index__category-container__btn-validate') {
        mixQuestions(questions);
        window.scroll(0, 0);
        runGame();
    }
});

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
});

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
    document.getElementById('index__category-container__btn-validate').classList.remove('hidden');
});

// here we listen which button is pressed
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
    // increment this var to calculate ratio
    questionsAnswered++;
    // to replace window on top
    window.scroll(0, 0);
    // we display anecdote for each question
    document.getElementById('game__anecdote').textContent = anecdote;
    const elementsToHide = ['game__who-play', 'game__question', 'game__timer', 'game__answer-container'];
    const elementsToShow = ['game__comments', 'cat-unicorn', 'game__anecdote', 'game__nav'];
    hideOrShowElement(elementsToHide, elementsToShow);
    endTimer();
    // and here we display personal sentence for each player
    if (event.target.textContent === answer) {
        !playerScores[round] ? playerScores[round] = 50 : playerScores[round] += 50;
        playerScores[round] += endTime;
        document.getElementById('game__comments').textContent = `Well done ${playerNames[round]} ! Your actual score is ${playerScores[round]}.`;
    } else {
        if (!playerScores[round]) playerScores[round] = 0;
        document.getElementById('game__comments').textContent = `Soz, maybe next time, ${playerNames[round]}. Your actual score is ${playerScores[round]}.`;
    }
    round++;
});

// to listen game nav btn, hide what have to be hide, remove select class and go to next round
document.getElementById('game__nav').addEventListener('click', function (event) {
    if (!event.target.classList.contains('game__nav__img')) return;
    if (event.target.id == 'game-end') {
        window.scroll(0, 0);
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
        window.scroll(0, 0);
        runGame();
    }
});

// listen btn go home of ending page
document.getElementById('home-mushroom').addEventListener('click', function (event) {
    window.scroll(0, 0);
    fromScratch();
});
