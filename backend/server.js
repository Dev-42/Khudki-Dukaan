const http = require("http");
const app = require("../backend/index");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server successfully running at port ${port}`);
});
