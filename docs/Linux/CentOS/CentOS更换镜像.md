---
sidebar_position: 2
title: CentOS 更换镜像
date: 2020-06-13 05:23:52
tags: [CentOS]
---

:::note
由于新建虚拟机时，使用系统自带的CentOS镜像在使用yum命令下载各种软件的速度不太理想，因此本文用于记录更换原始镜像为国内镜像的步骤。以下是服务器信息：
- 环境：自建虚拟机
- 系统：CentOS 7
- 镜像：阿里云
:::




### 1. 安装wget/curl

```sh
yum -y install wget curl
```

### 2. 备份原本的镜像

```Bash
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

### 3. 下载镜像并写入指定文件中

以下两种方式均可下载目标镜像

```Bash
#使用Wget命令
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

#使用curl命令
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

:::tip[提示]
-o 后面路径+指定文件名，作用是将目标镜像中的内容写到指定目录的指定文件中
:::


### 4. 更新镜像源

```Bash
#清除缓存
yum clean all

#生成缓存
yum makecache
```

:::info
网上有一篇博客说要将跟换后的 CentOS-Base.repo 中的所有 http 开头的更改为 https ，主要是为了增强安全性。使用 HTTPS 而不是 HTTP 可以确保数据在传输过程中被加密，从而保护数据的完整性与保密性，防止中间人攻击（Man-in-the-Middle Attack, MitM）等安全威胁
:::

### 5. 更换repo中的 `http` 为 `https`

打开 CentOS-Base.repo 文件：可以使用文本编辑器如 vi、vim 或 nano 来打开和编辑此文件

```Bash
vim /etc/yum.repos.d/CentOS-Base.repo
```

查找并替换：手动查找所有的 http:// 并替换为 https://。如果你熟悉命令行工具，也可以使用 sed 命令来批量替换

```Bash
sed -i 's|http://|https://|g' /etc/yum.repos.d/CentOS-Base.repo
```

保存更改并退出，清理 YUM 缓存并更新软件包列表

```Bash
yum clean all
yum makecache
```