const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  let file = req.url;
  console.log("file name= " + file);

  rStream = fs.createReadStream(__dirname + file);
  rStream.pipe(res);

  rStream.on("error", (err) => {
    res.end("Error reading the file- " + file);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
