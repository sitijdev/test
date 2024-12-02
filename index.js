const google = require("google-imgs");
const axios = require('axios');

async function scrapeImages(query) {
  try {
    let result = await google.searchImage(query);

    // Filter gambar yang valid
    let workingUrls = [];
    let i = 0;
    while (workingUrls.length < 10 && i < result.length) { // Batasi maksimal 10 gambar
      try {
        const response = await axios.get(result[i], { 
          responseType: 'arraybuffer', // Mendapatkan response sebagai binary data
          headers: { 'User-Agent': 'Mozilla/5.0' } // Menambahkan User-Agent
        });
        if (response.status === 200) {
          workingUrls.push({ imgUrl: result[i] });
        }
      } catch (e) { 
        // Tangani error saat mengambil gambar
        console.error(`Error fetching image ${result[i]}:`, e); 
      }
      i++;
    }

    console.log(workingUrls);

  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeImages("kucing lucu");
