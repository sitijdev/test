const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeImages(keywords) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.google.com/search?q=${keywords}&tbm=isch`);

  // Scroll ke bawah untuk memuat lebih banyak gambar
  let previousHeight;
  while (true) {
    previousHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForTimeout(2000);
    const currentHeight = await page.evaluate('document.body.scrollHeight');
    if (previousHeight === currentHeight) {
      break;
    }
  }

  const imageUrls = await page.evaluate(() => {
    const imgElements = document.querySelectorAll('img.rg_i');
    const urls = [];
    for (const img of imgElements) {
      urls.push(img.src);
    }
    return urls;
  });

  await browser.close();

  // Membuat timestamp
  const timestamp = Date.now();

  // Membuat nama file JSON
  const filename = `${keywords.replace(/ /g, '_')}.${timestamp}.json`;

  // Menyimpan URL gambar ke file JSON
  const jsonData = JSON.stringify(imageUrls);
  fs.writeFileSync(filename, jsonData);

  console.log(`Log hasil scraping disimpan di ${filename}`);
}

// Mengambil kata kunci dari environment variable
const keywords = process.env.KEYWORDS || 'kucing lucu';

scrapeImages(keywords);
