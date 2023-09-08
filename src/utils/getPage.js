const axios = require('axios')

const getPage = async (url, options) => {
  return (await axios.get(url, options)).data
}

module.exports = getPage
