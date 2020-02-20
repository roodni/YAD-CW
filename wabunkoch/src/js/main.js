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


function main(lessonNumber) {

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


function init() {
    const lessonSelector = document.querySelector('select#lesson_numbers');
    const lessonNumber = Number(lessonSelector.value);

    createLessonNumberOptions(Lesson.size).forEach((option) => {
	lessonSelector.appendChild(option);
    })

    lessonSelector.addEventListener('change', (e) => {
	const lessonNumber = Number(lessonSelector.value);
        new main(lessonNumber);
    })

    new main(lessonNumber);
}

init();

