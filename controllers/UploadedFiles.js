const multer = require("multer");
const UploadedFilesModel = require("../models/UploadedFiles.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("file");

const uploadFile = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      console.log(req.file);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          error: "Server Error",
        });
      }

      const data = await UploadedFilesModel.create({
        filename: req.file.filename,
        archived: false,
        user_id: 1,
      });

      return res.status(201).json({
        success: true,
        data: data,
      });
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

const editFile = async (req, res) => {
  try {
    const result = await UploadedFilesModel.update(req.body, {
      where: { id: req.params.id },
    });
    if (result) {
      return res
        .status(200)
        .json({ code: 200, message: "Update successfully." });
    } else {
      return res.status(404).json({
        code: 404,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = [uploadFile, editFile];
