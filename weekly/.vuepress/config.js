module.exports = {
  head: [
    [
      "link",
      {
        rel: "icon",
        href:
          "https://official-web.oss-cn-beijing.aliyuncs.com/towords/favicon.ico"
      }
    ],
    [
      "link",
      {
        href:
          "https://unpkg.com/mint-ui/lib/style.css"
      }
    ],
    
    [
        "script",
        {
            src: "https://www.topschool.com/js/jweixin-1.2.2.js"
        }
    ],
    [
        "script",
        {
            src: "https://wx.towords.com/js/common/plugins/tbrowser.js"
        }
    ],
  ],
  themeConfig: {
    navbar: false,
    search: false,
    sidebar: false
  },
  // config 是 ChainableConfig 的一个实例
  chainWebpack: (config, isServer) => {
    /* 
        修改vuepress默认的css代码分割方式
        默认详情:
            filepath: node_modules/@vuepress/core/lib/node/webpack/createBaseConfig.js
            line: 274
        */
    config.optimization.splitChunks();
  }
};
