const customerService = require("../services/customer.service");
const merchantService = require("../services/merchant.service");
const status = require("../configs/status");
const bcrypt = require("bcrypt");
const saltRound = 10;

exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const oldCustomer = await customerService.findbyEmail(email);
    const oldMerchant = await merchantService.findbyEmail(email);
    if (oldCustomer || oldMerchant) {
      res.status(409).send({
        RESULT_CODE: status.DATA_ALREADY.RESULT_CODE,
        DEVELOPER_MESSAGE: status.DATA_ALREADY.DEVELOPER_MESSAGE,
      });
    }else {
        const saltPassword = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, saltPassword);
        const data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: encryptedPassword,
          saltPassword: saltPassword,
          isActive: true,
        };
    
        const response = await customerService.create(data);
        if (response) {
          res.status(201).send({
            RESULT_CODE: status.CREATED.RESULT_CODE,
            DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
           data: response,
          });
        }
    }

  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await customerService.update(id, req.body);
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
exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await customerService.delete(id);
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
exports.findAllCustomer = async (req, res) => {
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
    const response = await customerService.findAll(query, sort, offset, limit);
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
exports.findCustomerById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await customerService.findById(id);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        data: response,
      });
    } else {
      res.status(404).send({
        RESULT_CODE: status.UNKNOWN_URL.RESULT_CODE,
        DEVELOPER_MESSAGE: status.UNKNOWN_URL.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
