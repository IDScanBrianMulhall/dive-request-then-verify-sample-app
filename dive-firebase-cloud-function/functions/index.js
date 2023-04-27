const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const https = require('https');

 
const app = express();

app.use(express.json());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.post("/Verify", function (req, res) {

  const options = {
    host: "dvs2.idware.net",
    port: 443,
    path: `/api/v3/Verify/${req.body.requestId}`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer SECRET_KEY",
    },
  };

  let chunks = "";
  const httpreq = https.request(options, function (response) {
    response.setEncoding("utf8");

    response.on("data", function (chunk) {
      chunks = chunks + chunk;
    });

    response.on("end", function () {
      let responseData = JSON.parse(chunks);
      res.json(responseData);
    });
  });

  //httpreq.write();
  httpreq.end();
});


exports.api = functions.https.onRequest(app);
