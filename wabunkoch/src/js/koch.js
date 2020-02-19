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

export default function Lesson(lessonNumber) {

    const BASIC_CHARS = 'ちやてゆねきほゑれかよいえをさあーろんのもそはしつに、たくけなゐおわふみひせら「むまめりすとぬうる」へこ'.split('');
    const DAKUTENS = 'がぎぐげござじずぜぞだぢづでどばびぶべぼ'.split('');
    const HANDAKUTENS = 'ぱぴぷぺぽ'.split('');

    this.lessonNumber = lessonNumber;
    this.practiceChars = '';
    this.appendedChars = '';

    if (lessonNumber < BASIC_CHARS.length) {
        this.practiceChars = BASIC_CHARS.slice(0, lessonNumber + 1);
        this.appendedChars = (lessonNumber === 1) ? this.practiceChars : this.practiceChars.last;
    }
    // 濁点
    else if (lessonNumber === BASIC_CHARS.length) {
        this.practiceChars = BASIC_CHARS.concat(DAKUTENS);
        this.appendedChars = DAKUTENS[0];
    }
    // 半濁点
    else {
        this.practiveChars = BASIC_CHARS.concat(DAKUTENS).concat(HANDAKUTENS);
        this.appendedChars = HANDAKUTENS;
    }
}

Lesson.prototype.generateText = function (count) {
    const cellSize = 5;
    const spaceSize = 3;
    const randomText = (size) => {
        return Array.from(
            { length: size },
            (_ => this.practiceChars.randomElement));
    }

    return Array
        .from({ length: count }, (_ => randomText(cellSize).join('')))
        .join(' '.repeat(spaceSize));
}


