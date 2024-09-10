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
    { en: "would like", ja: "～がほしい、～したい" },
    { en: "look for", ja: "～を探す" },
    { en: "wait for", ja: "人、物、事を待つ" },
    { en: "take place", ja: "行事などが行われる、事が起こる" },
    { en: "according to", ja: "（文献・報道などに）よれば、（指示・計画などに）したがって、～に比例して" },
    { en: "at least", ja: "少なくとも" },
    { en: "get to", ja: "～に到着する、仕事などを始める" },
    { en: "go out", ja: "食事などに外出する、（火、明かりなどが）消える" },
    { en: "so...can", ja: "…が～できるように" },
    { en: "up to", ja: "（～に達する）まで、次第である、<疑・否>する能力がない" },
    { en: "work on", ja: "仕事・問題などに取り組む" },
    { en: "in order to", ja: "～するために" },
    { en: "due to", ja: "～のために" },
    { en: "in front of", ja: "～の前に、～の正面に" },
    { en: "pick up", ja: "拾い上げる、人を乗せる、取りに行く" },
    { en: "even if", ja: "たとえ～でも" },
    { en: "because of", ja: "～のために" },
    { en: "pay for", ja: "～の代金を支払う" },
    { en: "next to", ja: "～の隣に、～の次に、<否>ほとんど～" },
    { en: "at all", ja: "<否>まったく（～ない）、<疑>いったい、そもそも" },
    { en: "How about...?", ja: "…はどうですか、…はどう思いますか" },
    { en: "think of", ja: "～について考える、～を思いつく" },
    { en: "make it", ja: "（～に）間に合う、（～に）何とか出席する、（～を）やり遂げる" },
    { en: "the same~(as)", ja: "(～と）同じような、（～と）同一の" },
    { en: "used to", ja: "（以前は）～したものだった、～であった" },
    { en: "sush as", ja: "（たとえば）～のような" },
    { en: "at home", ja: "くつろいで、家で" },
    { en: "on time", ja: "時間通りに、定刻に" },
    { en: "so...that", ja: "とても…なので" },
    { en: "take off", ja: "脱ぐ、離陸する、立ち去る" },
    { en: "depend on", ja: "～次第である、（…を）～に頼る、～を信頼する" },
    { en: "ask for", ja: "～を求める" },
    { en: "find out", ja: "見つけ出す、探り出す" },
    { en: "on the way", ja: "（～へ、～からの）途中で" },
    { en: "make sure", ja: "～であることを）確かめる、必ず（～するように）手配する" },
    { en: "let know", ja: "～に～を知らせる" },
    { en: "happy to", ja: "～してうれしい、喜んで～する" },
    { en: "speak to", ja: "～と…について話をする" },
    { en: "talk to", ja: "～と...について話をする" },
    { en: "get out", ja: "（～から）出る、（車などから）降りる、（～から知識・感情を）得る" },
    { en: "as well as", ja: "～もまた、～と同様に" },
    { en: "Why don't you...?", ja: "…したらどうですか、…しなさいよ" },
    { en: "move to", ja: "～へ引っ越す" },
    { en: "as ... as possible", ja: "できるだけ…に" },
    { en: "as soon as", ja: "～するとすぐに" },
    { en: "meet with", ja: "～と約束して）会う、成功・失敗・批判などに）遭遇する" },
    { en: "set up", ja: "設置する、設定する、設立する" },
    { en: "ready for", ja: "～の用意ができている" },
    { en: "on sale", ja: "特価販売の、発売中" },
    { en: "at the end of", ja: "～の最後に、～の端に" },
    { en: "a couple of", ja: "いくつかの、２つの" },
    { en: "look like", ja: "～のように見える、～に似ている" },
    { en: "take care of", ja: "～を取り計らう、～の世話をする" },
    { en: "break down", ja: "故障する、失敗する" },
    { en: "no longer", ja: "もう～でない、～しない" },
    { en: "get back to", ja: "あとで電話をする（手紙を書く）、仕事・話題などに）戻る" },
    { en: "get back", ja: "戻る、～を取り戻す" },
    { en: "turn off", ja: "（テレビ・明かりなど）を消す、(水・ガスなどを）止める" },
    { en: "as long as", ja: "～である間は、～である限りは" },
    { en: "be scheduled", ja: "予定されている、予定である" },
    { en: "worry about", ja: "～を心配する、～を気にする" },
    { en: "be sure to do", ja: "きっと～する" },
    { en: "on the top of", ja: "～の上に、～に加えて" },
    { en: "in advance", ja: "前もって" },
    { en: "come out", ja: "出てくる、現れる" },
    { en: "be interested in", ja: "～に興味がある、（したい）と思う" },
    { en: "by oneself", ja: "1人で、独力で、ひとりでに" },
    { en: "call back", ja: "～に電話する" },
    { en: "take out", ja: "～を取り出す、～を連れて行く" },
    { en: "get married", ja: "結婚する" },
    { en: "go for", ja: "～に行く、～を取りに行く、～を好む" },
    { en: "go through", ja: "（注意深く）通して読む、（困難なことを）経験する、（法案、交渉などが）成立する" },
    { en: "prior to", ja: "（時間・順序が）～より前に" },
    { en: "sign up", ja: "～に参加する、～するよう登録する" },
    { en: "apply to", ja: "～にあてはまる、適用される" },
    { en: "for a long time", ja: "長い間" },
    { en: "go on", ja: "～を続ける、起きる、移る" },
    { en: "see if", ja: "～かどうかを調べる" },
    { en: "these days", ja: "このごろは" },
    { en: "at this time", ja: "現時点では、今のところは" },
    { en: "put on", ja: "～を身に着ける、電気器具などをつける" },
    { en: "instead of", ja: "～の代わりに" },
    { en: "leave for", ja: "～へ向けて出発する" },
    { en: "every time", ja: "～するときはいつも" },
    { en: "in the middle of", ja: "～のさなかに、～の中央に" },
    { en: "in the future", ja: "将来、未来に" },
    { en: "come back", ja: "～から戻ってくる" },
    { en: "so far", ja: "今までのところは" },
    { en: "for example", ja: "例えば" },
    { en: "close to", ja: "～のすぐ近くで、そうである" },
    { en: "be required for", ja: "～が求められる、～しなければならない" },
    { en: "in time", ja: "間に合って、そのうち" },
    { en: "be supposed to do", ja: "することになっている、<否>～してはいけないことになっている" },
    { en: "come up", ja: "近付く、（問題などが）生じる、話題になる" },
    { en: "prepare for", ja: "～の準備をする" },
    { en: "would you mind...?", ja: "…していただけますか、...してもよろしいですか" },
    { en: "go into", ja: "～に入る、～の（詳細・説明）に入る" },
    { en: "deal with", ja: "問題などを処理する" },
    { en: "be filled with", ja: "～で満ちている" },
    { en: "get on", ja: "乗る、暮らしていく、（仕事などを）進める" },
    { en: "for sale", ja: "売り物の、売りに出して" },
    { en: "agree to", ja: "（提案などに）同意する" },
    { en: "stand in line", ja: "一列に並んで待つ" },
    { en: "lead to", ja: "～へ通じる、もたらす" },
    { en: "focus on", ja: "（注意などを）～に向ける、～に焦点を合わせる" },
    { en: "in case", ja: "（～という）場合に備えて、もし～した場合には" },
    { en: "get into", ja: "～に入る、乗り込む、（議論などを）始める、（好ましくない状況に）陥る" },
    { en: "on business", ja: "仕事で、商用で" },
    { en: "point out", ja: "～を指摘する" },
    { en: "as of", ja: "以降、時点で" },
    { en: "run out", ja: "期限が切れる、（～を）使い果たす" },
    { en: "check out", ja: "～を確認する、（手続きをして）出る" },
    { en: "all over", ja: "～のいたるところに" },
    { en: "go up", ja: "（物価、温度などが）上がる、建つ" },
    { en: "so well", ja: "なお、そのうえ" },
    { en: "drop off", ja: "（ヒト・モノをある場所に）降ろす、（程度・数量が）下がる" },
    { en: "have a look", ja: "～を（ちょっと）見る" },
    { en: "plan on doing", ja: "～するつもりである" },
    { en: "help one with", ja: "（仕事などを）手伝う" },
    { en: "hear from", ja: "～から便りがある" },
    { en: "thanks for", ja: "～をありがとう" },
    { en: "turn out", ja: "（結果が）～となる、（集会などに）集まる、明かりを消す" },
    { en: "suffer from", ja: "（病気などで）苦しむ、悩む" },
    { en: "graduate from", ja: "～を卒業する" },
    { en: "look up", ja: "～を調べる、よくなる" },
    { en: "get lost", ja: "道に迷う" },
    { en: "agree with", ja: "人に賛成する" },
    { en: "on vacation", ja: "休暇で" },
    { en: "for a while", ja: "しばらくの間" },
    { en: "result in", ja: "～（という結果を）もたらす" },
    { en: "result from", ja: "～の結果として起こる" },
    { en: "be likely to do", ja: "～しそうだ、～らしい" },
    { en: "all the time", ja: "いつも、ずっと続けて" },
    { en: "be full of", ja: "～でいっぱいである、～に富んでいる" },
    { en: "be used to", ja: "～になれている" },
    { en: "every other", ja: "１つおきの" },
    { en: "complain about", ja: "～について不満を言う、訴える" },
    { en: "be responsible for", ja: "仕事などに）責任がある" },
    { en: "figure out", ja: "答えを見つけ出す、～を理解する" },
    { en: "participate in", ja: "～に参加する" },
    { en: "be pleased to do", ja: "～してうれしい、喜んで～する" },
    { en: "be wrong with", ja: "～は具合が悪い" },
    { en: "turn down", ja: "（音量・火力などを）小さくする、（申し出などを）断る" },
    { en: "no problem", ja: "お安い御用です、かまいません" },
    { en: "provide with", ja: "供給する、備え付ける" },
    { en: "at all times", ja: "いつも、常に" },
    { en: "too bad", ja: "それは残念です" },
    { en: "look into", ja: "～を調べる" },
    { en: "put in", ja: "（時間・労力を）費やす、（～の）申込書などを提出する、（機器などを）取り付ける" },
    { en: "lay off", ja: "～を一時解雇する" },
    { en: "be sold out", ja: "売り切れである" },
    { en: "hand in", ja: "提出する" },
    { en: "be willing to do", ja: "快く～する" },
    { en: "have no idea", ja: "（～については）全く分からない" },
    { en: "put up", ja: "～を掲げる、人を泊める、～を建てる" },
    { en: "check in", ja: "チェックインする" },
    { en: "carry out", ja: "（計画・任務などを）実行する" },
    { en: "at the same time", ja: "同時に" },
    { en: "along with", ja: "～といっしょに、～に加えて" },
    { en: "lean on", ja: "～に寄りかかる、～に立てかける" },
    { en: "fail to do", ja: "～できない" },
    { en: "in person", ja: "（直接）自分で" },
    { en: "leave a message", ja: "（～へ）伝言を残す" },
    { en: "be located in", ja: "～に位置する" },
    { en: "end up", ja: "（最後には）～することになる" },
    { en: "far from", ja: "～には程遠い、～では決してない" },
    { en: "sit down", ja: "座る" },
    { en: "take over", ja: "引き継ぐ" },
    { en: "get along", ja: "はかどる、うまく折り合いをつける" },
    { en: "care for", ja: "～の世話をする、<疑・否>～を好む" },
    { en: "any time", ja: "いつでも" },
    { en: "except for", ja: "～を除いて" },
    { en: "give up", ja: "（計画・挑戦などを）あきらめる、（～に）見切りをつける" },
    { en: "show up", ja: "（会合などに）出る、（ものが）現れる" },
    { en: "refer to", ja: "～を参照にする、～を指す、～について言う" },
    { en: "in a row", ja: "一列に並んで、連続して" },
    { en: "after all", ja: "結局、何を言っても" },
    { en: "I wish I could ...", ja: "...できればよいのだが" },
    { en: "thanks to", ja: "人・事のおかげで" },
    { en: "make an appointment", ja: "～と会う約束をする" },
    { en: "no matter how", ja: "たとえどのように ～でも" },
    { en: "be concerned about", ja: "～を心配している、～が気掛かりである" },
    { en: "now that", ja: "（今や）～だから" },
    { en: "be in charge of", ja: "～を管理している、～に責任を持っている" },
    { en: "eat out", ja: "外食する" },
    { en: "feel free to do", ja: "遠慮せずに～する" },
    { en: "just around the corner", ja: "角を曲がったところに、もうすぐ" },
    { en: "in spite of", ja: "～にもかかわらず" },
    { en: "make a mistake", ja: "間違う、誤りを犯す" },
    { en: "all the way", ja: "はるばる、ずっと" },
    { en: "be out of order", ja: "故障している、乱雑になっている" },
    { en: "prefer to", ja: "～より～を好む" },
    { en: "make a reservation", ja: "予約する" },
    { en: "move on", ja: "（次の話題・作業など）に移る、旅を続ける" },
    { en: "specialize in", ja: "（店などが）～を専門に扱う、～を専門に研究する" },
    { en: "How come ...?", ja: "なぜ" },
    { en: "be tired of", ja: "～に飽きている、うんざりする" },
    { en: "rely on", ja: "～を信頼する、～に頼る" },
    { en: "on hand", ja: "近くに" },
    { en: "a wide range of", ja: "幅広い～" },
    { en: "come into effect", ja: "発効する" },
    { en: "What do you say...?", ja: "...はどうでしょうか？" },
    { en: "have a chance", ja: "機会がある" },
    { en: "keep in touch", ja: "～と連絡を保つ" },
    { en: "be tied up", ja: "～で忙しい" },
    { en: "every once in a while", ja: "ときどき、時折" },
    { en: "I would appreciate...", ja: "...をありがたく思います" },
    { en: "would rather", ja: "むしろ～したい" },
    { en: "no later than", ja: "～よりも遅れることなく、～までに" },
    { en: "at times", ja: "ときどき" },
    { en: "stay with", ja: "～に滞在する" },
    { en: "be in a hurry", ja: "あわてて、急いで" },
    { en: "I wonder if you could", ja: "…していただけませんか、…いたしませんか" },
    { en: "make a decision", ja: "（～について）決定する" },
    { en: "be designed for", ja: "～用の、～向けの" },
    { en: "from now on", ja: "これからは" },
    { en: "be subject to", ja: "（変更などの）可能性がある、（法などの）支配下にある、（天候などに）左右される" },
    { en: "transfer to", ja: "転勤させる" },
    { en: "be familiar with", ja: "よく知っている" },
    { en: "in case of", ja: "（事故などの）場合に" },
    { en: "be sure of", ja: "～を確信している" },
    { en: "take this opportunity to do", ja: "この機会をとらえて" },
    { en: "take...day of", ja: "...日休暇を取る" },
    { en: "place an order", ja: "発注する" },
    { en: "arrival time", ja: "到着時" },
    { en: "take the minutes of the meeting", ja: "会議の議事録をとる" },
    { en: "articles for everyday use", ja: "日用品" },
    { en: "Accoding to the survey, ...", ja: "調査によると…" },
    { en: "stock prices", ja: "株価" },
    { en: "the Carnegie Foundation", ja: "カーネギー財団" },
    { en: "operating instructions", ja: "操作説明書" },
    { en: "follow the instructions of the tour guide", ja: "添乗員の指示に従う" },
    { en: "private property", ja: "私有資産" },
    { en: "chemical properties", ja: "化学的特性" },
    { en: "a social security system", ja: "社会保障制度" },
    { en: "fill out an application form", ja: "応募用紙に記入する" },
    { en: "use a word-processing application", ja: "ワープロソフトを使う" },
    { en: "research and development", ja: "研究開発" },
    { en: "do market research on the new product", ja: "新製品について市場調査をする" },
    { en: "get an average mark", ja: "平均点をとる" },
    { en: "a majority decision", ja: "多数決" },
    { en: "a weather chart", ja: "天気図" },
    { en: "a sales chart", ja: "売上表" },
    { en: "a board of directors", ja: "取締役会" },
    { en: "file for divorce", ja: "離婚を申請する" },
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

