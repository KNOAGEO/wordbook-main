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
    { en: "quarter", ja: "4分の1、15分、四半期、（都市部の）地区" },
    { en: "cross", ja: "十字架" },
    { en: "disease", ja: "病気" },
    { en: "purpose", ja: "目的、目標" },
    { en: "single", ja: "<~s>独身者" },
    { en: "attention", ja: "注意、配慮、気付き" },
    { en: "balance", ja: "つり合い、残高、天秤" },
    { en: "favorite", ja: "お気に入りの人" }, 
    { en: "figure", ja: "数字、姿、人物" },
    { en: "support", ja: "支持、支援" },
    { en: "clothes", ja: "衣服、衣類" },
    { en: "dress", ja: "ドレス、衣服" },
    { en: "war", ja: "戦争、戦い" },
    { en: "adress", ja: "住所、演説" },
    { en: "branch", ja: "支店、部門、枝" },
    { en: "dial", ja: "ダイヤル、文字盤" },
    { en: "distance", ja: "距離、遠方" },
    { en: "promise", ja: "約束" },
    { en: "wonder", ja: "驚き" },
    { en: "race", ja: "競争、人種" },
    { en: "adult", ja: "おとな、成人" },
    { en: "appearance", ja: "外見、外観、出現" },
    { en: "media", ja: "報道機関" },
    { en: "advice", ja: "助言、忠告" },
    { en: "announcement", ja: "発表、公表" },
    { en: "claim", ja: "要求、請求" },
    { en: "drug", ja: "麻薬、薬品" },
    { en: "effort", ja: "努力" },
    { en: "salary", ja: "給料" },
    { en: "standard", ja: "標準、基準、水準" },
    { en: "view", ja: "（～に対する）見方、意見、眺め" },
    { en: "film", ja: "（写真・映画の）フィルム、映画" },
    { en: "practice", ja: "練習、実行" },
    { en: "agency", ja: "代理業、代理店" },
    { en: "education", ja: "教育" },
    { en: "entrance", ja: "入口、入場、入学、入社" },
    { en: "guess", ja: "推測" },
    { en: "heat", ja: "暖房、暑さ、熱" },
    { en: "material", ja: "原料、材料、資料" },
    { en: "monthly", ja: "月刊誌" },
    { en: "print", ja: "印刷" },
    { en: "share", ja: "市場占有率、分け前" },
    { en: "excuse", ja: "言い訳" },
    { en: "invitation", ja: "招待状" },
    { en: "double", ja: "2倍" },
    { en: "effect", ja: "影響、効果、効果を生じる、発効する" },
    { en: "lie", ja: "うそ" },
    { en: "official", ja: "公務員、職員" },
    { en: "reserve", ja: "蓄え、遠慮" },
    { en: "action", ja: "行動、実行" },
    { en: "rush", ja: "急ぎ、殺到" },
    { en: "subject", ja: "主題、学科" },
    { en: "touch", ja: "連絡、接触" },
    { en: "wind", ja: "風" },
    { en: "detail", ja: "細部、詳細" },
    { en: "final", ja: "決勝戦、最終試験" },
    { en: "gain", ja: "利益" },
    { en: "model", ja: "模型、型式、モデル、手本" },
    { en: "protection", ja: "保護" },
    { en: "success", ja: "成功" },
    { en: "approach", ja: "方法、接近" },
    { en: "citizen", ja: "市民、国民" },
    { en: "direction", ja: "方向、<~s>指示、説明書" },
    { en: "event", ja: "出来事、行事" },
    { en: "fare", ja: "運賃、料金" },
    { en: "lift", ja: "車に乗せること" },
    { en: "mention", ja: "（～への）言及" },
    { en: "nation", ja: "国家、国民" },
    { en: "officer", ja: "警察官、将校、役員" },
    { en: "pain", ja: "痛み、苦痛、<~s>骨折り" },
    { en: "signal", ja: "信号、合図" },
    { en: "vote", ja: "投票" },
    { en: "guide", ja: "案内者" },
    { en: "ability", ja: "能力" },
    { en: "bar", ja: "酒場、（バーの）カウンター、棒" },
    { en: "blood", ja: "血、血筋" },
    { en: "lock", ja: "錠" },
    { en: "mark", ja: "印、指標、点数" },
    { en: "professional", ja: "プロ、専門家" },
    { en: "attack", ja: "（病気の）発作、攻撃" },
    { en: "basic", ja: "<~s>基本、原則" },
    { en: "district", ja: "地区、地域" },
    { en: "earthquake", ja: "地震" },
    { en: "favor", ja: "好意" },
    { en: "grade", ja: "学年、成績、等級" },
    { en: "match", ja: "試合、適合" },
    { en: "profit", ja: "利益" },
    { en: "slip", ja: "伝票" },
    { en: "clerk", ja: "店員、事務員" },
    { en: "fair", ja: "見本市、博覧会" },
    { en: "flag", ja: "旗、標識" },
    { en: "permit", ja: "許可" },
    { en: "pole", ja: "さお、柱、極" },
    { en: "progress", ja: "進歩、発達" },
    { en: "regard", ja: "<~sで>よろしく" },
    { en: "shock", ja: "ショック、衝撃" },
    { en: "tie", ja: "ネクタイ" },
    { en: "shape", ja: "形、状態" },
    { en: "bit", ja: "少しの、１つの、少し" },
    { en: "judge", ja: "裁判官、審判員" },
    { en: "length", ja: "長さ" },
    { en: "pleasure", ja: "喜び、楽しみ、楽しいこと"},
    { en: "sence", ja: "感覚、意味" },
    { en: "spread", ja: "ひろがり、普及" },
    { en: "capital", ja: "資本、首都、大文字" },
    { en: "content", ja: "<~s>内容、目次" },
    { en: "court", ja: "裁判所、コート、中庭" },
    { en: "example", ja: "例、お手本" },
    { en: "garage", ja: "車庫、自動車修理（整備）工場" },
    { en: "method", ja: "方法、方式" },
    { en: "opinion", ja: "意見、私の考えでは…" },
    { en: "pack", ja: "包み、1箱" },
    { en: "package", ja: "包み、小包、包装紙" },
    { en: "performance", ja: "演奏、性能、業績" },
    { en: "route", ja: "道、ルート" },
    { en: "spare", ja: "予備品" },
    { en: "collection", ja: "収集品、収集、集金" },
    { en: "difficulty", ja: "困難、困難な状況" },
    { en: "edge", ja: "端、刃" },
    { en: "payment", ja: "支払い" },
    { en: "guard", ja: "監視人、見張り" },
    { en: "catalog", ja: "カタログ、目録" },
    { en: "load", ja: "積み荷、重荷" },
    { en: "row", ja: "列、並び、連続して、一列に" },
    { en: "agent", ja: "代理店、代理人" },
    { en: "cable", ja: "ケーブル線、電報" },
    { en: "crash", ja: "衝突、墜落" },
    { en: "examination", ja: "試験、検査" },
    { en: "fashion", ja: "流行の" },
    { en: "knowledge", ja: "知識" },
    { en: "measure", ja: "<~s>手段、ものさし" },
    { en: "movement", ja: "活動、動き、運動" },
    { en: "plenty", ja: "多量" },
    { en: "sail", ja: "帆、航海" },
    { en: "spot", ja: "場所、斑点、シミ" },
    { en: "storm", ja: "嵐" },
    { en: "count", ja: "数えること" },
    { en: "arrangement", ja: "手配、協定、配列" },
    { en: "century", ja: "世紀" },
    { en: "fan", ja: "ファン、うちわ、扇風機" },
    { en: "firm", ja: "会社" },
    { en: "lawyer", ja: "弁護士、法律家" },
    { en: "luck", ja: "運、幸運" },
    { en: "plate", ja: "皿、表札、プレート、食器類" },
    { en: "stage", ja: "段階、舞台" },
    { en: "stair", ja: "<~s>階段" },
    { en: "strike", ja: "打撃、ストライキ" },
    { en: "master", ja: "名人、主人" },
    { en: "shake", ja: "振ること、ミルクセーキ" },
    { en: "burn", ja: "やけど" },
    { en: "cab", ja: "タクシー" },
    { en: "doubt", ja: "疑い" },
    { en: "exit", ja: "出口" },
    { en: "fence", ja: "柵、塀" },
    { en: "flood", ja: "洪水" },
    { en: "flow", ja: "流れ" },
    { en: "plain", ja: "平原・平野" },
    { en: "sort", ja: "種類" },
    { en: "stretch", ja: "広がり、伸び" },
    { en: "hurt", ja: "傷、害" },
    { en: "beat", ja: "連打、鼓動" },
    { en: "defense", ja: "防御、防衛、弁護人" },
    { en: "disk", ja: "円板、ディスク、レコード" },
    { en: "electricity", ja: "電気" },
    { en: "fault", ja: "過失、故障、欠点" },
    { en: "festival", ja: "祭り、祝祭" },
    { en: "host", ja: "主人、主催者" },
    { en: "moment", ja: "チョットの間、現在、（～の）時" },
    { en: "pazzle", ja: "パズル、なぞ" },
    { en: "tip", ja: "チップ、先端" },
    { en: "tool", ja: "工具、道具" },
    { en: "valuables", ja: "貴重品" },
    { en: "wire", ja: "針金、電話線、電報" },
    { en: "worth", ja: "価値" },
    { en: "beauty", ja: "美" },
    { en: "broadcast", ja: "放送" },
    { en: "brush", ja: "ブラシ、刷毛" },
    { en: "difference", ja: "違い" },
    { en: "swing", ja: "スイング、ぶらんこ" },
    { en: "image", ja: "イメージ、印象、映像、画像" },
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

