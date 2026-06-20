const xlsx = require('xlsx');
const path = require('path');

const workbook = xlsx.readFile(path.join(__dirname, 'HB Realty Land Propasal Sheet.xlsx'));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

for (let i = 2; i < Math.min(10, rawData.length); i++) {
  console.log(`Row ${i} Link:`, rawData[i][6]);
}
