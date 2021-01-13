// 目标：新建一个users表，并且只要需要有1条数据
const express = require("express");
const app = express();
// 导入 cors
const cors = require("cors");
const port = 2000;
const bodyParser = require("body-parser");
// 使用cors解决跨域问题
app.use(cors())
// 使用bodyparser中间件帮助接收post数据
app.use(bodyParser.urlencoded({
    extended: false
}));
// 使nodejs的api支持json数据接收, 增加json支持
app.use(bodyParser.json());
// 路由模块化
app.use("/backend", require("./routers/backend/user"));
app.listen(port, () =>
    console.log(`server is running at http://127.0.0.1:${port}!`)
);