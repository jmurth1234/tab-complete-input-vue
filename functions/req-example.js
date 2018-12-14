const data = require('./data')

const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
  // your server-side functionality
  let returnVal = data.staticList

  if (event.queryStringParameters.pos == 0 && event.queryStringParameters.word.startsWith('/')) {
    returnVal = data.commandList
  }

  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(returnVal)
  })
}
