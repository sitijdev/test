const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');

async function scrapeImages() {
  try {
    const result = await GOOGLE_IMG_SCRAP({
      search: 'sexy lingerie',
      limit: 10,
      query: { // Pastikan menggunakan tanda kurung kurawal
        SIZE: GOOGLE_QUERY.SIZE.LARGE
      }
    });

    console.log(result);

  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeImages();
