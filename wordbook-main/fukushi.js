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
    { en: "close", ja: "接近して" },
    { en: "probably", ja: "多分、おそらく" },
    { en: "direct", ja: "直接に" },
    { en: "directly", ja: "直接に、すぐに" },
    { en: "daily", ja: "毎日" },
    { en: "downtown", ja: "繫華街へ、商業地区へ" },
    { en: "immediately", ja: "直ちに、直接に" },
    { en: "ahead", ja: "前方に" },
    { en: "actually", ja: "実は、実際に" },
    { en: "warn", ja: "警告する" },
    { en: "recently", ja: "最近" },
    { en: "monthly", ja: "月ごとに、毎月" },
    { en: "forward", ja: "前方へ" },
    { en: "further", ja: "さらに、それ以上に" },
    { en: "hardly", ja: "ほとんど～ない、とても～ない" },
    { en: "certainly", ja: "確かに、承知しました" },
    { en: "instead", ja: "その代わりに、（～の）代わりに" },
    { en: "nearly", ja: "ほとんど、もう少しで" },
    { en: "separately", ja: "別々に" },
    { en: "tight", ja: "きつく" },
    { en: "flat", ja: "きっかり" },
    { en: "highly", ja: "おおいに、高く" },
    { en: "abroad", ja: "外国へ" },
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
    
]