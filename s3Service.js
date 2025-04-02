const formidable = require("formidable");
const Logger = require("./logger");
const { validateFileType, validateFileSize } = require("./utils");
const { uploadFile, getFile, deleteFile } = require("./file-manager");

async function handleUpload(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      Logger.logError(`File upload error: ${err}`);
      res.statusCode = 500;
      res.end("Error in file upload");
      return;
    }

    const file = files.file[0];

    if (!file) {
      res.statusCode = 400;
      res.end("No file uploaded");
      return;
    }

    if (!validateFileType(file)) {
      res.statusCode = 400;
      res.end("Invalid file type. Only JPEG, PNG, and MP4 files are allowed.");
      return;
    }

    if (!validateFileSize(file)) {
      res.statusCode = 400;
      res.end("File size exceeds the maximum allowed size of 15 MB.");
      return;
    }

    try {
      await uploadFile(file);
      res.statusCode = 200;
      res.end(`File uploaded successfully: ${file.originalFilename}`);
    } catch (uploadErr) {
      res.statusCode = 500;
      res.end(`Failed to upload file: ${uploadErr}`);
    }
  });
}

async function handleGetMedia(req, res) {
  const fileKeyMatch = req.url.match(/^\/media\/(.*)$/);

  if (!fileKeyMatch) {
    res.statusCode = 400;
    res.end("Invalid URL format");
    return;
  }

  const fileKey = fileKeyMatch[1];

  try {
    const data = await getFile(fileKey);
    res.writeHead(200, {
      "Content-Type": data.ContentType,
    });
    res.end(data.Body);
  } catch (err) {
    res.statusCode = 404;
    res.end("File not found");
  }
}

async function handleUpdate(req, res) {
  const fileKeyMatch = req.url.match(/^\/update\/(.*)$/);

  if (!fileKeyMatch) {
    res.statusCode = 400;
    res.end("Invalid URL format");
    return;
  }

  const fileKey = fileKeyMatch[1];

  try {
    await deleteFile(fileKey);
    await handleUpload(req, res);
  } catch (err) {
    res.statusCode = 500;
    res.end("Failed to delete old file");
  }
}

async function handleDelete(req, res) {
  const fileKeyMatch = req.url.match(/^\/delete\/(.*)$/);

  if (!fileKeyMatch) {
    res.statusCode = 400;
    res.end("Invalid URL format");
    return;
  }

  const fileKey = fileKeyMatch[1];

  try {
    await deleteFile(fileKey);
    res.statusCode = 200;
    res.end(`File ${fileKey} deleted successfully`);
  } catch (err) {
    res.statusCode = 500;
    res.end("Failed to delete file");
  }
}

module.exports = { handleUpload, handleGetMedia, handleUpdate, handleDelete };
