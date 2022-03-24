const merchantService = require("../services/merchant.service");
const status = require("../configs/status");
const bcrypt = require("bcrypt");
const saltRound = 10;

exports.createMerchant = async (req, res) => {
  try {
    const { merchantName, email, password } = req.body;
    const oldMerchant = await merchantService.findbyEmail(email);
    const oldCustomer = await customerService.findbyEmail(email);
    if (oldMerchant || oldCustomer) {
      res.status(409).send({
        RESULT_CODE: status.DATA_ALREADY.RESULT_CODE,
        DEVELOPER_MESSAGE: status.DATA_ALREADY.DEVELOPER_MESSAGE,
      });
    }else{
      const saltPassword = await bcrypt.genSalt(saltRound);
      const encryptedPassword = await bcrypt.hash(password, saltPassword)
      const data = {
        merchantName: merchantName,
        email: email,
        password: encryptedPassword,
        saltPassword: saltPassword,
        isActive: true,
      };
      console.log(data)
      const response = await merchantService.create(data);
      if (response) {
        res.status(201).send({
          RESULT_CODE: status.CREATED.RESULT_CODE,
          DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
          data:response
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
exports.updateMerchant = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await merchantService.update(id, req.body);
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
exports.deleteMerchant = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await merchantService.delete(id);
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
exports.findAllMerchant = async (req, res) => {
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
    const response = await merchantService.findAll(query, sort, offset, limit);
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
exports.findMerchantById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await merchantService.findById(id);
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
