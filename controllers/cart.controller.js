const cartService = require("../services/cart.service");
const status = require("../configs/status");

exports.addItemCart = async (req, res) => {
  try {
    const data = ({ productId, customerId, qeantity } = req.body);
    const response = await cartService.create(data);
    if (response) {
      res.status(201).send({
        RESULT_CODE: status.CREATED.RESULT_CODE,
        DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};

exports.updateItemCart = async (req, res) => {
  try {
    const id = req.params._id;
    const qeantity = req.body
    const response = await cartService.update(id, req.body);
    if (response) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        mesDEVELOPER_MESSAGEsage: status.SUCCESS.DEVELOPER_MESSAGE,
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

exports.deleteItemCart = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await cartService.delete(id);
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

exports.deleteAllItemCartByCustomerId = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await cartService.deleteByCustomerId(id);
    console.log(response)
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

exports.findByCustomerId = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await cartService.findByCustomerId(id);
    res.status(200).send({
      RESULT_CODE: status.SUCCESS.RESULT_CODE,
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
