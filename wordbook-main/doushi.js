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
    { en: "reach", ja: "（～に）着く、（手などを）伸ばす、（～に）達する" },
    { en: "trouble", ja: "（～に）面倒をかける、（～を）悩ます" },
    { en: "value", ja: "（～を）尊重する" }, 
    { en: "cover", ja: "（～を）覆う、（保険で）保証する、報道する" },
    { en: "mind", ja: "＜疑問・否定文で＞気にする" },
    { en: "result", ja: "（～な）結果に終わる、（～から）結果として生じる" },
    { en: "matter", ja: "＜主に疑問・否定文で＞重要である" },
    { en: "post", ja: "（ビラなどを）提示する" },
    { en: "attend", ja: "出席する、（仕事などに）精を出す、（～の）世話をする" },
    { en: "continue", ja: "（～を）続ける、続く" },
    { en: "plant", ja: "植える" },
    { en: "amount", ja: "統計～になる" },
    { en: "cash", ja: "現金にする" },
    { en: "record", ja: "（～を）記録する、録音する" },
    { en: "head", ja: "（～へ）向かう（向かわせる）" },
    { en: "discuss", ja: "（～を）議論する" },
    { en: "prefer", ja: "（∼を…より）好む" }, 
    { en: "fall", ja: "落ちる、下がる" },
    { en: "pick", ja: "（～を）運び出す、（ものを）取りに行く、（車で人を）迎えに行く" },
    { en: "direct", ja: "道を教える、導く" },
    { en: "surprise", ja: "（～を）驚かせる" },
    { en: "study", ja: "（～を）勉強する、（～を）調査する" },
    { en: "design", ja: "デザインする、設計する" },
    { en: "lead", ja: "（～を）導く、（道などが）通じる、リードする、（～な生活を）送る" },
    { en: "list", ja: "（名簿などに）載せる" },
    { en: "step", ja: "歩を進める" },
    { en: "apply", ja: "（～を）申し込む、（～を…に）応用する" },
    { en: "produce", ja: "（～を）製造（制作・生産）する" },
    { en: "present", ja: "提出する、（～を）贈る" },
    { en: "fine", ja: "（～に）罰金を科する" },
    { en: "prepare", ja: "（～を）用意する、（～に）備える、～する用意がある" },
    { en: "total", ja: "（～を）合計する" },
    { en: "force", ja: "（～することを）強制する" },
    { en: "limit", ja: "制限する" },
    { en: "face", ja: "直面する、（～に）面している" },
    { en: "add", ja: "（～を）加える、（～を）増す" },
    { en: "demand", ja: "要求する" },
    { en: "depend", ja: "（～に）頼る、次第である" },
    { en: "express", ja: "（考えなどを）表現する" },
    { en: "repair", ja: "（～を）修理する" },
    { en: "ship", ja: "輸送する、発送する" },
    { en: "lose", ja: "（～を）失う、負ける、損をする" },
    { en: "clear", ja: "（～を）片づける" },
    { en: "crowd", ja: "（～に）群がる・押し寄せる" },
    { en: "raise", ja: "（～を）上げる、育てる" },
    { en: "catch", ja: "つかまえる、（乗り物に）乗る、間に合う、聞き取る" },
    { en: "sound.", ja: "（～に）聞こえる（思われる）、（～を）鳴らす" },
    { en: "agree", ja: "賛成する、合意する" },
    { en: "exercise", ja: "運動する、行使する" },
    { en: "press", ja: "（～を）押す、（～に）強く求める" },
    { en: "date", ja: "日付をつける、デートする" },
    { en: "enter", ja: "（～に）入る、（～を）入力する" },
    { en: "level", ja: "平らにする" },
    { en: "accept", ja: "（～を）受け入れる、受諾する" },
    { en: "damage", ja: "（～に）損害を与える" },
    { en: "deal", ja: "（問題などを）扱う、（商品などを）扱う" },
    { en: "process", ja: "（～を）処理（加工）する" },
    { en: "join", ja: "（組織、活動などに）加わる、参加する、（～を）繋ぐ" },
    { en: "remember", ja: "（～を）覚えている、（～を）思い出す" },
    { en: "taste", ja: "（～の）味がする" },
    { en: "block", ja: "（道などを）ふさぐ" }, 
    { en: "follow", ja: "（～に）ついていく、従う、次の通りで" },
    { en: "handle", ja: "（～を）扱う、処理する" },
    { en: "trade", ja: "（～と）貿易する、（～と）交換する" },
    { en: "land", ja: "着陸する、上陸する" },
    { en: "rise", ja: "上がる、昇る" },
    { en: "suit", ja: "（～に）適する、（～に）似合う" },
    { en: "except", ja: "（～を）除く" },
    { en: "fail", ja: "（～に）失敗する、～しそこなう" },
    { en: "rest", ja: "休息する" },
    { en: "advise", ja: "助言する、通知する" },
    { en: "cross", ja: "（～を）横切る、（横線を引いて）削除する" },
    { en: "earn", ja: "（金を）稼ぐ、（名声などを）得る" },
    { en: "improve", ja: "（～を）改善する、よくなる" },
    { en: "inform", ja: "（～に…を）知らせる" },
    { en: "suggest", ja: "（～を）提案する" },
    { en: "choose", ja: "選ぶ" },
    { en: "balance", ja: "つり合いを取る" },
    { en: "figure", ja: "（～と）考える" },
    { en: "support", ja: "（人、考えなどを）支持する、（ものを）支える" },
    { en: "dress", ja: "（～に服を）着せる" },
    { en: "adress", ja: "（～に）宛名を書く、講演する" },
    { en: "dial", ja: "（電話番号を）回す、押す" },
    { en: "fix", ja: "修理する、（日時、場所など）を決める、固定する" },
    { en: "promise", ja: "（～に…を）約束する" },
    { en: "wonder", ja: "（～かと）思う、（～を）知りたいと思う、（～を）感嘆する" }, 
    { en: "race", ja: "急ぐ、急いでいる、競走する" },
    { en: "appear", ja: "～のようだ、現れる" },
    { en: "announce", ja: "発表する、公表する" },
    { en: "claim", ja: "（～であると）主張する、要求する" },
    { en: "create", ja: "創造する" },
    { en: "deliver", ja: "配達する、（演説などを）する" },
    { en: "view", ja: "（～を）考察する" },
    { en: "film", ja: "撮影する" },
    { en: "practice", ja: "練習する、実行する、開業する" },
    { en: "guess", ja: "推測する、（～と）思う" },
    { en: "hang", ja: "ぶら下がる、待つ、頑張り通す" },
    { en: "heat", ja: "（～を）熱する" },
    { en: "print", ja: "（～を）印刷する" },
    { en: "share", ja: "（～を）分ける、共有する" },
    { en: "excuse", ja: "(～するのを）許す、（～の）言い訳をする" },
    { en: "invite", ja: "（～を）招待する、（～に…を）勧める・請る" },
    { en: "borrow", ja: "借りる" },
    { en: "double", ja: "2倍にする" },
    { en: "forward", ja: "転送する、（計画などを）進める" },
    { en: "lie", ja: "横わたる、（～に）ある、うそを言う" },
    { en: "reserve", ja: "（～を）予約する、（～を）取っておく、留保する" },
    { en: "hire", ja: "雇う、賃借りする" },
    { en: "rush", ja: "（～へ）急ぐ、（～を）急いでやる" },
    { en: "touch", ja: "（～に）触れる、感動させる" },
    { en: "wind", ja: "（糸、テープなどを）巻く、（道、川が）うねる" },
    { en: "gain", ja: "（～を）得る、増す" },
    { en: "protect", ja: "（～を…から）守る、保護する" },
    { en: "approach", ja: "（～に）近づく" },
    { en: "explain", ja: "説明する" },
    { en: "lift", ja: "持ち上げる" },
    { en: "mention", ja: "（～に）言及する" },
    { en: "signal", ja: "合図する" },
    { en: "vote", ja: "（～の）投票をする" },
    { en: "win", ja: "（戦い、試合に）勝つ、（賞などを）勝ち取る" },
    { en: "guide", ja: "案内する" },
    { en: "contain", ja: "（～を）中に含む、（感情を）抑える" },
    { en: "describe", ja: "（～の様子を）述べる、描写する" },
    { en: "lock", ja: "（～に）鍵をかける、閉じ込める" },
    { en: "mark", ja: "（～に）印をつける" },
    { en: "suffer", ja: "（病気などで）苦しむ、（損害、被害などを）こうむる" },
    { en: "attack", ja: "攻撃する、（問題などに）取り掛かる" },
    { en: "grade", ja: "等級をつける" },
    { en: "match", ja: "（～と）調和する、（～に）匹敵する" },
    { en: "mix", ja: "混ぜる、混同する" },
    { en: "profit", ja: "（～から）利益を得る" },
    { en: "slip", ja: "（誤って）滑る、こっそり動く" },
    { en: "fit", ja: "（～に）ぴったり合う" },
    { en: "flag", ja: "（～に）合図をする" },
    { en: "permit", ja: "（～を）許す、許可する" },
    { en: "progress", ja: "はかどる、進歩する" },
    { en: "publish", ja: "（～を）出版する、（～を）発表する" },
    { en: "regard", ja: "（～を…と）みなす、（～を）評価する" },
    { en: "shock", ja: "衝撃を与える" },
    { en: "tie", ja: "（～を）結ぶ、縛る、（～で）忙しい" },
    { en: "shape", ja: "（～を）形作る" },
    { en: "miss", ja: "（～を）し損なう、（～に）乗り遅れる、（～が）いないのを寂しく思う" },
    { en: "compare", ja: "（～と）比較する、（～に）例える" },
    { en: "correct", ja: "（誤りを）訂正する" },
    { en: "empty", ja: "空にする" },
    { en: "introduce", ja: "（～を）紹介する、（～を）導入する" },
    { en: "judge", ja: "（～を…と）判断する、（～に）判断を下す" },
    { en: "remove", ja: "（～を）取り去る、取り除く" },
    { en: "sence", ja: "（～を）感知する" },
    { en: "separate", ja: "（～を）引き離す、分離する" },
    { en: "spread", ja: "広げる" },
    { en: "bear", ja: "（費用・責任などを）負う、担う、（～を）我慢する" },
    { en: "complain", ja: "（～について）不平[苦情]を言う" },
    { en: "pack", ja: "荷造りする、包装する、（人で）満員である" },
    { en: "realize", ja: "（～を）悟る、（～を）実現する、（利益を）得る" },
    { en: "spare", ja: "（時間などを）割く" },
    { en: "collect", ja: "集める、集金する" },
    { en: "destroy", ja: "（～を）破壊する" },
    { en: "guard", ja: "守る、（～に）用心する" },
    { en: "catalog", ja: "（～を）カタログに載せる" },
    { en: "intend", ja: "（～を）意図する" },
    { en: "load", ja: "（～を）積み込む、（～に弾などを）入れる" },
    { en: "row", ja: "漕ぐ" },
    { en: "succeed", ja: "（～に）成功する、跡を継ぐ" },
    { en: "cable", ja: "（～に）電報を打つ" },
    { en: "crash", ja: "衝突する、（飛行機が）墜落する、故障する" },
    { en: "gather", ja: "集まる、（～と）推測する" },
    { en: "measure", ja: "（～を）測る" },
    { en: "prevent", ja: "（～を未然に）防ぐ、（～が…するのを）妨げる" },
    { en: "sail", ja: "出航する、航海する" },
    { en: "spot", ja: "見つける、シミをつける" },
    { en: "storm", ja: "突進する" },
    { en: "count", ja: "数える、（～と）みなす、（～を）あてにする" },
    { en: "arrange", ja: "（～の）手はずを整える、並べる" },
    { en: "lay", ja: "横たえる、一時解雇する" },
    { en: "manage", ja: "なんとか…する、管理する" },
    { en: "strike", ja: "（～を）打つ、（考えが～の）心に浮かぶ" },
    { en: "lend", ja: "（～を）貸す、（援助の手など）与える" },
    { en: "master", ja: "（～を）習得する" },
    { en: "shake", ja: "振る、揺らす、握手する" },
    { en: "burn", ja: "燃える、焼く" },
    { en: "doubt", ja: "疑う" },
    { en: "fence", ja: "（～を）柵で囲む" },
    { en: "flood", ja: "氾濫する" },
    { en: "flow", ja: "流れる" },
    { en: "sort", ja: "解決する、整理する" },
    { en: "stretch", ja: "伸びる" },
    { en: "hurt", ja: "痛む、（～を）傷つける" },
    { en: "beat", ja: "打ち負かす、打つ、鼓動する" },
    { en: "freeze", ja: "凍る" },
    { en: "host", ja: "主催する" },
    { en: "insect", ja: "昆虫" },
    { en: "puzzle", ja: "当惑する、頭を悩ます" },
    { en: "solve", ja: "（問題などを）解決する" },
    { en: "tip", ja: "（～に）チップをやる" },
    { en: "broadcast", ja: "放送する" },
    { en: "brush", ja: "（～に）ブラシをかける、（～を）払いのける" },
    { en: "swing", ja: "（ぐるりと）回る、振る" },
    { en: "refer", ja: "（～を）参照する、（～に）関連する・言及する" },
    { en: "require", ja: "（～を）必要とする、要求する" },
    { en: "rent", ja: "賃借りする" },
    { en: "credit", ja: "信用する" },
    { en: "project", ja: "（～を）予測する、計画する、投影する" },
    { en: "stock", ja: "（～を）貯蔵する" },
    { en: "found", ja: "（～を）設立する、創立する" },
    { en: "contact", ja: "連絡する、接触する" },
    { en: "reduce", ja: "減少させる" },
    { en: "issue", ja: "発行する、発する" },
    { en: "suppose", ja: "（～と）思う、推測する、～することになっている・～してはいけない" },
    { en: "recommend", ja: "（～を）推薦する、（～を）勧める" },
    { en: "research", ja: "（～を）研究する" },
    { en: "major", ja: "（～を）専攻する" },
    { en: "loan", ja: "貸す" },
    { en: "chart", ja: "（～を）図表にする" },
    { en: "file", ja: "（～を）提出する、ファイルする" },
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

