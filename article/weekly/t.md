# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

# 段落

<!-- @(示例笔记本)[马克飞象|帮助|Markdown] -->

**马克飞象**是一款专为印象笔记（Evernote）打造的Markdown编辑器，通过精心的设计与技术实现，配合印象笔记强大的存储和同步功能，带来前所未有的书写体验。特点概述：
 
# 列表

- **功能丰富** ：支持高亮代码块、*LaTeX* 公式、流程图，本地图片以及附件上传，甚至截图粘贴，工作学习好帮手；
- **得心应手** ：简洁高效的编辑器，提供[桌面客户端][1]以及[离线Chrome App][2]，支持移动端 Web；
- **深度整合** ：支持选择笔记本和添加标签，支持从印象笔记跳转编辑，轻松管理。

-------------------

## 引用

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)

## 粗体、斜体、超链接、代码块

正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](http://www.example.com)或一个脚注[^demo]。下面列举了几个高级功能，更多语法请按`Ctrl + /`查看帮助。 



### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |



> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。


> **注意：**目前支持尚不完全，在印象笔记中勾选复选框是无效、不能同步的，所以必须在**马克飞象**中修改 Markdown 原文才可生效。下个版本将会全面支持。


# 图片

<img src="./asset/33/camp33.jpeg" alt="魔鬼营榜单">


# 音乐

 <audio :src="(()=>require('./asset/21/ending.mp3'))()" controls />


# 视频



<video width="100%" height="auto" controls="false" poster="https://new-towords.oss-cn-beijing.aliyuncs.com/web/zhongyu/reading.png">
<source src="https://new-towords.oss-cn-beijing.aliyuncs.com/web/zhongyu/readingclip.mp4" type="video/mp4"/>
</video>



