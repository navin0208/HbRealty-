const https = require('https');

function resolveShortUrl(shortUrl) {
  return new Promise((resolve) => {
    https.get(shortUrl, (res) => {
      // It usually redirects with a 301 or 302
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(res.headers.location);
      } else {
        // Sometimes Google returns a 200 with HTML meta refresh or JS redirect
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve(data);
        });
      }
    }).on('error', () => resolve(null));
  });
}

async function test() {
  const url = 'https://maps.app.goo.gl/fhgyyhSgHbL5DUjT6?g_st=awb';
  const expanded = await resolveShortUrl(url);
  console.log("Expanded URL:", expanded);
}

test();
