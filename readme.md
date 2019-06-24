# YAD-CW

## これなに
ブラウザ上でCWのコールサイン聞き取り練習ができる  
スマホに対応しています

## 対応ブラウザ
PC版のChrome, FireFox, Safari  
モバイル版のChrome, Safari  
で動作を確認した

## セットアップ
サーバー上に置きます

例(Python3を使用)：
```
git clone https://github.com/roodni/YAD-CW.git
cd YAD-CW
python3 -m http.server 8000
```

## 使い方
1. index.htmlにアクセスする
2. 再生ボタンで再生されたコールサインを聞き取り、テキストボックスに書きとる
3. 答え合わせボタンで確認する
4. 2〜3の操作を気が済むまで繰り返す