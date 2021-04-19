const request = require('request');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const fundCode = process.argv[2]

const j = request.jar();
const cookie = request.cookie('hasCookie=true');
const url = 'https://codequiz.azurewebsites.net/';
j.setCookie(cookie, url);
request({url: url, jar: j}, (err, res, body) => {
  const { document } = (new JSDOM(body)).window;
  const table = document.querySelector(`table`)
  findNavValueByFundCode(table, fundCode)

  if (err) { return console.log(err); }
})

function findNavValueByFundCode(table,fundCode) {
  for (let i=1; i < table.rows.length; i++) {
      if (fundCode == table.rows[i].cells[0].textContent.trim()) {
       console.log(table.rows[i].cells[1].textContent)
      }
  }
}