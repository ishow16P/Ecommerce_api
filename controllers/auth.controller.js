const userService = require("../services/user.service");
const customerService = require("../services/customer.service");
const merchantService = require("../services/merchant.service");
const jwt = require("jsonwebtoken");
const appConfig = JSON.parse(process.env.service);
const status = require("../configs/status");
const bcrypt = require("bcrypt");

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user= {};
    let role;
    let response = await customerService.findbyEmail(email);
    if (response) {
      user = response;
      role = "customer";
    } else {
      response = await merchantService.findbyEmail(email);
      if (response) {
        user = response;
        role = "merchant";
      }
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        { id: user._id, role },
        appConfig.app.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).send({
        RESULT_CODE: status.SUCCESS.RESULT_CODE,
        DEVELOPER_MESSAGE: status.SUCCESS.DEVELOPER_MESSAGE,
        data: { user,role, accessToken },
      });
    } else {
      console.log("compare fail");
      res.status(401).send({
        RESULT_CODE: status.ACCESS_DENIED.RESULT_CODE,
        DEVELOPER_MESSAGE: status.ACCESS_DENIED.DEVELOPER_MESSAGE,
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
