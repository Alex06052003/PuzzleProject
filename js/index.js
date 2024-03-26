/*Кнопки главного меню*/
let menuBtnSelectLvl = document.querySelector(`#btn-menu-selectLvl`);
let menuBtnSettings = document.querySelector(`#btn-menu-settings`);
let menuBtnHelp = document.querySelector(`#btn-menu-help`);

let gameMenu = document.querySelector(`.game-menu`);
let navigation = document.querySelector(`.navigation`);
let main = document.querySelector(`.main`);


/*Область с ячейками*/
let mainWindowPuzzle = document.querySelector(`#main-puzzle`);
let mainWindowPicture = document.querySelector(`#main-picture`);

/*Область с кнопками для выбора лвл*/
let headerBtn = document.querySelector(`.header-btn`);

/*Подсказка*/
let btnHelp = document.querySelector(`#btn-help`);
let windowHelp = document.querySelector(`#window-help`);

/*Область с пазлами*/
let placePuzzle = document.querySelector(`#place-puzzle`);

/*Размеры для сбора сетки*/
let wTile = 9;
let hTile = 6;

/*Площадь изображения*/
let S = hTile * wTile;

/*Размеры для сбора пазлов*/
wPuz = 14;
hPuz = 4;

/*Элементы строк и столбцов сетки*/
let tileS = `<div class="d-flex main-puzzle">`;
let tileE = `</div>`;

let puzS = `<div class="d-flex place-puzzle">`;
let puzE = `</div>`;

/*Выбранный пазл и ячейка куда он поместиться*/
let activePuz = ``;
let targetPuz = ``;

/*Сборка сетки из ячеек*/
function selectLvl(evt) {

    /*Куда мы нажали*/
    let node = evt.target;
    btn = node.closest(`.card`);

    /*Проверка, что нажали на кнопку*/
    if (btn) {
        soundClick.play();
        /*Сюда собираются пазлы*/
        let tile = ``;
        let puz = ``;

        /*Значние для пазлов (путь к картинкам)*/
        let counter = 0;
        let val = 0;

        /*Всё стираем для дальнейшего заполнения*/
        mainWindowPuzzle.innerHTML = ``;
        mainWindowPicture.innerHTML = ``;

        /*Получаем значение нажатой кнопки*/
        val = Number(btn.getAttribute("data-value"));

        let headerHead = document.querySelector(`.header-head2`);
        headerHead.innerHTML = `Level ${val}`;
        let headerBtn = document.querySelector(`.header-btn`);
        headerBtn.classList.add(`d-none`);

        /*Сборка сетки*/
        let saveJ = 0;
        for (let i = 0; i < hTile; i++) {
            tile += tileS;
            for (let j = 0; j < wTile; j++) {
                tile += `<div class="p${saveJ} item-tile"></div>`;
                saveJ++;
            }
            tile += tileE;
        }

        /*Сборка пазлов*/
        let arr = gerRandomNum(S);
        for (let i = 0; i < hPuz; i++) {
            puz += puzS;
            for (let j = 0; j < wPuz; j++) {
                puz += `<div id="p${arr[counter] - 1}" class="item-puz">
                            <img class="p${arr[counter] - 1} image" src="assets/pic${val}/${arr[counter]}.png" alt="">
                        </div>`;
                counter++;
                if (counter >= S) {
                    break;
                }
            }
            puz += puzE;
        }

        /*Вставляем картинку, которую надо собрать*/
        mainWindowPicture.innerHTML = `<div class="main-picture">
                                            <img src="assets/pic${val}/picture${val}.png" alt="" width="420px" height="270px">
                                        </div>`;

        /*Вставляем сетку для пазлов*/
        mainWindowPuzzle.innerHTML = tile;

        /*Удаляем класс закрывающий кнопку "Подсказка"*/
        btnHelp.classList.remove(`d-none`);

        /*Вставляем пазлы*/
        placePuzzle.innerHTML = puz;
    }
}

/*Генерация рандомных и уникальных чисел от 1 до S с выводом массива*/
function gerRandomNum(max) {
    let min = 1;
    let i = min;
    let arrRandomNum = [];
    let randomNum;

    while (i <= max) {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!arrRandomNum.includes(randomNum)) {
            arrRandomNum.push(randomNum);
            i++;
        } else {
            continue;
        }
    }
    return arrRandomNum;
}


/*Функция для выбора пазла*/
function selectPuzzle(evt) {
    let node = evt.target;

    if (node.closest(`.item-puz`) && !node.closest(`.block-puz`)) {
        soundSelect.play();
        if (activePuz == ``) {
            node = node.closest(`.item-puz`);
            activePuz = node;
            activePuz.classList.add(`select-puz`);
        } else {
            activePuz.classList.remove(`select-puz`);
            activePuz = ``;
            node = node.closest(`.item-puz`);
            activePuz = node;
            activePuz.classList.add(`select-puz`);
        }
    }
}

/*Функция для вставки пазла в сетку*/
function pastePuzzle(evt) {
    let node = evt.target;
    node = node.closest(`.item-tile`);

    if (node) {
        targetPuz = node;

        if (activePuz != `` && node.innerHTML === ``) {
            soundPaste.play();
            let classes1 = targetPuz.classList[0];
            let classes2 = activePuz.querySelector(`.image`).classList[0];
            activePuz.classList.add(`block-puz`);
            activePuz = activePuz.querySelector(`.image`);
            targetPuz.innerHTML = activePuz.outerHTML;
            if (classes1 == classes2) {
                targetPuz.classList.add(`complete-tile`);
            }

        } else if (activePuz == `` && node.innerHTML !== ``) {
            soundPaste.play();
            targetPuz = targetPuz.querySelector(`.image`);
            let classes = targetPuz.classList[0];
            activePuz = document.querySelector(`#${classes}`);
            activePuz.classList.remove(`block-puz`);
            activePuz.classList.remove(`select-puz`);
            targetPuz = node;
            targetPuz.innerHTML = ``;

        } else if (activePuz != `` && node.innerHTML !== ``) {
            targetPuz = targetPuz.querySelector(`.image`);
            let classes = targetPuz.classList[0];
            let prevActivePuz = document.querySelector(`#${classes}`);
            prevActivePuz.classList.remove(`block-puz`);
            prevActivePuz.classList.remove(`select-puz`);
            targetPuz = node;
            targetPuz.innerHTML = ``;
            let classes1 = targetPuz.classList[0];
            let classes2 = activePuz.querySelector(`.image`).classList[0];
            activePuz.classList.add(`block-puz`);
            activePuz = activePuz.querySelector(`.image`);
            targetPuz.innerHTML = activePuz.outerHTML;
            if (classes1 == classes2) {
                targetPuz.classList.add(`complete-tile`);
            }
        }
        activePuz = ``;
    }
}

/*Музыка*/
let soundButtons = document.querySelectorAll('#soundButton');
let sound = document.getElementById('sound');

/*Звук для нажатия кнопки*/
let soundClick = document.getElementById('soundClick');

/*Звук для вставки пазла*/
let soundPaste = document.getElementById('soundPaste');

/*Звук для выбора пазла*/
let soundSelect = document.getElementById('soundSelect');

/*Обработчик нажатий кнопки звука (вкл/выкл)*/
for (let i = 0; i < soundButtons.length; i++) {
    let soundButton = soundButtons[i];
    soundButton.addEventListener('click', () => {
        soundClick.play();
        if (sound.paused) {
            sound.volume = 0.5;
            sound.play();
            soundButton.innerHTML = `<img class="music" src="assets/not.png" alt="volume">`;
        } else {
            sound.pause();
            sound.currentTime = 0;
            soundButton.innerHTML = `<img class="music" src="assets/!not.png" alt="volume">`;
        }
    });
}

/*Кнопка для смены темы приложения*/
let themeButtons = document.querySelectorAll('#themeButton');
let bodyTheme = document.getElementById('body');

/*Обработчик для кнопки смены темы в приложении*/
for (let i = 0; i < themeButtons.length; i++) {
    let themeButton = themeButtons[i];
    themeButton.addEventListener('click', () => {
        soundClick.play();
        if (bodyTheme.classList.contains(`dark-theme`)) {
            bodyTheme.classList.remove(`dark-theme`);
            bodyTheme.classList.add(`light-theme`);
            themeButton.innerHTML = `<img class="theme" src="assets/light.png" alt="theme">`;
        } else {
            bodyTheme.classList.remove(`light-theme`);
            bodyTheme.classList.add(`dark-theme`);
            themeButton.innerHTML = `<img class="theme" src="assets/dark.png" alt="theme">`;
        }
    });
}

/*Обработчики для кнопки главного меню "Выбор лвл"*/
menuBtnSelectLvl.addEventListener(`click`, function () {
    soundClick.play();
    gameMenu.classList.add(`d-none`);
    navigation.classList.remove(`d-none`);
    main.classList.remove(`d-none`);
});

/*Обработчики для кнопки "Настройки"*/
menuBtnSettings.addEventListener(`click`, function () {
    soundClick.play();
    gameMenu.classList.add(`d-none`);
});

/*Обработчики для кнопки "Помощь"*/
menuBtnHelp.addEventListener(`click`, function () {
    soundClick.play();
    gameMenu.classList.add(`d-none`);
});

/*Обработчики для кнопок выбора лвл*/
headerBtn.addEventListener(`click`, selectLvl);

/*Обработчики для выбора пазла*/
placePuzzle.addEventListener(`click`, selectPuzzle);

/*Обработчики для вставки пазла*/
mainWindowPuzzle.addEventListener(`click`, pastePuzzle);

/*Обработчики для отображения подсказки*/
btnHelp.addEventListener(`click`, function () {
    soundClick.play();
    mainWindowPicture.classList.toggle(`d-none`);
});