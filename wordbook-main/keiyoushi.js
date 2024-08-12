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
const count = document.getElementById('qcount');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const pauseButton = document.getElementById('pause');
const endButton = document.getElementById('end');
let timerInterval;
let isPaused = false;
const jaspan = document.getElementById('ja');


// 複数のテキストを格納する配列(出題したい問題内容はココへカキコミ！)
const words = [
    { en: "free", ja: "自由な・無料の・暇な" },
    { en: "close", ja: "近い・親密な・綿密な" },
    { en: "own", ja: "自分自身の" },
    { en: "complete", ja: "全部の・完全な" },
    { en: "public", ja: "公衆の・公共の" },
    { en: "main", ja: "主要な" },
    { en: "international", ja: "国際的な" },
    { en: "regular", ja: "規則的な、通常の、普通の" },
    { en: "expensive", ja: "高価な" },
    { en: "local", ja: "地元の、各駅停車の" },
    { en: "busy", ja: "（～で）忙しい、（人・車が）混雑する、（電話が）話し中の" },
    { en: "foreign", ja: "外国の" },
    { en: "possible", ja: "（実行）可能な、起こりうる、可能な限り…に" },
    { en: "direct", ja: "直接の" },
    { en: "necessary", ja: "必要な、必然的な" },
    { en: "popular", ja: "（～に）人気のある、大衆的な" },
    { en: "safe", ja: "安全な、無事な" },
    { en: "short", ja: "短い、（～が）不足している" },
    { en: "present", ja: "出席している、現在の" },
    { en: "fine", ja: "細かい" },
    { en: "likely", ja: "～しそうな、見込みのある" },
    { en: "total", ja: "全体の、完全な" },
    { en: "national", ja: "全国的な、国家の、国立の" },
    { en: "express", ja: "急行の（列車）、速達の（便）" },
    { en: "clear", ja: "明瞭な" },
    { en: "crowded", ja: "混みあった" },
    { en: "daily", ja: "毎日の、日常の" },
    { en: "sound", ja: "健全な、しっかりした" },
    { en: "ready", ja: "用意（準備）ができた、喜んで～する" },
    { en: "level", ja: "平らな" },
    { en: "excellent", ja: "優れた、素晴らしい" },
    { en: "patient", ja: "忍耐（我慢）強い" },
    { en: "cheap", ja: "安い、そまつな" },
    { en: "future", ja: "未来の" },
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
    jaspan.textContent = `訳：${words[random].ja}`;

};


// キー入力の判定
 const keyPress = e => {

    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)){
        wrap.classList.add('mistyped');
        // 100ms後に背景色を元に戻す
        setTimeout(()=> {
            wrap.classList.remove('mistyped');
        }, 100);
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


untypedfield.innerHTML = 'You are ready?<br>↓';
count.textContent = `${MAX_PAGE}問ノック！`;

