const xlsx = require('xlsx');
const path = require('path');

const workbook = xlsx.readFile(path.join(__dirname, 'HB Realty Land Propasal Sheet.xlsx'));
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

for (let i = 2; i < 15; i++) {
  const row = rawData[i];
  if (!row) continue;
  const area = row[5] || 'N/A';
  const link = row[6] || 'N/A';
  console.log(`Row ${i} | Area: ${area.padEnd(20)} | Link: ${link}`);
}
