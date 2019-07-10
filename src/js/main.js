import CwSound from './cwSound.js';
import * as callSignUtil from './callSignUtil.js';

class Main {
    constructor() {
        this.cwSound = new CwSound();
        this.callSign = callSignUtil.generate();
        this.playNum = 0;
    }
    init() {

        // イベントの設定
        const numberWpm = document.getElementById('wpm');
        const numberHz = document.getElementById('hz');
        const inputText = document.getElementById('text');
        const buttonAnswer = document.getElementById('answer');
        const buttonPlay = document.getElementById('play');
        const tableResults = document.getElementById('results');
        const elementLog = document.getElementById('log');

        // numberフォームの入力の値を[min, max]におさめる
        const getLimitedNumberInput = (numberInput) => {
            const min = parseInt(numberInput.min);
            const max = parseInt(numberInput.max);
            let val = parseInt(numberInput.value);
            if (val < min) {
                val = min;
                numberInput.value = val;
            }
            if (val > max) {
                val = max;
                numberInput.value = val;
            }
            return val;
        };

        // ログになんか出す(試験用)
        const myLog = (output) => {
            elementLog.innerText = output + elementLog.innerText;
        };

        // 速度の変更
        const changeWpm = () => {
            const wpm = getLimitedNumberInput(numberWpm);
            if (isNaN(wpm)) {
                numberWpm.value = this.cwSound.wpm;
            } else {
                this.cwSound.setWpm(wpm);
            }
            localStorage.setItem('wpm', this.cwSound.wpm);
        };
        numberWpm.addEventListener('change', (e) => {
            changeWpm();
        });
        numberWpm.value = localStorage.getItem('wpm');
        changeWpm();

        // 周波数の変更
        const changeHz = () => {
            const freq = getLimitedNumberInput(numberHz);
            if (isNaN(freq)) {
                numberHz.value = this.cwSound.frequency;
            } else {
                this.cwSound.setFrequency(freq);
            }
            localStorage.setItem('freq', this.cwSound.frequency);
        };
        numberHz.addEventListener('change', (e) => {
            changeHz();
        });
        numberHz.value = localStorage.getItem('freq');
        changeHz();

        // ショートカットキー
        inputText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                buttonAnswer.click();
                e.preventDefault();
            }
            if (e.key === '.') {
                buttonPlay.click();
                e.preventDefault();
            }
        });
        // safari対応
        inputText.addEventListener('beforeinput', (e) => {
            if (e.data === '.') {
                e.preventDefault();
            }
        })

        // 答え合わせ
        buttonAnswer.addEventListener('click', () => {
            const answer = this.callSign;
            const input = inputText.value.toUpperCase();
            
            const tr = document.createElement('tr');
            const td_ans = document.createElement('td');
            const td_input = document.createElement('td');
            const td_res = document.createElement('td');
            const td_playNum = document.createElement('td');

            td_ans.innerHTML = answer;
            td_input.innerHTML = callSignUtil.highlightDiff(answer, input, 'wrong');
            td_res.innerHTML = (answer === input) ? 'o' : '<span class="wrong">x</span>';
            td_playNum.innerText = this.playNum;

            tr.appendChild(td_ans);
            tr.appendChild(td_input);
            tr.appendChild(td_res);
            tr.appendChild(td_playNum);
            tableResults.insertBefore(tr, tableResults.firstChild);

            this.callSign = callSignUtil.generate();
            this.playNum = 0;
            inputText.value = '';
            inputText.focus();
        });
        
        // 再生
        buttonPlay.addEventListener('click', () => {
            buttonPlay.disabled = true;
            this.cwSound.playCwText(this.callSign, () => {
                buttonPlay.disabled = false;
            });
            this.playNum++;
            inputText.focus();
        });
    }
}

const main = new Main();
main.init();