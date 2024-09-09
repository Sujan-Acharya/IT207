const http = require("http");
// Create a server object that will respond to any request with a string
const server = http.createServer(function (req, res) {
  res.write(
    " Node JS is lean and efficient. It is a great platform for building web applications. "
  );
  res.end(" Hello World\n");
});
// The server will listen on port 3000
server.listen(3000, function () {
  console.log("The server is listening on port 3000");
});
