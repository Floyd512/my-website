---
sidebar_position: 2
title: 开启 Binlog 功能
date: 2023-08-01 21:37:42
tags: [数据库, MySQL]
---

:::note
- CentOS版本： CentOS Linux release 7.9.2009 (Core)
- MySQL版本： mysql80-community-release-el7-3
:::


修改配置文件：
```bash
# 修改/etc/my.cnf
[mysqld]

# 数据库id
server-id=1

# 启动binlog，该参数的值会作为 binlog 的文件名
log-bin=mysql-bin

# binlog类型
binlog-format=row

# 启用 binlog 的数据库，需根据实际情况作出修改(库名或者表名)
binlog-do-db=test

# 设置完之后重启 MySQL 服务
sudo systemctl restart mysqld.service
```

MySQL binlog 模式：
- Statement-based：基于语句，Binlog会记录所有写操作的SQL语句，包括insert、update、delete等
  - 优点： 节省空间
  - 缺点： 有可能造成数据不一致，例如insert语句中包含now()函数

- Row-based：基于行，Binlog 会记录每次写操作后被操作行记录的变化
  - 优点：保持数据的绝对一致性
  - 缺点：占用较大空间

- mixed：混合模式，默认是Statement-based，如果SQL语句可能导致数据不一致，就自动切换到Row-based