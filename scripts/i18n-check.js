// Static i18n check: reports keys missing from any language in
// src/i18n/strings.js, and T('key') calls in src/ whose key is not defined
// in Korean (the source language). Exits non-zero when anything is missing.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { STRINGS } from '../src/i18n/strings.js';

const LANGS = ['ko', 'en', 'ja', 'th', 'zh'];
const allKeys = new Set(LANGS.flatMap(l => Object.keys(STRINGS[l] || {})));
let problems = 0;

for (const lang of LANGS) {
  const dict = STRINGS[lang] || {};
  const missing = [...allKeys].filter(k => !(k in dict));
  if (missing.length) {
    problems += missing.length;
    console.log(`[${lang}] missing ${missing.length} key(s):\n  ${missing.join('\n  ')}`);
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === 'i18n' ? [] : walk(p);
    return /\.(js|jsx)$/.test(name) ? [p] : [];
  });
}
const used = new Set();
for (const file of walk('src')) {
  for (const m of readFileSync(file, 'utf8').matchAll(/\bT\(\s*['"`]([A-Za-z0-9_]+)['"`](?!\s*\+)/g)) used.add(m[1]);
}
const undefinedKeys = [...used].filter(k => !(k in STRINGS.ko));
if (undefinedKeys.length) {
  problems += undefinedKeys.length;
  console.log(`[source] T() keys not defined in ko:\n  ${undefinedKeys.join('\n  ')}`);
}

console.log(problems ? `\n${problems} i18n problem(s) found.` : `i18n OK: ${allKeys.size} keys x ${LANGS.length} languages, ${used.size} keys referenced.`);
process.exit(problems ? 1 : 0);
