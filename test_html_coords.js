const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  const html = await fetchHTML('https://maps.app.goo.gl/fhgyyhSgHbL5DUjT6?g_st=awb');
  
  // Look for coordinates in the HTML like:
  // meta content="https://maps.google.com/maps/api/staticmap?center=20.2037292,73.8325882..."
  const match = html.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/) || html.match(/ll=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    console.log("Found Coords:", match[1], match[2]);
  } else {
    console.log("No coords found. HTML length:", html.length);
  }
}

test();
