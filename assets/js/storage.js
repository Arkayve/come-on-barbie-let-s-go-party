// to save scores of each players in scores array
function saveBestScores() {
    questionsAnswered = questionsAnswered / playerNames.length;
    for (const i in playerNames) {
        let player = {
            name: playerNames[i],
            score: playerScores[i],
            ratio: playerScores[i] / questionsAnswered
        };
        if (player.score !== 0) {
        scores.push(player);
        };
    };
    sortPlayerScores();
    saveInLocalStorage();
}

// to sort scores by score, or ratio if same score
function sortPlayerScores() {
    scores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        } else {
            return b.ratio - a.ratio;
        }
    })
}

// to save scores in local storage
function saveInLocalStorage() {
    const maxScoresToKeep = 10;
    scores = scores.slice(0, maxScoresToKeep);
    localStorage.setItem('bestScores', JSON.stringify(scores));
}

// Need to listen click on flags. Store actual language in localstorage
function saveActualLanguage(event) {
    if (event.target.id === 'us') {
        localStorage.setItem('barbie-lang', 'fr');
    }
    else {
        localStorage.setItem('barbie-lang', 'us');
    }
}