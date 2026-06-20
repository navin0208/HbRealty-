const xlsx = require('xlsx');

const workbook = xlsx.readFile('/Users/navin/Downloads/HBTEMP/hb-realty/HB Realty Land Propasal Sheet.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

console.log('Headers:', data[1]);
console.log('Row 2:', data[2]);
console.log('Row 3:', data[3]);
