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
    { en: "business", ja: "事業・業務・（やるべき）事" },
    { en: "pay", ja: "給料・報酬" },
    { en: "report", ja: "報道・報告" },
    { en: "job", ja: "勤め口・仕事" },
    { en: "base", ja: "基部・基礎・基地" },
    { en: "price", ja: "価格・<~sで>物価" },
    { en: "problem", ja: "問題・課題" },
    { en: "rate", ja: "割合・料金" },
    { en: "check", ja: "小切手・勘定書・検査" },
    { en: "market", ja: "市場・マーケット・（取引）市場" },
    { en: "change", ja: "変化・釣り銭・小銭" },
    { en: "part", ja: "部分・役割" },
    { en: "sale", ja: "販売・特売・<~sで>売上(高）" },
    { en: "plan", ja: "計画・予定・案" },
    { en: "room", ja: "部屋・空間・余地" },
    { en: "area", ja: "地域・区域・（活動の）範囲" },
    { en: "product", ja: "製品" },
    { en: "increase", ja: "増加" },
    { en: "tax", ja: "税金" },
    { en: "program", ja: "計画・プログラム・番組" },
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

