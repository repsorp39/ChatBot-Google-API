const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/images");
  },

  filename: (req, file, cb) => {
    const mimeType = file.mimetype;
    if (mimeType.startsWith("image/")) {
      const fileName = `${Date.now()}__${file.originalname}`;
      cb(null, fileName);
    }
  },
});

const upload = multer({ storage: storage });
module.exports = upload.single("file-image");
