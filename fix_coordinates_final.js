const fs = require('fs');
const https = require('https');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');

function getFinalUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return getFinalUrl(res.headers.location).then(resolve);
      }
      resolve(url);
    }).on('error', () => resolve(url));
  });
}

function extractCoordsFromUrl(url) {
  // Matches /@lat,lng or /place/lat,lng
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/\/place\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2])];
  }
  return null;
}

async function fixCoordinates() {
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updatedCount = 0;

  for (const p of properties) {
    if (p.mapLink && p.mapLink.includes('goo.gl')) {
      const finalUrl = await getFinalUrl(p.mapLink);
      const coords = extractCoordsFromUrl(finalUrl);
      if (coords) {
        p.location = coords;
        console.log(`Updated ${p.title} -> [${coords[0]}, ${coords[1]}]`);
        updatedCount++;
      } else {
        console.log(`Failed to find coords for ${p.title} in URL: ${finalUrl.substring(0, 50)}...`);
      }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
    console.log(`Successfully updated ${updatedCount} properties!`);
  }
}

fixCoordinates();
