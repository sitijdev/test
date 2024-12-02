const unirest = require("unirest");
const cheerio = require("cheerio");
const fs = require('fs');


// Konfigurasi
const searchUrl = "https://www.google.com/search?q={keywords}&oq={keywords}&hl=en&tbm=isch&asearch=ichunk&async=_id:rg_s,_pms:s,_fmt:pc&sourceid=chrome&ie=UTF-8";
const keywords = "nike";
const outputFilename = 'google_images.json'; // Nama file output


// Fungsi untuk mendapatkan delay acak antara 1 dan 3 detik
function getRandomDelay() {
  return Math.floor(Math.random() * 3000) + 1000;
}

// Fungsi untuk memilih User-Agent secara acak
const selectRandomUserAgent = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
  ];
  const randomNumber = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomNumber];
};


// Fungsi untuk mengambil data gambar dari Google Images
async function fetchImagesData(url) {
  let user_agent = selectRandomUserAgent();
  let header = { "User-Agent": `${user_agent}` };

  try {
    const response = await unirest
      .get(url)
      .headers(header);
    return response.body; 
  } catch (error) {
    console.error('Error saat mengambil data:', error);
    throw error; // Lempar error agar bisa ditangani di fungsi yang memanggil
  }
}


// Fungsi untuk memproses data HTML dan mengekstrak informasi gambar
function extractImageData(html) {
  let $ = cheerio.load(html);
  let images_results = [];

  $("div.rg_bx").each(async (i, el) => {
    let json_string = $(el).find(".rg_meta").text();
    let imageData = JSON.parse(json_string);

    images_results.push({
      title: $(el).find(".iKjWAf .mVDMnf").text(),
      source: $(el).find(".iKjWAf .FnqxG").text(),
      link: imageData.ru || '',
      original: imageData.ou || '',
      thumbnail: $(el).find(".rg_l img").attr("src") 
                || $(el).find(".rg_l img").attr("data-src") 
                || '',
    });

    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
  });

  return images_results;
}


// Fungsi untuk menyimpan data gambar ke file JSON
function logImageData(data) {
  try {
    console.log(data);
  } catch (error) {
    console.error('Error saat menampilkan data:', error);
  }
}


// Fungsi utama untuk menjalankan proses scraping
async function scrapeImages() {
  const url = searchUrl.replace(/{keywords}/g, keywords);

  try {
    const html = await fetchImagesData(url);
    const imagesData = extractImageData(html);
    logImageData(imagesData); // <-- Panggil fungsi logImageData
  } catch (error) {
    console.error('Proses scraping gagal:', error);
  }
}


// Jalankan scraper
scrapeImages();
