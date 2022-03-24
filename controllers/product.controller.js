const productService = require("../services/product.service");
const status = require("../configs/status");

exports.createProduct = async (req, res) => {
  try {
    const data = ({
      categoryId,
      merchantId,
      productName,
      description,
      price,
      productImage,
      quantity,
      isActive,
    } = req.body);
    console.log(req.body)
    const response = await productService.create(data);
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
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await productService.update(id, req.body);
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
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await productService.delete(id);
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
exports.findAllProduct = async (req, res) => {
  try {
    let query = req.query;
    if (query.keyword) {
      query["$or"] = [
         { productName: { $regex: new RegExp(query.keyword), $options: "i" } },
      ];

      delete query.keyword;
    }
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
    const data = await productService.findAll(query, sort, offset, limit);
    if (data) {
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        message: status.SUCCESS.DEVELOPER_MESSAGE,
        data: data,
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
exports.findProductById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await productService.findById(id);
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

exports.findAllProductByMerchantId = async (req,res) =>{
  try {
    const merId = req.params._id;
    const response = await productService.findByMerchantId(merId);
    if(response){
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        data: response,
      });
    }else {
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
}
