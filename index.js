const express = require("express");
const cors = require("cors");

const app = express();
require("./models");

app.use(cors(["*"]));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname + "/public"));
app.use(function (err, req, res, next){
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};
    
      console.log(err)
      // render the error page
      res.status(err.status || 500);
      res.render("error");
})

app.use(require('./routes'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server running port ${PORT}`);
})