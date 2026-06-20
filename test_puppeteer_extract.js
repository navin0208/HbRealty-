const puppeteer = require('puppeteer');

async function testExtract() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Test with one of the failing URLs
  const url = "https://maps.app.goo.gl/C8jhE5fPzCQVaoV96"; // 5 acres Land in Shirdi Airport
  console.log(`Testing URL: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const finalUrl = page.url();
    console.log(`Final URL: ${finalUrl}`);
    
    // Attempt 1: From URL
    const urlMatch = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (urlMatch) {
      console.log(`Found coords in URL: ${urlMatch[1]}, ${urlMatch[2]}`);
    } else {
      // Attempt 2: Extract from window.APP_INITIALIZATION_STATE
      const coords = await page.evaluate(() => {
        try {
          // Google maps often stores the lat/lng in a meta tag or window data
          const metaContent = document.querySelector('meta[itemprop="image"]')?.content || '';
          const match = metaContent.match(/center=(-?\d+\.\d+)%2C(-?\d+\.\d+)/);
          if (match) return [parseFloat(match[1]), parseFloat(match[2])];
          
          return null;
        } catch(e) { return null; }
      });
      
      console.log(`Extracted from page content: ${coords}`);
    }
  } catch (e) {
    console.log(e);
  }
  
  await browser.close();
}

testExtract();
