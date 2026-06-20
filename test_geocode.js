const https = require('https');

function geocodeArea(areaName) {
  const query = encodeURIComponent(`${areaName}, Nashik, Maharashtra, India`);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`;
  
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'HB-Realty-Node-Script' // required by Nominatim
      }
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

async function run() {
  console.log("Lakhmapur:", await geocodeArea("Lakhmapur"));
  console.log("Dindori:", await geocodeArea("Dindori"));
  console.log("Jategaon:", await geocodeArea("Jategaon"));
}

run();
