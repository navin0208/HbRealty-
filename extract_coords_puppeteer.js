const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'properties.json');

async function extractCoordsWithPuppeteer() {
  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  const properties = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  let updatedCount = 0;

  for (let i = 0; i < properties.length; i++) {
    const p = properties[i];
    if (p.mapLink) {
      console.log(`Processing property ${i+1}/${properties.length}: ${p.title}`);
      try {
        await page.goto(p.mapLink, { waitUntil: 'networkidle2', timeout: 15000 });
        const finalUrl = page.url();
        console.log(`  -> Final URL: ${finalUrl.substring(0, 80)}...`);
        
        // Regex to match @lat,lng from Google Maps Long URLs
        const match = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          if (!isNaN(lat) && !isNaN(lng)) {
            p.location = [lat, lng];
            console.log(`  -> SUCCESS! Found exact plot coords: [${lat}, ${lng}]`);
            updatedCount++;
          }
        } else {
          console.log(`  -> No coordinates found in URL.`);
        }
      } catch (err) {
        console.log(`  -> Error loading link: ${err.message}`);
      }
    }
  }

  await browser.close();
  
  if (updatedCount > 0) {
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2));
    console.log(`Successfully updated ${updatedCount} properties with exact plot coordinates!`);
  } else {
    console.log("No properties were updated.");
  }
}

extractCoordsWithPuppeteer();
