/* ---------------- translated content questions ----------------
 * Language code -> book id -> chapter -> array of question strings, in the
 * same order as the Korean source in ../contentQuestions.js (array index i is
 * questionNumber i+1, so saved answers keyed 'q'+questionNumber still line
 * up). A chapter whose array is missing or has a different length than the
 * Korean source falls back to Korean in getContentQuestions(). Run
 * `npm run i18n:check` to verify counts.
 */
import enGenesis from './en/genesis.js';
import jaGenesis from './ja/genesis.js';
import thGenesis from './th/genesis.js';
import zhGenesis from './zh/genesis.js';
import enExodus from './en/exodus.js';
import jaExodus from './ja/exodus.js';
import thExodus from './th/exodus.js';
import zhExodus from './zh/exodus.js';
import enLeviticus from './en/leviticus.js';
import jaLeviticus from './ja/leviticus.js';
import thLeviticus from './th/leviticus.js';
import zhLeviticus from './zh/leviticus.js';

export const CONTENT_QUESTION_TRANSLATIONS = {
  en: {
    leviticus: enLeviticus,
    exodus: enExodus,
    genesis: enGenesis,
  },
  ja: {
    leviticus: jaLeviticus,
    exodus: jaExodus,
    genesis: jaGenesis,
  },
  th: {
    leviticus: thLeviticus,
    exodus: thExodus,
    genesis: thGenesis,
  },
  zh: {
    leviticus: zhLeviticus,
    exodus: zhExodus,
    genesis: zhGenesis,
  },
};
