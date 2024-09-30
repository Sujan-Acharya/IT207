const http = require("http");
const fs = require("fs");
const server = http.createServer();

server.on("request", (req, resp) => {
  fs.readdir(__dirname, (err, contentList) => {
    if (err) {
      resp.end("Internal Server error");
    } else {
      let count = 1;
      let response = "";
      contentList.forEach((element) => {
        if (element.includes(".js")) {
          response += count + "-" + element + ", ";
          count++;
        } else {
          response += element + ", ";
        }
      });
      resp.end(response.substring(0, response.length - 1)); // Respond with the final constructed string
    }
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
