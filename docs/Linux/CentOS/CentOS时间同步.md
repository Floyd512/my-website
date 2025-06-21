---
sidebar_position: 3
title: CentOS 时间同步
date: 2020-06-13 05:31:01
tags: [CentOS, Chrony, NTP]
---

:::note
本文所述的时间同步方法可用于 CDH 等大数据平台安装前的准备工作。以下是服务器的一些基本信息:
1. 环境：自建虚拟机
2. 系统：CentOS 7 (默认已安装并推荐使用 Chrony)
3. NTP服务器：阿里云（ntp.aliyun.com）
4. 同步频率：开机自启并后台持续同步
:::

`Chrony` 是一个现代化的网络时间协议（NTP）实现，自 CentOS 7 起已成为默认的时间同步服务。它相比传统的 `ntpd` 服务，同步速度更快，准确性更高，尤其适合虚拟化环境和网络不稳定的场景。

### 1. 检查并安装 Chrony

CentOS 7 通常已默认安装 Chrony。您可以使用以下命令检查。如果未安装，`yum` 会自动进行安装。

```Bash
yum -y install chrony
````

### 2\. 修改 Chrony 配置文件 (/etc/chrony.conf)

编辑配置文件，将其中的时间服务器指向更稳定、延迟更低的国内NTP服务器，如阿里云。

```Bash
vi /etc/chrony.conf
```

修改文件内容如下：

```Conf
# 注释掉默认的 centos.pool.ntp.org 服务器
# pool 2.centos.pool.ntp.org iburst

# 添加国内的NTP服务器，iburst参数可以加快初始同步速度
server ntp.aliyun.com iburst
server time1.cloud.tencent.com iburst
server cn.pool.ntp.org iburst

# 记录系统时钟增益/损耗速率的文件
driftfile /var/lib/chrony/drift

# 当系统时钟偏移量大于1秒时，在头三次更新中步进调整系统时钟
makestep 1.0 3

# 允许内核同步实时时钟（RTC），这是自动将系统时间同步到硬件时间的关键
rtcsync

# ... 其他配置保持默认即可 ...

# 指定日志文件的目录
logdir /var/log/chrony
```

### 3. 启动并设置 Chrony 服务开机自启

配置完成后，启动 `chronyd` 服务并设置为开机自启。

```Bash
# 启动 chronyd 服务
systemctl start chronyd

# 设置 chronyd 服务开机自启
systemctl enable chronyd
```

:::tip
`chronyd` 和 `ntpd` 服务不能同时运行。如果您的系统之前启用了 `ntpd`，请先将其关闭并禁用：`systemctl stop ntpd && systemctl disable ntpd`。
:::

### 4. 验证时间同步状态

使用 `chronyc` 命令行工具可以方便地查看同步状态。

```Bash
# 查看整体同步状态
chronyc tracking
```

输出结果中的 `Leap status` 应为 `Normal`。

```Bash
# 查看当前同步源的详细信息
chronyc sources -v
```

在输出的列表中，`^*` 前缀表示当前最佳且正在同步的时间源。稍等几分钟后，您应该能看到配置的阿里云等服务器。

### 5. 硬件时钟同步

`Chrony` 根据配置文件中的 `rtcsync` 指令，会自动将正确系统时间同步到硬件时钟（RTC），因此**不再需要手动执行 `hwclock --systohc`**。

:::tip

#### 1. 关于同步频率

`chronyd` 服务一旦启动，就会在后台持续、智能地调整系统时间，无需像过去一样使用 `crontab` 定时任务来手动执行 `ntpdate`。这是一种更优的现代实践。

#### 2. 关于时区设置

时间同步的准确性依赖于正确的时区设置。

  * **查看当前时区和时间** (推荐方式):
    ```Bash
    timedatectl
    ```
  * **修改时区为上海/北京时间** (推荐方式):
    ```Bash
    timedatectl set-timezone Asia/Shanghai
    ```
  * **查看当前时区** (传统方式):
    ```Bash
    ll /etc/localtime
    ```
  * **修改时区** (传统方式，了解即可):
    ```Bash
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    ```
:::