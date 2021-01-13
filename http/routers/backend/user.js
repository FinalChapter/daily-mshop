
// 新建出路由对象
const express = require("express");
const router = express.Router();

// 导入控制器
const UserController = require("../../app/controllers/UserController");

// 自定义中间件：加密密码
var passwdCrypt = require("../../app/middlewares/passwdCrypt");

// 将路由挂到路由对象上
// 登录处理
router.post("/login", passwdCrypt, UserController.userLogin);

// 方式2的目的在于让开发者一眼就能够通过前面的持有者名称就能够知道这个jwt是发给谁的。实质上，这个持有者名并不参与验证过程，真正参与验证的还是后面的token内容
// 获取用户信息（必须先获取令牌）
router.get("/get_user_info", UserController.getUserInfo);

// 导出
module.exports = router;
