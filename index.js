const { scrapeImages } = require('scrape-google-images');

const query = 'cats';

const options = {
  limit: 10,
  imgSize: 'm',
  imgType: 'photo',
  imgColor: 'color',
  imgar: 'xw',
  fileType: 'jpg',
  safe: false,
  siteSearch: '',
  rights: '',
  metadata: true,
  imgData: false,
  engine: 'puppeteer' 
};

async function scrapeGoogleImages() {
  const images = await scrapeImages(query, options);
  console.log(images);
}

scrapeGoogleImages();
