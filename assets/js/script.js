// to listen and store players'number
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

// to record name, score, time of ten best players
let scores = JSON.parse(localStorage.getItem('bestScores')) || [];
let gameOverTime;
let gamerName;
let score;

function getName(id) {
    gamerName = document.getElementById(id).value;
    if (gamerName.trim() !== "") savePlayerInformation();
}

function savePlayerInformation() {
    let party = {};
    party["name"] = gamerName;
    party["score"] = score;
    party["time"] = gameOverTime;
    scores.push(party);
    scores.sort((a, b) => b.score - a.score);
    const maxScoresToKeep = 10;
    scores = scores.slice(0, maxScoresToKeep);
    localStorage.setItem('bestScores', JSON.stringify(scores));
    console.log(scores);
}

