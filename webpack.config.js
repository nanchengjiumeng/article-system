let path = require('path');
let address = require('os').networkInterfaces()['en0'][1]['address'];
let port = 8010;
module.exports = env => {
  printLink();
  return {
    mode: 'development',
    devServer: {
        contentBase: [
          path.join(__dirname, './weekly/.vuepress/dist' ),
          path.join(__dirname, './synax-helpbook/.vuepress/dist' ),
          path.join(__dirname, 'dist' ),
        ],
        host: address,
        port
    },
  };
};


// 打印url
function printLink(){
  console.log('----------------------- 查看内容 点击下方链接--------------------')
  console.log();
  console.log();
  console.log();
  console.log(`| 按住 command 双击此链接 ------>>> http://${address}:${port}`);
  console.log();
  console.log();
  console.log();
  console.log('----------------------- 查看内容 点击上方链接--------------------')
  
}