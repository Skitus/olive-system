const fs = require("fs");
const path = require("path");

class Logger {
  static logError(message) {
    const logMessage = `[${new Date().toISOString()}] ERROR: ${message}\n`;
    fs.appendFileSync(path.join(__dirname, "logs", "error.log"), logMessage);
  }

  static logSuccess(message) {
    const logMessage = `[${new Date().toISOString()}] SUCCESS: ${message}\n`;
    fs.appendFileSync(path.join(__dirname, "logs", "success.log"), logMessage);
  }

  static logRequest(req) {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${
      req.url
    }\n`;
    fs.appendFileSync(path.join(__dirname, "logs", "request.log"), logMessage);
  }
}

module.exports = Logger;
