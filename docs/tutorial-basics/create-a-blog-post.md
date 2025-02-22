---
sidebar_position: 3
---

# 创建博客文章

Docusaurus 为每个博客文章创建一个 **页面**，但也会创建一个 **博客索引页面**、**标签系统**、**RSS** 等。

## 创建你的第一篇博客文章

在 `blog/2021-02-28-greetings.md` 创建一个文件：

```md title="blog/2021-02-28-greetings.md"
---
slug: greetings
title: 问候！
authors:
  - name: Joel Marcey
    title: Docusaurus 1 的联合创始人
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus 维护者
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [greetings]
---

祝贺你，你已经创建了你的第一篇博客文章！

随意玩耍并编辑这篇博客文章，就像你喜欢的那样。
```

现在在 [http://localhost:3000/blog/greetings](http://localhost:3000/blog/greetings) 有一个新的博客文章。
