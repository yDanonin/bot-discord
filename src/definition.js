const cheerio = require('cheerio');

const getPage = require('./utils/getPage')

const definitionOf = async (word) => {
  const url = `${process.env.BASE_URL}${process.env.ENDPOINT}/${word}`
  const data = await getPage(url, {headers: JSON.parse(process.env.BROWSER_HEADERS)})

  const $ = cheerio.load(data)
  let res = []

  // $('div .ddef_h').each((e, el) => {res.push($(el).text())})
  // return res[0]
  return $($('div .ddef_h').get(0)).text()
}


module.exports = {
  name: 'definition',
  aliases: ['definition','definitionOf', 'meaning'],
  run: async (client, message, args) => {

    definitionOf(args[0])
      .then((r) => {
        if(!r) throw new Error()
        const option = r.slice(3, -3)
        message.reply(option)
      })
      .catch(e => {
        message.reply("Foi mal meu patrão, mas eu sou limitado")
        console.error('error: ' + e)
      })
  }
}
