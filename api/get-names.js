const data = {
  staticList: [
    "John",
    "Jake",
    "Joe",
    "Noah",
    "Emma",
    "Will",
    "William",
    "Andrew",
    "Brady",
    "Ethan",
    "Dan",
    "Daniel",
    "Danny"
  ],
  commandList: [
    "/help",
    "/msg",
    "/mode",
    "/me",
    "/join",
    "/part",
    "/kick",
    "/quit",
    "/quiet"
  ]
};

module.exports = (req, res) => {
  let returnVal = data.staticList;

  if (req.query.pos == 0 && req.query.word.startsWith("/")) {
    returnVal = data.commandList;
  }

  res.json(returnVal);
};

exports.data = data;
