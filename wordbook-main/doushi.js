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
    { en: "want", ja: "（〜することを）望む・（〜が）欠けている" },
    { en: "call", ja: "（〜を）呼ぶ・電話をかける" },
    { en: "order", ja: "注文する・命じる" },
    { en: "store", ja: "（〜を）蓄える・格納する" },
    { en: "pay", ja: "（金を）支払う、（注意などを）払う" },
    { en: "report", ja: "（〜を）報道する・報告する" },
    { en: "base", ja: "（〜に）基づいている" },
    { en: "price", ja: "（〜に）値段をつける" },
    { en: "rate", ja: "（〜を）評価する" },
    { en: "check", ja: "調べる" },
    { en: "part", ja: "（〜と）別れる" },
    { en: "change", ja: "変える[変わる]" },
    { en: "plan", ja: "計画する" },
    { en: "free", ja: "（〜を）解放する" },
    { en: "increase", ja: "増やす[増える]" },
    { en: "tax", ja: "（〜に）課税する" },
    { en: "receive", ja: "（〜を）受け取る" },
    { en: "include", ja: "（〜を）含む・入れる" },
    { en: "program", ja: "プログラムを作る" },
    { en: "cost", ja: "（費用・時間・労力が）かかる" },
    { en: "govern", ja: "統治する" },
    { en: "offer", ja: "（〜を）勧める・申し出る・提供する" },
    { en: "charge", ja: "（金額を）請求する・（〜を）非難[告発]する" },
    { en: "experience", ja: "（〜を）経験する" },
    { en: "state", ja: "（〜を）述べる" },
    { en: "account", ja: "（〜を）説明する" },
    { en: "turn", ja: "（向きを）変える・（〜に）変える[変わる]" },
    { en: "form", ja: "（〜を）形づくる" },
    { en: "schedule", ja: "（〜の）予定である" },
    { en: "sign", ja: "（〜に）署名する" },
    { en: "decide", ja: "決める・決心する" },
    { en: "show", ja: "（〜を）見せる[示す]・案内する" },
    { en: "drive", ja: "（〜を）運転する・（人を）車に乗せていく・（〜を）追いやる" },
    { en: "return", ja: "戻る[戻す]" },
    { en: "run", ja: "（会社などを）経営する・（機械などが）動く・（競走、選挙などに）出る" },
    { en: "close", ja: "閉める[閉まる]・終える[終わる]" },
    { en: "serve", ja: "（食事などを）出す・（〜に）仕える・役立つ" },
    { en: "cause", ja: "（〜を）引き起こす" },
    { en: "expect", ja: "予期する・期待する・（人・事を）待つ" },
    { en: "arrive", ja: "着く・到着する" },
    { en: "bill", ja: "請求書を送る" },
    { en: "seat", ja: "（〜を）座らせる" },
    { en: "own", ja: "（〜を）所有する" },
    { en: "stand", ja: "立つ・（〜の状態）である・＜疑問＆否定で＞（〜を）我慢する" },
    { en: "notice", ja: "（〜だと）気が付く" },
    { en: "trip", ja: "つまずく（つまずかせる）" },
    { en: "complete", ja: "（〜を）完成させる" },
    { en: "fill", ja: "（〜を）満たす・（〜で）いっぱいにする・（書類などに）書き込む" },
    { en: "happen", ja: "起こる・偶然〜する" },
    { en: "enjoy", ja: "（〜を）楽しむ" },
    { en: "type", ja: "タイプする" },
    { en: "board", ja: "（乗り物に）乗り込む" },
    { en: "care", ja: "（〜を）気にかける、（〜が）欲しい" },
    { en: "save", ja: "（〜を）救う、（〜を）節約する、（〜を）蓄える・とっておく" },
    { en: "provide", ja: "（〜に…を）供給する、（〜に）備える" },
    { en: "allow", ja: "（〜するのを）許す" },
    { en: "spend", ja: "（時間・お金を）費やす" },
    { en: "point", ja: "（〜を）指し示す、（〜を）指摘する" },
    { en: "break", ja: "壊す[壊れる]" },
    { en: "drop", ja: "落ちる[落とす]、降ろす" },
    { en: "mail", ja: "郵送する、投函する" }, 
    { en: "copy", ja: "複写する、コピーする" },
    { en: "develop", ja: "開発する、発展させる、（フィルムなどを）現像する" },
    { en: "hold", ja: "手に持つ、（会などを）催す、持ち続ける" },
    { en: "condition", ja: "調子[状態]を整える" },
    { en: "interest", ja: "興味[関心]を持たせる" },
    { en: "pass", ja: "通り過ぎる、（時が）すぎる、（〜を）手渡す、（試験などに）合格する" },
    { en: "request", ja: "（〜を）要請する" },
    { en: "control", ja: "管理[制御]する" },
    { en: "fire", ja: "（労働者を）解雇する、（銃などを）発射する" },
    { en: "wear", ja: "（〜を）着用する、すり減る[減らす]、疲れさせる" },
    { en: "discount", ja: "割り引く" },
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

