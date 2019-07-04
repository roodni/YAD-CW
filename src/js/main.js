import CwSound from './cwSound.js';
import CallSignGenerator from './callSignGenerator.js';

class Main {
    constructor() {
        this.cwSound = new CwSound();
        this.callSignGenerator = new CallSignGenerator();
        this.callSign = '';
    }
    init() {
        this.callSign = this.callSignGenerator.generate();

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
        };
        numberWpm.addEventListener('change', (e) => {
            changeWpm();
        });
        changeWpm();

        // 周波数の変更
        const changeHz = () => {
            const freq = getLimitedNumberInput(numberHz);
            if (isNaN(freq)) {
                numberHz.value = this.cwSound.frequency;
            } else {
                this.cwSound.setFrequency(freq);
            }
        };
        numberHz.addEventListener('change', (e) => {
            changeHz();
        });
        changeHz();

        // ショートカットキー
        inputText.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                buttonAnswer.click();
                e.preventDefault();
            }
            if (e.key == '.') {
                buttonPlay.click();
                e.preventDefault();
            }
        });

        // 答え合わせ
        buttonAnswer.addEventListener('click', () => {
            const input = inputText.value.toUpperCase();
            
            const tr = document.createElement('tr');
            const td_ans = document.createElement('td');
            const td_input = document.createElement('td');
            const td_res = document.createElement('td');
            td_ans.innerText = this.callSign;
            td_input.innerText = input;
            td_res.innerText = (this.callSign === input) ? 'o' : 'x';
            tr.appendChild(td_ans);
            tr.appendChild(td_input);
            tr.appendChild(td_res);
            tableResults.insertBefore(tr, tableResults.firstChild);

            inputText.value = '';
            this.callSign = this.callSignGenerator.generate();
            // this.cwSound.playCwText(this.callSign);
            inputText.focus();
        });
        
        // 再生
        buttonPlay.addEventListener('click', () => {
            buttonPlay.disabled = true;
            this.cwSound.playCwText(this.callSign, () => {
                buttonPlay.disabled = false;
            });
            inputText.focus();
        });
    }
}

const main = new Main();
main.init();