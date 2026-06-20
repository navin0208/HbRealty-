const fs = require('fs');
const https = require('https');
const path = require('path');

function getFinalUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return getFinalUrl(res.headers.location).then(resolve);
      }
      resolve(url);
    }).on('error', () => resolve(url));
  });
}

async function extractNames() {
  const dataFilePath = path.join(__dirname, 'data', 'properties.json');
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

  for (const p of properties) {
    if (p.mapLink && p.mapLink.includes('goo.gl')) {
      const finalUrl = await getFinalUrl(p.mapLink);
      console.log(`Title: ${p.title}`);
      console.log(`Link: ${p.mapLink}`);
      console.log(`Final: ${finalUrl}`);
      console.log('---');
    }
  }
}

extractNames();
