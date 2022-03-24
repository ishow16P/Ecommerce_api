const jwt = require("jsonwebtoken");
const appConfig = JSON.parse(process.env.service);
const status = require("../configs/status");

exports.verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      res.status(403).send({
        status: status.FORBIDDEN.RESULT_CODE,
        message: status.FORBIDDEN.DEVELOPER_MESSAGE,
      });
    }

    try {
      const decoded = jwt.verify(token, appConfig.app.TOKEN_KEY);
      req.user = decoded;
      console.log(decoded)
    } catch (error) {
      return res.status(401).send({
        status: status.INVALID_TOKEN.RESULT_CODE,
        message: status.INVALID_TOKEN.RESULT_CODE,
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      DEVELOPER_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};

// exports.verifyTokenAndAuthorization = (req,res,next)=>{
//     try {
//         verifyToken(req,res),()=>{

//         }
//     } catch (error) {

//     }
// }
