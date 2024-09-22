/* This script creates an HTTP server that listens on port 3000. 
It detects the client's browser from the "User-Agent" header and responds with the detected name.
*/

const http = require("http");

// Create a server object that will respond to any request with the detected user agent
const server = http.createServer(function (req, res) {
  const userAgent = req.headers["user-agent"];

  //Where browser name will be stores
  let browserName = "";

  //Hard coded browser detection for 3 common browsers
  if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
  } else if (userAgent.includes("Chrome")) {
    browserName = "Chrome";
  } else if (userAgent.includes("curl")) {
    browserName = "curl";
  } else {
    browserName = "Undetected User Agent";
  }

  //Server responds to the request with the detected browser name
  res.write("Detected User Agent: " + browserName + "\n");
  res.end(); // End the response
});

//The server uses port 3000 to listen for incoming requests
server.listen(3000, function () {
  console.log("The server is listening on port 3000");
});
