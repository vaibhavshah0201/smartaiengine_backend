const UserModel = require("../models/User.js");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await UserModel.findAll();
    res.json(blogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await UserModel.findAll({
      where: { id: req.params.id },
    });
    res.json(blog[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const loginUser = async (req, res, next) => {
  try {
    console.log(req);
    const result = await UserModel.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    if (result) {
      res.json({
        code: 200,
        message: "User logged in successfully",
      });
    } else {
      res.json({
        code: 400,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
const updateBlog = async (req, res) => {
  try {
    await UserModel.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "¡Registro actualizado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un registro
const deleteBlog = async (req, res) => {
  try {
    await UserModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "¡Registro eliminado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = [loginUser, deleteBlog, getAllBlogs];
