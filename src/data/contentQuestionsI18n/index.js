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

export const CONTENT_QUESTION_TRANSLATIONS = {
  en: {
    genesis: enGenesis,
  },
  ja: {
    genesis: jaGenesis,
  },
  th: {
    genesis: thGenesis,
  },
  zh: {
    genesis: zhGenesis,
  },
};
