Array.prototype.last = function() {
    return this[this.length - 1];
}
Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
}
String.prototype.repeat = function(count) {
    return Array
	.from({length: count}, (_ => this))
	.join('');
}

export default function Lesson(lessonNumber) {

    const BASIC_CHARS = 'ちやてゆねきほゑれかよいえをさあーろんのもそはしつに、たくけなゐおわふみひせら「むまめりすとぬうる」へこ'.split('');
    const DAKUTENS = 'がぎぐげござじずぜぞだぢづでどばびぶべぼ'.split('');
    const HANDAKUTENS = 'ぱぴぷぺぽ'.split('');

    this.lessonNumber = lessonNumber;
    this.practiceChars = '';
    this.appendedChars = '';
    
    if (lessonNumber < BASIC_CHARS.length) {
	this.practiceChars = BASIC_CHARS.slice(0, lessonNumber + 1);
	this.appendedChars = (lessonNumber === 1) ? this.practiceChars : this.practiceChars.last();
    }
    else if (lessonNumber === BASIC_CHARS.length) {
	this.practiceChars = BASIC_CHARS.concat(DAKUTENS);
	this.appendedChars = DAKUTENS;
    }
    else {
	this.practiveChars = BASIC_CHARS.concat(DAKUTENS).concat(HANDAKUTENS);
	this.appendedChars = HANDAKUTENS;
    }

    console.log(this.practiceChars);
}

Lesson.prototype.generateText = function(count) {
    const cellSize = 5;
    const spaceSize = 3;
    const self = this;
    function randomText(size) {
	return Array.from({length: size},
			  (_ => self.practiceChars.randomElement()));
    }

    return Array
	.from({length: count},
	      (_ => randomText(cellSize).join('')))
	.join(' '.repeat(spaceSize));
}


