#!/usr/bin/env node
// Validates the existing browser data source without changing it.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const file = process.argv[2] || path.join(__dirname, '../assets/js/catalog-data.js');
const context = { window: {} };
const errors = [];
try {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context, { timeout: 1000, filename: file });
} catch (error) {
  console.error(`Could not load catalog data: ${error.message}`);
  process.exit(2);
}
const { CATALOG: catalog, NEEDS: needs, PROCESS: processSteps } = context.window;
const requiredItemFields = ['id', 'name', 'category', 'shortDescription', 'fullDescription'];
const requiredLists = ['idealFor', 'needs', 'capabilities', 'outputs', 'caseIds'];
if (!Array.isArray(catalog) || catalog.length !== 20) errors.push(`Expected 20 solutions; found ${Array.isArray(catalog) ? catalog.length : 'non-array'}.`);
if (!Array.isArray(needs) || needs.length !== 12) errors.push(`Expected 12 needs; found ${Array.isArray(needs) ? needs.length : 'non-array'}.`);
if (!Array.isArray(processSteps) || processSteps.length !== 6) errors.push('Expected six process steps.');
const needIds = new Set();
if (Array.isArray(needs)) needs.forEach((need, i) => {
  if (!need || typeof need.id !== 'string' || !need.id.trim() || typeof need.label !== 'string' || !need.label.trim()) errors.push(`Need ${i + 1} has an invalid id or label.`);
  else if (needIds.has(need.id)) errors.push(`Duplicate need id: ${need.id}`);
  else needIds.add(need.id);
});
const solutionIds = new Set();
if (Array.isArray(catalog)) catalog.forEach((item, i) => {
  if (!item || requiredItemFields.some(key => typeof item[key] !== 'string' || !item[key].trim())) { errors.push(`Solution ${i + 1} is missing required text fields.`); return; }
  if (solutionIds.has(item.id)) errors.push(`Duplicate solution id: ${item.id}`);
  solutionIds.add(item.id);
  requiredLists.forEach(key => { if (!Array.isArray(item[key]) || item[key].some(value => typeof value !== 'string')) errors.push(`${item.id}.${key} must be an array of strings.`); });
  if (Array.isArray(item.needs)) item.needs.forEach(id => { if (!needIds.has(id)) errors.push(`${item.id} references unknown need: ${id}`); });
});
if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log(`PASS: ${catalog.length} solutions, ${needs.length} needs, ${processSteps.length} process steps; IDs and references are valid.`);
