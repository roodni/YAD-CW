import CWSound from '/src/js/cwSound.js';
import Lesson from '/wabunkoch/src/js/lesson.js';

    
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
    initPlayer(lesson)
}

init();

