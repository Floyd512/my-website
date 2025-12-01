---
sidebar_position: 1
title: 常用命令
date: 2025-12-01 17:13:51
tags: [Bigdata,Kafka]
---


```bash
# 查看当前服务器中的所有topic
kafka-topics.sh --bootstrap-server bigdata1:9092 --list

# 创建topic
kafka-topics.sh --bootstrap-server bigdata1:9092 --create --partitions 3 --replication-factor 3 --topic test

# 修改分区数（注意：分区数只能增加，不能减少）
kafka-topics.sh --bootstrap-server bigdata1:9092 --alter --topic first --partitions 3

# 查看主题的详细信息
kafka-topics.sh --bootstrap-server bigdata1:9092 --describe --topic test

# 生产者命令行
kafka-console-producer.sh --bootstrap-server bigdata1:9092 --topic test

# 消费者命令行
kafka-console-consumer.sh --bootstrap-server bigdata1:9092 --topic test --max-messages 10

# 读取全部消息
kafka-console-consumer.sh --bootstrap-server bigdata1:9092 --from-beginning --topic test


# 删除Topic
kafka-topics.sh --bootstrap-server <broker地址>:9092 --delete --topic <topic名称>


# 加压缩
kafka-configs.sh --alter --topic test --bootstrap-server bigdata1:9092 --add-config compression.type=lz4




# APP LOG
kafka-topics.sh --bootstrap-server bigdata1:9092 --create --partitions 3 --replication-factor 3 --topic app_log
kafka-topics.sh --bootstrap-server bigdata1:9092 --describe --topic app_log
kafka-console-consumer.sh --bootstrap-server bigdata1:9092 --topic app_log
kafka-console-consumer.sh --bootstrap-server bigdata1:9092 --from-beginning --topic app_log




# maxwell_test
kafka-topics.sh --bootstrap-server bigdata1:9092 --create --partitions 3 --replication-factor 3 --topic maxwell_test
kafka-topics.sh --bootstrap-server bigdata1:9092 --describe --topic maxwell_test
kafka-console-consumer.sh --bootstrap-server bigdata1:9092 --topic maxwell_test



# 查看某个消费组对某个 topic 的消费情况
kafka-consumer-groups.sh --bootstrap-server 172.16.0.151:9092 --describe --group kafka-to-oss-v2





kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic your-topic-name
```