const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'properties.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updated = 0;
for (const p of data) {
  if (p.image === "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400") {
    p.image = "/land_placeholder.png";
    updated++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Updated ${updated} properties to use placeholder.`);
