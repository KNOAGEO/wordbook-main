// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let timeLeft = 10 * 60; // 10分を秒単位に変換
let pageCount = 0; // 質問のカウント
const MAX_PAGE = 300; // 出題数

//　必要なHTML要素を取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
//
const count = document.getElementById('question-count');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const endButton = document.getElementById('end');
let timerInterval;
let isPaused = false;
const jaspan = document.getElementById('ja');


// 複数のテキストを格納する配列(出題したい問題内容はココへカキコミ！)
const words = [
    { en: "resignation", ja: "退職" },
    { en: "passenger", ja: "乗客" },
    { en: "company", ja: "会社・同席（同行）すること・仲間" },
    { en: "want", ja: "欠乏" },
    { en: "office", ja: "事務所・会社・職場・役所" },
    { en: "call", ja: "（電話の）呼び出し・通話" },
    { en: "service", ja: "接客・サービス・（公共の）事業＜通信・交通・電力など＞" },
    { en: "order", ja: "注文（品）・順序・命令" },
    { en: "way", ja: "（～の）やり方（to do/of doing)・道筋・方角・道のり" },
    { en: "store", ja: "店・蓄え" },
    { en: "business", ja: "事業・業務・（やるべき）事" },
    { en: "pay", ja: "給料・報酬" },
    { en: "", ja: "" },
    { en: "notebook", ja: "ノート" },
    { en: "orange", ja: "オレンジ" },
    { en: "pencil", ja: "鉛筆" },
    { en: "queen", ja: "女王" },
    { en: "rabbit", ja: "ウサギ" },
    { en: "sun", ja: "太陽" },
    { en: "table", ja: "テーブル" },
    { en: "umbrella", ja: "傘" },
    { en: "vase", ja: "花瓶" },
    { en: "water", ja: "水" },
    { en: "xylophone", ja: "木琴" },
    { en: "yacht", ja: "ヨット" },
    { en: "zebra", ja: "シマウマ" },
    { en: "airplane", ja: "飛行機" },
    { en: "banana", ja: "バナナ" },
    { en: "car", ja: "車" },
    { en: "door", ja: "ドア" },
    { en: "ear", ja: "耳" },
    { en: "fish", ja: "魚" },
    { en: "goat", ja: "ヤギ" },
    { en: "hat", ja: "帽子" },
    { en: "island", ja: "島" },
    { en: "jacket", ja: "ジャケット" },
    { en: "kite", ja: "凧" },
    { en: "lion", ja: "ライオン" },
    { en: "moon", ja: "月" },
    { en: "nest", ja: "巣" },
    { en: "ocean", ja: "海" },
    { en: "piano", ja: "ピアノ" },
    { en: "queen", ja: "女王" },
    { en: "rose", ja: "バラ" },
    { en: "star", ja: "星" },
    { en: "train", ja: "電車" },
    { en: "umbrella", ja: "傘" },
    { en: "violin", ja: "バイオリン" },
    { en: "whale", ja: "鯨" },
    { en: "x-ray", ja: "エックス線" },
    { en: "yogurt", ja: "ヨーグルト" },
    { en: "zoo", ja: "動物園" }
  ];


// ランダムなテキストを表示
const createText = () => {

    // 出題数のカウントアップ
    pageCount++;
    //　-----　MAXPAGEを超えたら終了
    if(pageCount > MAX_PAGE){
        gameOver(); 
        return;      
    }

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random()* words.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = words[random].en;
    untypedfield.textContent = untyped;

    // ---- 今何問目というのを画面上に表示する ----
    count.textContent = `第${pageCount}問`;

    // ---- 日本語を表示する ----
    jaspan.textContent = `日本語訳：${words[random].ja}`;

};


// キー入力の判定
 const keyPress = e => {

    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)){
        wrap.classList.add('mistyped');
        // 200ms後に背景色を元に戻す
        setTimeout(()=> {
            wrap.classList.remove('mistyped');
        }, 200);
        return;
     }
    

    // 正タイプの場合
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストが無くなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
  };

// ゲームを終了
const gameOver = id => {
    clearInterval(id);

    // OKボタンをクリックされたらリロードする
    if(result == true) {
        window.location.reload();
    }
};

// カウントダウンタイマー（宣言・機能）
/*※タイマー実装はまた後で
const timer = () => {

       // タイマー部分のHTML要素（p要素）を取得する
   let time = timerElement.textContent;
 
   const id = setInterval(() => {
 
     // カウントダウンする
     time--;
     timerElement.textContent = time;
 
     // カウントが0になったらタイマーを停止する
     if(time <= 0) {
       clearInterval(id);
     }
   }, 1000);
};*/

// ゲームスタート時の処理
start.addEventListener ('click', () => {

    // 出題カウントのクリア
    pageCount = 0;

    // ランダムなテキストを表示する
    createText();

    // 「スタート」 ボタンを非表示にする
    start.style.display = 'none';

    //　キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});


untypedfield.innerHTML = '<span class="readytext">You are ready?<br>↓</span>';
count.textContent = `${MAX_PAGE}問ノック！`;

