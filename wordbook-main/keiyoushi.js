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
    { en: "single", ja: "1つの、独身の" },
    { en: "tired", ja: "（～に）疲れて、（～に）飽きて" },
    { en: "balanced", ja: "つり合いの取れた" },
    { en: "favorite", ja: "大好きな、お気に入りの" },
    { en: "careful", ja: "（～に）気を付ける、慎重な" },
    { en: "adult", ja: "成人の" },
    { en: "angry", ja: "（～に）腹を立てて、怒った" },
    { en: "general", ja: "概略の、全般の、一般の" },
    { en: "personal", ja: "個人の、個人的な" },
    { en: "private", ja: "私有の、私的な、非公開の" },
    { en: "standard", ja: "標準の" },
    { en: "material", ja: "物質の、物質的な" },
    { en: "monthly", ja: "月一回の、一か月間の" },
    { en: "double", ja: "2倍の" },
    { en: "further", ja: "それ以上の" },
    { en: "official", ja: "公式の、公の" },
    { en: "responsible", ja: "（～に、の）責任がある、信頼できる" },
    { en: "subject", ja: "(～を）免れない、必要とする" },
    { en: "final", ja: "最後の、最終的な" },
    { en: "serious", ja: "まじめな、重大な" },
    { en: "professional", ja: "プロの、職業上の、専門職の" },
    { en: "basic", ja: "基礎の、基本的な" },
    { en: "common", ja: "普通の、共通の" },
    { en: "fair", ja: "公正な、明るい色の" },
    { en: "fit", ja: "（～に）適した、体の調子がよい" },
    { en: "human", ja: "人間の、人間的な" },
    { en: "terrible", ja: "ひどい、恐ろしい" },
    { en: "correct", ja: "正しい、適切な" },
    { en: "empty", ja: "空の" },
    { en: "modern", ja: "現代の、現代的な" },
    { en: "separete", ja: "わかれた、別個の" },
    { en: "exciting", ja: "興奮させる、はらはらするような" },
    { en: "comfortable", ja: "くつろいだ、快適な" },
    { en: "content", ja: "（～に）満足して" },
    { en: "spare", ja: "予備の、余分な" },
    { en: "tight", ja: "きつい、（予定などが）詰まった" },
    { en: "flat", ja: "平らな、パンクした、きっかりの" },
    { en: "collect", ja: "受信人払い（着払い）の" },
    { en: "social", ja: "社会の、社交的な" },
    { en: "usual", ja: "いつもの、普段の、いつものように" },
    { en: "certain", ja: "ある～、いくらかの、確かな" },
    { en: "firm", ja: "堅い、しっかりした" },
    { en: "former", ja: "以前の、前者" },
    { en: "grand", ja: "（規模、範囲、程度などが）大きな、完全な" },
    { en: "lucky", ja: "幸運な" },
    { en: "master", ja: "親" },
    { en: "aware", ja: "（～に）気付いて" },
    { en: "plain", ja: "明白な、質素な、平易な" },
    { en: "anxious", ja: "（～を）心配して、（～を）切望して" },
    { en: "powerful", ja: "強力な" },
    { en: "valuable", ja: "貴重な、高価な" },
    { en: "worthy", ja: "（～に）値する" },
    { en: "proud", ja: "（～を）誇りに思う" },
    { en: "broad", ja: "（幅が）広い、広範な" },
    { en: "rapid", ja: "速い" },
    { en: "wise", ja: "賢い" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
    { en: "", ja: "" },
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

