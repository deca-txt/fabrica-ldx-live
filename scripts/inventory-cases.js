#!/usr/bin/env node
// Read-only inventory of filenames and text metadata under cases/raw; never executes input files.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(process.argv[2] || 'cases/raw');
const out = path.resolve('cases/inventory');
const fields = ['caseId','sourceFolder','titleCandidate','categoryCandidate','technology','entryPoint','runnable','clientBrandDetected','clientDataRisk','externalDependencies','sanitizationClass','recommendedUse','notes'];
const rows = [];
function walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const childRel = path.join(rel, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(full, childRel); continue; }
    const ext = path.extname(entry.name).toLowerCase();
    let snippets = '';
    if (['.html','.htm','.css','.js','.json','.xml','.txt','.md','.csv'].includes(ext) && fs.statSync(full).size < 2_000_000) snippets = fs.readFileSync(full, 'utf8').slice(0, 200_000);
    const ids = [...snippets.matchAll(/(?:https?:\/\/[^\s"'<>]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?:logo|brand|client))/gi)].map(match => match[0]);
    rows.push({ caseId: crypto.createHash('sha256').update(childRel).digest('hex').slice(0,12), sourceFolder: path.dirname(childRel) === '.' ? '' : path.dirname(childRel), titleCandidate: path.basename(entry.name, path.extname(entry.name)), categoryCandidate: '', technology: ext.replace('.','').toUpperCase(), entryPoint: ['.html','.htm'].includes(ext) ? childRel : '', runnable: 'unknown', clientBrandDetected: /logo|brand|client/i.test(entry.name) || /logo|brand|client/i.test(snippets) ? 'review' : 'unknown', clientDataRisk: ids.length ? 'review' : 'unknown', externalDependencies: [...new Set(ids.filter(value => /^https?:/i.test(value)))].join('|'), sanitizationClass: 'unreviewed', recommendedUse: '', notes: 'Automated read-only filename/text scan; human review required.' });
  }
}
fs.mkdirSync(out, { recursive: true });
if (fs.existsSync(root)) walk(root);
fs.writeFileSync(path.join(out,'case_inventory.json'), `${JSON.stringify(rows,null,2)}\n`);
const csv = [fields.join(','), ...rows.map(row => fields.map(field => `"${String(row[field] ?? '').replaceAll('"','""')}"`).join(','))].join('\n') + '\n';
fs.writeFileSync(path.join(out,'case_inventory.csv'), csv);
fs.writeFileSync(path.join(out,'INVENTORY_REPORT.md'), `# Case inventory report\n\n- Scanned directory: \`${path.relative(process.cwd(), root)}\`\n- Files inventoried: ${rows.length}\n- Scan type: read-only filenames and selected text metadata; no OCR and no file execution.\n- All findings require human review before sanitization or publication.\n`);
console.log(`PASS: inventoried ${rows.length} file(s) read-only from ${path.relative(process.cwd(),root)}.`);
