/*
 * @Author: zhaijs
 * @Date: 2024-04-11 13:50:55
 * @LastEditors: liangjia
 * @LastEditTime: 2025-09-06 13:34:48
 * @Description:
 */
module.exports = {
  outputDir: "dist",
  publicPath: "/screen/",
  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: true,
  productionSourceMap: false,
  // productionGzip:false,
  devServer: {
    host: "0.0.0.0",
    port: "8061", // 代理端口
    open: true, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      "/prod-api": {
        // 代理api
        target: "http://10.147.128.85:80",
        changeOrigin: true,
        pathRewrite: {
          "^/prod-api": "",
        },
      },
    },
  },
  configureWebpack: (config) => {
    let optimization = {
      runtimeChunk: "single",
      splitChunks: {
        // 你的配置
      },
    };
    Object.assign(config, {
      optimization,
    });
  },
  // webpack配置
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     const version = new Date().getTime()
  //     // 清除css，js版本号
  //     config.output.filename('static/js/[name].[hash].' + version + '.js').end()
  //     config.output.chunkFilename('static/js/[name].[hash].' + version + '.js').end()
  //     // 为生产环境修改配置...
  //     config.plugin('extract-css').tap(() => [{
  //       filename: `static/css/[name].[hash].` + version + `.css`,
  //       chunkFilename: `static/css/[name].[hash].` + version + `.css`
  //     }])
  //   }
  // }
};
