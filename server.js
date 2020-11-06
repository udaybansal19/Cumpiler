const express = require('express');
const app = express();
const api = require("./api.js");

app.use("/runCode", api);

// Server
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Cumpiler is UP on : ' + listener.address().port);
  });
  