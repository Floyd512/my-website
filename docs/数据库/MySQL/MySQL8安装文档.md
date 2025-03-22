---
sidebar_position: 1
title: MySQL 8安装文档
date: 2023-08-01 21:37:42
tags: [数据库, MySQL]
---

:::note
- CentOS版本： CentOS Linux release 7.9.2009 (Core)
- MySQL版本： mysql80-community-release-el7-3
:::


MySQL 各组件介绍:
| rpm包名                                          | 描述     |
| :----------------------------------------------: | :------: |
| mysql-community-client-5.7.18-1.el7.x86_64.rpm   | 客户端   |
| mysql-community-devel-5.7.18-1.el7.x86_64.rpm    | 开发库   |
| mysql-community-embedded-5.7.18-1.el7.x86_64.rpm | 嵌入式   |
| mysql-community-server-5.7.18-1.el7.x86_64.rpm   | 服务端   |
| mysql-community-libs-5.7.18-1.el7.x86_64.rpm     | 共享库   |
| mysql-community-test-5.7.18-1.el7.x86_64.rpm     | 测试组件 |


--- 
## 1. 环境准备（卸载MySQL）

```bash
# 检查是否已经安装过 MySQL：
rpm -qa | grep mysql

# 如果环境中有遗留 MySQL 则执行删除命令：
rpm -e --nodeps mysql-xxxxxxxxx

# 查询遗留的 MySQL 设置或命令，执行两条命令
whereis mysql
find / -name mysql

# 如通过上述两条命令发现有遗留，则执行清除命令，将所有查到的 MySQL 都删除干净
rm -rf  xxx xxx

# 再次检查是否已经安装过mysql
rpm -qa | grep mysql

# 使用 YUM 卸载 MySQL
sudo yum remove mysql mysql-server
```

---
## 2、安装

![MySQL安装目录](https://github.com/CharlieTao/CharlieTao.github.sources/blob/master/BigData/Pictures/MySQL/MySQL安装目录.png?raw=true)

### （1）通过 Yum 仓库安装（推荐）
MySQL 官方提供了 YUM 仓库，需要先下载并安装 MySQL 8 的 YUM 仓库，然后再使用 YUM 安装 MySQL 8
```bash
# 1. 下载 YUM 仓库
sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

# 2. 安装 YUM 仓库
sudo rpm -ivh mysql80-community-release-el7-3.noarch.rpm

# 直接从远程安装
sudo rpm -Uvh https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

# 3. 确认仓库已启用
sudo yum repolist enabled | grep "mysql.*-community.*"

# 4. 安装MySQL
sudo yum -y install mysql-community-server

# 5. 如果提示没有秘钥，提示未安装公钥，则需要手动导入
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022

# 6. 检查RPM包的数字签名是否有效和可信
rpm --checksig  /var/cache/yum/x86_64/7/mysql80-community/packages/mysql-community-client-plugins-8.0.33-1.el7.x86_64.rpm

# 7. 确认 /etc/pki/rpm-gpg/ 目录下确实包含该 GPG 密钥文件
ls /etc/pki/rpm-gpg/ | grep mysql

# 8. 清理 YUM 缓存，重新安装 MySQL
sudo yum clean all
sudo yum makecache
sudo yum -y install mysql-community-server

# 9. 如果提示不是最新秘钥，可以自己找，或者直接跳过
sudo yum -y install mysql-community-server --nogpgcheck
```

### （2）手动下载 RPM 包安装

```bash
# 1. 安装RPM包
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

# 2. ​安装 RPM 包并执行安装
sudo rpm -ivh mysql80-community-release-el7-3.noarch.rpm

# 3.安装MySQL
sudo yum -y install mysql-community-server
```



### 2. 源码包（tar.gz）手动安装

```bash
# 1. 下载源码包

# 2. 解压并移动文件
tar -zxvf mysql-8.0.21-el7-x86_64.tar.gz
mv mysql-8.0.21-el7-x86_64 /usr/local/mysql

# 3. 复制配置文件
cp /usr/local/mysql/support-files/my-default.cnf /etc/my.cnf

# 4. 初始化数据库
/usr/local/mysql/bin/mysqld --initialize --user=mysql

# 5. 启动MySQL
/usr/local/mysql/bin/mysql.server start
```



---
## 3、启动


```bash
# 启动
sudo systemctl start mysqld.service

# 开机自启
sudo systemctl enable mysqld.service

# 查看状态
sudo systemctl status mysqld.service

# 停止
sudo systemctl stop mysqld.service

# 重启
sudo systemctl restart mysqld.service
```


---
## 4、登录


```bash
# 首次登录的的时候不知道root用户的密码，查看生成的初始密码
grep "password" /var/log/mysqld.log

# 用于增强 MySQL 安全性的脚本命令。该命令在 MySQL 安装后运行，引导用户设置一系列安全选项，包括：
# - 设置 root 用户密码
# - 删除匿名用户
# - 禁止 root 用户远程登录
# - 删除测试数据库
# - 重新加载权限表
# 通过执行此命令，可以帮助用户快速地将 MySQL 数据库配置为更安全的状态。
sudo mysql_secure_installation
```

```sql
# 或者使用初始密码登录，然后修改密码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bigdata3Tsk@';
```

---
## 5、其他


### （1）MySQL JDBC驱动下载

```bash
# 下载驱动
wget https://downloads.mysql.com/archives/get/p/3/file/mysql-connector-java-8.0.16-1.el7.noarch.rpm

# 安装驱动，默认路径：/usr/share/java/mysql-connector-java.jar
sudo rpm -ivh mysql-connector-java-8.0.16-1.el7.noarch.rpm
sudo yum install mysql-connector-java-8.0.16-1.el7.noarch.rpm
# 以上两种安装方式选其一
```


### （2）允许使用 root 用户访问 MySQL 数据库（不推荐）

```sql
GRANT ALL ON *.* TO 'root'@'%';

-- 如果提示不允许改，执行以下语句
UPDATE user SET host='%' WHERE user='root';

-- 对MySQL中的权限进行更改（如使用 GRANT、REVOKE 等语句）时，这些更改将在授权表中进行更新。然而，这些更改并不会立即生效，直到执行 FLUSH PRIVILEGES 命令
FLUSH PRIVILEGES;
```

### （3）允许使用普通用户访问 MySQL 数据库

- 添加用户

```sql
-- 1.只允许本机连接
CREATE USER '新用户名'@'localhost' identified by '密码';

-- 2.允许所有 ip 连接（用通配符%表示）
CREATE USER '新用户名'@'%' identified by '密码';
```

- 授权用户

```sql
-- 格式：
GRANT PRIVILEGES ON DataBaseName.TableName TO ‘username’@‘host’

-- 给 admin 用户授权 study 数据库中所有表的所有操作权限
GRANT ALL ON study.* TO 'admin'@'%';

-- 给 admin 用户授权所有库中所有表的所有操作权限
GRANT ALL ON *.* TO 'admin'@'%';
```

:::tip
- PRIVILEGES表示要授予什么权力，例如可以有 select ，insert 等，如果要授予全部权力，则填ALL
- databasename.tablename 表示用户的权限能用在哪个库的哪个表中，如果想要设置所有的数据库所有的表，则填*.*，*是一个通配符，表示全部。
- 'username'@'host'：表示授权给哪个用户、哪台机器
:::

### （4）改 MySQL 的密码策略（不推荐）

```sql
-- 查看密码粗略
SHOW VARIABLES LIKE 'validate_password%';

-- 修改密码策略(第一次登进去，需要改一次密码，不然不让你设置密码策略)
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Tsk612473:';

-- 密码策略的强度要求
set global validate_password.policy=LOW;

-- 密码的最小长度
set global validate_password.length=4;

-- 退出重启
```