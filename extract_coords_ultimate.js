const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function extractCoordsUltimate() {
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updatedCount = 0;

  console.log("Launching headless browser for ULTIMATE extraction...");
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  // To speed things up, let's only run on properties that still have "generic" locations
  // Or rather, let's just run on the ones that failed in our last attempt.
  // We'll check if the location is exactly one of the generic ones we logged earlier, or just run all 30 remaining that don't look perfectly precise.
  // Actually, let's just run it on ALL properties with goo.gl links to be 100% sure we get the absolute best coordinates.

  for (let i = 0; i < properties.length; i++) {
    const p = properties[i];
    if (p.mapLink && p.mapLink.includes('goo.gl')) {
      console.log(`[${i+1}/${properties.length}] Analyzing: ${p.title}`);
      try {
        await page.goto(p.mapLink, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        let foundCoords = null;
        
        // Loop up to 15 times (15 seconds) waiting for the URL to change and include '@'
        for (let j = 0; j < 15; j++) {
          await sleep(1000);
          const currentUrl = page.url();
          
          // Match /@lat,lng or /place/.../@lat,lng
          const urlMatch = currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
          
          if (urlMatch) {
            const lat = parseFloat(urlMatch[1]);
            const lng = parseFloat(urlMatch[2]);
            
            // Ignore if it's the generic Nashik center that Google defaults to
            if (Math.abs(lat - 20.0099) > 0.01 || Math.abs(lng - 73.7639) > 0.01) {
               foundCoords = [lat, lng];
               break;
            }
          }
        }

        if (foundCoords) {
          p.location = foundCoords;
          console.log(`  -> SUCCESS! Found exact plot coords: [${foundCoords[0]}, ${foundCoords[1]}]`);
          updatedCount++;
        } else {
          console.log(`  -> Failed: URL never resolved to coordinates. Final URL: ${page.url().substring(0, 80)}...`);
        }
      } catch (err) {
        console.log(`  -> Error loading link: ${err.message}`);
      }
    }
  }

  await browser.close();
  
  if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
    console.log(`Successfully updated ${updatedCount} properties with ULTIMATE extraction!`);
  } else {
    console.log("No properties were updated.");
  }
}

extractCoordsUltimate();
