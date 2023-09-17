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
let playersOfParty = [];

function getName() {
    const firstPlayerName = document.getElementById('first-player-name');
    const secondPlayerName = document.getElementById('second-player-name');
    const thirdPlayerName = document.getElementById('third-player-name');
    const fourthPlayerName = document.getElementById('fourth-player-name');
    
    // to erase blank space at start and end, to verify if input are not empty, and to assure we don't have two time the same player name, for each input name we use !==, trim() and includes methods
    if (firstPlayerName.value.trim() !== "" && !playersOfParty.includes(firstPlayerName.value)) playersOfParty.push(firstPlayerName.value);
    if (secondPlayerName.value.trim() !== "" && !playersOfParty.includes(secondPlayerName.value)) playersOfParty.push(secondPlayerName.value);
    if (thirdPlayerName.value.trim() !== "" && !playersOfParty.includes(thirdPlayerName.value)) playersOfParty.push(thirdPlayerName.value);
    if (fourthPlayerName.value.trim() !== "" && !playersOfParty.includes(fourthPlayerName.value)) playersOfParty.push(fourthPlayerName.value);
}

// get best scores data from local storage
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];

// an array to record each player score
let playerScores = [];

// ending party time
let gameOverTime = 0;

// to record name, score, time of ten best players
function saveBestScores() {
    for (let i = 0; i < playersOfParty.length; i++) {
        let party = {};
        party["name"] = playersOfParty[i];
        party["score"] = playerScores[i];
        party["time"] = gameOverTime;
        scores.push(party);
    }
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