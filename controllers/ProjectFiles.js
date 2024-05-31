const multer = require("multer");
const ProjectFilesModel = require("../models/ProjectFiles.js");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    console.log(file);
    if (ext !== ".pdf" && ext !== ".docx") {
      return callback(
        new Error("Only .docx and .pdf files are allowed!", false)
      );
    }
    callback(null, true);
  },
}).single("file");

const uploadNewFile = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: err.message,
        });
      } else if (err) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "No file uploaded or invalid file type",
        });
      }
      const data = await ProjectFilesModel.create({
        name: req.file.filename,
        path: req.file.path,
        type: req.file.mimetype,
        description: req.body.description,
        project_id: req.body.project_id,
        user_id: req.body.user_id,
      });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "File uploaded successfully.",
      });
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        code: 400,
        success: false,
        message: messages,
      });
    } else {
      return res.status(500).json({
        code: 500,
        success: false,
        message: "Server Error",
      });
    }
  }
};

const getFilesByProject = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const result = await ProjectFilesModel.findAll({
      where: { project_id: project_id },
    });
    if (result) {
      return res
        .status(200)
        .json({ code: 200, count: result.length, result: result });
    } else {
      return res.status(404).json({
        code: 404,
        message: "No data available.",
      });
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: error });
  }
};

const getFilesDetails = async (req, res, next) => {
  try {
    const file_id = req.params.id;
    const result = await ProjectFilesModel.findOne({
      where: { id: file_id },
    });

    const fileName = result.name;
    console.log(fileName);
    const filePath = path.join(__dirname, "../uploads", fileName);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      console.log("ddd");
      res.send({ name: fileName, url: `/uploads/${fileName}` });
    } else {
      res.status(404).send("File not found");
    }
    // if (result) {
    //   return res.status(200).json({ code: 200, result: result });
    // } else {
    //   return res.status(404).json({
    //     code: 404,
    //     message: "No data available.",
    //   });
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 404, message: "Internal server error" });
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
module.exports = [uploadNewFile, getFilesByProject, getFilesDetails, editFile];
