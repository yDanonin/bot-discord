const cheerio = require('cheerio');

const getPage = require('./utils/getPage')

const exampleOf = async (word) => {
  const url = `${process.env.BASE_URL}${process.env.ENDPOINT}/${word}`
  const data = await getPage(url, {headers: JSON.parse(process.env.BROWSER_HEADERS)})

  const $ = cheerio.load(data)
  // let res = []

  // $('div .examp').each((e, el) => {res.push($(el).text())})

  // return res[0]

  return $($('div .examp').get(0)).text()
}


module.exports = {
  name: 'example',
  aliases: ['example','exampleOf', 'exampleWith'],
  run: async (client, message, args) => {

    exampleOf(args[0])
      .then((r) => {
        if(!r) throw new Error()
        message.reply(r)
      })
      .catch(e => {
        message.reply("Foi mal meu patrão, mas eu sou limitado")
        console.error('error: ' + e)
      })
  }
}
