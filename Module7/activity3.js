const http = require("http");
const { URL } = require("url");

const server = http.createServer((req, res) => {
  // Parse the URL and query string
  // console.log(pathname);
  const headers = req.headers;
  for (let header in headers) {
    // console.log(header + ' = ' + headers[header]);
  }
  // console.log(headers);
  var params;
  // Check the request method and URL
  if (req.method === "GET") {
    processGET(req, res);
  } else if (req.method == "POST") {
    // Handle other routes or methods
    processPOST(req, res);
  }
});

function processGET(req, res) {
  const parsedUrl = new URL(req.url, "http://" + req.headers.host + "/");
  const pathname1 = parsedUrl.pathname;
  const search = parsedUrl.search;
  const searchParams = parsedUrl.searchParams;
  console.log("Path = ", pathname1);
  console.log("Search Params = " + searchParams);

  let entries = searchParams.entries();
  let query = Object.fromEntries(entries);
  const keys = Object.keys(query);
  console.log("Query = ", query);
  const { hostname, pathname, port } = parsedUrl;
  let data = {
    hostname: hostname,
    pathname: pathname,
    port: port,
    method: req.method,
  };
  data["query"] = query;
  console.log("data = ", data);
  res.end(JSON.stringify(data));
  //res.end("Hello World\n");
}

function processPOST(req, res) {
  const parsedUrl = new URL(req.url, "http://" + req.headers.host + "/");
  const pathname = parsedUrl.pathname;
  const search = parsedUrl.search;
  const searchParams = parsedUrl.searchParams;
  console.log("Path = ", pathname);
  console.log("Search Params = " + searchParams);

  let entries = searchParams.entries();
  let query = Object.fromEntries(entries);
  const keys = Object.keys(query);
  console.log("Query = ", query);
  keys.forEach((key) => {
    console.log(key + " = " + query[key]);
  });

  res.end("Hello World\n");
}
server.listen(8081, () => {
  console.log("Server listening on 8081");
});
