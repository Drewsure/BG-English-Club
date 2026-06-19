import { ArrowRight, BookOpen, Brain, Briefcase, CalendarDays, Download, Heart, MessageCircle, Printer, Search, Sparkles, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Section } from '../App';
import type { Language } from '../lib/i18n';
import { printPageStyles } from '../lib/printStyles';

export type Briefing = {
  slug: string;
  gameTitle: string;
  title: string;
  jpTitle: string;
  audience: string;
  jpAudience: string;
  level: string;
  jpLevel: string;
  theme: string;
  jpTheme: string;
  why: string;
  jpWhy: string;
  mission: string;
  jpMission: string;
  simpleRules: string[];
  phraseTiers: {
    beginner: string[];
    someExperience: string[];
    experienced: string[];
  };
  jpPhraseTiers: {
    beginner: string[];
    someExperience: string[];
    experienced: string[];
  };
  prompts: string[];
  jpPrompts: string[];
  playerAids?: {
    title: string;
    items: string[];
  }[];
  jpPlayerAids?: {
    title: string;
    items: string[];
  }[];
  silverFit: string;
  jpSilverFit: string;
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

// Shared briefing data is intentionally exported for matching games to briefing cards.
// eslint-disable-next-line react-refresh/only-export-components
export const briefings: Briefing[] = [
  {
    slug: 'blokus-english-briefing-card',
    gameTitle: 'Blokus',
    title: 'Blokus English Briefing Card',
    jpTitle: 'ブロックス 英語ブリーフィングカード',
    audience: 'Beginners, families, Silver Circle tables, visual thinkers',
    jpAudience: '初心者、家族、シルバーサークル、視覚的に考える人向け',
    level: 'Very beginner friendly',
    jpLevel: 'とても初心者向け',
    theme: 'Blokus is a colorful shape-placement game. Players place pieces on the board, protect their space, and try to use as many pieces as possible.',
    jpTheme: 'ブロックスは、カラフルな形を盤面に置くゲームです。自分の場所を広げながら、できるだけ多くのピースを使います。',
    why: 'Blokus is excellent for first English tables because the rules are visual and the speaking is useful: corners, space, blocking, planning, and simple reactions.',
    jpWhy: 'ルールが目で見てわかりやすく、角、場所、ブロック、計画、短い反応など、使いやすい英語が自然に出ます。',
    mission: 'Before placing a piece, say where it is going and why that space is useful.',
    jpMission: 'ピースを置く前に、どこへ置くか、その場所がなぜ役に立つかを言う。',
    simpleRules: [
      'Choose your color.',
      'Start in your corner.',
      'On your turn, place one piece.',
      'Your new piece must touch one of your pieces at a corner.',
      'Your pieces cannot touch side to side.',
      'Try to use many pieces.',
      'If you cannot place a piece, you stop playing.',
      'At the end, fewer leftover squares is better.',
    ],
    phraseTiers: {
      beginner: ["I'm placing this here.", "I'm using this corner.", "I'm blocking this space.", "I'm saving this piece.", "I'm finished."],
      someExperience: ["I'm placing this piece in the corner.", "I'm trying to open more space.", "I'm blocking your path.", "I'm keeping my small pieces for later.", "I'm running out of space."],
      experienced: ["I'm placing this piece here because it is giving me two new corners.", "I'm using a small piece now so I can keep my path open.", "I'm blocking this area because you are expanding too quickly.", "I'm choosing this shape because it fits without closing my future options.", "I'm changing my plan because this side is crowded."],
    },
    jpPhraseTiers: {
      beginner: ['これをここに置いています。', 'この角を使っています。', 'この場所をふさいでいます。', 'このピースを残しています。', '終わりました。'],
      someExperience: ['このピースを角に置いています。', 'もっと場所を広げようとしています。', 'あなたの道をふさいでいます。', '小さいピースを後のために残しています。', '場所がなくなってきています。'],
      experienced: ['新しい角が二つできるので、このピースをここに置いています。', '道を残すために、今は小さいピースを使っています。', 'あなたが早く広がっているので、この場所をふさいでいます。', '未来の選択肢を閉じないので、この形を選んでいます。', 'こちら側が混んできたので、計画を変えています。'],
    },
    prompts: ['Where are you placing it?', 'Are you opening space or blocking space?', 'Which piece are you saving for later?'],
    jpPrompts: ['どこに置いていますか？', '場所を広げていますか、それともふさいでいますか？', '後のためにどのピースを残していますか？'],
    playerAids: [
      {
        title: 'Board Words',
        items: ['corner', 'side', 'space', 'piece', 'shape', 'fit', 'block', 'open path'],
      },
      {
        title: 'Live Table Question',
        items: ['Ask: “Are you opening space or blocking space?”', 'Choice 1: I am opening space.', 'Choice 2: I am blocking space.', 'Choice 3: I am saving space for later.'],
      },
      {
        title: 'Teacher / Host Notes',
        items: ['Keep the first game slow.', 'Let players point while speaking.', 'Use one sentence before each placement.', 'Celebrate useful English, not perfect grammar.'],
      },
    ],
    jpPlayerAids: [
      {
        title: '盤面の言葉',
        items: ['corner = 角', 'side = 辺', 'space = 場所', 'piece = ピース', 'shape = 形', 'fit = 合う', 'block = ふさぐ', 'open path = 道を開く'],
      },
      {
        title: 'ライブ質問',
        items: ['質問：“Are you opening space or blocking space?”', '選択肢1：場所を広げています。', '選択肢2：場所をふさいでいます。', '選択肢3：後のために場所を残しています。'],
      },
      {
        title: '先生・ホスト用メモ',
        items: ['最初のゲームはゆっくり進める。', '指さしながら話してよい。', '置く前に一文だけ言う。', '完璧な文法より、使えた英語を喜ぶ。'],
      },
    ],
    silverFit: 'Excellent. It is quiet, visual, easy to explain, and good for gentle conversation. Players can point, think, and speak one short sentence at a time.',
    jpSilverFit: 'とても合います。静かで、見てわかりやすく、説明しやすいゲームです。指さしながら考え、一文ずつ話せます。',
  },
  {
    slug: 'camel-up-english-briefing-card',
    gameTitle: 'Camel Up',
    title: 'Camel Up English Briefing Card',
    jpTitle: 'キャメルアップ 英語ブリーフィングカード',
    audience: 'Beginners, families, Silver Circle tables',
    jpAudience: '初心者、家族、シルバーサークル向け',
    level: 'Beginner friendly',
    jpLevel: '初心者向け',
    theme: 'A lively camel race where players predict which camel will win, fall behind, or surprise the table.',
    jpTheme: 'ラクダのレースを予想する、明るくて笑いやすいゲームです。',
    why: 'The race gives natural reasons to predict, react, and change your mind. It is excellent for short English phrases and emotional reactions.',
    jpWhy: '予想する、反応する、考えを変える理由が自然に生まれます。短い英語表現にとても向いています。',
    mission: 'Before placing a bet, say one prediction and one reason.',
    jpMission: '賭ける前に、予想と理由を一つずつ言う。',
    simpleRules: [
      'The camels are in a race.',
      'On your turn, do one thing.',
      'You can roll a die, place a tile, or choose a bet.',
      'Camels can sit on top of other camels.',
      'Guess the winner to get points.',
      'The race ends when one camel gets to the finish.',
    ],
    phraseTiers: {
      beginner: ["I'm choosing blue.", "I'm watching red.", "I'm betting on blue.", "I'm hoping blue wins.", "I'm surprised!"],
      someExperience: ["I'm thinking blue is winning.", "I'm watching red fall behind.", "I'm changing my mind now.", "I'm taking a safer bet."],
      experienced: ["I'm changing my mind because the race order is shifting.", "I'm choosing yellow because the odds are getting better.", "I'm not trusting blue after that roll.", "I'm taking a risk because the reward is bigger."],
    },
    jpPhraseTiers: {
      beginner: ['青を選んでいます。', '赤を見ています。', '青に賭けています。', '青が勝つと期待しています。', 'びっくりしています！'],
      someExperience: ['青が勝っていると思っています。', '赤が遅れているのを見ています。', '今、考えを変えています。', 'より安全な賭けをしています。'],
      experienced: ['レースの順番が変わっているので、考えを変えています。', 'オッズが良くなっているので、黄色を選んでいます。', 'その出目の後、もう青を信じていません。', 'リターンが大きいので、リスクを取っています。'],
    },
    prompts: ['Which camel do you trust now?', 'What changed after that roll?', 'Was your bet safe or risky?'],
    jpPrompts: ['今、どのラクダを信じますか？', 'そのサイコロで何が変わりましたか？', 'その賭けは安全でしたか、リスクがありましたか？'],
    silverFit: 'Very strong. It is visual, funny, fast, and easy to support with Japanese.',
    jpSilverFit: 'とても合います。見てわかりやすく、笑いやすく、短時間で遊べます。',
  },
  {
    slug: 'azul-english-briefing-card',
    gameTitle: 'Azul',
    title: 'Azul English Briefing Card',
    jpTitle: 'アズール 英語ブリーフィングカード',
    audience: 'Calm beginner tables, visual thinkers, seniors',
    jpAudience: '落ち着いた初心者テーブル、視覚的に考える人、シニア向け',
    level: 'Beginner to light intermediate',
    jpLevel: '初心者〜初級中級',
    theme: 'Players draft beautiful tiles and build a patterned wall while avoiding wasted pieces.',
    jpTheme: '美しいタイルを選び、無駄を避けながら模様を作るゲームです。',
    why: 'Azul creates careful choice language: colors, patterns, avoiding waste, and explaining simple strategy.',
    jpWhy: '色、模様、無駄を避ける、簡単な作戦を説明する英語が自然に出てきます。',
    mission: 'Explain your tile choice using color, pattern, and one risk.',
    jpMission: '色、模様、リスクを使って、選んだ理由を説明する。',
    simpleRules: [
      'Take tiles of one color.',
      'Take them from one circle or from the middle.',
      'Put the tiles in one row on your board.',
      'If you take too many tiles, put extras at the bottom.',
      'Full rows move one tile to your wall.',
      'Make patterns and score points.',
    ],
    phraseTiers: {
      beginner: ["I'm taking blue.", "I'm choosing red.", "I'm filling this row.", "I'm avoiding waste.", "I'm building my wall."],
      someExperience: ["I'm taking this color because I need it.", "I'm finishing this row.", "I'm avoiding extra tiles.", "I'm improving my pattern."],
      experienced: ["I'm taking this color because it is completing my row.", "I'm blocking you while protecting my score.", "I'm avoiding waste, even though I'm scoring less now.", "I'm choosing the safer pattern for later points."],
    },
    jpPhraseTiers: {
      beginner: ['青を取っています。', '赤を選んでいます。', 'この列を埋めています。', '無駄を避けています。', '自分の壁を作っています。'],
      someExperience: ['必要なので、この色を取っています。', 'この列を完成させています。', '余分なタイルを避けています。', '模様を良くしています。'],
      experienced: ['この列が完成するので、この色を取っています。', '自分の点を守りながら、あなたを止めています。', '今は点が少なくても、無駄を避けています。', '後の得点のために、安全な模様を選んでいます。'],
    },
    prompts: ['Which color do you need most?', 'What are you trying to avoid?', 'Did you help yourself or block someone?'],
    jpPrompts: ['一番必要な色は何ですか？', '何を避けようとしていますか？', '自分を助けましたか、それとも誰かを止めましたか？'],
    silverFit: 'Strong. Beautiful components and calm turns make it reassuring for slower conversation.',
    jpSilverFit: 'よく合います。見た目が美しく、落ち着いたターンで会話しやすいです。',
  },
  {
    slug: 'el-dorado-english-briefing-card',
    gameTitle: 'The Quest for El Dorado',
    title: 'The Quest for El Dorado English Briefing Card',
    jpTitle: 'エルドラド 英語ブリーフィングカード',
    audience: 'Families, beginner strategy tables, route-planning groups',
    jpAudience: '家族、初心者の戦略テーブル、ルート計画を楽しむグループ向け',
    level: 'Beginner to intermediate',
    jpLevel: '初心者〜中級',
    theme: 'Players lead expedition teams through jungle, rivers, villages, base camps, and mountain paths as they race toward the lost city of El Dorado.',
    jpTheme: '探検隊を率いて、ジャングル、川、村、ベースキャンプ、山道を進み、黄金都市エルドラドを目指すレースゲームです。',
    why: 'Every turn creates useful speaking: choosing a route, using cards, buying better cards, explaining risk, and reacting when another player blocks the path.',
    jpWhy: 'ルートを選ぶ、カードを使う、良いカードを買う、リスクを説明する、道をふさがれた時に反応する英語が自然に使えます。',
    mission: 'On each turn, say where you are moving, what card you are using, and why that route helps your expedition.',
    jpMission: '毎ターン、どこへ進むか、どのカードを使うか、そのルートがなぜ役に立つかを言う。',
    simpleRules: [
      'Your explorer starts at the beginning of the map.',
      'Your goal is to reach El Dorado first.',
      'On your turn, play cards from your hand.',
      'Green cards help you move through jungle spaces.',
      'Blue cards help you move through river spaces.',
      'Yellow cards give you money to buy better cards.',
      'Some spaces ask for more than one symbol. Pay enough cards to enter them.',
      'You may buy one card from the market if you have enough money.',
      'Put used cards and bought cards in your discard pile.',
      'When your deck is empty, shuffle your discard pile and make a new deck.',
      'Plan your path, improve your deck, and try not to get blocked.',
      'The first player to reach El Dorado triggers the end of the race.',
    ],
    phraseTiers: {
      beginner: ["I'm moving here.", "I'm using a green card.", "I'm crossing the river.", "I'm buying this card.", "I'm going this way."],
      someExperience: ["I'm moving through the jungle.", "I'm using two cards to enter this space.", "I'm buying a stronger card for later.", "I'm choosing this route because it is shorter.", "I'm waiting because the path is blocked."],
      experienced: ["I'm improving my deck because this route needs stronger movement cards.", "I'm choosing the river route because it is open and faster for my hand.", "I'm buying this card now so I can cross difficult terrain later.", "I'm slowing down now, but I'm preparing for a better turn next round.", "I'm changing my route because another explorer is blocking the narrow path."],
    },
    jpPhraseTiers: {
      beginner: ['ここへ進んでいます。', '緑のカードを使っています。', '川を渡っています。', 'このカードを買っています。', 'この道で行っています。'],
      someExperience: ['ジャングルを進んでいます。', 'このマスに入るためにカードを二枚使っています。', '後のために強いカードを買っています。', '短いので、このルートを選んでいます。', '道がふさがれているので待っています。'],
      experienced: ['このルートには強い移動カードが必要なので、デッキを良くしています。', '手札に合っていて道も空いているので、川ルートを選んでいます。', '後で難しい地形を越えるために、今このカードを買っています。', '今は遅くなっていますが、次のラウンドの良いターンを準備しています。', '細い道を他の探検家がふさいでいるので、ルートを変えています。'],
    },
    prompts: ['Which route are you choosing?', 'What terrain do you need next?', 'Are you moving fast or improving your deck?'],
    jpPrompts: ['どのルートを選んでいますか？', '次にどの地形が必要ですか？', '速く進んでいますか、それともデッキを良くしていますか？'],
    playerAids: [
      {
        title: 'Terrain Words',
        items: ['Jungle = green cards / machetes', 'River = blue cards / paddles', 'Village = yellow cards / coins', 'Base camp = remove weak cards', 'Mountain = blocked space; go around it'],
      },
      {
        title: 'Turn Talk Aid',
        items: ['1. I am checking my hand.', '2. I am choosing a route.', '3. I am playing these cards.', '4. I am moving to this space.', '5. I am buying one card / I am not buying now.'],
      },
      {
        title: 'Table Jobs',
        items: ['Navigator: asks “Which route are you choosing?”', 'Terrain caller: names the next terrain in English.', 'Market helper: asks “Are you buying a card?”', 'Reporter: says one sentence after each turn.'],
      },
    ],
    jpPlayerAids: [
      {
        title: '地形の言葉',
        items: ['Jungle = 緑カード / なた', 'River = 青カード / パドル', 'Village = 黄カード / コイン', 'Base camp = 弱いカードを取り除く', 'Mountain = 通れないマス。回り道をする'],
      },
      {
        title: 'ターンで使う順番',
        items: ['1. 手札を確認しています。', '2. ルートを選んでいます。', '3. このカードを使っています。', '4. このマスへ進んでいます。', '5. カードを一枚買っています / 今は買いません。'],
      },
      {
        title: 'テーブルの役割',
        items: ['ナビゲーター：“Which route are you choosing?” と聞く。', '地形係：次の地形を英語で言う。', 'マーケット係：“Are you buying a card?” と聞く。', 'レポーター：各ターン後に一文を言う。'],
      },
    ],
    silverFit: 'Good with support. The map is visual and exciting, but the market and deck-building need a gentle first game. Use the turn talk aid and play with open help.',
    jpSilverFit: 'サポートがあれば合います。地図は見やすく楽しいですが、マーケットとデッキ構築は最初にゆっくり説明すると安心です。',
  },
  {
    slug: 'carcassonne-english-briefing-card',
    gameTitle: 'Carcassonne',
    title: 'Carcassonne English Briefing Card',
    jpTitle: 'カルカソンヌ 英語ブリーフィングカード',
    audience: 'Beginner strategy tables, families, gentle competition',
    jpAudience: '初心者戦略テーブル、家族、やさしい競争向け',
    level: 'Beginner friendly',
    jpLevel: '初心者向け',
    theme: 'Players build a shared landscape of cities, roads, farms, and monasteries one tile at a time.',
    jpTheme: '都市、道、草原、修道院をタイルで少しずつ作るゲームです。',
    why: 'Every tile placement creates a clear reason to speak: here, next to, because, connect, block, finish.',
    jpWhy: 'タイルを置くたびに、場所、理由、つなげる、止める、完成させる表現が使えます。',
    mission: 'When placing a tile, say where it goes and why it helps.',
    jpMission: 'タイルを置く時に、どこに置くか、なぜ役に立つかを言う。',
    simpleRules: [
      'Take one land tile.',
      'Put it next to another tile.',
      'Roads touch roads. Cities touch cities.',
      'You can put one meeple on your new tile.',
      'Finish roads and cities to get points.',
      'The game ends when all tiles are used.',
    ],
    phraseTiers: {
      beginner: ["I'm placing this here.", "I'm making my road.", "I'm building my city.", "I'm connecting this tile.", "I'm getting points."],
      someExperience: ["I'm placing this tile here.", "I'm connecting it to my road.", "I'm trying to finish this city.", "I'm blocking your farm."],
      experienced: ["I'm placing this tile here because it is giving me two scoring options.", "I'm connecting to my road while reducing your farm value.", "I'm trying to finish this city before someone blocks it.", "I'm keeping this area open for another tile."],
    },
    jpPhraseTiers: {
      beginner: ['これをここに置いています。', '自分の道を作っています。', '自分の都市を作っています。', 'このタイルをつなげています。', '点を取っています。'],
      someExperience: ['このタイルをここに置いています。', '自分の道につなげています。', 'この都市を完成させようとしています。', 'あなたの草原を止めています。'],
      experienced: ['得点の選択肢が二つできるので、このタイルをここに置いています。', '自分の道につなげながら、あなたの草原の価値を下げています。', '誰かに止められる前に、この都市を完成させようとしています。', '次のタイルのために、この場所を空けています。'],
    },
    prompts: ['Why did you place it there?', 'What are you trying to finish?', 'Did you help yourself or block someone?'],
    jpPrompts: ['なぜそこに置きましたか？', '何を完成させようとしていますか？', '自分を助けましたか、誰かを止めましたか？'],
    silverFit: 'Good. Use fewer rules at first and focus on roads and cities.',
    jpSilverFit: '合います。最初はルールを少なくして、道と都市に集中すると安心です。',
  },
  {
    slug: 'sushi-go-english-briefing-card',
    gameTitle: 'Sushi Go!',
    title: 'Sushi Go! English Briefing Card',
    jpTitle: 'すしゴー 英語ブリーフィングカード',
    audience: 'Children, parents, beginners, quick warm-up tables',
    jpAudience: '子ども、保護者、初心者、短いウォームアップ向け',
    level: 'Very beginner friendly',
    jpLevel: 'とても初心者向け',
    theme: 'A fast card-drafting game about choosing sushi combinations before the cards pass away.',
    jpTheme: '回ってくる寿司カードから組み合わせを選ぶ、短くて楽しいゲームです。',
    why: 'It is perfect for food words, simple preference language, quick reactions, and prediction.',
    jpWhy: '食べ物、好き嫌い、短い反応、予想の英語にぴったりです。',
    mission: 'Say what you want, what you pass, and one reason.',
    jpMission: '欲しいカード、渡すカード、理由を一つ言う。',
    simpleRules: [
      'Look at your cards.',
      'Choose one card.',
      'Show your card at the same time as everyone else.',
      'Pass the other cards to the next player.',
      'Collect food cards to get points.',
      'After three rounds, the highest score wins.',
    ],
    phraseTiers: {
      beginner: ["I'm taking tempura.", "I'm passing this.", "I'm waiting for one more.", "I'm keeping this card.", "I'm making sushi points."],
      someExperience: ["I'm passing this card.", "I'm looking for one more.", "I'm taking this for points.", "I'm guessing you want pudding."],
      experienced: ["I'm keeping this because it is working with my last card.", "I'm taking pudding because I think you want it.", "I'm saving this because it may score later.", "I'm passing this because it is not helping me now."],
    },
    jpPhraseTiers: {
      beginner: ['天ぷらを取っています。', 'これを渡しています。', 'もう一枚を待っています。', 'このカードを残しています。', '寿司で点を作っています。'],
      someExperience: ['このカードを渡しています。', 'もう一枚を探しています。', '点のためにこれを取っています。', 'あなたはプリンが欲しいと思っています。'],
      experienced: ['前のカードと合うので、これを残しています。', 'あなたが欲しいと思うので、プリンを取っています。', '後で点になるかもしれないので、これを残しています。', '今は役に立たないので、これを渡しています。'],
    },
    prompts: ['What food do you want?', 'What card are you waiting for?', 'Can you predict another player?'],
    jpPrompts: ['どの食べ物が欲しいですか？', 'どのカードを待っていますか？', '他の人の狙いを予想できますか？'],
    silverFit: 'Good as a short warm-up, but the passing can feel fast. Slow mode is recommended.',
    jpSilverFit: '短いウォームアップに良いです。ただし少し速いので、ゆっくりモードがおすすめです。',
  },
];

const pageCopy = {
  en: {
    eyebrow: 'Weekly English Game Briefings',
    title: 'Simple Game Guides For Your Next English Table',
    subtitle: 'Use one briefing card before you play. Each guide gives you easy rules, useful phrases, and friendly questions so the table can start speaking with less pressure.',
    introTitle: 'How To Use These Cards',
    introBullets: [
      'Choose one game before the session.',
      'Pick one mission and a few useful phrases.',
      'Play gently, speak during real turns, and review one phrase at the end.',
    ],
    cadence: 'New guides added regularly',
    cadenceCopy: 'Start with one game, try the phrases at the table, then come back for more beginner-friendly ideas for English conversation in Fukuoka.',
    blogFocus: 'Two Blog Paths',
    blogFocusCopy: 'The same game guide can support two different readers. Silver Circle posts should feel gentle and community-focused. Corporate and teacher posts should feel practical, structured, and ready to use.',
    silverLane: 'Silver Circle Reading Path',
    silverLaneCopy: 'Use calm games, social confidence, short phrases, community participation, and low-pressure first tables.',
    corporateLane: 'Corporate + Teacher Reading Path',
    corporateLaneCopy: 'Use facilitation notes, communication goals, printable aids, workshop structure, and team conversation outcomes.',
    contentPromise: 'Each post should help a real person choose, prepare, play, and speak.',
    audience: 'Best For',
    theme: 'Theme Brief',
    why: 'Why It Works For English',
    mission: 'Table Mission',
    phrases: 'Useful Phrases',
    prompts: 'Conversation Prompts',
    playerAids: 'Player Aids',
    rules: 'Simple English Rules',
    silver: 'Silver Circle Fit',
    read: 'Open Briefing',
    cta: 'Open Table Play Tool',
  },
  ja: {
    eyebrow: '毎週の英語ゲーム・ブリーフィング',
    title: '次の英語テーブルで使えるゲームガイド',
    subtitle: '遊ぶ前に一枚のブリーフィングカードを使えます。かんたんなルール、使いやすい英語フレーズ、話しやすい質問で、無理なく会話を始められます。',
    introTitle: 'このカードの使い方',
    introBullets: [
      'セッション前にゲームを一つ選びます。',
      'ミッションを一つ、使うフレーズをいくつか選びます。',
      '実際のターンで少しずつ話し、最後に一つの表現を振り返ります。',
    ],
    cadence: '新しいガイドを少しずつ追加',
    cadenceCopy: 'まず一つのゲームから試して、テーブルでフレーズを使ってみてください。福岡で英語の会話に使いやすいゲームを少しずつ増やしていきます。',
    blogFocus: '二つのブログ導線',
    blogFocusCopy: '同じゲームガイドでも、読む人によって見せ方を分けます。Silver Circle はやさしい地域参加として、企業・先生向けは実用的な進行資料として見せます。',
    silverLane: 'Silver Circle 向け',
    silverLaneCopy: '落ち着いたゲーム、会話の安心感、短いフレーズ、地域参加、初めてのテーブルを中心にします。',
    corporateLane: '企業・先生向け',
    corporateLaneCopy: '進行メモ、コミュニケーション目標、印刷教材、ワークショップ構成、チーム会話の成果を中心にします。',
    contentPromise: '各記事は、選ぶ・準備する・遊ぶ・話す、まで助ける内容にします。',
    audience: 'おすすめ対象',
    theme: 'テーマ説明',
    why: '英語に向いている理由',
    mission: 'テーブルミッション',
    phrases: '使えるフレーズ',
    prompts: '会話プロンプト',
    playerAids: 'プレイヤーエイド',
    rules: 'Simple English Rules',
    silver: 'シルバーサークル適性',
    read: 'ブリーフィングを見る',
    cta: 'テーブル練習ツールを開く',
  },
} as const;

export function Briefings({ language, onNavigate }: { language: Language; onNavigate: (section: Section) => void }) {
  const t = pageCopy[language];
  const [selectedSlug, setSelectedSlug] = useState(briefings[0]?.slug ?? '');
  const expandedBriefingRef = useRef<HTMLElement | null>(null);
  const selectedBriefing = briefings.find((briefing) => briefing.slug === selectedSlug) ?? briefings[0];
  const chooseBriefing = (slug: string) => {
    setSelectedSlug(slug);
    window.setTimeout(() => {
      expandedBriefingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };
  const openBriefing = (slug: string) => {
    window.location.hash = `briefings/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openGame = (title: string) => {
    window.location.hash = `games?q=${encodeURIComponent(title)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="page-shell">
      <header className="tactical-banner py-12 text-center">
        <p className="eyebrow justify-center">{t.eyebrow}</p>
        <h1 className="compact-title mt-2">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#71685d]">{t.subtitle}</p>
      </header>

      <div className="container-shell py-10">
        <section className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <article className="reference-panel p-6">
            <h2 className="font-display text-3xl tracking-wide text-[#bd5c24]">{t.introTitle}</h2>
            <div className="mt-5 grid gap-3">
              {t.introBullets.map((bullet, index) => {
                const icons = [BookOpen, MessageCircle, Sparkles];
                const Icon = icons[index];
                return (
                  <p key={bullet} className="rounded-xl border border-[#efd39d] bg-white p-4 text-sm leading-7 text-[#62584f]">
                    <Icon className="mr-2 inline text-[#d87522]" size={17} />{bullet}
                  </p>
                );
              })}
            </div>
          </article>
          <article className="reference-panel p-6">
            <CalendarDays className="text-[#d87522]" size={28} />
            <h2 className="font-display mt-4 text-3xl tracking-wide text-[#3d332b]">{t.cadence}</h2>
            <p className="mt-4 text-sm leading-7 text-[#62584f]">{t.cadenceCopy}</p>
            <button onClick={() => onNavigate('play')} className="rule-button rule-button-primary mt-6 px-5 py-3">
              <Sparkles size={14} /> {t.cta}
            </button>
          </article>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <article className="reference-panel p-6">
            <p className="eyebrow">{language === 'ja' ? 'Blog Positioning' : 'Blog Positioning'}</p>
            <h2 className="font-display mt-3 text-3xl tracking-wide text-[#bd5c24]">{t.blogFocus}</h2>
            <p className="mt-4 text-sm leading-7 text-[#62584f]">{t.blogFocusCopy}</p>
            <p className="mt-4 rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5b4a40]">
              <Sparkles className="mr-2 inline text-[#d87522]" size={16} />
              {t.contentPromise}
            </p>
          </article>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#f4c0cf] bg-[#fff8fb] p-6">
              <Heart className="text-[#ef3d66]" size={28} />
              <h3 className="font-display mt-4 text-2xl tracking-wide text-[#3d332b]">{t.silverLane}</h3>
              <p className="mt-3 text-sm leading-7 text-[#62584f]">{t.silverLaneCopy}</p>
              <a href="#silver-circle" className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#ef3d66]">
                {language === 'ja' ? 'Silver Circle を見る' : 'View Silver Circle'} <ArrowRight size={12} />
              </a>
            </article>
            <article className="rounded-2xl border border-[#b9d2fb] bg-[#f7fbff] p-6">
              <Briefcase className="text-[#366eb4]" size={28} />
              <h3 className="font-display mt-4 text-2xl tracking-wide text-[#3d332b]">{t.corporateLane}</h3>
              <p className="mt-3 text-sm leading-7 text-[#62584f]">{t.corporateLaneCopy}</p>
              <a href="#partnerships" className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide text-[#366eb4]">
                {language === 'ja' ? '企業・団体向けを見る' : 'View Corporate Options'} <ArrowRight size={12} />
              </a>
            </article>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">{language === 'ja' ? 'Choose A Briefing' : 'Choose A Briefing'}</p>
              <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">
                {language === 'ja' ? '小さなカードから選ぶ' : 'Small Cards, Bigger When Chosen'}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#62584f]">
              {language === 'ja'
                ? 'まずカードを選びます。選んだカードだけが下に大きく表示され、詳しい内容を読めます。'
                : 'Scan the small cards first. Choose one, and the full teaching-library briefing opens below.'}
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {briefings.map((briefing) => {
              const active = briefing.slug === selectedBriefing.slug;
              return (
                <button
                  key={briefing.slug}
                  type="button"
                  onClick={() => chooseBriefing(briefing.slug)}
                  className={`group rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    active
                      ? 'border-[#d87522] bg-[#fff2d6] shadow-[#d87522]/15'
                      : 'border-[#efd39d] bg-white/85 shadow-[#7b4c20]/5'
                  }`}
                >
                  <p className="inline-flex rounded-full border border-[#efd39d] bg-white px-2 py-1 text-[9px] font-black uppercase tracking-wide text-[#bd5c24]">
                    {language === 'ja' ? briefing.jpLevel : briefing.level}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-none tracking-wide text-[#3d332b]">
                    {language === 'ja' ? briefing.jpTitle : briefing.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-xs leading-5 text-[#62584f]">
                    {language === 'ja' ? briefing.jpTheme : briefing.theme}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide ${active ? 'text-[#d87522]' : 'text-[#8c7563] group-hover:text-[#d87522]'}`}>
                    {active ? (language === 'ja' ? '下に表示中' : 'Open below') : (language === 'ja' ? '大きく開く' : 'Open full card')} <ArrowRight size={12} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedBriefing && (
        <section ref={expandedBriefingRef} className="mt-8 scroll-mt-28">
          <article id={selectedBriefing.slug} className="reference-panel overflow-hidden">
            <div className="border-b border-[#efd39d] bg-[#fff8ea] p-5">
              <p className="eyebrow">{language === 'ja' ? '大きなブリーフィング' : 'Expanded Briefing'}</p>
              <p className="eyebrow">{language === 'ja' ? selectedBriefing.jpLevel : selectedBriefing.level}</p>
              <h2 className="font-display mt-2 text-4xl tracking-wide text-[#bd5c24]">{language === 'ja' ? selectedBriefing.jpTitle : selectedBriefing.title}</h2>
              <p className="mt-2 text-xs text-[#766b60]"><Users className="mr-1 inline" size={13} />{language === 'ja' ? selectedBriefing.jpAudience : selectedBriefing.audience}</p>
            </div>
            <div className="space-y-4 p-5">
              <BriefingBlock icon={BookOpen} title={t.theme} body={language === 'ja' ? selectedBriefing.jpTheme : selectedBriefing.theme} />
              <BriefingBlock icon={Brain} title={t.why} body={language === 'ja' ? selectedBriefing.jpWhy : selectedBriefing.why} />
              <BriefingBlock icon={Sparkles} title={t.mission} body={language === 'ja' ? selectedBriefing.jpMission : selectedBriefing.mission} />
              <SimpleRules title={t.rules} rules={selectedBriefing.simpleRules} compact />
              <PhraseTiers title={t.phrases} tiers={language === 'ja' ? selectedBriefing.jpPhraseTiers : selectedBriefing.phraseTiers} language={language} compact />
              <div className="grid gap-3 sm:grid-cols-3">
                {(language === 'ja' ? selectedBriefing.jpPrompts : selectedBriefing.prompts).map((prompt) => (
                  <div key={prompt} className="rounded-xl border border-[#bde8c9] bg-[#f7fff8] p-4 text-xs leading-6 text-[#536456]">
                    <MessageCircle className="mb-2 text-[#2e7c44]" size={16} />{prompt}
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#ffbdce] bg-[#fff7fa] p-4">
                <h3 className="font-display text-xl tracking-wide text-[#ef3d66]">{t.silver}</h3>
                <p className="mt-2 text-sm leading-6 text-[#62584f]">{language === 'ja' ? selectedBriefing.jpSilverFit : selectedBriefing.silverFit}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => openBriefing(selectedBriefing.slug)} className="rule-button px-4 py-2"><BookOpen size={13} /> {t.read}</button>
                <button onClick={() => openGame(selectedBriefing.gameTitle)} className="rule-button px-4 py-2"><Search size={13} /> {language === 'ja' ? 'ゲームを見る' : 'View Game'}</button>
                <button onClick={() => onNavigate('play')} className="rule-button rule-button-primary px-4 py-2"><ArrowRight size={13} /> {t.cta}</button>
                <a
                  href="/downloads/bg-english-club-briefing-sample.pdf"
                  download
                  className="rounded border border-[#e0d2b6] bg-white px-4 py-2 text-[10px] font-bold uppercase text-[#8c7563]"
                >
                  <Download size={13} className="mr-1 inline" /> {language === 'ja' ? '無料PDF' : 'Free sample PDF'}
                </a>
              </div>
            </div>
          </article>
        </section>
        )}

      </div>
    </main>
  );
}

export function BriefingDetail({ language, slug }: { language: Language; onNavigate: (section: Section) => void; slug: string }) {
  const t = pageCopy[language];
  const briefing = briefings.find((item) => item.slug === slug) ?? briefings[0];
  const title = language === 'ja' ? briefing.jpTitle : briefing.title;
  const audience = language === 'ja' ? briefing.jpAudience : briefing.audience;
  const level = language === 'ja' ? briefing.jpLevel : briefing.level;
  const prompts = language === 'ja' ? briefing.jpPrompts : briefing.prompts;
  const playerAids = language === 'ja' ? briefing.jpPlayerAids : briefing.playerAids;
  const openGame = () => {
    window.location.hash = `games?q=${encodeURIComponent(briefing.gameTitle)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openPlay = () => {
    window.location.hash = `play?briefing=${encodeURIComponent(briefing.slug)}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const printBriefing = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=900');
    if (!printWindow) {
      window.print();
      return;
    }
    const theme = language === 'ja' ? briefing.jpTheme : briefing.theme;
    const why = language === 'ja' ? briefing.jpWhy : briefing.why;
    const mission = language === 'ja' ? briefing.jpMission : briefing.mission;
    const silverFit = language === 'ja' ? briefing.jpSilverFit : briefing.silverFit;
    const tiers = language === 'ja' ? briefing.jpPhraseTiers : briefing.phraseTiers;
    const rules = briefing.simpleRules.map((rule, index) => `<li><strong>${index + 1}.</strong> ${escapeHtml(rule)}</li>`).join('');
    const beginner = tiers.beginner.map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const someExperience = tiers.someExperience.map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const experienced = tiers.experienced.map((phrase) => `<li>${escapeHtml(phrase)}</li>`).join('');
    const promptItems = prompts.map((prompt) => `<li>${escapeHtml(prompt)}</li>`).join('');
    const aids = playerAids?.map((aid) => `
      <div class="card">
        <p class="label">${escapeHtml(aid.title)}</p>
        <ul>${aid.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    `).join('') ?? '';

    printWindow.document.write(`
      <html>
        <head>
          <title>${escapeHtml(title)}</title>
          <style>${printPageStyles}</style>
        </head>
        <body>
          <main class="sheet">
            <p class="label">Board Game English Club - Fukuoka Chapter</p>
            <h1>${escapeHtml(title)}</h1>
            <p class="small">${escapeHtml(audience)} · ${escapeHtml(level)}</p>
            <div class="card"><p class="label">${escapeHtml(t.theme)}</p><p>${escapeHtml(theme)}</p></div>
            <div class="card"><p class="label">${escapeHtml(t.why)}</p><p>${escapeHtml(why)}</p></div>
            <div class="card selected"><p class="label">${escapeHtml(t.mission)}</p><p>${escapeHtml(mission)}</p></div>
            <div class="card"><p class="label">${escapeHtml(t.rules)}</p><ol>${rules}</ol></div>
            <div class="grid">
              <div class="card"><p class="label">Beginner Phrases</p><ul>${beginner}</ul></div>
              <div class="card"><p class="label">Some Experience Phrases</p><ul>${someExperience}</ul></div>
            </div>
            <div class="card"><p class="label">Experienced Phrases</p><ul>${experienced}</ul></div>
            <div class="card"><p class="label">${escapeHtml(t.prompts)}</p><ul>${promptItems}</ul></div>
            ${aids}
            <div class="card"><p class="label">${escapeHtml(t.silver)}</p><p>${escapeHtml(silverFit)}</p></div>
            <p class="print-note">A4 briefing print. Keep margins enabled in the browser print dialog for clean output.</p>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <main className="page-shell">
      <article className="container-shell py-12">
        <a href="#briefings" className="text-xs font-bold uppercase tracking-wide text-[#c86123]">
          {language === 'ja' ? '← ブリーフィング一覧へ' : '← Back to all briefings'}
        </a>

        <header className="reference-panel mt-6 overflow-hidden">
          <div className="bg-[#fff8ea] p-7 text-center">
            <p className="eyebrow justify-center">{level}</p>
            <h1 className="compact-title mt-2">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#71685d]">
              {language === 'ja'
                ? '一つのゲームを英語セッションで使いやすくするためのブリーフィングページです。'
                : 'A standalone briefing page for one game, designed for real English table sessions.'}
            </p>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            <div className="border-b border-[#efd39d] p-5 text-center md:border-b-0 md:border-r">
              <Users className="mx-auto text-[#d87522]" size={24} />
              <p className="mt-3 text-[10px] font-bold uppercase text-[#8a7563]">{t.audience}</p>
              <p className="mt-2 text-sm leading-6 text-[#62584f]">{audience}</p>
            </div>
            <div className="border-b border-[#efd39d] p-5 text-center md:border-b-0 md:border-r">
              <CalendarDays className="mx-auto text-[#d87522]" size={24} />
              <p className="mt-3 text-[10px] font-bold uppercase text-[#8a7563]">{language === 'ja' ? '公開リズム' : 'Publishing Use'}</p>
              <p className="mt-2 text-sm leading-6 text-[#62584f]">{language === 'ja' ? '毎週記事のサンプル' : 'Example weekly article'}</p>
            </div>
            <div className="p-5 text-center">
              <BookOpen className="mx-auto text-[#d87522]" size={24} />
              <p className="mt-3 text-[10px] font-bold uppercase text-[#8a7563]">{language === 'ja' ? 'セッション用' : 'Session Use'}</p>
              <p className="mt-2 text-sm leading-6 text-[#62584f]">{language === 'ja' ? 'テーブルでそのまま使える英語カード' : 'Ready to use at the table'}</p>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-5">
            <BriefingBlock icon={BookOpen} title={t.theme} body={language === 'ja' ? briefing.jpTheme : briefing.theme} />
            <BriefingBlock icon={Brain} title={t.why} body={language === 'ja' ? briefing.jpWhy : briefing.why} />
            <BriefingBlock icon={Sparkles} title={t.mission} body={language === 'ja' ? briefing.jpMission : briefing.mission} />
            <SimpleRules title={t.rules} rules={briefing.simpleRules} />
            {playerAids && <PlayerAids title={t.playerAids} aids={playerAids} />}
            <div className="reference-panel p-5">
              <h2 className="font-display text-2xl tracking-wide text-[#bd5c24]">{t.prompts}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {prompts.map((prompt) => (
                  <p key={prompt} className="rounded-xl border border-[#bde8c9] bg-[#f7fff8] p-4 text-sm leading-7 text-[#536456]">
                    <MessageCircle className="mb-2 text-[#2e7c44]" size={16} />{prompt}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="reference-panel p-5">
              <PhraseTiers title={t.phrases} tiers={language === 'ja' ? briefing.jpPhraseTiers : briefing.phraseTiers} language={language} />
            </div>
            <div className="reference-panel border-[#ffbdce] bg-[#fff7fa] p-5">
              <h2 className="font-display text-2xl tracking-wide text-[#ef3d66]">{t.silver}</h2>
              <p className="mt-3 text-sm leading-7 text-[#62584f]">{language === 'ja' ? briefing.jpSilverFit : briefing.silverFit}</p>
            </div>
            <div className="reference-panel p-5">
              <h2 className="font-display text-2xl tracking-wide text-[#3d332b]">FAQ</h2>
              <details className="mt-4 rounded border border-[#efd39d] bg-white p-4">
                <summary className="cursor-pointer font-bold">{language === 'ja' ? '初心者に向いていますか？' : 'Is this good for beginners?'}</summary>
                <p className="mt-3 text-sm leading-7 text-[#62584f]">{language === 'ja' ? 'はい。短い表現から始められるので、初心者にも使いやすいです。' : 'Yes. It works well because the language can start with short, repeatable phrases.'}</p>
              </details>
              <details className="mt-3 rounded border border-[#efd39d] bg-white p-4">
                <summary className="cursor-pointer font-bold">{language === 'ja' ? 'どう使えばいいですか？' : 'How should I use it at the table?'}</summary>
                <p className="mt-3 text-sm leading-7 text-[#62584f]">{language === 'ja' ? '一つのミッションと三つのプロンプトだけを選び、プレイ中に無理なく使います。' : 'Choose one mission and three prompts, then use them lightly during play.'}</p>
              </details>
            </div>
            <button onClick={openPlay} className="rule-button rule-button-primary w-full justify-center py-3">
              <ArrowRight size={14} /> {t.cta}
            </button>
            <button onClick={printBriefing} className="rule-button w-full justify-center py-3">
              <Printer size={14} /> Print Briefing
            </button>
            <button onClick={openGame} className="rule-button w-full justify-center py-3">
              <Search size={14} /> {language === 'ja' ? 'ゲームカードを見る' : 'View Linked Game Card'}
            </button>
          </aside>
        </section>
      </article>
    </main>
  );
}

function PlayerAids({ aids, title }: { aids: NonNullable<Briefing['playerAids']>; title: string }) {
  return (
    <div className="reference-panel p-5">
      <h2 className="font-display text-2xl tracking-wide text-[#bd5c24]">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {aids.map((aid) => (
          <section key={aid.title} className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4">
            <h3 className="font-display text-xl tracking-wide text-[#3d332b]">{aid.title}</h3>
            <ul className="mt-3 space-y-2">
              {aid.items.map((item) => (
                <li key={item} className="rounded-lg border border-[#f2dfb8] bg-white px-3 py-2 text-sm leading-6 text-[#62584f]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function BriefingBlock({ icon: Icon, title, body }: { icon: typeof BookOpen; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-[#efd39d] bg-white p-4">
      <h3 className="flex items-center gap-2 font-display text-xl tracking-wide text-[#3d332b]"><Icon className="text-[#d87522]" size={17} />{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#62584f]">{body}</p>
    </div>
  );
}

function SimpleRules({ compact = false, rules, title }: { compact?: boolean; rules: string[]; title: string }) {
  return (
    <div className="rounded-xl border border-[#b9d2fb] bg-[#f7fbff] p-4">
      <h3 className="flex items-center gap-2 font-display text-xl tracking-wide text-[#366eb4]"><BookOpen size={17} />{title}</h3>
      <ol className={`mt-3 grid gap-2 ${compact ? '' : 'md:grid-cols-1'}`}>
        {rules.map((rule, index) => (
          <li key={rule} className="rounded-lg border border-[#d7e5fb] bg-white px-3 py-2 text-sm leading-6 text-[#4d5f75]">
            <span className="mr-2 font-display text-[#366eb4]">{index + 1}</span>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}

function PhraseTiers({
  compact = false,
  language,
  tiers,
  title,
}: {
  compact?: boolean;
  language: Language;
  tiers: Briefing['phraseTiers'];
  title: string;
}) {
  const labels = language === 'ja'
    ? ['Beginner / 初心者', 'Some Experience / 少し経験あり', 'Experienced / 経験者']
    : ['Beginner', 'Some Experience', 'Experienced'];
  const entries = [
    { label: labels[0], phrases: tiers.beginner, tone: 'border-[#bde8c9] bg-[#f7fff8] text-[#2e7c44]' },
    { label: labels[1], phrases: tiers.someExperience, tone: 'border-[#efd39d] bg-[#fffaf0] text-[#8a5d2a]' },
    { label: labels[2], phrases: tiers.experienced, tone: 'border-[#b9d2fb] bg-[#f7fbff] text-[#366eb4]' },
  ];

  return (
    <div className="rounded-xl border border-[#efd39d] bg-[#fffaf0] p-4">
      <h3 className="font-display text-xl tracking-wide text-[#3d332b]">{title}</h3>
      <div className={`mt-3 grid gap-3 ${compact ? '' : 'lg:grid-cols-1'}`}>
        {entries.map(({ label, phrases, tone }) => (
          <section key={label} className={`rounded-xl border p-3 ${tone}`}>
            <p className="text-[10px] font-bold uppercase tracking-wide">{label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {phrases.map((phrase) => (
                <span key={phrase} className="rounded-full border border-white/80 bg-white px-3 py-1 text-xs font-bold text-[#4f463e] shadow-sm">
                  {phrase}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
