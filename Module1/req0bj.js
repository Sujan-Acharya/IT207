const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);
  console.log(req.headers);
  console.log(req.method);

  for (let header in req.headers) {
    console.log(header + " = " + req.headers[header]);
  }

  res.end("Hello world \n");
});

server.listen(3000, function () {
  console.log("The server is listening on port : 3000");
});
