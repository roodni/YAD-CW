import CWSound from '/src/js/cwSound.js';
import Lesson from '/wabunkoch/src/js/koch.js';

function Main() {
    const lessonSelector = document.querySelector('select#lesson_number');
    const playPracticeTextButton = document.querySelector('input#play_practice_text');

    const cwPlayer = new CWSound();
    const lesson = new Lesson(Number(lessonSelector.value));
    const practiceText = lesson.generateText(10);

    playPracticeTextButton.addEventListener('click', (e) => {
        cwPlayer.playCwText(practiceText);
    })
}

function init() {
    const lessonSelector = document.querySelector('select#lesson_number');

    lessonSelector.addEventListener('change', (e) => {
        main = new Main();
    })
}

init();
let main = new Main();

