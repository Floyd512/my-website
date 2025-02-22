---
sidebar_position: 1
---

# 教程介绍

让我们在不到 5 分钟的时间内发现 **Docusaurus**。

## 入门

通过 **创建一个新站点** 开始。

或者 **立即试用 Docusaurus**，请访问 **[docusaurus.new](https://docusaurus.new)**。

### 你需要什么

- [Node.js](https://nodejs.org/en/download/) 版本 18.0 或以上：
  - 安装 Node.js 时，建议检查所有与依赖项相关的复选框。

## 生成一个新站点

使用 **经典模板** 生成一个新的 Docusaurus 站点。

运行命令后，经典模板将自动添加到你的项目中：

```bash
npm init docusaurus@latest my-website classic
```

你可以将此命令输入到 Command Prompt、Powershell、Terminal 或任何其他代码编辑器中的集成终端。

该命令还安装了运行 Docusaurus 所需的所有必要依赖项。

## 开始你的站点

运行开发服务器：

```bash
cd my-website
npm run start
```

`cd` 命令更改你正在使用的目录。为了使用你刚刚创建的 Docusaurus 站点，你需要在那里导航终端。

`npm run start` 命令在本地构建你的网站并通过开发服务器提供服务，准备好你可以在 http://localhost:3000/ 查看。

打开 `docs/intro.md`（此页面）并编辑一些行：站点 **自动重新加载** 并显示你的更改。
