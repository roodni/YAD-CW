export default class CallSignGenerator {
    generate() {
        const charAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charNumber = '0123456789';

        let prefix = createStrRnd(charAlphabet + charNumber, 3);
        let suffix = createStrRnd(charAlphabet, 3 - (randInt(10) == 0 ? 1 : 0));
        
        let portable = '';
        if (randInt(7) == 0) {
            portable = '/' + randInt(0, 10);
        }

        return prefix + suffix + portable;
    }
}

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