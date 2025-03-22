---
sidebar_position: 1
title: Hadoop-2.7.7 安装文档
date: 2020-06-07 08:50:21
tags: [Hadoop]
---


:::note[前提条件]

- 免密登录
- 关闭防⽕墙
- JDK的安装
- Zookeeper的安装

搭配的Spark版本是2.3.4
:::



### 1. 角色分配
| 机器名称         | bigdata001  | bigdata002  |  bigdata003 |
| :-:              | :-:         | :-:         | :-:         |
| QuorumPeerMain   | √           | √           | √           |
| NameNode         | √           | √           |             |
| DataNode         | √           | √           | √           |
| JournalNode      | √           | √           | √           |
| ResourceManager  | √           | √           |             |
| NodeManager      | √           | √           | √           |
| ZKFC             | √           | √           |             |


### 2. 下载

#### （1）浏览器下载

- [**Hadoop官网下载**](https://archive.apache.org/dist/hadoop/common/hadoop-2.7.7/hadoop-2.7.7.tar.gz)

- [**国内镜像下载**](https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-2.7.7/hadoop-2.7.7.tar.gz)

#### （2）服务器本地下载

```bash
#官网镜像
wget https://archive.apache.org/dist/hadoop/common/hadoop-2.7.7/hadoop- 2.7.7.tar.gz

#国内镜像
wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop- 2.7.7/hadoop-2.7.7.tar.gz
```

### 3. 配置

#### （1）修改配置文件：

```xml title="apache-hadoop-2.7.7/etc/hadoop/core-site.xml"
<configuration>
    <!-- hdfs地址，ha模式中是连接到nameservice -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://ns1</value>
    </property>

    <!-- 这里的路径默认是NameNode、DataNode、JournalNode等存放数据的公共目录，也可以单独指定 -->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/home/tomford/software/hadoop/data/dfs</value>
    </property>

    <!-- 指定ZooKeeper集群的地址和端口。注意，数量一定是奇数，且不少于三个节点 -->
    <property>
        <name>ha.zookeeper.quorum</name>
        <value>bigdata001:2181,bigdata002:2181,bigdata003:2181</value>
    </property>

    <!-- -->
    <property>
        <name>hadoop.proxyuser.worker.groups</name>
        <value>*</value>
    </property>

    <!-- -->
    <property>
        <name>hadoop.proxyuser.worker.hosts</name>
        <value>*</value>
    </property>
</configuration>
```


```Bash title="apache-hadoop-2.7.7/etc/hadoop/hadoop-env.sh"
export JAVA_HOME=/home/tomford/software/jdk
export HDFS_NAMENODE_USER=root
export HDFS_DATANODE_USER=root
export HDFS_DATANODE_SECURE_USER=hdfs
export HDFS_ZKFC_USER=root
export HDFS_JOURNALNODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_NODEMANAGER_USER=root
export YARN_RESOURCEMANAGER_USER=root
```

```xml title="apache-hadoop-2.7.7/etc/hadoop/hdfs-site.xml"
<configuration>
    <!-- 指定副本数，不能超过机器节点数 -->
    <property>
        <name>dfs.replication</name>
        <value>3</value>
    </property>

    <!-- 为namenode集群定义一个services name -->
    <property>
        <name>dfs.nameservices</name>
        <value>ns1</value>
    </property>

    <!-- nameservice 包含哪些namenode，为各个namenode起名 -->
    <property>
        <name>dfs.ha.namenodes.ns1</name>
        <value>nn1,nn2</value>
    </property>

    <!-- 名为nn1的namenode的rpc地址和端口号，rpc用来和datanode通讯 -->
    <property>
        <name>dfs.namenode.rpc-address.ns1.nn1</name>
        <value>bigdata001:9000</value>
    </property>

    <!-- 名为nn2的namenode的rpc地址和端口号，rpc用来和datanode通讯 -->
    <property>
        <name>dfs.namenode.rpc-address.ns1.nn2</name>
        <value>bigdata002:9000</value>
    </property>

    <!--名为nn1的namenode的http地址和端口号，用来和web客户端通讯 -->
    <property>
        <name>dfs.namenode.http-address.ns1.nn1</name>
        <value>bigdata001:50070</value>
    </property>

    <!-- 名为nn2的namenode的http地址和端口号，用来和web客户端通讯 -->
    <property>
        <name>dfs.namenode.http-address.ns1.nn2</name>
        <value>bigdata002:50070</value>
    </property>
        
    <!-- namenode间用于共享编辑日志的journal节点列表 -->
    <property>
        <name>dfs.namenode.shared.edits.dir</name>
        <value>qjournal://bigdata001:8485;bigdata002:8485;bigdata003:8485/ns1</value>
    </property>

    <!-- 指定该集群出现故障时，是否自动切换到另一台namenode -->
    <property>
        <name>dfs.ha.automatic-failover.enabled.ns1</name>
        <value>true</value>
    </property>

    <!-- journalnode 上用于存放edits日志的目录 -->
    <property>
        <name>dfs.journalnode.edits.dir</name>
        <value>/home/tomford/software/hadoop/data/dfs/journalnode</value>
    </property>

    <!--指定namenode dir的地址 -->
    <property>
        <name>dfs.name.dir</name>
        <value>/home/tomford/software/hadoop/data/dfs/namenode</value>
    </property>

    <!--指定datanode dir的地址 -->
    <property>
        <name>dfs.data.dir</name>
        <value>/home/tomford/software/hadoop/data/dfs/datanode</value>
    </property>

    <!-- 客户端连接可用状态的NameNode所用的代理类 -->
    <property>
        <name>dfs.client.failover.proxy.provider.ns1</name>
        <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>
    
    <!-- 一旦需要NameNode切换，使用ssh方式进行操作 -->
    <property>
        <name>dfs.ha.fencing.methods</name>
        <value>sshfence</value>
    </property>

    <!-- 如果使用ssh进行故障切换，使用ssh通信时用的密钥存储的位置 -->
    <property>
        <name>dfs.ha.fencing.ssh.private-key-files</name>
        <value>/home/tomford/.ssh/id_rsa</value>
    </property>

    <!-- connect-timeout超时时间 -->
    <property>
        <name>dfs.ha.fencing.ssh.connect-timeout</name>
        <value>30000</value>
    </property>

    <!--开启Web HDFS -->
    <property>
        <name>dfs.webhdfs.enabled</name>
        <value>true</value>
    </property>
</configuration>
```

```xml title="apache-hadoop-2.7.7/etc/hadoop/mapred-site.xml"
<configuration>
    <!-- 使用Yarn作为资源调度 -->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

```xml title="apache-hadoop-2.7.7/etc/hadoop/yarn-site.xml"
<configuration>
    <!-- 启用HA高可用性 -->
    <property>
        <name>yarn.resourcemanager.ha.enabled</name>
        <value>true</value>
    </property>

    <!-- 指定resourcemanager的名字 -->
    <property>
        <name>yarn.resourcemanager.cluster-id</name>
        <value>yrc</value>
    </property>

    <!-- 使用了2个resourcemanager,分别指定Resourcemanager的地址 -->
    <property>
        <name>yarn.resourcemanager.ha.rm-ids</name>
        <value>rm1,rm2</value>
    </property>

    <!-- 指定rm1的地址 -->
    <property>
        <name>yarn.resourcemanager.hostname.rm1</name>
        <value>bigdata001</value>
    </property>

    <!-- 指定rm2的地址 -->
    <property>
        <name>yarn.resourcemanager.hostname.rm2</name>
        <value>bigdata002</value>
    </property>

    <!-- 指定当前机器bigdata001作为rm1 -->
    <property>
        <name>yarn.resourcemanager.ha.id</name>
        <value>rm1</value>
    </property>

    <!-- 指定zookeeper集群机器 -->
    <property>
        <name>yarn.resourcemanager.zk-address</name>
        <value>bigdata001:2181,bigdata002:2181,bigdata003:2181</value>
    </property>

    <!-- NodeManager上运行的附属服务，默认是mapreduce_shuffle -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>

    <!-- Hadoop ClassPath -->
    <property>
        <name>yarn.application.classpath</name>
        <value>
            /home/tomford/software/hadoop/etc/hadoop:
            /home/tomford/software/hadoop/share/hadoop/common/lib/*:
            /home/tomford/software/hadoop/share/hadoop/common/*:
            /home/tomford/software/hadoop/share/hadoop/hdfs:
            /home/tomford/software/hadoop/share/hadoop/hdfs/lib/*:
            /home/tomford/software/hadoop/share/hadoop/hdfs/*:
            /home/tomford/software/hadoop/share/hadoop/mapreduce/lib/*:
            /home/tomford/software/hadoop/share/hadoop/mapreduce/*:
            /home/tomford/software/hadoop/share/hadoop/yarn:
            /home/tomford/software/hadoop/share/hadoop/yarn/lib/*:
            /home/tomford/software/hadoop/share/hadoop/yarn/*
        </value>
    </property>

    <!-- 客户端通过该地址向RM提交对应用程序操作 -->
    <property>
        <name>yarn.resourcemanager.address.rm1</name>
        <value>bigdata001:8032</value>
    </property>

    <!--ResourceManager 对ApplicationMaster暴露的访问地址。ApplicationMaster通过该地址向RM申请资源释放资源等。 -->
    <property>
        <name>yarn.resourcemanager.scheduler.address.rm1</name>
        <value>bigdata001:8030</value>
    </property>

    <!-- RM HTTP访问地址,查看集群信息-->
    <property>
        <name>yarn.resourcemanager.webapp.address.rm1</name>
        <value>bigdata001:8088</value>
    </property>

    <!-- NodeManager通过该地址交换信息 -->
    <property>
        <name>yarn.resourcemanager.resource-tracker.address.rm1</name>
        <value>bigdata001:8031</value>
    </property>

    <!--管理员通过该地址向RM发送管理命令 -->
    <property>
        <name>yarn.resourcemanager.admin.address.rm1</name>
        <value>bigdata001:8033</value>
    </property>

    <property>
        <name>yarn.resourcemanager.ha.admin.address.rm1</name>
        <value>bigdata001:23142</value>
    </property>

    <property>
        <name>yarn.resourcemanager.address.rm2</name>
        <value>bigdata002:8032</value>
    </property>

    <property>
        <name>yarn.resourcemanager.scheduler.address.rm2</name>
        <value>bigdata002:8030</value>
    </property>

    <property>
        <name>yarn.resourcemanager.webapp.address.rm2</name>
        <value>bigdata002:8088</value>
    </property>

    <property>
        <name>yarn.resourcemanager.resource-tracker.address.rm2</name>
        <value>bigdata002:8031</value>
    </property>

    <property>
        <name>yarn.resourcemanager.admin.address.rm2</name>
        <value>bigdata002:8033</value>
    </property>

    <property>
        <name>yarn.resourcemanager.ha.admin.address.rm2</name>
        <value>bigdata002:23142</value>
    </property>
</configuration>
```


#### （2）拷贝

将bigdata001的Hadoop⽂件夹拷⻉⾄其余机器上


```bash
 scp -r apache-hadoop-2.7.7/ tomford@bigdata002:/home/tomford/software/
 scp -r apache-hadoop-2.7.7/ tomford@bigdata003:/home/tomford/software/
```

在bigdata002（ResourceManager备⽤节点）服务器上的 `yarn-site.xml` 配置⽂件中做出如下修改

```xml
<property>
    <name>yarn.resourcemanager.ha.id</name>
    <value>rm2</value>
</property>
```

在bigdata003上删除上述配置项

#### （3）配置环境变量

:::info
在此不做过多赘述，以下为本⼈服务器的所有环境变量（/home/tomford/.bashrc）
:::


```bash
# .bashrc
# Source global definitions
if [ -f /etc/bashrc ]; then
. /etc/bashrc
fi
# User specific environment
export
PATH=$PATH:$JAVA_HOME/bin:$SCALA_HOME/bin:$ZOOKEEPER_HOME/bin:$HADOOP_HOM
E/bin:$HADOOP_HOME/sbin:$KAFKA_HOME/bin:$SPARK_HOME/bin:$FLUME_HOME/bin:$
HBASE_HOME/bin:
# Uncomment the following line if you don't like systemctl's auto-paging
feature:
# export SYSTEMD_PAGER=
# User specific aliases and functions
export JAVA_HOME=/home/tomford/software/jdk
export SCALA_HOME=/home/tomford/software/scala
export ZOOKEEPER_HOME=/home/tomford/software/zookeeper
export HADOOP_HOME=/home/tomford/software/hadoop
export KAFKA_HOME=/home/tomford/software/kafka
export SPARK_HOME=/home/tomford/software/spark
export FLUME_HOME=/home/tomford/software/flume
export HBASE_HOME=/home/tomford/software/hbase
```


#### （4）初始化及启动

:::warning
⾄此，Hadoop ⾼可⽤集群已经安装完毕。以下将进⾏初始化操作，必须按照顺序进⾏！
:::


启动JournalNode

```bash
hadoop-daemon.sh start journalnode
```

格式化NameNode

```bash
hdfs namenode -format
```

同步主从NameNode的数据

```bash
hdfs namenode -bootstrapStandby
```

格式化ZKFC

```bash
hdfs zkfc -formatZK
```

启动HDFS集群

```bash
start-dfs.sh
```

启动ZKFC

```bash
#新版：3.X.X
hdfs --daemon start zkfc

#旧版
hadoop-daemon.sh start zkfc
```

### 4. 检验
在浏览器中输⼊分别输⼊ bigdata001:50070 、 bigdata002:50070 检查主从NameNode是否 为正常状态。如下所⽰：
ActiveNameNode：

![bigdata001:50070](./img/ActiveNameNode.png)

StandbyNameNode：

![bigdata002:50070](./img/StandbyNameNode.png)

⾼可⽤测试（将bigdata001上的NameNode杀死，在Web⻚⾯上观察bigdata002的NameNode是否改变状态