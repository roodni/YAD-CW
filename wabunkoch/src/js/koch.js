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


/**
* @constructor
* @param {number} lessonNumber
*
* @property {number} lessonNumber
* @property {Array.<String>} letters - Letters in this lesson
* @property {Array.<String>} addedLetters - Letters previous lesson does not have
*/
export default function Lesson(lessonNumber) {

    const LETTERS_GOJUON_AND_MARK = 'ちやてゆねきほゑれかよいえをさあーろんのもそはしつに、たくけなゐおわふみひせら「むまめりすとぬうる」へこ'.split('');
    const LETTERS_DAKUTEN = 'がぎぐげござじずぜぞだぢづでどばびぶべぼ'.split('');
    const LETTERS_HANDAKUTEN = 'ぱぴぷぺぽ'.split('');

    this.lessonNumber = lessonNumber;

    // 五十音と記号
    if (lessonNumber < LETTERS_GOJUON_AND_MARK.length) {
        this.letters = LETTERS_GOJUON_AND_MARK.slice(0, lessonNumber + 1);
        this.addedLetters = (lessonNumber === 1) ? this.letters : this.letters.last;
    }
    // 濁点
    else if (lessonNumber === LETTERS_GOJUON_AND_MARK.length) {
        this.letters = LETTERS_GOJUON_AND_MARK.concat(LETTERS_DAKUTEN);
        this.addedLetters = '゛';
    }
    // 半濁点
    else {
        this.practiveChars =
	    LETTERS_GOJUON_AND_MARK
	    .concat(LETTERS_DAKUTEN)
	    .concat(LETTERS_HANDAKUTEN);
        this.addedLetters = '゜';
    }
}


/**
* 時間で区切るのは難しいので、テキストの長さで区切る
* @method
* @param {number} count - 5字の塊を単語を繰り返す回数
* @return {String}
*/
Lesson.prototype.generateText = function (count) {
    const cellSize = 5;
    const spaceSize = 3;
    const randomText = (size) => {
        return Array
	    .from({ length: size },
		  (_ => this.letters.randomElement))
	    .join('');
    }

    return Array
        .from({ length: count }, (_ => randomText(cellSize)))
        .join(' '.repeat(spaceSize));
}


