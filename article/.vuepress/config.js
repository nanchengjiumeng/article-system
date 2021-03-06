let path = require("path");
const generateMainMd = require("./utils/dir")
let inlineLimit = 10000;

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
        href: "https://unpkg.com/mint-ui/lib/style.css"
      }
    ],

    [
      "script",
      {
        src: "https://www.towords.com/_asset/pkg/jweixin@1.4.0/jweixin-1.4.0.js"
      }
    ],
    [
      "script",
      {
        src: "https://official-web.oss-cn-beijing.aliyuncs.com/towords/jsplugins/towords-browser/towords-browser%401.2.0.min.js"
      }
    ],
    [
      "script",
      {
        src: "https://www.towords.com/_asset/statistics/index.js"
      }
    ]
  ],
  base: `/s/`,
  dest: path.resolve(__dirname, `../../nora`),
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
    const production = process.env.NODE_ENV === "production"

    // 生成默认md
    !production && generateMainMd()
    
    console.log("---------");
    console.log('当前为生产环境:' + production);
    console.log("---------");

    // const vueLoader = config.module.rules.find(
    //   loader => loader.loader === "vue-loader"
    // );
    // /* 把audio标签在编译时转成src属性 */
    // vueLoader.options.transformToRequire = {
    //   audio: "src"
    // };
    // config.module.rule("htmls").test(/\.html$/).use["html-withimg-loader"];


    production &&
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif)(\?.*)?$/)
        .use("url-loader")
        .loader("url-loader")
        .options({
          limit: inlineLimit,
          publicPath:
            production
              ? "https://official-web.oss-cn-beijing.aliyuncs.com/towords/"
              : "./",
          name: assetName
        });

    production &&
    config.module
      .rule("media")
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: inlineLimit,
        publicPath:
          production
            ? "http://official-web.oss-cn-beijing.aliyuncs.com/towords/"
            : "/",
        name: assetName
      });

      production &&
      // config.output.publicPath(`/towords/`)
      config.output.publicPath(`/s/`)
  }
};



function assetName(file){
  let filepathParsed = file.split("/").slice(-4)
  return filepathParsed[0] + '/' + filepathParsed[2] + '/' + filepathParsed[3];
}