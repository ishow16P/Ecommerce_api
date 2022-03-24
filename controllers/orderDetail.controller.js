const orderDeatailService = require("../services/orderDetail.service");
const Product = require("../services/product.service");
const status = require("../configs/status");

exports.createOrderDetail = async (req, res) => {
  try {
    const data = ({ orderId, productId, quantity, totalPrice } = req.body);

    let product = await Product.findById(data.productId);
    if (product) product.quantity = product.quantity - quantity;
    const updateProduct = await Product.update(product._id, product);
    if (updateProduct) {
      const response = await orderDeatailService.create(data);
      if (response) {
        res.status(201).send({
          RESULT_CODE: status.CREATED.RESULT_CODE,
          DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
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

exports.updateOrederDetail = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await orderDeatailService.update(id, req.body);
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

exports.deleteOrderDetail = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await orderDeatailService.delete(id);
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

exports.findOrderDetailById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await orderDeatailService.findById(id);
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

exports.findOrderDetailByOrderId = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await orderDeatailService.findByOrderId(id);
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
