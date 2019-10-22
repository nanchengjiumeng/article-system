let path = require("path");
let inlineLimit = 10000;

// vuepress dev weekly -> weekly
const defaultDir = process.argv[3];

let ossWeeklyUlrPre =
  `https://official-web.oss-cn-beijing.aliyuncs.com/towords/${defaultDir}/`;


module.exports = {
  // host: '192.168.2.27',
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
        href: "https://unpkg.com/mint-ui/lib/style.css"
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
    ]
  ],
  base: `/towords/${defaultDir}/`,
  dest: path.resolve(__dirname, `../../dist_${defaultDir}`),
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
    // config.optimization.splitChunks();

    console.log("---------");
    console.log(process.env.NODE_ENV === "production");
    console.log("---------");

    // const vueLoader = config.module.rules.find(
    //   loader => loader.loader === "vue-loader"
    // );
    // /* 把audio标签在编译时转成src属性 */
    // vueLoader.options.transformToRequire = {
    //   audio: "src"
    // };
    // config.module.rule("htmls").test(/\.html$/).use["html-withimg-loader"];

    process.env.NODE_ENV === "production" &&
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        .use("url-loader")
        .loader("url-loader")
        .options({
          limit: inlineLimit,
          publicPath:
            process.env.NODE_ENV === "production"
              ? "https://official-web.oss-cn-beijing.aliyuncs.com/towords/"
              : "./",
          name: function(file) {
            let filepathParsed = file.split("/"),
              filename = filepathParsed.pop();
            let s = filepathParsed.pop() + "/" + filename;
            return `${defaultDir}/`+s;
          }
        });

    process.env.NODE_ENV === "production" &&
    config.module
      .rule("media")
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: inlineLimit,
        publicPath:
          process.env.NODE_ENV === "production"
            ? "http://official-web.oss-cn-beijing.aliyuncs.com/towords/"
            : "/",
        name: function(file) {
          let filepathParsed = file.split("/"),
            filename = filepathParsed.pop();
          let s = filepathParsed.pop() + "/" + filename;
          return `${defaultDir}` + s;
        }
      });

      process.env.NODE_ENV === "production" &&
      config.output.publicPath(`/towords/${defaultDir}/`)
  }
};
