const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function extractMissingCoords() {
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updatedCount = 0;

  console.log("Launching headless browser to extract the final stubborn links...");
  // Launch with settings to avoid bot detection as much as possible
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

  for (let i = 0; i < properties.length; i++) {
    const p = properties[i];
    if (p.mapLink && p.mapLink.includes('goo.gl')) {
      // Check if this property still needs fixing (if it's using the generic village coordinates)
      // I know Akrale failed earlier and was put at 20.14663, 73.85899. 
      // Actually, let's just force re-extract any that didn't get a precise geocode from the 'deep' script.
      // But it's safer to just run it on all of them, or at least the ones we know failed.
      // The deep script printed "Failed to geocode address for 11 Acre Land in Lakhmapur" etc.
      
      console.log(`Analyzing: ${p.title}`);
      try {
        await page.goto(p.mapLink, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait an extra 3 seconds for Google Maps to fully settle its internal JS state
        await sleep(3000);
        
        const coords = await page.evaluate(() => {
          try {
            // Attempt 1: Get it from the URL
            const url = window.location.href;
            const urlMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/\/place\/(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (urlMatch) return [parseFloat(urlMatch[1]), parseFloat(urlMatch[2])];

            // Attempt 2: Extract from the meta tag
            const metaTags = document.querySelectorAll('meta');
            for (const meta of metaTags) {
              const content = meta.getAttribute('content') || '';
              if (content.includes('staticmap?center=')) {
                const match = content.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/);
                if (match) return [parseFloat(match[1]), parseFloat(match[2])];
              }
            }
            
            return null;
          } catch(e) { return null; }
        });

        if (coords) {
          // Verify it's not the generic Nashik center (20.00993465, 73.76395435)
          if (Math.abs(coords[0] - 20.0099) < 0.01 && Math.abs(coords[1] - 73.7639) < 0.01) {
            console.log(`  -> Got generic Nashik center. Skipping.`);
          } else {
            p.location = coords;
            console.log(`  -> SUCCESS: [${coords[0]}, ${coords[1]}]`);
            updatedCount++;
          }
        } else {
          console.log(`  -> Failed to find exact coords.`);
        }
      } catch (err) {
        console.log(`  -> Error: ${err.message}`);
      }
    }
  }

  await browser.close();
  
  if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
    console.log(`Fixed ${updatedCount} properties with extreme extraction!`);
  } else {
    console.log("No new properties fixed.");
  }
}

extractMissingCoords();
