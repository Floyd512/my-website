---
sidebar_position: 5
---

# 部署你的站点

Docusaurus 是一个 **静态站点生成器**（也称为 **[Jamstack](https://jamstack.org/)**）。

它将你的站点构建为简单的 **静态 HTML、JavaScript 和 CSS 文件**。

## 构建你的站点

构建你的站点 **用于生产**：

```bash
npm run build
```

静态文件生成在 `build` 文件夹中。

## 部署你的站点

在本地测试你的生产构建：

```bash
npm run serve
```

`build` 文件夹现在在 [http://localhost:3000/](http://localhost:3000/) 提供。

你现在可以轻松地将 `build` 文件夹 **几乎任何地方** 部署，**免费** 或非常小的成本（阅读 **[部署指南](https://docusaurus.io/docs/deployment)**）。
