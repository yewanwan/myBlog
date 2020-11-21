---
title: 在VSCode配置代码保存自动格式化
date: 2020-04-20
tags:
 - vscode
 - eslint
categories:
 - javascript
---

:::tip
统一的代码风格让项目有更好的维护性，减少不必要的低级错误，在团队中以及大项目中有着至关重要的作用。所以配置好的统一的代码风格也是每个前端程序员必会的技能。以下我分享自己的一些配置。
:::


## 全局安装eslint

```bash
npm install eslint -g
```

## 生成.eslintrc.js并配置

安装完成后，可以以下命令新建eslint配置文件.eslintrc.js

```bash
eslint --init
```
根据自己的项目需求选择对应的配置，和vue-cli的配置差不多

然后在本地项目安装eslint

```bash
npm install eslint --dev
```

这时候如果.eslintrc.js有配置规则的话eslint是会生效的了，如果没有配置，可以根据自己的需求手动配置规则，详细规则可以参考官网的规则。

[eslint规则](https://cn.eslint.org/docs/rules/)

现在配置好了但是保存代码的时候是不能自动修复报错的。接下来需要在VScode配置。

## 安装VScode插件

在VScode插件管理中心搜索Eslint， Vetur，Prettier Now，安装完成后在setting.json中配置以下内容：

```json
{
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "editor.fontSize": 20,
    "window.zoomLevel": 1,
    "workbench.colorTheme": "Material Theme High Contrast",
    "terminal.integrated.cursorBlinking": true,
    "terminal.integrated.cursorStyle": "line",
    "files.autoSave": "onWindowChange",
    "vetur.format.options.tabSize": 4,
    "eslint.enable": true, //是否开启vscode的eslint
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    //是否在保存的时候自动fix eslint
    "editor.formatOnSave": true, // #每次保存的时候自动格式化
    "eslint.alwaysShowStatus": true,
    "eslint.options": { //指定vscode的eslint所处理的文件的后缀
        "extensions": [
            ".js",
            ".vue",
            ".ts",
            ".tsx"
        ]
    },
    "files.associations": {
        "*.wpy": "vue",
        "*.wxml": "wxml",
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript",
        "*.html": "html"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "minapp-vscode.disableAutoConfig": true,
    // vscode默认启用了根据文件类型自动设置tabsize的选项
    "editor.detectIndentation": false,
    //  #让prettier使用eslint的代码格式进行校验 
    "prettier.eslintIntegration": true,
    //  #去掉代码结尾的分号 
    "prettier.semi": false,
    //  #使用单引号替代双引号 defaultFormatterOptions
    "prettier.singleQuote": true,
    //  #让函数(名)和后面的括号之间加个空格
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "vetur.validation.template": true,
    // #让vue中的js按编辑器自带的ts格式进行格式化 
    "vetur.format.defaultFormatter.js": "vscode-typescript",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "git.enableSmartCommit": true,
    "editor.quickSuggestions": {
        "strings": true
    },
    //一定要在vutur.defaultFormatterOptions参数中设置，单独修改prettier扩展的设置是无法解决这个问题的，因为perttier默认忽略了vue文件（事实上从忽略列表移除vue也不能解决这个问题）
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            // force-aligned | force-expand-multiline
            "wrap_attributes": "force-aligned"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": true
        },
        "prettier": {
            //  #去掉代码结尾的分号 
            "semi": false,
            //  #使用单引号替代双引号 
            "singleQuote": true
        }
    },
    "workbench.iconTheme": "vscode-icons",
    "editor.renderControlCharacters": true,
    "workbench.statusBar.visible": true,
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "javascript.preferences.quoteStyle": "single",
    "typescript.locale": "zh-CN",
    "eslint.format.enable": true,
    "workbench.editorAssociations": [
    
    ]
}
```

如有重复的配置请自行删除，这时候保存代码后就会按照.eslintrc.js中配置的规则去修复代码风格。这是我个人现在的配置，如有更好的配置方案也可以评论分享给我。

<Vssue title="Vssue Eslint" />



