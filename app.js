const http = require("http");
const router = require("./router");

const server = http.createServer((req, res) => {
  router(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
