const path = require("path")
const fs = require("fs")
const outputPath = path.resolve(__dirname, "../../README.md")
const roots = ['weekly', 'eco']


const generateMainMd = () => {
    // fs.writeFileSync(outputPath, content)
    let _dir = dir()
    let cont =  ''
    for(let key in _dir){
      cont += `# ${key}
`
      _dir[key].forEach(filename => {
        cont += `- [${key}/${filename}](${key}/${filename})
`
      })
    }
    fs.writeFileSync(outputPath, inject(cont))
}
function dir(){
  let d = {}
  roots.forEach(root => {
    const _path = path.resolve(__dirname, `../../${root}`)
    const filenameList = fs.readdirSync(_path, {
      encoding: 'utf-8'
    })
    d[root] = filenameList.map(filename => {
      let matched = filename.match(/(.+).md$/);
      if(matched){
        return matched[1]
      }
    }).filter(Boolean)
  })
  return d
}

function inject(cont){
  return `---
title: 文章目录
description: 网络毁掉了语言吗？
layout: theme-li
btn-wirte-exp: false
footer-type: -1
topic-id: -1
topic-name: 魔鬼训练营
share-title: 魔鬼营精读课|士
share-description: XX
share-icon-url:  "123"
---

${cont}

`
}

module.exports = generateMainMd