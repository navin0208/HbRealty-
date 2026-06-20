const fs = require('fs');
const https = require('https');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

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

function geocodeAddress(address) {
  if (!address || address.trim() === '') return Promise.resolve(null);
  const query = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
  
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'HB-Realty-Fixer' }
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

function extractCoordsFromUrl(url) {
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/\/place\/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) return [parseFloat(match[1]), parseFloat(match[2])];
  return null;
}

function extractAddressFromUrl(url) {
  const match = url.match(/\/place\/([^/]+)/);
  if (match) {
    let address = decodeURIComponent(match[1].replace(/\+/g, ' '));
    // If it's a coordinate string that didn't match above, return null
    if (/^-?\d+\.\d+,-?\d+\.\d+$/.test(address)) return null;
    return address;
  }
  return null;
}

async function fixCoordinatesDeep() {
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updatedCount = 0;

  for (const p of properties) {
    if (p.mapLink && p.mapLink.includes('goo.gl')) {
      const finalUrl = await getFinalUrl(p.mapLink);
      
      // Attempt 1: Coords directly from URL
      let coords = extractCoordsFromUrl(finalUrl);
      
      if (coords) {
        p.location = coords;
        console.log(`Updated ${p.title} via URL coords -> [${coords[0]}, ${coords[1]}]`);
        updatedCount++;
      } else {
        // Attempt 2: Extract address from URL and geocode it
        const address = extractAddressFromUrl(finalUrl);
        if (address) {
          console.log(`Geocoding extracted address: "${address}"...`);
          coords = await geocodeAddress(address);
          await sleep(1000);
          
          if (coords) {
            p.location = coords;
            console.log(`Updated ${p.title} via Geocoding -> [${coords[0]}, ${coords[1]}]`);
            updatedCount++;
          } else {
            console.log(`Failed to geocode address for ${p.title}. Falling back to village.`);
          }
        }
      }
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
    console.log(`Successfully updated ${updatedCount} properties deep!`);
  }
}

fixCoordinatesDeep();
