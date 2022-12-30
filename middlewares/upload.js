const path = require("path");
const multer = require("multer");

const tempDirPath = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: tempDirPath,
});
const upload = multer({ storage });

module.exports = upload;
