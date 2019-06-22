// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const data = {
  staticList: [
    'John',
    'Jake',
    'Joe',
    'Noah',
    'Emma',
    'Will',
    'William',
    'Andrew',
    'Brady',
    'Ethan',
    'Dan',
    'Daniel',
    'Danny'
  ],
  commandList: [
    '/help',
    '/msg',
    '/mode',
    '/me',
    '/join',
    '/part',
    '/kick',
    '/quit',
    '/quiet'
  ]
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async event => {
  // your server-side functionality
  let returnVal = data.staticList

  if (
    event.queryStringParameters.pos == 0 &&
    event.queryStringParameters.word.startsWith('/')
  ) {
    returnVal = data.commandList
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(returnVal)
  }
}

exports.data = data
