export default class CwSound {
    constructor() {
        /**@type {AudioContext} */
        this.audioCtx = null;
        this.setWpm(25);
        this.setFrequency(800);
    }
    /**
     * 打鍵速度(wpm)を設定する
     * @param {number} wpm 
     */
    setWpm(wpm) {
        this.wpm = wpm;
        this.dotTime = 1.2 / wpm;
    }
    /**
     * 周波数(Hz)を設定する
     * @param {number} frequency 
     */
    setFrequency(frequency) {
        this.frequency = frequency;
    }
    /**
     * AudioContextが取得されていなければ取得する
     */
    getAudioContext() {
        if (this.audioCtx === null) {
            if ('AudioContext' in window) {
                this.audioCtx = new AudioContext();
            } else if ('webkitAudioContext' in window) {
                this.audioCtx = new webkitAudioContext();
            } else {
                alert('');
            }
        }
    }
    /**
     * 正弦波を開始時刻から指定時間鳴らす
     * @param {number} startTime
     * @param {number} continueTime 
     * @param {number} interpolTime
     */
    playSineWave(startTime, continueTime, interpolTime = 0.01) {
        const oscillator = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = this.frequency;

        gain.gain.setValueAtTime(0.0, startTime);
        gain.gain.setTargetAtTime(1.0, startTime, interpolTime / 4);
        gain.gain.setTargetAtTime(0.0, startTime + continueTime - interpolTime, interpolTime / 4);

        oscillator.connect(gain);
        gain.connect(this.audioCtx.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + continueTime);
    }
    /**
     * 文字列をモールス符号化し再生する
     * @param {string} text 
     */
    playCwText(text) {
        // 警告を回避するため、イベントのタイミングでコンテキストを取得する
        this.getAudioContext();

        const startTime = this.audioCtx.currentTime;
        let usedDot = 0;
        for (let i of text) {
            i = i.toUpperCase();
            if (morseCode[i] === undefined) {
                continue;
            }
            
            for (let j of morseCode[i]) {
                switch(j) {
                case '.':
                    this.playSineWave(startTime + this.dotTime * usedDot, this.dotTime);
                    usedDot += 2;
                    break;
                case '-':
                    this.playSineWave(startTime + this.dotTime * usedDot, this.dotTime * 3);
                    usedDot += 4;
                    break;
                case ' ':
                    usedDot += 2;
                }
            }
            usedDot += 2;
        }
    }
}

const morseCode = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '/': '-..-.',
    '?': '..--..',
    ' ': ' ',
};