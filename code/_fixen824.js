const fs = require('fs');
let en = fs.readFileSync('README.md', 'utf8').split('\n');
const before = en.length;
for (let i = en.length - 1; i >= 0; i--) {
  if (/^    - \*\*On "Encrypted Reasoning" Being Cracked/.test(en[i])) en.splice(i, 1);
}
fs.writeFileSync('README.md', en.join('\r\n'));

// verify per-persona sub-bullet counts
const a = en;
function countFor(headerSub) {
  const h = a.findIndex(l => l.includes(headerSub));
  let n = 0;
  for (let i = h + 1; i < a.length; i++) {
    if (/^ - \*\*(💬|🤖)/.test(a[i])) break;          // next persona header
    if (/^### /.test(a[i])) break;                    // next section
    if (/^    - \*\*/.test(a[i])) n++;
  }
  return n;
}
console.log('removed', before - en.length, 'EN lines now', en.length);
console.log('Gemini subs:', countFor('Gemini/Antigravity')),
console.log('Claude subs:', countFor("Claude's Perspective")),
console.log('GPT subs:', countFor("GPT-5.5's Executive Perspective"));
console.log('EN 8/16 remaining:', a.filter(l => l.includes('Encrypted Reasoning') && l.includes('Being Cracked')).length);

// cleanup temp files
const tmp = ['code/_824_tw_daily.txt','code/_824_tw_toc.txt','code/_824_tw_tldr2.txt','code/_824_tw_gemini.txt','code/_824_tw_claude.txt','code/_824_tw_gpt.txt','code/_824_en_daily.txt','code/_824_en_toc.txt','code/_824_en_tldr2.txt','code/_824_en_gemini.txt','code/_824_en_claude.txt','code/_824_en_gpt.txt','code/_824_patch.js','code/_verify824.js'];
for (const t of tmp) { try { fs.unlinkSync(t); } catch (e) {} }
console.log('temp files cleaned');
