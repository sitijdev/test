const google = require("google-imgs");
const axios = require('axios');

async function scrapeImages(query) {
  try {
    let result = await google.searchImage(query);
    console.log("Hasil google.searchImage:", result); // Tambahkan log untuk debugging

    // Filter gambar yang valid
    let workingUrls = [];
    let i = 0;
    while (workingUrls.length < 10 && i < result.length) { 
      try {
        const response = await axios.get(result[i], { 
          responseType: 'arraybuffer', 
          headers: { 'User-Agent': 'Mozilla/5.0' } 
        });
        console.log("Response dari axios.get:", response); // Tambahkan log untuk debugging
        if (response.status === 200) {
          workingUrls.push({ imgUrl: result[i] });
        }
      } catch (e) { 
        console.error(`Error fetching image ${result[i]}:`, e); 
      }
      i++;
    }

    console.log("Gambar yang valid:", workingUrls);

  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeImages("kucing lucu");
