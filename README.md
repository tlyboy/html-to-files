# html-to-files

## 一、快速上手

编写或粘贴内容到 src 下的 index.html 文件

## 二、 构建

### 方式 1：

#### 在命令行中输入以下命令

```bash
$ node index.js
```

### 方式 2：

#### 1. 在 package.json 文件中加入 scripts 节点

```json
"scripts": {
    "build": "node index.js"
}
```

#### 2. 使用 npm 或 yarn 构建

```bash
$ npm run dist # yarn run dist
```

## 三、使用

构建生成在 dist 目录下
