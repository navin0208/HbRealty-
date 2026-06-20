const fs = require('fs');
const path = require('path');
const https = require('https');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');

function fetchHTML(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(res.headers.location).then(resolve);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

// Extract coords from the HTML metadata
async function extractCoords(url) {
  try {
    const html = await fetchHTML(url);
    const match = html.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/) || html.match(/ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return [parseFloat(match[1]), parseFloat(match[2])];
    }
  } catch(e) {}
  return null;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fixCoordinates() {
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updated = 0;

  for (const p of properties) {
    if (p.mapLink) {
      console.log(`Extracting from link for ${p.title}...`);
      const coords = await extractCoords(p.mapLink);
      if (coords) {
        p.location = coords;
        console.log(`-> Found accurate coords: ${coords}`);
        updated++;
      } else {
        console.log(`-> Could not extract coords for ${p.mapLink}`);
      }
      await sleep(500); // small delay to prevent google blocking us
    }
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
  console.log(`Fixed ${updated} properties to use exact Google Maps locations!`);
}

fixCoordinates();
