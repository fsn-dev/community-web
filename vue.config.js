const path = require("path");
const IS_PROD = ["production", "test"].includes(process.env.NODE_ENV);

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  assetsDir: "./static",
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"));
    config.resolve.symlinks(true);
  },
  css: {
    extract: IS_PROD,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 8082, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    historyApiFallback: {
      index: "/index.html"
    },
    proxy: {
      "/fsn": {
        target: "http://www.yunzhongyan.xyz:8080/fsn/",
        // target: "http://192.168.1.42:8080/fsn/",
        changeOrigin: true,
        pathRewrite: {
          "^/fsn": ""
        }
      }
    }
  }
};
