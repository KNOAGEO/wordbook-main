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
    { en: "company", ja: "会社・同席［同行］すること・仲間" },
    { en: "want", ja: "欠乏" },
    { en: "office", ja: "事務所・会社・職場・役所" },
    { en: "call", ja: "（電話の）呼び出し・通話" },
    { en: "service", ja: "接客・サービス・（公共の）事業<通信・交通・電力など>" },
    { en: "order", ja: "注文（品）・順序・命令" },
    { en: "way", ja: "（〜の）やり方・道筋・方角・道のり" },
    { en: "store", ja: "店・蓄え" },
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
    { en: "cost", ja: "代価・費用・犠牲" },
    { en: "government", ja: "政府" },
    { en: "offer", ja: "申し出" },
    { en: "charge", ja: "料金・責任・告発" },
    { en: "experience", ja: "経験" },
    { en: "state", ja: "状態・国家・州" },
    { en: "information", ja: "情報・案内（所）" },
    { en: "account", ja: "勘定・口座・（出来事などの）説明" },
    { en: "turn", ja: "順番・変化" },
    { en: "form", ja: "（文書の）書式・姿・形" },
    { en: "customer", ja: "顧客・得意先" },
    { en: "line", ja: "線・路線・行列・電話線・職業" },
    { en: "schedule", ja: "予定(表）" },
    { en: "sign", ja: "標識・徴候" },
    { en: "show", ja: "展示会・ショー" },
    { en: "drive", ja: "ドライブ" },
    { en: "return", ja: "戻る[戻す]こと・<~sで>利益・収益" },
    { en: "department", ja: "部・部門・学部（科）" },
    { en: "cause", ja: "原因・理由" },
    { en: "system", ja: "制度・装置・方式" },
    { en: "course", ja: "課程・針路・コース" },
    { en: "bill", ja: "請求書・紙幣・法案" },
    { en: "air", ja: "空気・飛行機で・航空便で・様子" },
    { en: "manager", ja: "支配人・経営者・（会社の）部長" },
    { en: "seat", ja: "座席" },
    { en: "stand", ja: "売店" },
    { en: "notice", ja: "通知・予告" },
    { en: "trip", ja: "小旅行" },
    { en: "weather", ja: "天候・空模様" },
    { en: "floor", ja: "床・階" },
    { en: "age", ja: "年齢・時代・<~sで>長い間" },
    { en: "public", ja: "人前で・大衆" },
    { en: "type", ja: "型・タイプ" },
    { en: "board", ja: "板・重役会・（船や飛行機などに）乗って" },
    { en: "main", ja: "（水道・ガスなどの）本管" },
    { en: "care", ja: "世話、注意" },
    { en: "point", ja: "点・要点" },
    { en: "break", ja: "小休止" },
    { en: "drop", ja: "下落" },
    { en: "mail", ja: "郵便物" },
    { en: "copy", ja: "写し、（本の）〜部［冊］" },
    { en: "message", ja: "伝言、（人が）伝えようとしていること" },
    { en: "front", ja: "前部、正面（〜の）前に（で、の" },
    { en: "condition", ja: "状態、<〜sで>で状況、条件" },
    { en: "term", ja: "期間、用語、<~sで>条件、間柄" },
    { en: "interest", ja: "興味、関心、利息、利子、利害、利益" },
    { en: "pass", ja: "通行許可証" }, 
    { en: "request", ja: "依頼、要請" },
    { en: "meal", ja: "食事" },
    { en: "control", ja: "支配、管理、制御" },
    { en: "fire", ja: "火事" },
    { en: "wear", ja: "衣服" },
    { en: "discount", ja: "割引" },
    { en: "industry", ja: "産業、工業" },
    { en: "local", ja: "普通列車" },
    { en: "position", ja: "地位、立場、姿勢、位置" },
    { en: "reach", ja: "（手の）届く範囲" },
    { en: "trouble", ja: "揉め事、迷惑、悩み（トラブル" },
    { en: "traffic", ja: "交通（通信・通話）量" },
    { en: "value", ja: "価値、価格" },
    { en: "foreiger", ja: "外国人" }, 
    { en: "cover", ja: "覆い、表紙" },
    { en: "mind", ja: "心、精神、考え" },
    { en: "energy", ja: "精力、エネルギー" },
    { en: "result", ja: "結果、成果" },
    { en: "matter", ja: "問題、困難" },
    { en: "post", ja: "郵便、地位、柱" },
    { en: "accident", ja: "事故、偶然に" },
    { en: "degree", ja: "学位、程度、（温度などの）度" },
    { en: "heart", ja: "心臓、心" },
    { en: "plant", ja: "植物、工場（設備）" },
    { en: "amount", ja: "量" },
    { en: "cash", ja: "現金" },
    { en: "conversation", ja: "会話" },
    { en: "record", ja: "記録、最高記録" },
    { en: "head", ja: "頭、（組織の）長" },
    { en: "party", ja: "パーティー、一行、政党" },
    { en: "policy", ja: "政策、方針、保険証書" },
    { en: "fall", ja: "落下、降下" },
    { en: "airline", ja: "定期航空路、（～ｓで）航空会社" },
    { en: "surprise", ja: "驚き" },
    { en: "case", ja: "場合、事例、事件、訴訟" },
    { en: "study", ja: "勉強、研究、書斎" },
    { en: "design", ja: "設計、デザイン" },
    { en: "medicine", ja: "薬、医学" },
    { en: "boss", ja: "社長、上司、実力者" },
    { en: "law", ja: "法律、法則" },
    { en: "lead", ja: "先導" },
    { en: "list", ja: "表、リスト" }, 
    { en: "safe", ja: "金庫" },
    { en: "step", ja: "一歩、手段、<~s>で階段" },
    { en: "period", ja: "期間、時期、ピリオド" },
    { en: "produce", ja: "産物" },
    { en: "chance", ja: "機会、見込み" },
    { en: "present", ja: "贈物" },
    { en: "couple", ja: "1対、1組、<a couple of>２，３の" },
    { en: "fine", ja: "罰金" },
    { en: "decision", ja: "決定、決心" },
    { en: "total", ja: "総計" },
    { en: "training", ja: "訓練、養成" },
    { en: "reason", ja: "理由、道理" },
    { en: "force", ja: "力、軍隊" },
    { en: "limit", ja: "限度、<~s>範囲" },
    { en: "limitation", ja: "制限（すること）、<~s>限界" },
    { en: "corner", ja: "角、すみ" },
    { en: "face", ja: "顔、表面" },
    { en: "demand", ja: "需要、要求" },
    { en: "repair", ja: "修理" },
    { en: "gas", ja: "ガス、ガソリン" },
    { en: "ship", ja: "船" },
    { en: "activity", ja: "活動" },
    { en: "crowd", ja: "群衆" },
    { en: "raise", ja: "賃上げ" },
    { en: "skin", ja: "皮膚、皮" },
    { en: "sound", ja: "音" },
    { en: "ground", ja: "地面、<~s>理由、根拠、分野" },
    { en: "exercise", ja: "運動、練習、（権利などの）行使" },
    { en: "press", ja: "<the~>新聞記者" },
    { en: "tour", ja: "旅行、視察" },
    { en: "date", ja: "日付、デート、会う約束" },
    { en: "level", ja: "水準、程度、水平面" },
    { en: "damage", ja: "損害、被害" },
    { en: "deal", ja: "契約、商取引" },
    { en: "patient", ja: "患者" },
    { en: "process", ja: "過程、工程" },
    { en: "taste", ja: "味、味見" },
    { en: "block", ja: "1区画、固まり" },
    { en: "handle", ja: "取っ手、ハンドル" },
    { en: "trade", ja: "貿易、商売" },
    { en: "future", ja: "未来、将来" },
    { en: "land", ja: "土地、陸地" },
    { en: "rise", ja: "上昇、増加" },
    { en: "suit", ja: "スーツ、衣服" },
    { en: "furniture", ja: "家具" },
    { en: "rest", ja: "休息、<theで>残り" },
    { en: "safety", ja: "安全" },
    { en: "language", ja: "言葉、言語" },
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

