// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


const os = require('os');
let networkInterfaces = os.networkInterfaces();



// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  let ip;
  //GET IP ADDRESS  -  https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  Object.keys(networkInterfaces).forEach((networkInterface) => {
    networkInterfaces[networkInterface].forEach((element) => {
      if(element.family !== "IPv4" || element.internal !== false){return;}
      ip = element.address;
    });
  });

  res.json({"ipaddress":ip, "language":"probably english", "software":"who knows?"});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
