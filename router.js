const {
  handleUpload,
  handleGetMedia,
  handleUpdate,
  handleDelete,
} = require("./s3Service");
const { logRequest } = require("./logger");

function router(req, res) {
  logRequest(req);

  const { method, url } = req;

  if (method === "POST" && url === "/upload") {
    handleUpload(req, res);
  } else if (method === "GET" && url.startsWith("/media/")) {
    handleGetMedia(req, res);
  } else if (method === "PUT" && url.startsWith("/update/")) {
    handleUpdate(req, res);
  } else if (method === "DELETE" && url.startsWith("/delete/")) {
    handleDelete(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
}

module.exports = router;
