const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');

async function scrapeImages() {
  try {
    const result = await GOOGLE_IMG_SCRAP({
      search: 'kucing lucu',
      limit: 10, 
      query: {
        SIZE: GOOGLE_QUERY.SIZE.LARGE,
        COLOR: GOOGLE_QUERY.COLOR.COLOR,
        TYPE: GOOGLE_QUERY.TYPE.PHOTO 
      }
    });

    console.log(result);

  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeImages();
