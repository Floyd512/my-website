---
sidebar_position: 2
---

# 创建文档

文档是 **一组页面** 通过：

- 一个 **侧边栏**
- **上一篇/下一篇导航**
- **版本控制**

## 创建你的第一篇文档

在 `docs/hello.md` 创建一个 Markdown 文件：

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

现在在 [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello) 有一个新的文档。

## 配置侧边栏

Docusaurus 会自动 **创建一个侧边栏** 从 `docs` 文件夹。

添加元数据来定制侧边栏的标签和位置：

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

也可以在 `sidebars.js` 中显式创建你的侧边栏：

```js title="sidebars.js"
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: '教程',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
