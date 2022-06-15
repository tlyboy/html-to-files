// 1.1 导入 fs 文件系统模块
import fs from 'fs'

// 1.3 匹配 <style></style> 标签的正则
// 其中 \s 表示空白字符； \S 表示非空白字符； * 表示匹配任意次
const regStyle = /<style>[\s\S]*<\/style>/
// 1.4 匹配 <style></style> 标签的正则
const regScript = /<script>[\s\S]*<\/script>/

// 判断 dist 目录是否存在，若不存在则自动创建
fs.mkdir(new URL('./dist', import.meta.url), err => {
  if (err) return
})

// 2.1 读取需要被处理的 HTML 文件
fs.readFile(
  new URL('./src/index.html', import.meta.url),
  'utf8',
  (err, dataStr) => {
    // 2.2 读取 HTML 文件失败
    if (err) return console.log('读取 HTML 文件失败！' + err.message)

    //2.4 读取 HTML 文件成功后，调用对应的方法，拆解出 css、js 和 html 文件
    resolveCSS(dataStr)
    resolveJS(dataStr)
    resolveHTML(dataStr)
  }
)

// 3.1 处理 css 样式
function resolveCSS(htmlStr) {
  // 3.2 使用正则提取页面中的 <style></style> 标签
  const r1 = regStyle.exec(htmlStr)
  // 3.3 将提取出来的样式字符串，做进一步的处理
  const newCSS = r1[0].replace('<style>', '').replace('</style>', '')
  // 3.4 将提取出来的 css 样式，写入到 index.css 文件中
  fs.writeFile(new URL('./dist/index.css', import.meta.url), newCSS, err => {
    if (err) return console.log('写入 CSS 样式文件失败！' + err.message)
    console.log('写入 CSS 样式文件成功！')
  })
}

// 4.1 处理 js 脚本
function resolveJS(htmlStr) {
  // 4.2 使用正则提取页面中的 <script></script> 标签
  const r2 = regScript.exec(htmlStr)
  // 4.3 将提取出来的脚本字符串，做进一步的处理
  const newJS = r2[0].replace('<script>', '').replace('</script>', '')
  // 4.4 将提取出来的 js 脚本，写入到 index.js 文件中
  fs.writeFile(new URL('./dist/index.js', import.meta.url), newJS, err => {
    if (err) return console.log('写入 JS 脚本文件失败！' + err.message)
    console.log('写入 JS 脚本文件成功！')
  })
}

// 5.1 处理 html 文件
function resolveHTML(htmlStr) {
  // 5.2 使用字符串的 replace 方法，把内嵌的 <script> 和 </script> 标签，替换为外联的 <link> 和 <script> 标签
  const newHTML = htmlStr
    .replace(regStyle, '<link rel="stylesheet" href="./index.css">')
    .replace(regScript, '<script src="./index.js"></script>')
  // 5.3 将替换完之后的 html 代码，写入到 index.html 文件中
  fs.writeFile(new URL('./dist/index.html', import.meta.url), newHTML, err => {
    if (err) return console.log('写入 HTML 页面文件失败！' + err.message)
    console.log('写入 HTML 页面文件成功！')
  })
}

export default {
  resolveCSS,
  resolveJS,
  resolveHTML
}
