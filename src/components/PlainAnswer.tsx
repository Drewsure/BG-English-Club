import type { Section } from '../App';
import { brandPromise, sessionProcess } from '../lib/programs';
import type { Language } from '../lib/i18n';

const answers: Partial<Record<Section, { en: string; ja: string; action: string }>> = {
  situation: {
    en: 'Board games help English because they give people a real reason to choose, ask, explain, laugh, and try again.',
    ja: 'ボードゲームは、選ぶ・聞く・説明する・笑う・もう一度試す理由を自然に作るので、英語に役立ちます。',
    action: 'Plain answer',
  },
  board: {
    en: `How it works: ${sessionProcess}`,
    ja: '流れ：ゲームを選ぶ → ブリーフィングカードを見る → 英語目標を一つ選ぶ → 会話カードを使う → 進歩を記録する。',
    action: 'Process',
  },
  games: {
    en: 'The game library helps you choose a table-ready board game for English conversation in Fukuoka.',
    ja: 'ゲームライブラリは、福岡で英語会話に使いやすいボードゲームを選ぶための場所です。',
    action: 'Game library',
  },
  briefings: {
    en: 'Each briefing card is a standalone English conversation guide for one board game, with simple rules, useful phrases, table questions, and a clear session goal.',
    ja: '各ブリーフィングカードは、一つのボードゲームを英語会話に変える独立したガイドです。かんたんなルール、使える表現、テーブル質問、セッション目標が入っています。',
    action: 'Teaching guide',
  },
  offers: {
    en: 'Choose the right Board Game English Club program: trial table, families, Silver Circle, corporate workshops, or briefing cards.',
    ja: '体験、親子、Silver Circle、企業ワークショップ、ブリーフィングカードから合うプログラムを選べます。',
    action: 'Programs',
  },
  partnerships: {
    en: 'Organizations can book corporate workshops or sponsor a local table for community participation.',
    ja: '団体は企業ワークショップを予約したり、地域参加のテーブルを支援したりできます。',
    action: 'Partner path',
  },
  play: {
    en: 'The Table Play Device combines one game, one briefing card, one English goal, one conversation prompt, and one progress note.',
    ja: 'Table Play Device は、ゲーム・ブリーフィング・英語目標・会話プロンプト・進歩メモを一つにします。',
    action: 'Table device',
  },
  ranking: {
    en: 'Progress is gentle: record what you actually said, then notice what comes next.',
    ja: '進歩はやさしく記録します。実際に言えた英語を書き、次に試すことを確認します。',
    action: 'Progress',
  },
  profile: {
    en: 'Your profile keeps useful phrases, session notes, focus goals, and progress marks from each table.',
    ja: 'プロフィールには、使えた表現、セッションメモ、英語目標、進歩の印が残ります。',
    action: 'Profile',
  },
  dossier: {
    en: 'The founder note explains why Board Game English Club uses analog games as a structured participation system.',
    ja: '創設者ページでは、なぜボードゲームを構造化された参加システムとして使うのかを説明します。',
    action: 'Founder note',
  },
  'silver-circle': {
    en: 'Silver Circle is a gentle senior table for English games, conversation, social connection, and enjoyable cognitive engagement. It is not medical care.',
    ja: 'Silver Circle は、英語ゲーム・会話・つながり・楽しい頭の体操のためのやさしいシニア向けテーブルです。医療行為ではありません。',
    action: 'Silver Circle',
  },
};

export function PlainAnswer({ section, language }: { section: Section; language: Language }) {
  const answer = answers[section];
  if (!answer) return null;

  return (
    <aside className="container-shell pt-24 md:pt-28">
      <div className="rounded-2xl border border-[#efc779] bg-[#fffaf0]/95 px-5 py-4 shadow-sm">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#c75a22]">{answer.action}</p>
        <p className="mt-2 text-sm font-bold leading-6 text-[#3d332b]">{language === 'ja' ? answer.ja : answer.en}</p>
        <p className="mt-1 text-xs leading-5 text-[#8a7563]">{language === 'ja' ? '約束：選ぶ。話す。笑う。そして、毎回少し使える英語を持ち帰る。' : `Promise: ${brandPromise}`}</p>
      </div>
    </aside>
  );
}
