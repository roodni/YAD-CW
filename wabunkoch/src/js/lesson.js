import CWSound from '/src/js/cwSound.js';

const cwPlayer = new CWSound();

const LETTERS_GOJUON_AND_MARK = 'ちやてゆねきほゑれかよいえをさあーろんのもそはしつに、たくけなゐおわふみひせら「むまめりすとぬうる」へこ'.split('');
const LETTERS_DAKUTEN = 'がぎぐげござじずぜぞだぢづでどばびぶべぼ'.split('');
const LETTERS_HANDAKUTEN = 'ぱぴぷぺぽ'.split('');


Object.defineProperty(
    Array.prototype,
    'last',
    { get: function () { return this[this.length - 1] } }
);
Object.defineProperty(
    Array.prototype,
    'randomElement',
    { get: function () { return this[Math.floor(Math.random() * this.length)] } }
);


function generateText(count, letters) {
    const cellSize = 5;
    const spaceSize = 3;
    const randomText = (size) => {
        return Array
	    .from({ length: size },
		  (_ => letters.randomElement))
	    .join('');
    }

    return Array
        .from({ length: count }, (_ => randomText(cellSize)))
        .join(' '.repeat(spaceSize));
}


/**
* @constructor
* @param {number} lessonNumber
*
* @property {number} lessonNumber
* @property {Array.<String>} letters - Letters in this lesson
* @property {Array.<String>} addedLetters - Letters previous lesson does not have
*/
export default function Lesson(lessonNumber) {

    this.lessonNumber = lessonNumber;

    // 五十音と記号
    if (lessonNumber < LETTERS_GOJUON_AND_MARK.length) {
        this.letters = LETTERS_GOJUON_AND_MARK.slice(0, lessonNumber + 1);
        this.addedLetters = (lessonNumber === 1) ? this.letters : [this.letters.last];
    }
    // 濁点
    else if (lessonNumber === LETTERS_GOJUON_AND_MARK.length) {
        this.letters = LETTERS_GOJUON_AND_MARK.concat(LETTERS_DAKUTEN);
        this.addedLetters = ['゛'];
    }
    // 半濁点
    else {
        this.letters =
	    LETTERS_GOJUON_AND_MARK
	    .concat(LETTERS_DAKUTEN)
	    .concat(LETTERS_HANDAKUTEN);
        this.addedLetters = ['゜'];
    }

    this.practiceText = generateText(10, this.letters);
}


Lesson.size = LETTERS_GOJUON_AND_MARK.length + 1;


/**
* 文字を再生するDOM要素を生成
* @method
* @return {object}
*/
Lesson.prototype.createAddedLetterPlayers = function () {
    const repeatCount = 10;

    return this.addedLetters.map((letter) => {
	
	let label = document.createElement('label');
	label.textContent = letter;

	let playerButton = document.createElement('input');
	playerButton.setAttribute('type', 'button');
	playerButton.setAttribute('value', '聴く');
	playerButton.addEventListener('click', (e) => {
	    cwPlayer.playCwText(Array(repeatCount).fill(letter).join(' '));
	})

	let parent = document.createElement('p');
	parent.appendChild(label);
	parent.appendChild(playerButton);

	return parent;
    })
}
