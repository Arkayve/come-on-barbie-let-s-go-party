<?php
include_once 'assets/includes/_config.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="shortcut icon" type="png" href="assets/img/star-icon.png" />
    <title>Come on Barbie let's go party</title>
</head>

<body data-theme="light">

    <header>
    </header>

    <main>
        <section id="index">
            <div class="main flex">
                <h1 id="main__title">Come on Barbie let's go party !</h1>
                <div id="switch-mode" class="switch-mode">
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
                <div id="flags" class="flags">
                    <img id="us" class="img flag" src="assets/img/usa.png" alt="usa flag">
                    <img id="fr" class="img flag hidden" src="assets/img/france.png" alt="france flag">
                </div>
            </div>
            <img id="main__img" class="main__img w-90 max-w-500" alt="dabbing unicorn" src="assets/img/unicorn-bg.png">
            <div class="player-responsive justify-center w-90 m-auto">
                <div id="player" class="flex column align-center">
                    <h2><?=$data['playerNumber'][$count]?></h2>
                    <select id="player__number" class="btn player__number">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <input id="first-player-name" type="text" placeholder="<?=$data['firstPlayerName'][$count]?>" class="btn player__name max-w-500 active">
                    <input id="second-player-name" type="text" placeholder="<?=$data['secondPlayerName'][$count]?>" class="btn player__name max-w-500">
                    <input id="third-player-name" type="text" placeholder="<?=$data['thirdPlayerName'][$count]?>" class="btn player__name max-w-500">
                    <input id="fourth-player-name" type="text" placeholder="<?=$data['fourthPlayerName'][$count]?>" class="btn player__name max-w-500">
                    <button type="button" id="player__btn-category" class="btn player__btn-category w-90 max-w-500"><?=$data['playerBtnCategory'][$count]?></button>
                    <button type="button" id="player__btn-reset" class="btn player__btn-reset"><?=$data['playerBtnReset'][$count]?></button>
                </div>
                <div id="ranking">
                    <h3 id="ranking__title" class="ranking__title"><?=$data['rankingTitle'][$count]?></h3>
                    <ol id="ranking__list" class="btn ranking__list w-90 max-w-500 m-auto"></ol>
                    <a id="own-quiz-link" class="own-quiz-link" href="#"><?=$data['ownQuizLink'][$count]?></a>
                    <button type="button" id="ranking__btn-clear"
                        class="btn ranking__btn-clear"><?=$data['rankingBtnClear'][$count]?></button>
                </div>
            </div>
            <div id="category" class="category hidden">

                <h2 id="category__title" class="category__title"><?=$data['categoryTitle'][$count]?></h2>

                <div id="category-responsive" class="category-responsive flex align-center justify-center column">
                    <?php
                        foreach ($quiz as $theme) {
                            $file = substr($theme['file'], 0, -5);
                            echo "<button type='button' class='btn category__btn flex justify-center w-90' data-category-name='{$file}'>{$theme['name'][$count]}</button>";
                        };
                    ?>
                </div>

                <div id="difficulty"
                    class="difficulty flex column align-center justify-around hidden">
                    <h2 id="difficulty__title"></h2>
                    <div class="difficulty-responsive justify-around">
                        <img src="assets/img/panfa-kawai.png" alt="panda kawai"
                            class="difficulty-responsive__img">
                        <div class="difficulty-responsive__btn">
                            <button id="débutant" type="button"
                                class="btn difficulty__btn easy w-90 max-w-500"><?=$data['easy'][$count]?></button>
                            <button id="confirmé" type="button"
                                class="btn difficulty__btn medium w-90 max-w-500"><?=$data['medium'][$count]?></button>
                            <button id="expert" type="button"
                                class="btn difficulty__btn hard w-90 max-w-500"><?=$data['hard'][$count]?></button>
                        </div>
                        <img src="assets/img/unicorn-star.png" alt="unicorn with a star"
                            class="difficulty-responsive__img">
                    </div>
                    <img id="difficulty__btn-back" src="assets/img/go-back-btn-light.png" alt="icon arrow left" data-value="back"
                        class="img difficulty__nav__img">
                </div>

                <div id="category__nav" class="category__nav flex justify-around">
                    <img src="assets/img/go-back-btn-light.png" alt="icon arrow left" id="category__nav__btn-back"
                        class="img category__nav__img">
                    <img src="assets/img/validate-btn-light.png" alt="icon validate" id="category__nav__btn-validate"
                        class="img category__nav__img hidden">
                </div>
            </div>

        </section>

        <section id="game" class="game hidden">

            <h2 id="game__who-play" class="game__who-play"></h2>
            <h4 id="game__question" class="btn game__question max-w-500 m-auto"></h4>
            <p id="game__timer" class="btn game__timer"></p>

            <div id="game__answer" class="game__answer flex column align-center">
                <button type="button" id="btn-answer-0" class="btn game__answer__btn w-90"></button>
                <button type="button" id="btn-answer-1" class="btn game__answer__btn w-90"></button>
                <button type="button" id="btn-answer-2" class="btn game__answer__btn w-90"></button>
                <button type="button" id="btn-answer-3" class="btn game__answer__btn w-90"></button>
            </div>

            <p id="game__comments" class="btn game__comments max-w-500 hidden"></p>
            <img src="assets/img/cat-unicorn.png" alt="cat with unicorn costum" id="game__img"
                class="game__img hidden">
            <p id="game__anecdote" class="game__anecdote w-90 max-w-500 hidden"></p>
            <div id="game__nav" class="game__nav flex justify-around hidden">
                <img src="assets/img/end-party-btn-light.png" alt="icon arrow left" id="game__nav__btn-end" class="img game__nav__img">
                <img src="assets/img/validate-btn-light.png" alt="icon validate" id="game__nav__btn-next" class="img game__nav__img">
            </div>

        </section>

        <section id="endgame" class="endgame hidden flex column align-center">
            <h2><?=$data['endgameTitle'][$count]?></h2>
            <p id="endgame__stats" class="endgame__stats w-90 max-w-500"></p>
            <img src="assets/img/unicorn-ftw.png" alt="glory unicorn" class="endgame__img w-90 max-w-500">
            <img src="assets/img/home-mushroom.png" alt="home mushroom" id="endgame__btn-home" class="img endgame__btn-home">
        </section>

        <section id="own-quiz" class="own-quiz hidden">
            <h2><?=$data['ownQuizTitle'][$count]?></h2>
            <input id="own-quiz__name" class="own-quiz__name" type="text" placeholder="<?=$data['ownQuizName'][$count]?>">
            <h3><?=$data['ownQuizPrecision'][$count]?></h3>
            <input id="own-quiz__first-answer" class="own-quiz__answer" type="text" placeholder="<?=$data['firstProposition'][$count]?>">
            <input id="own-quiz__second-answer" class="own-quiz__answer" type="text" placeholder="<?=$data['secondProposition'][$count]?>">
            <input id="own-quiz__third-answer" class="own-quiz__answer" type="text" placeholder="<?=$data['thirdProposition'][$count]?>">
            <input id="own-quiz__fourth-answer" class="own-quiz__answer" type="text" placeholder="<?=$data['fourthProposition'][$count]?>">
            <h3><?=$data['goodAnswerIs'][$count]?></h3>
            <div>
                <input id="own-quiz__first-radio" type="radio" value="1">
                <label for="own-quiz__first-radio"><?=$data['firstProposition'][$count]?></label>
            </div>
            <div>
                <input id="own-quiz__second-radio" type="radio" value="2">
                <label for="own-quiz__second-radio"><?=$data['secondProposition'][$count]?></label>
            </div>
            <div>
                <input id="own-quiz__third-radio" type="radio" value="3">
                <label for="own-quiz__third-radio"><?=$data['thirdProposition'][$count]?></label>
            </div>
            <div>
                <input id="own-quiz__fourth-radio" type="radio" value="4">
                <label for="own-quiz__fourth-radio"><?=$data['fourthProposition'][$count]?></label>
            </div>
            <h3><?=$data['anecdoteTitle'][$count]?></h3>
            <textarea id="own-quiz__anecdote" class="own-quiz__anecdote" placeholder="<?=$data['anecdoteText'][$count]?>"></textarea>
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