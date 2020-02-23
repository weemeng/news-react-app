const axios = require("axios");

const axiosHolder = axios.create({
  withCredentials: true
});

module.exports = axiosHolder;
