/*
Task:
1. It detects the browser or client type (User Agent) from the request and counts how many times each user agent has made requests so far.
2. The server responds to the client with the detected User Agent and the total number of requests received from that specific User Agent.
3. It tracks which User Agent has made the maximum number of requests and prints the preferred user agent (the one with the most requests) to the server's terminal.
*/

const http = require("http");

// Creates an object to store request counts for each user agent
let userAgentCounts = {};

// Creates a server object that will respond to requests
const server = http.createServer(function (req, res) {
  // Ignores requests for favicon.ico or other paths
  if (req.url === "/favicon.ico") {
    res.writeHead(204); // No content for favicon
    res.end();
    return;
  }

  // Get the 'User-Agent' from the request headers
  const userAgent = req.headers["user-agent"];

  //Where browser name will be stored
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

  // Update the count for this user agent
  if (userAgentCounts[browserName]) {
    userAgentCounts[browserName]++;
  } else {
    userAgentCounts[browserName] = 1;
  }

  //Server responds to the request with the detected browser name and amount of requests
  const count = userAgentCounts[browserName];
  res.write(`User Agent: ${browserName}\n`);
  res.write(`No of Requests received = ${count}\n`);
  res.end();

  //Find the user agent with the maximum number of requests so far
  let preferredAgent = "";
  let maxRequests = 0;
  for (let agent in userAgentCounts) {
    if (userAgentCounts[agent] > maxRequests) {
      maxRequests = userAgentCounts[agent];
      preferredAgent = agent;
    }
  }

  // Print the preferred user agent to the terminal
  console.log(`The preferred agent is ${preferredAgent}`);
});

//The server uses port 3000 to listen for incoming requests
server.listen(3000, function () {
  console.log("The server is listening on port 3000");
});
