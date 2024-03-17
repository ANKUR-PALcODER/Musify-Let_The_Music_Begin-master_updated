const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname)));
app.get('/', function(req, res) {
  res.sendFile('index.html');
});

console.log(__dirname);
app.listen(port,()=>{
  console.log('Server started at http://localhost:' + port);
});
