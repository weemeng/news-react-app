const axios = require("axios");

const axiosHolder = axios.create({
  withCredentials: true,
  baseURL: `https://intense-sea-36031.herokuapp.com`,
});

module.exports = axiosHolder;
