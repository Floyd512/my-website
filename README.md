# 网站

这个网站使用 [Docusaurus](https://docusaurus.io/) 构建，这是一个现代的静态网站生成器。

### 安装

```
$ npm
```

### 本地开发

```
$ npm run start
```

这个命令启动一个本地开发服务器并打开一个浏览器窗口。大多数更改在不需要重新启动服务器的情况下会实时反映出来。

### 构建

```
$ npm build
```

这个命令将静态内容生成到 `build` 目录中，并可以使用任何静态内容托管服务。

### 部署

使用 SSH:

```
$ USE_SSH=true npm deploy
```

不使用 SSH:

``` bash
$ GIT_USER=<Your GitHub username> npm deploy
```

```powerShell
$env:GIT_USER="Floyd512"; npm run deploy
```
如果你使用 GitHub 页面进行托管，这个命令是一个方便的方式来构建网站并推送到 `gh-pages` 分支。