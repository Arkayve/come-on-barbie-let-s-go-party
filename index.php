<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/keyframes.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    <link rel="stylesheet" href="assets/css/switch.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="shortcut icon" type="png" href="assets/img/star-icon.png" />
    <title>Come on Barbie let's go party</title>
</head>

<body data-theme="light">

    <header>
    </header>

    <main>
        <section id="index">
            <div class="index__main-title-container">
                <h1 id="index__main-title">Come on Barbie let's go party !</h1>
                <div id="index__switch-mode-container" class="index__switch-mode-container">
                    <div class="sun sun-logo">
                        <svg viewBox="0 0 512 512" width="50" title="sun">
                            <path
                                d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
                        </svg>
                    </div>
                    <div class="moon moon-logo">
                        <svg viewBox="0 0 512 512" width="50" title="moon">
                            <path
                                d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
                        </svg>
                    </div>
                </div>
            </div>
            <img id="index__img-unicorn" class="unicorn" alt="dabbing unicorn" src="assets/img/unicorn-bg.png">
            <div class="index__responsive-container">
                <div id="index__player" class="flex column align-center">
                    <h2>How many players are you ?</h2>
                    <select id="index__player__number" class="index__player__number">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <input id="first-player-name" type="text" placeholder="First player name ?"
                        class="index__player__name active">
                    <input id="second-player-name" type="text" placeholder="Second player name ?"
                        class="index__player__name">
                    <input id="third-player-name" type="text" placeholder="Third player name ?"
                        class="index__player__name">
                    <input id="fourth-player-name" type="text" placeholder="Fourth player name ?"
                        class="index__player__name">
                    <button type="button" id="index__player__btn-category"
                        class="btn index__player__btn-category">Select
                        category</button>
                    <button type="button" id="index__player__btn-reset" class="btn index__player__btn-reset">Reset
                        changes</button>
                </div>
                <div id="index__ranking-container">
                    <h3 id="index__ranking-container__title" class="index__ranking-container__title">They're simply the
                        best
                        :</h3>
                    <ol id="index__ranking-container__list" class="index__ranking-container__list"></ol>
                    <a id="index__own-quiz-link" class="index__own-quiz-link" href="#">Wanna make your own quiz ?</a>
                    <button type="button" id="index__ranking-container__btn-clear"
                        class="btn index__ranking-container__btn-clear">Clear ranking</button>
                </div>
            </div>
            <div id="index__category-container" class="index__category-container hidden">

                <h2 id="index__category-container__title" class="index__category-container__title">Select category :
                </h2>

                <div id="index__category-responsive"
                    class="index__category-responsive flex align-center justify-center column">
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="bieres_belges">Bières belges</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="covid_19">COVID-19</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="culture_en_vrac">Culture en
                        vrac</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="dessins_animes">Dessins
                        animés</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="faits_de_societe">Faits de
                        société</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="grands_monuments">Grands
                        monuments</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="heros_de_kaamelott">Héros de
                        Kaamelott</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="marques_et_slogans">Marques et
                        slogans</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="mont_saint_michel">Mont
                        Saint-Michel</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="mythes_et_legendes">Mythes et
                        légendes</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="paris_de_nos_jours">Paris de nos
                        jours</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="series_americaines">Séries
                        américaines</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="star_trek">Star Trek</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="stats_internet_2018">Stats internet
                        2018</button>
                    <button type="button" class="btn index__category-container__btn flex justify-center"
                        data-category-name="x_files">X-Files</button>
                </div>

                <div id="index__difficulty-container"
                    class="index__difficulty-container flex column align-center hidden">
                    <h2 id="index__difficulty-container__title"></h2>
                    <div class="index__difficulty-responsive">
                        <img src="assets/img/panfa-kawai.png" alt="panda kawai"
                            class="index__difficulty-responsive__img">
                        <div class="index__difficulty-responsive__btn">
                            <button id="débutant" type="button"
                                class="btn index__difficulty-container__btn easy">Easy</button>
                            <button id="confirmé" type="button"
                                class="btn index__difficulty-container__btn medium">Medium</button>
                            <button id="expert" type="button"
                                class="btn index__difficulty-container__btn hard">Hard</button>
                        </div>
                        <img src="assets/img/unicorn-star.png" alt="unicorn with a star"
                            class="index__difficulty-responsive__img">
                    </div>
                    <img id="index__difficulty-container__btn-back" src="assets/img/go-back-btn-light.png" alt="icon arrow left" data-value="back"
                        class="index__difficulty-container__nav__img">
                </div>

                <div id="index__category-container__nav" class="index__category-container__nav flex">
                    <img src="assets/img/go-back-btn-light.png" alt="icon arrow left" id="index__category-container__btn-back"
                        class="index__category-container__nav__img">
                    <img src="assets/img/validate-btn-light.png" alt="icon validate" id="index__category-container__btn-validate"
                        class="index__category-container__nav__img hidden">
                </div>
            </div>

        </section>

        <section id="game" class="game hidden">

            <h2 id="game__who-play" class="game__who-play"></h2>
            <h4 id="game__question" class="game__question"></h4>
            <p id="game__timer" class="game__timer"></p>

            <div id="game__answer-container" class="game__answer-container flex column align-center">
                <button type="button" id="btn-answer-0" class="btn game__answer-container__btn"></button>
                <button type="button" id="btn-answer-1" class="btn game__answer-container__btn"></button>
                <button type="button" id="btn-answer-2" class="btn game__answer-container__btn"></button>
                <button type="button" id="btn-answer-3" class="btn game__answer-container__btn"></button>
            </div>

            <p id="game__comments" class="game__comments hidden"></p>
            <img src="assets/img/cat-unicorn.png" alt="cat with unicorn costum" id="cat-unicorn"
                class="cat-unicorn hidden">
            <p id="game__anecdote" class="game__anecdote hidden"></p>
            <div id="game__nav" class="game__nav flex hidden">
                <img src="assets/img/end-party-btn-light.png" alt="icon arrow left" id="game-end" class="game__nav__img">
                <img src="assets/img/validate-btn-light.png" alt="icon validate" id="game-next" class="game__nav__img">
            </div>

        </section>

        <section id="endgame" class="endgame hidden flex column align-center">
            <h2>Here are your game stats !</h2>
            <p id="endgame__stats" class="endgame__stats"></p>
            <img src="assets/img/unicorn-ftw.png" alt="glory unicorn" class="glory-unicorn">
            <img src="assets/img/home-mushroom.png" alt="home mushroom" id="home-mushroom" class="home-mushroom">
        </section>

        <section id="own-quiz" class="own-quiz hidden">
            <h2>Here you can make your own quiz.</h2>
            <input id="own-quiz__name" class="own-quiz__name" type="text" placeholder="What is the name of your quiz ?">
            <h3>You must give four possible answers.</h3>
            <input id="own-quiz__first-answer" class="own-quiz__answer" type="text" placeholder="First proposition.">
            <input id="own-quiz__second-answer" class="own-quiz__answer" type="text" placeholder="Second proposition.">
            <input id="own-quiz__third-answer" class="own-quiz__answer" type="text" placeholder="Third proposition.">
            <input id="own-quiz__fourth-answer" class="own-quiz__answer" type="text" placeholder="Fourth proposition.">
            <h3>We have to know which is the good answer : </h3>
            <div>
                <input id="own-quiz__first-answer__radio" type="radio" value="1">
                <label for="own-quiz__first-answer__radio">First proposition</label>
            </div>
            <div>
                <input id="own-quiz__second-answer__radio" type="radio" value="2">
                <label for="own-quiz__second-answer__radio">Second proposition</label>
            </div>
            <div>
                <input id="own-quiz__third-answer__radio" type="radio" value="3">
                <label for="own-quiz__third-answer__radio">Third proposition</label>
            </div>
            <div>
                <input id="own-quiz__fourth-answer__radio" type="radio" value="4">
                <label for="own-quiz__fourth-answer__radio">Fourth proposition</label>
            </div>
            <h3>Everyone likes anecdote. Please let us know something about your question.</h3>
            <textarea id="own-quiz__anecdote" class="own-quiz__anecdote" placeholder="Type your text here."></textarea>
        </section>

    </main>

    <footer>
    </footer>

    <script src="assets/js/data.js"></script>
    <script src="assets/js/storage.js"></script>
    <script src="assets/js/functions.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>