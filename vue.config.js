module.exports = {
    devServer: {
        open: true,
        port: 3000,
        overlay: false,
        proxy: {
            "/banner": {
               //代理地址填写注意不要重名
                target: "https://mapi.juanpi.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/banner": "",
                },
            },
            "/goods": {
                //代理地址填写注意不要重名
                 target: "https://webservice.juanpi.com/api",
                 changeOrigin: true,
                 pathRewrite: {
                     "^/goods": "",
                 },
             },
             "/cyq": {
                //代理地址填写注意不要重名
                 target: "https://detail-api.juanpi.com/ptgoods/detail",
                 changeOrigin: true,
                 pathRewrite: {
                     "^/cyq": "",
                 },
             },
             "/detail":{
                target:"https://detail-api.juanpi.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/detail": "",
                },
            }

        },
    },
};