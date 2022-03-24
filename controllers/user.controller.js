const userService = require("../services/user.service");
const status = require("../configs/status");
const bcrypt = require("bcrypt");
const saltRound = 10;

exports.createUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const oldUser = await userService.findbyEmail(email);
    if (oldUser) {
      res.status(409).send({
        RESULT_CODE: status.DATA_ALREADY.RESULT_CODE,
        DEVELOPER_MESSAGE: status.DATA_ALREADY.DEVELOPER_MESSAGE,
      });
    } else {
      const saltPassword = await bcrypt.genSalt(saltRound);
      const encryptedPassword = await bcrypt.hash(password, saltPassword);
      const data = {
        email: email,
        password: encryptedPassword,
        saltPassword: saltPassword,
        role: role,
        isActive: true,
      };
      console.log(data);
      const user = await userService.create(data);
      if (user) {
        res.status(201).send({
          RESULT_CODE: status.CREATED.RESULT_CODE,
          DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
          data: user
        });
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await userService.update(id, req.body);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        DEVELOPER_MESSAGE: status.SUCCESS.DEVELOPER_MESSAGE,
      });
    } else {
      res.status(406).send({
        RESULT_CODE: status.NOT_ACCEPTABLE.RESULT_CODE,
        DEVELOPER_MESSAGE: status.NOT_ACCEPTABLE.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await userService.delete(id);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        DEVELOPER_MESSAGE: status.SUCCESS.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.findAllUser = async (req, res) => {
  try {
    let query = req.query;
    let sort;
    if (query.sort) {
      sort = query.sort;
      delete query.sort;
    }
    let offset, limit;
    if (query.offset || query.limit) {
      offset = query.offset ? parseInt(query.offset) : null;
      limit = query.limit ? parseInt(query.limit) : null;
      delete query.offset;
      delete query.limit;
    }
    const response = await userService.findAll(query, sort, offset, limit);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        data: response,
      });
    } else {
      res.status(404).send({
        RESULT_CODE: status.UNKNOWN_URL.RESULT_CODE,
        DEVELOPER_MESSAGE: tatus.UNKNOWN_URL.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.findUserById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await userService.findById(id);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        data: response,
      });
    } else {
      res.status(404).send({
        RESULT_CODE: status.UNKNOWN_URL.RESULT_CODE,
        DEVELOPER_MESSAGE: tatus.UNKNOWN_URL.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
