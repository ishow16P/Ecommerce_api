const router = require("express").Router();
const appConfig = JSON.parse(process.env.service);
const status = require("../../configs/status");
const multer = require("multer");
const path = require("path");
const uploadFilePath = path.resolve(__dirname, "../..", "public/uploads");

const storage = multer.diskStorage({
  destination: uploadFilePath,
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //เปลี่ยนชื่อไฟล์
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("fileupload"), (req, res) => {
  console.log(req.file)
  const path = `${appConfig.app.UPLOAD_ENDPOINT}/uploads/${req.file.filename}`;
  res.status(200).send({
    RESULT_CODE: status.SUCCESS.RESULT_CODE,
    DEVELOPER_MESSAGE: status.SUCCESS.DEVELOPER_MESSAGE,
    path: path,
  });
});

module.exports = router;
