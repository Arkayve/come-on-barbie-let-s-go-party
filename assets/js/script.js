
let data = {
    action: 'score-request',
    token: getToken()
}

fetchApi('POST', data)
    .then(data => {
        displayBestScores(data, document.getElementById('ranking__list'));       
    })
    .catch(error => {
        console.error("Error :", error);
    });

// get theme to display from local storaga
let modeToDisplay = localStorage.getItem('barbie-display-mode') || 'light';
// to change img in regards of theme
let lightOrDark = [
    {
        id: 'category__nav__btn-back',
        src: `assets/img/go-back-btn-${modeToDisplay}.png`
    },
    {
        id: 'category__nav__btn-validate',
        src: `assets/img/validate-btn-${modeToDisplay}.png`
    },
    {
        id: 'difficulty__btn-back',
        src: `assets/img/go-back-btn-${modeToDisplay}.png`
    },
    {
        id: 'game__nav__btn-end',
        src: `assets/img/end-party-btn-${modeToDisplay}.png`
    },
    {
        id: 'game__nav__btn-next',
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

// have the correct flag display at start
if (localStorage.getItem('barbie-lang') === 'fr') {
    document.getElementById('us').classList.add('hidden');
    document.getElementById('fr').classList.remove('hidden');
};

// To display correct language at start
if (!localStorage.getItem('barbie-lang')) {
    let data = {
        lang: 'us',
        action: 'lang-modify',
        token: getToken()
    }
    fetchApi('POST', data)
        .then(data => {
            displayLang(data);
            localStorage.setItem('barbie-lang', 'us');         
        })
        .catch(error => {
            console.error("Error :", error);
        });
}
else if (localStorage.getItem('barbie-lang')) {
    let data = {
        lang: localStorage.getItem('barbie-lang'),
        action: 'lang-modify',
        token: getToken()
    }
    fetchApi('POST', data)
        .then(data => {
            displayLang(data);       
        })
        .catch(error => {
            console.error("Error :", error);
        });
};

// to switch languages and store it in localstorage
let lang;
document.getElementById('flags').addEventListener('click', (event) => {
    document.getElementById('us').classList.toggle('hidden');
    document.getElementById('fr').classList.toggle('hidden');
    if (event.target.id === 'us') {
        lang = 'fr';
    }
    else {
        lang = 'us';
    }
    localStorage.setItem('barbie-lang', lang);
    let data = {
        lang: lang,
        action: 'lang-modify',
        token: getToken()
    }
    fetchApi('POST', data)
        .then(data => {
            displayLang(data);       
        })
        .catch(error => {
            console.error("Error :", error);
        });
});

// to display actual theme
if (localStorage.getItem('barbie-display-mode')) {
    changeModeImg();
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

// listen switch theme btn
document.getElementById("switch-mode").addEventListener("click", () => {
    document.querySelector(".sun-logo").classList.toggle("animate-sun");
    document.querySelector(".moon-logo").classList.toggle("animate-moon");
    switchMode()
});

// to animate unicorn on click
document.getElementById('main__img').addEventListener('click', function () {
    document.getElementById('main__img').classList.toggle('shakeIt');
});

// here we displayed right number of input name element
document.getElementById('player__number').addEventListener("change", function () {
    const maxPlayer = parseInt(document.getElementById('player__number').value);
    for (let i = 1; i < 4; i++) {
        const player = document.getElementById(i === 1 ? 'second-player-name' : i === 2 ? 'third-player-name' : 'fourth-player-name');
        player.classList.toggle('active', i < maxPlayer);
    }
});

// listen btn-category to reveal categories
document.getElementById('player__btn-category').addEventListener('click', function () {
    document.getElementById('category-responsive').innerHTML = "";
    let data = {
        lang: localStorage.getItem('barbie-lang'),
        action: 'category',
        token: getToken()
    }
    fetchApi('POST', data)
        .then(data => {
            data.forEach(i => {
                const newCategory = document.createElement('button');
                newCategory.setAttribute('type', 'button');
                newCategory.setAttribute('data-category-table-name', i['table_name']);
                newCategory.setAttribute('data-category-name', i['name']);
                newCategory.classList.add('btn', 'category__btn', 'flex', 'justify-center', 'w-90');
                newCategory.textContent = i['name'];
                document.getElementById('category-responsive').appendChild(newCategory);
            })     
            savePlayerName();
            displayCategories();      
        })
        .catch(error => {
            console.error("Error :", error);
        });
});

// to reset changes if btn pressed in homepage
document.getElementById('player__btn-reset').addEventListener('click', function (event) {
    fromScratch();
});

// clear ranking
document.getElementById('ranking__btn-clear').addEventListener('click', function (event) {
    const warningText = "Warning, you're about to clear ranking cache of the game. Are you sure you want to do that ?";
    if (confirm(warningText)) localStorage.removeItem('bestScores');
    window.location.reload();
});

// listen validate / go back buttons of categories
document.getElementById('category__nav').addEventListener('click', function (event) {
    if (!event.target.classList.contains('category__nav__img')) return;
    if (event.target.id === 'category__nav__btn-back') {
        window.scroll(0, 0);
        playerNames = [];
        returnToIndex();
    }
    if (event.target.id === 'category__nav__btn-validate') {
        mixQuestions(questions);
        window.scroll(0, 0);
        runGame();
    }
});

// listen which category of quiz we want
document.getElementById('category').addEventListener('click', function (event) {
    if (!event.target.classList.contains('category__btn')) return;
    removeSelectClassOfDifficultyBtn();
    // removing select class for all category
    document.querySelectorAll('.category__btn').forEach(btn => {
        btn.classList.remove('select');
    })
    // get category in a var
    categoryName = event.target.dataset.categoryName;
    categoryTableName = event.target.dataset.categoryTableName;

    displayDifficulty();
    // add select class if difficulty already added in questions for this category
    addSelectClassIfAlreadyClick();
});

// listen which difficulty of quiz we want
document.getElementById('difficulty').addEventListener('click', function (event) {
    if (event.target.dataset.value === 'back') {
        displayCategories();
    }
    if (!event.target.classList.contains('difficulty__btn') || !categoryName) return;
    difficulty = event.target.dataset.level;
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
    let data = {
        lang: localStorage.getItem('barbie-lang'),
        action: 'add-quiz',
        quiztable: categoryTableName,
        difficulty: difficulty,
        token: getToken()
    }
    fetchApi('POST', data)
        .then(data => {
            data.forEach(question => {
                questions.push(question);
            })
            // questions[count] = data.question;
            // count++;
            console.log(questions);      
        })
        .catch(error => {
            console.error("Error :", error);
        });
    colorCategory();
    // to display validate btn
    document.getElementById('category__nav__btn-validate').classList.remove('hidden');
});

// here we listen which button is pressed
document.getElementById('game__answer').addEventListener('click', function (event) {
    if (!event.target.classList.contains('game__answer__btn')) return;
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
    const elementsToHide = ['game__who-play', 'game__question', 'game__timer', 'game__answer'];
    const elementsToShow = ['game__comments', 'game__img', 'game__anecdote', 'game__nav'];
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
    if (event.target.id == 'game__nav__btn-end') {
        window.scroll(0, 0);
        if (playerScores[0] >= 0) {
            endGame();
        } else {
            fromScratch();
        }
    }
    if (event.target.id == 'game__nav__btn-next') {
        const elementsToHide = ['game__comments', 'game__img', 'game__anecdote', 'game__nav'];
        const elementsToShow = ['game__who-play', 'game__question', 'game__timer', 'game__answer'];
        hideOrShowElement(elementsToHide, elementsToShow);
        document.querySelectorAll('.game__answer__btn').forEach(btn => {
            btn.classList.remove('select');
        })
        window.scroll(0, 0);
        runGame();
    }
});

// listen btn go home of ending page
document.getElementById('endgame__btn-home').addEventListener('click', function (event) {
    window.scroll(0, 0);
    fromScratch();
});

document.getElementById('own-quiz-link').addEventListener('click', function (event) {
    const elementsToHide = ['index'];
    const elementsToShow = ['own-quiz'];
    hideOrShowElement(elementsToHide, elementsToShow);
})
