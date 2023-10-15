// to get proper array from json file
function getQuiz(json) {
    fetch(json)
        .then(response => response.json())
        .then(data => {
            questions[count] = data.quizz.en[difficulty];
            count++;
        })
        .catch(error => {
            console.error("Error :", error);
        });
}