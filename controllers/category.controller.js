const categoryService = require("../services/category.service");
const status = require("../configs/status");

exports.createCategory = async (req, res) => {
  try {
    const data = ({ categoryId, categoryName, categoryImage, isActive } = req.body);
    const category = await categoryService.create(data);
    if (category) {
      res.status(201).send({
        RESULT_CODE: status.CREATED.RESULT_CODE,
        DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await categoryService.update(id, req.body);
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
    console.log(error);
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
exports.deleteCatagory = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await categoryService.delete(id);
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
exports.findAllCategory = async (req, res) => {
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
    const response = await categoryService.findAll(query, sort, offset, limit);
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
exports.findCategoryById = async (req, res) => {
  try {
    const id = req.params._id;
    const response = await categoryService.findById(id);
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
