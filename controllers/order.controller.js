const orderService = require("../services/order.service");
const status  = require("../configs/status")
exports.createOrder = async (req,res) =>{
    try {
        const order = await orderService.create(req.body);
        if(order){
            res.status(201).send({
                RESULT_CODE : status.CREATED.RESULT_CODE,
                DEVELOPER_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
                data : order
            })
        }
    } catch (error) {
        res.status(500).send({
            RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
            DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
          });
    }
}
exports.updateOrder = async (req, res) => {
    try {
      const id = req.params._id;
      const response = await orderService.update(id, req.body);
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
  exports.deleteOrder = async (req, res) => {
    try {
      const id = req.params._id;
      const response = await orderService.delete(id);
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

  exports.findOrderById = async (req, res) => {
    try {
      const id = req.params._id;
      const response = await orderService.findById(id);
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

  exports.findByCustomerId = async (req, res) => {
    try {
      const id = req.params._id;
      const response = await orderService.findByCustomerId(id);
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

  
