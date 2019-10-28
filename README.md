---
pageClass: theme-techo
---

# article-system 文章系统

## 使用帮助

```
cd article/

npm run dev
```

```
git pull origin master
```


```
git add .
```


```
git commit -m"一些注释"
```

```
git push origin master
```


## 1.0 代办事项

1. 兼容typora主题 ✅
    - typora主题css放在`.vuepress/theme/typora-themes-css`下, 将主题的`.css`文件放入.
    - 根据不同的主题开发vuepress的layout模块
    - 通过在md文件中修改`layout`引入:
    ```
    ---
    layout: theme-li
    ---
    ```
2. 增加`拓词评论区以及评论按钮` ✅
    - *微信*中弹窗->请到浏览器 ✅
    - *浏览器*中唤醒App ✅
    - *拓词*中，正常使用 ✅
3. 增加页面底部固定`魔鬼营按钮` ✅
    - 底部自定义按钮类型选择 ✅
4. 配置️页面自定义项 ✅
    - *页面*标题 ✅
    - *页面*描述 ✅
    - *评论区*开关 ✅
    - *评论区*话题id ✅
    - *评论区*话题名称 ✅
    - *微信相关*分享标题 ✅
    - *微信相关*分享描述 ✅
    - *微信相关*分享小图标 ✅
5. 文章编辑预览方案 ⌛️
    - vuepress预览 
    - webpack-dev-server预览打包后静态资源
6. 帮助文档 `synax-helpbook/README.md` 方案 ✅
7. 页面分享配置 （以下三项不为空时，自动配置分享）✅
    - *微信相关*分享标题 
    - *微信相关*分享描述 
    - *微信相关*分享小图标 
8. 静态资源上传的解决方案 ⌛️
    - 支持本地aduio标签 ✅
    - 支持本地video标签 ✅
    - 静态资源上传到OSS ⌛️
n. ...... ⌛️

## 未确定事项

1. 与`钟玉`测试完成后的md是否可以在微信公众号内生成文章，样式是否由偏差 ⌛️
2. md生成微信公众号文章时，图片资源的路径处理方案 ⌛️
3. 放到`官网项目`的`自动化部署方案` ⌛️

n.  ⌛️

