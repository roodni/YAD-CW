import CWSound from '../../../src/js/cwSound.js';
import Lesson from './lesson.js';
import Checker from './checker.js';

    
function initLessonSelector(lesson) {

    function createLessonNumberOptions(count) {
	return Array(count).fill().map((_, index) => {
	    let option = document.createElement('option');
	    option.textContent = index + 1;
	    return option;
	})
    }

    const lessonSelector = document.querySelector('select#lesson_numbers');

    createLessonNumberOptions(Lesson.size).forEach((option) => {
	lessonSelector.appendChild(option);
    })
    lessonSelector.value = lesson.lessonNumber;
}


function initPlayer(lesson) {

    const cwPlayer = new CWSound();

    const addedLettersDiv = document.querySelector('div#added_letters');
    const playPracticeTextButton = document.querySelector('input#play_practice_text');

    lesson.createAddedLetterPlayers().forEach((element) => {
	addedLettersDiv.appendChild(element);
    });

    playPracticeTextButton.addEventListener('click', (e) => {
        cwPlayer.playCwText(lesson.practiceText);
    })
}


function check(lesson) {

    const receivedTextArea = document.querySelector('textarea#received');
    const resultDiv = document.querySelector('div#check_result');
    const retryButton = document.querySelector('input#retry');
    const nextButton = document.querySelector('input#next');

    const checker = new Checker(lesson.practiceText, receivedTextArea.value);

    resultDiv.innerText = checker.resultText();

    retryButton.disabled = false;
    
    if (checker.passed()) {
	nextButton.disabled = false;
    }
}


function init() {

    function getLessonNumberFromParam(url) {
	const params = (new URL(url)).searchParams;
	const lessonNumber = Number(params.get('lesson'));

	if (lessonNumber !== undefined &&
	    Number.isInteger(lessonNumber) &&
	    lessonNumber >= 1 &&
	    lessonNumber <= Lesson.size) {
	    return lessonNumber;
	} else {
	    return 1;
	}
    }

    const lessonNumber = getLessonNumberFromParam(document.location);
    const lesson = new Lesson(lessonNumber);

    initLessonSelector(lesson);
    initPlayer(lesson);

    const checkButton = document.querySelector('input#check');
    checkButton.addEventListener('click', (e) => {
	check(lesson);
    });
}

init();

