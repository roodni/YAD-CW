import CWSound from '/src/js/cwSound.js';
import Lesson from '/wabunkoch/src/js/koch.js';

const cwPlayer = new CWSound();
    
function createLessonNumberOptions(count) {
    return Array(count).fill().map((_, index) => {
	let option = document.createElement('option');
	option.textContent = index + 1;
	return option;
    })
}


function initLesson(lessonNumber) {

    const addedLettersDiv = document.querySelector('div#added_letters');
    const playPracticeTextButton = document.querySelector('input#play_practice_text');
    
    const lesson = new Lesson(lessonNumber);
    const practiceText = lesson.generateText(10);

    addedLettersDiv.innerHTML = '';
    lesson.createAddedLetterPlayers().forEach((element) => {
	addedLettersDiv.appendChild(element);
    });

    playPracticeTextButton.addEventListener('click', (e) => {
        cwPlayer.playCwText(practiceText);
    })
}


function initLessonSelector() {

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
    const lessonSelector = document.querySelector('select#lesson_numbers');

    createLessonNumberOptions(Lesson.size).forEach((option) => {
	lessonSelector.appendChild(option);
    })
    lessonSelector.value = lessonNumber;

    return lessonNumber;
}


function init() {

    const lessonNumber = initLessonSelector();
    initLesson(lessonNumber);
}

init();

