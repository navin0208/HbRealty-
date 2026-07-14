import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to any property ID, e.g., the first one
  // We need the local server running. Is it running?
  // We'll hit http://localhost:3000/admin/proposal/z41vqrb1x (from user's previous logs)
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  page.on('dialog', async dialog => {
    console.log('DIALOG:', dialog.message());
    await dialog.accept();
  });

  await page.authenticate({ username: 'admin', password: 'hbrealty2026' });

  try {
    await page.goto('http://localhost:3000/admin/proposal/z41vqrb1x', { waitUntil: 'networkidle0' });
    
    // Wait for the button
    await page.waitForSelector('button', { timeout: 5000 });
    
    // Click the Download PDF button
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Download PDF')) {
        console.log("Clicking button...");
        await btn.click();
        break;
      }
    }
    
    // Wait a bit for generation
    await new Promise(r => setTimeout(r, 5000));
    
  } catch (e) {
    console.log("Script error:", e);
  } finally {
    await browser.close();
  }
})();
