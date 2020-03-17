function zip(leftArr, rightArr) {
    const size = (leftArr.length > rightArr.length) ? leftArr.length : rightArr.length;

    let arr = [];
    for (const i of Array.from({length: size}, (_, i) => i)) {
	const left = (leftArr[i] === undefined) ? '' : leftArr[i];
	const right = (rightArr[i] === undefined) ? '' : rightArr[i];

	arr.push([left, right]);
    }

    return arr;
}

Array.prototype.count = function (shouldCount) {
    return this.reduce((acc, elm) => acc + (shouldCount(elm) ? 1 : 0),
		       0);
}


export default function Checker(sentText, receivedText) {

    this.sent = sentText.toUpperCase().split(/\s+/);
    this.rcvd = receivedText.toUpperCase().split(/\s+/);
}


Checker.prototype.resultText = function () {

    function addMissIfMiss(text1, text2) {
	return `${text1} / ${text2}  ${(text1 === text2) ? '' : 'miss!'}`
    }

    return ['I sent / You rcvd'].concat(
	zip(this.sent, this.rcvd).map((pair) => addMissIfMiss(...pair))
    ).join('\n');
}


Checker.prototype.point = function () {
    return zip(this.sent, this.rcvd).count(pair => pair[0] === pair[1]);
}


Checker.prototype.passed = function () {
    return this.point() >= 9;
}
