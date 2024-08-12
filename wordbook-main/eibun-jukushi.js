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
    { en: "What company do you work for?", ja: "何という会社に勤めていますか？" },
    { en: "I've enjoyed your company very much.", ja: "ご一緒できて楽しかったです" },
    { en: "the head office", ja: "本社・本店" },
    { en: "office hours", ja: "営業時間・就業時間" },
    { en: "public offices", ja: "公共機関" },
    { en: "I want a table at the window.", ja: "窓際の席にしてください" },
    { en: "We will have to stop this project for want of funds.", ja: "財源不足のためこの計画を中断しなければならないだろう" },
    { en: "Please call me 'Ben'. ", ja: "「ベン」と呼んでください" },
    { en: "I'll call you again sometime next week.", ja: "来週のいつか、もう一度お電話します" },
    { en: "I'd like a wake-up call, please.", ja: "モーニングコールをお願いしたいのですが" },
    { en: "Do you have room service?", ja: "ルームサービスはしていますか" },
    { en: "There's bus service to the airport.", ja: "空港へはバスの便がある" },
    { en: "I'd like to place an order.", ja: "注文をしたいのですが" },
    { en: "alphabetical order", ja: "アルファベット順" },
    { en: "I'd like to order 40 copies of How to Write E-mail.", ja: "How to Write E-mailを40冊注文します" },
    { en: "The easiest way to go there is to take a taxi.", ja: "そこに行くのに一番簡単なのはタクシーに乗ることだ" },
    { en: "Could you show me the way to the post office?", ja: "郵便局に行く道を教えていただけますか" },
    { en: "Please come this way.", ja: "どうぞこちらへ" },
    { en: "When does the store open[close]?", ja: "その店は何時に開店[閉店]しますか" },
    { en: "They should be stored at low temperatures.", ja: "それらは低温で保管しなければならない" },
    { en: "I'm in the trading business.", ja: "貿易業についています" },
    { en: "Bryan is in Paris on business.", ja: "ブライアンは仕事でパリにいます" },
    { en: "It's none of your business.", ja: "あなたには関わりのないことだ" },
    { en: "Can I pay by credit card?", ja: "カードで払えますか" },
    { en: "You should pay more attention to your health.", ja: "自分の健康にはもっと注意を払うべきだ" },
    { en: "a pay raise.", ja: "賃上げ・昇給" },
    { en: "news reports", ja: "報道" },
    { en: "This is our company's annual report.", ja: "これが我が社の年次報告書です" },
    { en: "They are reporting on a train accident on TV.", ja: "テレビで列車事故について報道している" },
    { en: "I've taken a job in New York.", ja: "ニューヨークで職についた" },
    { en: "a hard job", ja: "困難な仕事" },
    { en: "The story is based on fact.", ja: "その話は事実に基づいている" },
    { en: "the base of Mt.Everest.", ja: "エベレスト山のふもと" },
    { en: "a wage base.", ja: "給与ベース" },
    { en: "What's the problem.", ja: "どうかしましたか" },
    { en: "What's the price?", ja: "おいくらですか" },
    { en: "rise in prices.", ja: "物価の上昇" },
    { en: "reasonably prised goods.", ja: "妥当な値段の商品" },
    { en: "solve a problem.", ja: "問題を解く・解決する" },
    { en: "tax rates.", ja: "課税率・税率" },
    { en: "What is the rate for the room?", ja: "この部屋の料金はいくらですか" },
    { en: "He is rated as the top golf player.", ja: "彼はトップゴルフプレイヤーと評価されている" },
    { en: "I'll check and let you know soon.", ja: "調べてすぐにお知らせいたします" },
    { en: "I'd like to cash this check, please.", ja: "この小切手を現金にしたいのですが" },
    { en: "May I have my check, please?", ja: "勘定書をください" },
    { en: "buy some fish at the market.", ja: "市場で魚を買う" },
    { en: "the international market.", ja: "国際市場" },
    { en: "the major part of the student body.", ja: "学生集団の大部分" },
    { en: "play an important part in the poject.", ja: "事業計画において重要な役目を果たす" },
    { en: "I parted ways with her last night.", ja: "昨夜彼女と別れた" },
    { en: "a house for sale", ja: "売り家" },
    { en: "an opening sale", ja: "開店記念特売" },
    { en: "Sales have been growing so far.", ja: "これまでのところ売り上げは伸びている" },
    { en: "Can I change British pounds for American dollars here?", ja: "ここで英国ポンドを米国ドルに変えられますか" },
    { en: "a change in the weather.", ja: "天候の変化" },
    { en: "I'd like some small change.", ja: "小銭が欲しいのですが" },
    { en: "Do you have plans for tomorrow?", ja: "明日予定はありますか" },
    { en: "I'm planning to move in early next month.", ja: "来月初めに引っ越す計画を立てている" },
    { en: "a one-room apartment", ja: "ワンルームのアパート" },
    { en: "There isn't enough room for all these bags.", ja: "このバッグ全部を収納できるスペースがありません" },
    { en: "There's no room for doubt.", ja: "疑問の余地がない" },
    { en: "This is a nonsmoking area.", ja: "ここは禁煙区域です" },
    { en: "Please feel free to call me again.", ja: "どうぞ遠慮なくまた電話してください" },
    { en: "Please send me your free catalog.", ja: "無料カタログをまた送ってください" },
    { en: "Are you free on Saturday night?", ja: "土曜の夜はあいていますか" },
    { en: "I would like to order the following products.", ja: "製品を注文したいと思います" },
    { en: "I'm sure I can do it.", ja: "本当にできるさ" },
    { en: "I'll be sure to tell her.", ja: "必ず彼女に伝えておくよ" },
    { en: "The car gradually increased its speed.", ja: "車はだんだん速度を増した" },
    { en: "a pay increase.", ja: "賃上げ" },
    { en: "That`ll be $75, with the tax.", ja: "税込で75ドルになります" },
    { en: "I received your letter of September 12.", ja: "9月12日付けの手紙を受け取りました" },
    { en: "Does the price include tax?", ja: "その料金に税金は含まれていますか" },
    { en: "a fitness program", ja: "フィットネスプログラム" },
    { en: "a children's TV program", ja: "子ども向けテレビ番組" },
    { en: "programmed control", ja: "プログラム制御" },
    { en: "The cost will be approximately $300.", ja: "費用はおおよそ300ドルです" },
    { en: "How much does it cost?", ja: "それはいくらかかりますか" },
    { en: "What is the new government's policy on Japan?", ja: "日本に対する新政府の政策はどのようなものですか" },
    { en: "Can I offer you something to drink?", ja: "何か飲み物をお持ちしましょうか" },
    { en: "We would like to offer you a 10% discount.", ja: "10%の割引をいたします" },
    { en: "I am very pleased to accept you offer.", ja: "お申し出を喜んでお受けいたします" },
    { en: "service charge", ja: "サービス料" },
    { en: "I am in charge of domestic sales.", ja: "私は国内販売を担当しています" },
    { en: "Will you charge it to my room, please?", ja: "部屋の方に請求してくださいますか" },
    { en: "He was charged with murder.", ja: "殺人罪に問われた" },
    { en: "We have a great deal of experience with computers.", ja: "我が社はコンピューターに関して豊かな知識があります" },
    { en: "It was the biggest earthquake I ever experienced.", ja: "それは今まで経験した中で一番大きな地震だった" },
    { en: "What's the state of the Japanese yen today?", ja: "今日の円の状況はどんなですか" },
    { en: "Would you please state your name?", ja: "お名前を言っていただけますか" },
    { en: "Please send me information on your products.", ja: "貴社の製品についての情報を送ってください" },
    { en: "tourist information", ja: "旅行案内" },
    { en: "a savings account", ja: "普通預金口座" },
    { en: "She gave a full account of what happened.", ja: "彼女は起きたことを詳しく説明した" },
    { en: "How do you account for these results?", ja: "これらの結果をどのように説明しますか" },
    { en: "Turn right at the next corner.", ja: "次の角を右に曲がりなさい" },
    { en: "Next time it's my turn.", ja: "次回は私の番です" },
    { en: "Trade has finally taken a turn for the better.", ja: "取引はやっと良い方向へ向かった。" },
    { en: "Please fill out the form and send it to us.", ja: "この用紙に必要事項を書き込んで、送ってください" },
    { en: "Her form is beautiful.", ja: "彼女は美しい姿をしている" },
    { en: "We formed a circle.", ja: "私たちは円陣を組んだ" },
    { en: "A waitress is bringing coffee for the customers.", ja: "ウエイトレスが客にコーヒーを運んでいる" },
    { en: "a straight line", ja: "直線" },
    { en: "a network of bus lines", ja: "バス路線網" },
    { en: "They are waiting in line for the tickets.", ja: "チケットを手にいれるために列を作って待っている" },
    { en: "Please hold the line.", ja: "＜電話を＞切らずにお待ちください" },
    { en: "What line of work are you in?", ja: "どんな仕事をしているのですか" },
    { en: "Let me check my schedule.", ja: "私の予定を調べてみます" },
    { en: "We are scheduled to stay here for 3 days.", ja: "３日間ここに滞在する予定です" },
    { en: "Please sign both copies and return one to us.", ja: "両方にサインして１通を返送してください" },
    { en: "traffic signs", ja: "交通標識" },
    { en: "Have you decided yet?", ja: "もうおきまりですか" },
    { en: "Could you show me this bag?", ja: "このカバンを見せてもらえますか" },
    { en: "I'll show you around Tokyo.", ja: "東京を案内してあげよう" },
    { en: "an auto show", ja: "モーターショー" },
    { en: "Don't drink and drive.", ja: "飲んだら乗るな" },
    { en: "Why don't I drive you home?", ja: "家まで車で送るよ" },
    { en: "get high returns.", ja: "高い利益を得る" },
    { en: "It drives me crazy.", ja: "それが私をイライラさせる" },
    { en: "I'd like him to call back when he returns.", ja: "彼が戻りましたら折り返し電話をして欲しいのですが" },
    { en: "I would like to return these papers.", ja: "これらの答案[レポート]を返したいと思います" },
    { en: "His father runs a big company.", ja: "彼の父親は大企業の経営者だ" },
    { en: "The new engine runs more quietly.", ja: "新型のエンジンは動きがより静かだ" },
    { en: "run for election", ja: "選挙に立候補する" },
    { en: "What time does the post office close?", ja: "郵便局は何時に閉まりますか" },
    { en: "a close friend", ja: "親しい友人" },
    { en: "take a closer look.", ja: "詳しく調べる" },
    { en: "My parents live close by.", ja: "私の両親は近くに住んでいる" },
    { en: "We don't serve alcohol.", ja: "お酒はお出ししていません" },
    { en: "How can I serve you?", ja: "何か承りましょうか" },
    { en: "It'll serve the purpose.", ja: "それは目的にかなうだろう" },
    { en: "Which depertment do you belong to?", ja: "何部に所属していますか" },
    { en: "Where's the furniture department?", ja: "家具売り場はどこですか" },
    { en: "Much damage was caused by the storm.", ja: "嵐で多くの被害を引き起こした" },
    { en: "We are now investigating the cause of the problem.", ja: "ただいま、問題の原因を調査中です" },
    { en: "I didn't expect him to come.", ja: "彼が来るとは思わなかった" },
    { en: "What do you expect me to do about it?", ja: "それについて私に何をやって欲しいですか" },
    { en: "We're expecting some rain.", ja: "雨を待っている" },
    { en: "an educational system", ja: "教育制度" },
    { en: "an air-conditioning system", ja: "空気調節システム" },
    { en: "an operating system", ja: "オペレーティング・システム（OS)" },
    { en: "I'll arrive there by seven tonight.", ja: "今晩7時までにはそこに着きます" },
    { en: "Is there a final for this course?", ja: "この講座には最終試験がありますか" },
    { en: "change one's course", ja: "針路を変える" },
    { en: "a golf course", ja: "ゴルフコース" },
    { en: "She is paying her bill at the cash desk.", ja: "彼女はレジで感情を支払っている" },
    { en: "a five-dollar bill", ja: "5ドル紙幣" },
    { en: "an air conditioner", ja: "空気調節装置・エアコン" },
    { en: "travel by air", ja: "飛行機で旅する" },
    { en: "I'd like to speak to the manager, please.", ja: "支配人と話したいのですが" },
    { en: "a sales manager", ja: "販売部長" },
    { en: "Please take a seat.", ja: "どうぞお掛けください" },
    { en: "Please be stated at the table.", ja: "テーブルにご着席ください" },
    { en: "He started a business of his own.", ja: "彼は自分自身の事業を起こした" },
    { en: "The hotel is owned by a Russian businessman.", ja: "そのホテルはロシアの実業家が所有している" },
    { en: "The tower stands on a hill.", ja: "その塔は丘の上に立っている" },
    { en: "The thermometer stands at 20.", ja: "温度計は20℃を示している" },
    { en: "I can't stand this toothache.", ja: "この歯痛は我慢できない" },
    { en: "a newspaper stand", ja: "新聞売り場" },
    { en: "Did you notice the 'Fragile' sticker?", ja: "「割れ物注意」のステッカーに気づきましたか" },
    { en: "the notice of resignation", ja: "退職通知" },
    { en: "I'm sorry to have to make this request on such short notice.", ja: "急にこんなお願いをしなければならず申し訳ありません" },
    { en: "Mr.Wada is now on a business trip.", ja: "ワダ氏は現在出張中です" },
    { en: "He tripped on the doorstep.", ja: "戸口の上がり段でつまずいた" },
    { en: "What's the weather going to be like today?", ja: "今日の天気はどうなりそうですか" },
    { en: "the complete works of Shakespeare.", ja: "シェイクスピア全集" },
    { en: "a complete failure", ja: "完全な失敗" },
    { en: "We expect the work to be completed by next month.", ja: "その仕事は来月までに完成する見込みです" },
    { en: "Please fill it up.", ja: "満タンにしてください（ガソリンなどで）" },
    { en: "The hall was filled with people.", ja: "ホールは人でいっぱいだった" },
    { en: "What happened?", ja: "何が起きたのですか" },
    { en: "Do you happen to know his adress?", ja: "ひょっとして彼の住所を知ってますか" },
    { en: "The worker is vacuuming the floor.", ja: "作業員が床に掃除機をかけている" },
    { en: "What floor is your office on?", ja: "あなたの事務所は何階にありますか" },
    { en: "I've really enjoyed this evening.", ja: "今夜は本当に楽しかったです" },
    { en: "at the age of fifteen", ja: "15歳で" },
    { en: "the space age", ja: "宇宙時代" },
    { en: "I haven't seen you for ages!", ja: "長い間会っていませんでしたね" },
    { en: "The streetcar is filled with passengers.", ja: "路面電車は満員の乗客を乗せている" },
    { en: "a public telephone", ja: "公衆電話" },
    { en: "a public service", ja: "公共事業・行政事務" },
    { en: "I get really nervous in public.", ja: "人前ではすごく緊張してしまう" },
    { en: "What types of music do you prefer?", ja: "どんなタイプの音楽が好きですか" },
    { en: "She is really my type.", ja: "彼女は私の好みのタイプです" },
    { en: "Where can I board the ship?", ja: "乗船場はどこですか" },
    { en: "a bulletin board", ja: "提示板" },
    { en: "a board meeting", ja: "取締役会議" },
    { en: "The main problem, as you know, is price.", ja: "知っての通り主要な問題は価格です" },
    { en: "water main", ja: "水道の本管" },
    { en: "He didn't care about the cost.", ja: "彼は費用のことを気にしなかった" },
    { en: "Would you care for dessert?", ja: "デザートはいかがですか" },
    { en: "Take care of yourself.", ja: "お身体を大切に" },
    { en: "The boy was saved from drowning.", ja: "少年は溺れているところを救助された" },
    { en: "Call now and save 30persent.", ja: "すぐ電話をして、30％節約しよう" },
    { en: "Please save the file in a text format.", ja: "このファイルをテキストフォーマットで保存してください" },
    { en: "Please provide us with the following information.", ja: "以下の資料をお送りください" },
    { en: "Provide for the future.", ja: "将来に備える" },
    { en: "Parking is not allowed here.", ja: "ここは駐車できません" },
    { en: "Please allow me to introduce Mr.Sato, our president.", ja: "我が社の社長、、サトウを紹介いたします" },
    { en: "I spend all my money.", ja: "お金を使い果たした" },
    { en: "How do you spend your free time?", ja: "自由な時間をどう過ごしていますか" },
    { en: "an objective point", ja: "目標地点" },
    { en: "I see your point.", ja: "おっしゃりたい事はわかります" },
    { en: "She pointed directly at him.", ja: "彼女はまっすぐ彼を指さした" },
    { en: "The teacher pointed out the mistakes in my composition.", ja: "先生は私の作文の誤りを指摘した" },
    { en: "break a cup.", ja: "コップを割る" },
    { en: "break a promise.", ja: "約束を破る" },
    { en: "Lets take a coffee break.", ja: "お茶の時間にしましょうか" },
    { en: "I dropped my camera.", ja: "カメラを落とした" },
    { en: "Please drop me off at the corner.", ja: "角で降ろしてください" },
    { en: "Theres a 20persent drop in production.", ja: "生産が20%低下している" },
    { en: "Please send this letter by air mail.", ja: "この手紙を航空便で送ってください" },
    { en: "Please mail or fax the instructions.", ja: "指示書は郵便かファックスで送ってください" },
    { en: "Can you mail this for me?", ja: "これを投函してくれない？" },
    { en: "Heres a copy of my report.", ja: "これが報告書のコピーです" },
    { en: "He asked me to copy my report.", ja: "彼は私の報告書をコピーさせて欲しいと言った" },
    { en: "We need to develop a new range of products.", ja: "私たちは一連の新製品を開発する必要がある" },
    { en: "Id like to make an international call.", ja: "国際電話をかけたいのですが" },
    { en: "Could I leave a message?", ja: "伝言をお願いしたいのですが" }, 
    { en: "Their action sends a clear message to the world.", ja: "彼らの行動は世界に明確なメッセージを送っている" },
    { en: "a front desk", ja: "フロント・受付" },
    { en: "a front door", ja: "前部ドア・正面玄関" },
    { en: "Please stop in front of that building.", ja: "あの建物の前で止めてください" },
    { en: "One of the girls is holding a sketchbook.", ja: "女の子たちの一人はスケッチブックを手にしている" },
    { en: "The game will  be held next Saturday afternoon.", ja: "試合は次の土曜の午後に行われます" },
    { en: "Please hold the line for a moment.", ja: "電話でしばらく切らずにお待ちください" },
    { en: "How did the doctor describe her condition.", ja: "医者は彼女の状態をどう説明したの" },
    { en: "housing conditions", ja: "住宅事情(状況）" },
    { en: "I want to present one condition.", ja: "条件を1つ提示したい" },
    { en: "You are probably a little tired from the trip.", ja: "あなたはおそらく旅のつかれが少しあるのでしょう" },
    { en: "the term of the loan.", ja: "ローンの返済期間" },
    { en: "a computer term", ja: "コンピューター用語" },
    { en: "the payment terms", ja: "支払い条件" }, 
    { en: "Thank you for your interest in our products", ja: "当社製品に関心をお持ちいただきありがとうございます" },
    { en: "an interest rate", ja: "利率" },
    { en: "protect the public interest", ja: "一般人の利益を守る" },
    { en: "That doesnt interest me much.", ja: "それにはあまり興味が湧きませんね" },
    { en: "pass through customs", ja: "税関を通過する" },
    { en: "pass a busy day", ja: "慌ただしい1日を送る" },
    { en: "Please pass me the salt.", ja: "塩をとってください" },
    { en: "a commuter pass", ja: "通勤定期券" },
    { en: "We will accept your request on the following conditions.", ja: "以下の条約付きであなたの申請を受理します" },
    { en: "Thanks very much for your letter requesting our catalog.", ja: "我が社のカタログをご請求くださりありがとうございます" },
    { en: "I enjoyed the special meal very much.", ja: "その特別料理はとてもおいしかった" },
    { en: "quality control", ja: "品質管理" },
    { en: "Things got a bit out of control.", ja: "事態はいささか収拾がつかなくなった" },
    { en: "I couldnt control myself.", ja: "自制することができなかった" }, 
    { en: "keep regular hours", ja: "規則正しい生活をする" },
    { en: "a regular meeting", ja: "定例会議" },
    { en: "regular size", ja: "普通サイズ" },
    { en: "He was fired from his job.", ja: "彼は仕事をクビになった" },
    { en: "There was a fire on Maple Street.", ja: "メープル通りで火事になった" },
    { en: "The girl is wearing dark glasses.", ja: "その少女は眼鏡をかけている" },
    { en: "My shoes have worn out", ja: "靴がすり減ってしまった" },
    { en: "I worn out.", ja: "疲れてしまった" },
    { en: "Where is the ladies wear section?", ja: "女性服の売り場はどこですか" },
    { en: "Is there any discount for using VISA?", ja: "VISAを使うと何か割引はありますか" },
    { en: "Im afraid its too expensive for me.", ja: "それは私には高すぎると思います" },
    { en: "the information and communication industry", ja: "情報通信産業" },
    { en: "id like to try some local wine.", ja: "この土地のワインを飲んでみたいのですが" },
    { en: "Where can I catch a local train for Nara?", ja: "奈良行きの普通列車に乗るにはどこに行けばいいですか" }, 
    { en: "apply for the position of branch manager", ja: "支店長の地位に応募する" },
    { en: "Im in a difficult position.", ja: "私は難しい立場にある" },
    { en: "a standing position.", ja: "立った姿勢" },
    { en: "How long does it take to reach Japan?", ja: "日本に到着するのにどれくらい時間がかかりますか" },
    { en: "She is reaching out her hand for food.", ja: "彼女は食べ物を取ろうと手を伸ばしている" },
    { en: "reach an agreement", ja: "合意に達する" },
    { en: "Keep this out of children's reach", ja: "これは子供の手の届かないところにおいてください" },
    { en: "We are in trouble.", ja: "私たちは困っています" },
    { en: "I didn't intend to cause you trouble.", ja: "あなたに迷惑をかけるつもりはありませんでした" },
    { en: "I am sorry to trouble you.", ja: "ご面倒をおかけしてすみません" },
    { en: "air traffic.", ja: "航空交通" },
    { en: "The traffic is very heavy today.", ja: "今日は交通量が非常に多い" },
    { en: "increase in value", ja: "価値が上がる" },
    { en: "We would much value your professional opinion.", ja: "あなたの専門家としてのご意見を尊重いたします" },
    { en: "I've been very busy with work.", ja: "仕事で大変忙しいです" },
    { en: "a busy street", ja: "繁華街" },
    { en: "I tried to call him, but the line was busy.", ja: "彼に電話をしたが話し中だった" },
    { en: "foreign trade", ja: "外国貿易" },
    { en: "foreign language", ja: "外国語" },
    { en: "Where is the foreign exchange window?", ja: "外国為替取引の窓口はどこですか" },
    { en: "Would it be possible to change the date until next week?", ja: "お会いするのに翌週に変更することは可能でしょうか？" },
    { en: "It's possible she might be late for work.", ja: "彼女が遅刻することはあり得ることです" },
    { en: "I'd like to see you as soon as possible.", ja: "できるだけ早くお会いしたいのですが" },
    { en: "cover a sofa with a blanket.", ja: "ソファーを毛布で覆う" },
    { en: "Will my insurance cover this?", ja: "これは保険で保障されますか" },
    { en: "The summit coference was covered live on TV.", ja: "首脳会議はテレビで生中継された" },
    { en: "What's on your mind?", ja: "何を考えているの（心配しているの）" },
    { en: "At the last moment he changed his mind.", ja: "土壇場で彼は考えを変えた" },
    { en: "Do you mind if I smoke?", ja: "タバコを吸ってもいいですか" },
    { en: "He is always full of energy.", ja: "彼はいつも活力がみなぎっている" },
    { en: "solar energy", ja: "太陽エネルギー" },
    { en: "I will let you know as soon as we get the test results.", ja: "テストの結果が分かり次第あなたに知らせます" },
    { en: "I hope that the plan will result in much more sales.", ja: "その企画で売り上げが増えると良いですね" },
    { en: "It's a very important matter.", ja: "それは非常に重要な問題です" },
    { en: "What's the matter with you?", ja: "どうかしたの" },
    { en: "It doesn't matter, anyway.", ja: "どっちみち大したことない" },
    { en: "a post office", ja: "郵便局" },
    { en: "He resigned his post.", ja: "彼は職を退いた" },
    { en: "post a notice", ja: "提示を出す" },
    { en: "There was a serious accident on the freeway.", ja: "高速道路で重大な事故があった" },
    { en: "He discovered it by accident.", ja: "彼は偶然それを見つけた" },
    { en: "Unfortunately, I can't attend the meeting.", ja: "残念ながら会議には出席できません" },
    { en: "I have a few other things to attend to.", ja: "しなければならない仕事がいくつか残っています" },
    { en: "Are you being attended to?", ja: "（店員が客に）誰か御用を承っておりましょうか" },
    { en: "I will continue to study the problem.", ja: "その問題の研究を続けるつもりだ" },
    { en: "Dry weather will continue through the weekend.", ja: "乾燥した天候は週末いっぱい続くでしょう" },
    { en: "He has a degree in engineering.", ja: "彼はエンジニアリングの学位を持っている" },
    { en: "to a certain degree", ja: "ある程度は" },
    { en: "My heart is beating rapidly.", ja: "心臓（胸）がどきどきしている" },
    { en: "I love you with all my heart.", ja: "心から愛しています" },
    { en: "The room is filled with plants and flowers.", ja: "その部屋は草花であふれている" },
    { en: "an automobile assembly plant", ja: "自動車組み立て工場" },
    { en: "The trees are planted along the center line.", ja: "センターライン沿いに樹木が植えられている" },
    { en: "a large amount of money", ja: "多額の金" },
    { en: "This would amount to about 300 dollar a year.", ja: "これは年約300ドルになるでしょう" },
    { en: "I'll pay in cash.", ja: "現金で支払います" },
    { en: "I would like to cash a traveler's check.", ja: "トラベラーズチェックを現金にしたいのですが" },
    { en: "It was good to have this conversation with you today.", ja: "本日この話し合いができてよかったです" },
    { en: "Don't you have any record of my order?", ja: "私の注文についてそちらに記録がないのですか" },
    { en: "break sales records", ja: "売り上げ記録を更新する" },
    { en: "In Fukuoka, 260 mm of rain was recorded Tuesday.", ja: "福岡では火曜日に260ミリの雨が記録されました" },
    { en: "My head hurts.", ja: "頭が痛む" },
    { en: "the head of our department", ja: "私たちの部の部長" },
    { en: "Where are you headed for?", ja: "どこに行くの" },
    { en: "a dinner party", ja: "晩餐会" },
    { en: "How many in your party?", ja: "何名様ですか" },
    { en: "The Democratic Party", ja: "民主党" },
    { en: "I'd like to discuss this subject with you in person.", ja: "この件についてあなたと直接会って話し合いたいのですが" },
    { en: "a fiscal policy", ja: "財政政策" },
    { en: "an insurance policy", ja: "保険証券" },
    { en: "I'd prefer a nonsmokeing window seat.", ja: "窓側の禁煙席がいいのですが" },
    { en: "I prefer rice to bread.", ja: "パンよりご飯が好きだ" },
    { en: "He fell off the chair.", ja: "彼は椅子から落ちた" },
    { en: "The temperature fell to minus -30 degrees.", ja: "気温は―30度に下がった" },
    { en: "He picked his words carefully.", ja: "彼は慎重に言葉を選んだ" },
    { en: "Where can I pick up the tickets?", ja: "チケットはどこへ取りにいけばいいですか" },
    { en: "I'll pick you up around 9 o'clock at your hotel.", ja: "9時ごろホテルに迎えに行きます" },
    { en: "an international airline", ja: "国際航空" },
    { en: "a direct flight for San Jose", ja: "サンノゼ行き直行便" },
    { en: "Does this train go direct to Chicago?", ja: "この列車はシカゴに直行しますか" },
    { en: "Can you direct me to the gate?", ja: "入口までの道を教えてくれますか" },
    { en: "If you have any questions, please call me directly at 000-000.", ja: "何か疑問がありましたら、直接わたし宛000-000にお電話ください" },
    { en: "It is necessary to study these materials before taking the exam.", ja: "試験を受ける前にこの資料を勉強しておく必要がある" },
    { en: "a necessary consequence", ja: "必然的結果" },
    { en: "I'm surprised to hear that.", ja: "それを聞いて驚いた" },
    { en: "What a pleasant surprise to hear from you!", ja: "君からの便りがあるなんて驚きだがうれしいな" },
    { en: "In that case, I'll call again next week.", ja: "その場合は来週もう一度電話します" },
    { en: "This is a very interesting case.", ja: "これは大変興味深い例です" },
    { en: "a divorce case", ja: "離婚訴訟" },
    { en: "This model is very popular with young people.", ja: "この型は若者に大変人気がある" },
    { en: "a popular entertainment", ja: "大衆芸能" },
    { en: "Where did you study Spanish?", ja: "スペイン語はどちらで勉強したのですか" },
    { en: "We need to study the market.", ja: "市場を調査する必要がある" },
    { en: "a case study", ja: "事例研究" },
    { en: "This museum is designed to help people experience science at work.", ja: "この博物館は人々が実際に科学を体験する手助けとなるように設計されている" },
    { en: "I don't like this design.", ja: "私はこのデザインは好きではありません" },
    { en: "I'd like some medicine for my cold.", ja: "風邪の薬が欲しいのですが" },
    { en: "I'll have a talk with my boss and get back to you later.", ja: "社長と話してから、後ほどご連絡いたします" },
    { en: "a party boss", ja: "政党のボス" },
    { en: "obey the law", ja: "法律を守る" },
    { en: "the law of energy conservation", ja: "エネルギー保存の法則" },
    { en: "She led us to our seats.", ja: "彼女は私たちを席に導いた" },
    { en: "Where does this road lead?", ja: "この道はどこへ通じるのか" },
    { en: "The East is leading the West 5 to 2.", ja: "東が西を5対2でリードしている" },
    { en: "lead a peaceful life", ja: "平穏な日々を送る" },
    { en: "May I see the wine list, please?", ja: "ワインリストを見せていただけますか" },
    { en: "The specials are listed on the menu.", ja: "サービス料理はメニューに載せてあります" },
    { en: "Is this area safe?", ja: "ココは安全な地域ですか" },
    { en: "All passengers are safe and sound.", ja: "乗客は全員無事です" }, 
    { en: "Take a step back, please.", ja: "一歩下がってください" },
    { en: "I will take the necessary steps immediately.", ja: "直ちに必要な手を打ちましょう" },
    { en: "Would you step this way, please?", ja: "こちらへ歩み寄り下さいませんか" },
    { en: "Let's have a short rest. ", ja: "ちょっと休もう" },
    { en: "We are short of cash.", ja: "現金が足りない" },
    { en: "apply for a job", ja: "仕事に応募する" },
    { en: "apply new technology to the basic design", ja: "新しい技術を基本設計に応用する" },
    { en: "an 18-month trial period", ja: "18か月の試用期間" },
    { en: "an early period in history", ja: "歴史の初期" },
    { en: "We produce a wide range of motors.", ja: "様々な種類のモーターを製造しています" },
    { en: "agricultural produce", ja: "農産物" },
    { en: "I hope I'll have a chance to see you again.", ja: "またお目にかかる機会があるよう願っています" },
    { en: "There's a good chance of showers this everning.", ja: "今晩、にわか雨の見込みが高い" },
    { en: "He will be present at his son's wedding.", ja: "彼は息子の結婚式には出席するだろう" },
    { en: "the present economic conditions", ja: "現在の経済状況" },
    { en: "The report will be presented at the next meeting.", ja: "報告書は次回の会議で提出されるだろう" },
    { en: "a married couple", ja: "夫婦" },
    { en: "I'll spend a couple of days there.", ja: "そこで2、3日過ごします" },
    { en: "a parking fine", ja: "駐車違反の罰金" },
    { en: "He was fined 500 dollars for speeding.", ja: "スピード違反で500ドルの罰金を科せられた" },
    { en: "a fine line", ja: "細い線" },
    { en: "He is likely to win the game.", ja: "彼は試合に勝ちそうだ" },
    { en: "She is the most likely candidate.", ja: "彼女は最も有望な候補者だ" },
    { en: "Your table is being prepared.", ja: "あなたのテーブルはまもなく準備が整います" },
    { en: "He is busy preparing for the meeting next week.", ja: "彼は来週の会議の準備で忙しい" },
    { en: "We are prepared to offer you an annual salary of 120000 dollars.", ja: "120000ドルの年棒を出してよいと思っています" },
    { en: "I haven't made a decision yet.", ja: "まだ決めていません" },
    { en: "The total cost will be about 1000 dollars.", ja: "費用はしめて1000ドルくらいでしょう" },
    { en: "That is a total failure.", ja: "それは完全な失敗だ" },
    { en: "The total is 12.50 dollars.", ja: "総額は12ドル50セントです" },
    { en: "job training", ja: "職業訓練" },
    { en: "Do you mind my asking the reason for that decision?", ja: "そのように決定した理由をおたずねしてもよろしいでしょうか" },
    { en: "listen to reason", ja: "道理に耳を傾ける" },
    { en: "armed force", ja: "武力" },
    { en: "I heard that he was forced to resign.", ja: "彼は辞職を強いられたと聞いた" },
    { en: "What is the speed limit?", ja: "制限速度はどれくらいですか" },
    { en: "The park is off limits between 8:00 p.m. and 7:00 a.m.", ja: "その公園は午後8時から翌朝7時までは立ち入り禁止です" },
    { en: "The amount you can buy is limited.", ja: "ご購入個数には限度があります" },
    { en: "a limitation on exports", ja: "輸出制限" },
    { en: "the national average", ja: "全国平均" },
    { en: "national interests", ja: "国益" },
    { en: "a national park", ja: "国立公園" },
    { en: "Please turn right at the second corner.", ja: "2つ目の角を右に曲がってください" },
    { en: "I am facing the biggest challenge of my career.", ja: "生涯で最もやりがいのある課題に直面している" },
    { en: "My apartment faces the park.", ja: "私のアパートは公園に面している" },
    { en: "I have nothing to add.", ja: "付け加えることはありません" },
    { en: "The news added to our happiness.", ja: "その知らせで私たちは一層うれしくなった" },
    { en: "I demand to see my lawyer.", ja: "弁護士に会うことを要求します" },
    { en: "demand for oil", ja: "石油の需要" },
    { en: "I depended on him time and again.", ja: "彼には何かにつけて世話になった" },
    { en: "Everything depends on the weather.", ja: "すべては天候次第だ" },
    { en: "I can't express how story I am.", ja: "お詫びの言葉もありません" },
    { en: "Is this an express train?", ja: "この列車は急行ですか" },
    { en: "Can you get this repaired?", ja: "これを修理してもらえますか" },
    { en: "The repairs will cost about 1000 dollars.", ja: "修繕費は1000ドルです" },
    { en: "natural gas", ja: "天然ガス" }, 
    { en: "Is there a gas station around here?", ja: "このあたりにガソリンスタンドはありますか" },
    { en: "a passenger ship", ja: "客船" },
    { en: "How much does it cost to ship by air?", ja: "航空便で送るといくらかかりますか" },
    { en: "I've lost my passport.", ja: "パスポートを無くしてしまった" },
    { en: "We lost the game 3-0.", ja: "3対0で試合に負けた" },
    { en: "The company lost 100000 dollars on the project.", ja: "その事業で会社は100000ドルを損失した" },
    { en: "Can you make this copy a little clearer?", ja: "このコピーをもう少しきれいにできませんか" },
    { en: "Could you please clear those books from the desk?", ja: "机の上の本を片付けてくれませんか" },
    { en: "outdoor activities", ja: "戸外活動" },
    { en: "community activities", ja: "地域社会活動" },
    { en: "A crowd has gathered around the soccer players.", ja: "群衆はサッカー先週の周りに集まった" },
    { en: "They crowded into the hall.", ja: "彼らはホールに押し合って入った" },
    { en: "The market is very crowded.", ja: "市場はスゴク混雑している" },
    { en: "a daily newspaper", ja: "日刊紙" },
    { en: "One tablet three times daily.", ja: "1錠を1日3回" },
    { en: "All in favor, please raise your hand.", ja: "賛成の方は皆手を上げてください" },
    { en: "She was born and raised in the United States.", ja: "彼女はアメリカ合衆国で生まれ育った" },
    { en: "The company is going to give us a raise.", ja: "会社は賃上げをするようだ" },
    { en: "The early bird catches the worm.", ja: "早起きの鳥は虫を捕まえる" },
    { en: "If you hurry, you'll be able to catch the last plane.", ja: "急げば最終便に間に合いますよ" },
    { en: "Excuse me. I couldn't catch what you said.", ja: "すみませんがおっしゃったことが聞き取れませんでした" },
    { en: "She has clear skin.", ja: "彼女は肌がきれいだ" },
    { en: "animal skins", ja: "動物の皮" },
    { en: "It sounds like a good plan.", ja: "それはいい計画のようですね" },
    { en: "Don't make a sound.", ja: "音を立てるな" },
    { en: "A sound mind in a sound body.", ja: "健全な体に健全な心" },
    { en: "A man is lying on the ground.", ja: "地面に男が横わたっている" },
    { en: "I have good grounds for thinking like that.", ja: "そのように考える十分な根拠がある" },
    { en: "I agree with you.", ja: "あなたに賛成です" },
    { en: "We agreed to meet again next week.", ja: "来週また会うことで合意した" },
    { en: "Dinner's ready.", ja: "夕食の用意ができました" },
    { en: "Are you ready to go?", ja: "出かける用意はできた？" },
    { en: "I am always ready to help you.", ja: "いつでも喜んでお手伝いします" },
    { en: "take regular exercise to keep fit", ja: "健康を維持するために規則正しい運動をする" },
    { en: "Exercise regularly.", ja: "定期的に運動しなさい" },
    { en: "exercise the right to vote", ja: "投票権を行使する" },
    { en: "Which key do I press to start?", ja: "始動するにはどのキーを押すのですか" },
    { en: "They pressed him for payment many times.", ja: "彼らは何度も彼に支払いを強く求めた" },
    { en: "The Prime Minister refused to speak to the press.", ja: "総理大臣は記者会見を拒否した" },
    { en: "I'd like to make a bus tour of England.", ja: "イギリスのバス旅行をしたいのですが" },
    { en: "a plant tour", ja: "工場見学" }, 
    { en: "What's the date today?", ja: "今日は何日ですか" },
    { en: "I have a date with her tonight.", ja: "今夜は彼女とデートだ" },
    { en: "Thank you for your check dated September 7 for 920 dollars.", ja: "9月7日付の920ドルの小切手をありがとうございます" },
    { en: "May I enter the room now?", ja: "今部屋に入ってもいいですか" },
    { en: "Enter your name and a password.", ja: "名前とパスワードを入力してください" },
    { en: "Stock prices are now at the lowest level in 10 years.", ja: "株価は目下、過去10年間で最安値をつけている" },
    { en: "1000 meters above sea level", ja: "海抜1000メートル" },
    { en: "Do you accept credit cards?", ja: "クレジットカードを使えますか" },
    { en: "accept an invitation", ja: "招待に応じる" },
    { en: "The damage caused by the fire was estimated at 500000 dollars.", ja: "火災による損害は500000ドルと見積もられた" },
    { en: "About 1300 houses were damaged by the flood.", ja: "約1300戸が洪水で被害を受けた" },
    { en: "deal with customer complaints", ja: "客の苦情処理をする" },
    { en: "The store deals in dry goods.", ja: "その店は衣料品を扱っています" },
    { en: "make a deal", ja: "取引をする" },
    { en: "I thought it was an excellent idea.", ja: "それはすばらしい考えだと思った" },
    { en: "Please be patient for a little while longer.", ja: "もうちょっとの間我慢してください" },
    { en: "attend a patient", ja: "患者を看護する" },
    { en: "This process takes a few hours.", ja: "この処理は数時間かかります" },
    { en: "process data", ja: "データを処理する" },
    { en: "Mr.Taro Wada will join our company as of April 1.", ja: "4月1日付でワダ・タロウ氏が我が社に入学します" },
    { en: "Would you join us for a drink?", ja: "一緒に一杯いかがですか" },
    { en: "join hands", ja: "手をつなぐ、手を携える" },
    { en: "Do you remember her?", ja: "彼女を覚えていますか" },
    { en: "I can't remember where I put it.", ja: "それをどこに置いたか思い出せない" },
    { en: "This tastes absolutely delicious.", ja: "これは極上の味がする" },
    { en: "How's the taste?", ja: "味はどうですか" },
    { en: "Would you like a taste?", ja: "味見なさいますか" },
    { en: "Go straight ahead for two blocks, and you'll find it on your left.", ja: "まっすぐ2ブロック行くと左手にあります" },
    { en: "A stalled truck is blocking the exit.", ja: "立ち往生したトラックが出口をふさいでいる" },
    { en: "Do you want to go downtown tonight?", ja: "今晩街に行きたい？" },
    { en: "Please follow me.", ja: "私のあとに続いてください" },
    { en: "I suggest you follow his advice.", ja: "彼の忠告に従った方がいい" },
    { en: "My new address is as follows", ja: "新しい住所は次の通りです" },
    { en: "Do you handle foreign exchange here?", ja: "こちらでは外国為替を扱っていますか" },
    { en: "Can you handle it?", ja: "あなたにそれが処理できますか" },
    { en: "a door handle", ja: "ドアの取っ手" },
    { en: "I'd like you to do something about it immediately.", ja: "そのことで直ちに何らかの処置を取って頂きたいのですが" },
    { en: "international trade", ja: "国際貿易" },
    { en: "trade with China", ja: "中国と貿易をする" }, 
    { en: "Do you know of any cheaper hotels?", ja: "もっと安いホテルを知りませんか" },
    { en: "No one knows what'll happen in the future.", ja: "未来のことは誰にもわからない" },
    { en: "future plans", ja: "将来計画" },
    { en: "land prices", ja: "地価" },
    { en: "travel by land", ja: "陸路を行く" },
    { en: "Flight 101 from Seattle landed five minutes ago.", ja: "シアトルからの101便は5分前に着陸した" },
    { en: "The cost of living has risen beyond my income.", ja: "生活費が収入以上に増加した" },
    { en: "rise to the top", ja: "首位に立つ" },
    { en: "a sharp rise in prices", ja: "物価の急激な上昇" },
    { en: "I'd like to have this suit pressed.", ja: "このスーツをアイロンがけしてもらいたいのですが" },
    { en: "The new job suits me fine.", ja: "新しい仕事は私によく合っている" },
    { en: "We're open every day except Monday.", ja: "月曜日を除く毎日営業しています" },
    { en: "He failed in the business.", ja: "その仕事で失敗した" },
    { en: "Do not fail to be here on time.", ja: "必ず時間通りにここに来てください" },
    { en: "We are putting almost all of our furniture up for sale.", ja: "ほぼすべての家具を売りに出している" },
    { en: "A man is talking a rest on the bench.", ja: "男の人がベンチで休んでいる" },
    { en: "He'll be out for the rest of the day.", ja: "彼は終日外出の予定です" },
    { en: "We stopped and rested for a while.", ja: "我々は立ち止まってしばらく休んだ" },
    { en: "a safety seat for children", ja: "子ども用安全シート" },
    { en: "For your safety, please don't lean on the doors.", ja: "危ないですからドアに寄りかからないでください" },
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

