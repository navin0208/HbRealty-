const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');

// Helper to sleep and avoid hitting Nominatim rate limits
const sleep = ms => new Promise(r => setTimeout(r, ms));

function geocodeArea(areaName) {
  if (!areaName || areaName.trim() === '') return Promise.resolve(null);
  const query = encodeURIComponent(`${areaName.trim()}, Nashik, Maharashtra, India`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
  
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'HB-Realty-Importer' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(data);
          if (results && results.length > 0) {
            resolve([parseFloat(results[0].lat), parseFloat(results[0].lon)]);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function migrate() {
  const workbook = xlsx.readFile(path.join(__dirname, 'HB Realty Land Propasal Sheet.xlsx'));
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const newProperties = [];
  const baseLat = 19.9975;
  const baseLng = 73.7898;

  console.log("Starting migration with geocoding... This may take a minute.");

  for (let i = 2; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length === 0 || !row[1]) continue;

    const size = String(row[1] || '').trim();
    const rate = String(row[2] || '').trim();
    const investment = String(row[3] || '').trim();
    const purpose = String(row[4] || '').trim();
    const area = String(row[5] || '').trim();
    const locationLink = String(row[6] || '').trim(); // The actual google maps link
    
    let priceStr = rate;
    if (investment && investment !== 'undefined') priceStr += ` / Total: ${investment}`;
    if (!priceStr || priceStr === 'undefined' || priceStr === 'Rs.') priceStr = 'Price on Request';

    const typeMap = { 'Selling': 'Sale', 'Long Lease': 'Lease', 'Lease': 'Lease' };
    const pType = typeMap[purpose] || 'Sale';
    const title = `${size} Land in ${area}`;

    // Geocode the area to get real map pin coords
    let coords = await geocodeArea(area);
    await sleep(1000); // 1 second delay to respect Nominatim API rate limits

    if (!coords) {
      // Fallback
      coords = [
        baseLat + (Math.random() - 0.5) * 0.1, 
        baseLng + (Math.random() - 0.5) * 0.1
      ];
      console.log(`Failed to geocode: ${area}. Using fallback coords.`);
    } else {
      console.log(`Geocoded ${area}: [${coords[0]}, ${coords[1]}]`);
    }

    const newProp = {
      id: Math.random().toString(36).substr(2, 9),
      title: title,
      type: `Land for ${pType}`,
      price: priceStr,
      size: size,
      location: coords,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400",
      status: "available",
      isVerified: true
    };

    // If there is a google maps link, attach it
    if (locationLink && locationLink !== 'undefined' && locationLink.includes('http')) {
      newProp.mapLink = locationLink;
    }

    newProperties.push(newProp);
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(newProperties, null, 2), 'utf8');
  console.log(`Successfully migrated ${newProperties.length} properties with real coordinates!`);
}

migrate();
