function validateFileType(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  return allowedTypes.includes(file.mimetype);
}

function validateFileSize(file) {
  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
  return file.size <= MAX_FILE_SIZE;
}

module.exports = { validateFileType, validateFileSize };
