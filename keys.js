console.log('api keys loaded');
require("dotenv").config();

exports.google_maps = {
    api_key: process.env.GOOGLE_MAPS_API_KEY
};
