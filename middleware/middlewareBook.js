// middleware/middlewareBook.js
const fs = require('fs');
const path = require('path');

function logger(req, res, next) {
  const logMessage = `a call was made: ${req.method} ${req.url} - ${new Date().toISOString()}\n`;

  // כתיבה לקובץ server.log
  const logPath = path.join(__dirname, '../server.log');
  fs.appendFileSync(logPath, logMessage, 'utf8');

  // אם תרצי גם להדפיס למסך במקביל
  console.log(logMessage.trim());

  next(); // המשך לראוט הבא
}

module.exports = logger;
