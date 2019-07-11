const charAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charNumbers = '0123456789';

function randInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min));
}

function createStrRnd(charSet, length) {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += charSet[randInt(0, charSet.length)];
    }
    return str;
}

function createCharRnd(charSet) {
    return charSet[randInt(0, charSet.length)];
}

function generateWorldPrefix() {
    const charAlphabetsWithoutQ = charAlphabets.replace('Q', '');
    const charNumbersWithout01 = charNumbers.replace('01', '');

    let firstChar = createCharRnd(charAlphabetsWithoutQ + charNumbersWithout01);
    let secondChar = createCharRnd(charAlphabets + ((charNumbers.includes(firstChar)) ? '' : charNumbersWithout01));
    let number = createCharRnd(charNumbers);

    return firstChar + secondChar + number;
}
export function generate() {
    let prefix;

    prefix = generateWorldPrefix();
    let suffix = createStrRnd(charAlphabets, 3 - (randInt(50) == 0 ? 1 : 0));
    
    let portable = '';
    if (randInt(7) == 0) {
        portable = '/' + randInt(0, 10);
    }

    return prefix + suffix + portable;
}
export function highlightDiff(answer, input, highlightCssClass) {
    let ret = '';
    for (let i = 0; i < input.length; i++) {
        let c = input[i];
        if (answer[i] !== c) {
            c = `<span class="${highlightCssClass}">${c}</span>`;
        }
        ret += c;
    }
    return ret;
}