const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data', 'properties.json');
const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

console.log("--- Properties needing manual pin placement ---");
let count = 0;
for (const p of properties) {
  if (p.mapLink && p.mapLink.includes('goo.gl')) {
    // If the location is exactly a village center we geocoded earlier (like Lakhmapur 20.5557115, Pathardi 19.9566521)
    // Actually, an easier way is to just print out the ones whose location matches our earlier fallback list.
    // Or just look at the logs of `fix_coordinates_deep.js` to see which ones failed.
    // Let's just print any property whose location matches these common village fallback coords exactly:
    const fallbacks = [
      "20.5557115,74.3470099", // Lakhmapur
      "19.9566521,73.7581059", // Pathardi
      "19.6944394,73.5638878", // Igatpuri
      "20.0142611,73.8149915", // Mumbai Nashik
      "20.0735697,73.6649351", // 17km
      "19.9460158,73.5868474", // Anjaneri
    ];
    
    const locStr = `${p.location[0]},${p.location[1]}`;
    if (fallbacks.includes(locStr)) {
      console.log(`- ${p.title}`);
      count++;
    }
  }
}
console.log(`Total: ${count}`);
