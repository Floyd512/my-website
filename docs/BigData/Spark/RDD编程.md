---
sidebar_position: 5
title: RDD编程
date: 2020-12-28 23:44:11
"position": 5
---

# RDD编程

## 前言
在大数据处理领域，Spark 是一个强大且广泛使用的计算框架，而 RDD（Resilient Distributed Dataset）作为 Spark 中最基本的数据抽象，在 Spark 编程里扮演着关键角色。深入理解 RDD 的概念、创建方式、编程 API 以及依赖关系等内容，对于高效运用 Spark 进行数据处理至关重要。

## RDD 简介
### 含义
RDD（Resilient Distributed Dataset）即弹性分布式数据集，是 Spark 中最基础的数据抽象。它具有以下特点：
- **不可变**：一旦 RDD 被创建，其内容就不能被修改，任何对 RDD 的转换操作都会生成一个新的 RDD。
- **可分区**：RDD 中的数据会被划分成多个分区，这些分区可以分布在集群的不同节点上，从而实现并行计算。
- **并行计算**：RDD 中的元素可以在不同的分区上进行并行计算，提高处理效率。
- **数据流模型特点**：RDD 具备自动容错、位置感知性调度和可伸缩性的特性。它还允许用户在执行多个查询时，将工作集显式地缓存在内存中，使得后续查询能够重用工作集，极大地提升了查询速度。

### RDD 的属性
#### 分区列表
RDD 由多个分区组成，每个分区是数据集的一个子集，分区的划分方式决定了数据的并行处理能力。
#### 计算每个分区的函数
每个分区都有对应的计算函数，用于对该分区内的数据进行处理。
#### 对父 RDD 的依赖列表
RDD 之间存在依赖关系，这种依赖关系分为宽依赖和窄依赖，在后续会详细介绍。
#### 可选的分区器
对于键值对 RDD，可以使用分区器来对数据进行分区，例如哈希分区器。
#### 可选的首选位置列表
RDD 可以记录每个分区的首选位置，以便在进行计算时优先将任务调度到数据所在的节点，减少数据传输开销。

## RDD 的创建方式
### 从集合中创建
可以使用 `SparkContext` 的 `parallelize` 方法将一个 Scala 集合转换为 RDD。示例代码如下：
```scala
import org.apache.spark.{SparkConf, SparkContext}

object CreateRDDFromCollection {
  def main(args: Array[String]): Unit = {
    val conf = new SparkConf().setAppName("CreateRDDFromCollection").setMaster("local")
    val sc = new SparkContext(conf)
    val data = List(1, 2, 3, 4, 5)
    val rdd = sc.parallelize(data)
    rdd.collect().foreach(println)
    sc.stop()
  }
}
```
### 从外部数据源创建
可以从多种外部数据源创建 RDD，如文本文件、HDFS 文件、数据库等。以读取文本文件为例：
```scala
import org.apache.spark.{SparkConf, SparkContext}

object CreateRDDFromFile {
  def main(args: Array[String]): Unit = {
    val conf = new SparkConf().setAppName("CreateRDDFromFile").setMaster("local")
    val sc = new SparkContext(conf)
    val rdd = sc.textFile("path/to/your/file.txt")
    rdd.collect().foreach(println)
    sc.stop()
  }
}
```

## RDD 编程 API
### 转换操作（Transformations）
转换操作是指从一个 RDD 生成另一个 RDD 的操作，这些操作是惰性的，即不会立即执行，只有在遇到行动操作时才会触发计算。常见的转换操作有：
- **map**：对 RDD 中的每个元素应用一个函数，返回一个新的 RDD。
```scala
val rdd = sc.parallelize(List(1, 2, 3))
val newRDD = rdd.map(x => x * 2)
```
- **filter**：过滤出满足条件的元素，返回一个新的 RDD。
```scala
val rdd = sc.parallelize(List(1, 2, 3, 4, 5))
val newRDD = rdd.filter(x => x % 2 == 0)
```
- **flatMap**：对 RDD 中的每个元素应用一个函数，然后将结果扁平化，返回一个新的 RDD。
```scala
val rdd = sc.parallelize(List("hello world", "hello spark"))
val newRDD = rdd.flatMap(line => line.split(" "))
```

### 行动操作（Actions）
行动操作是指触发实际计算并返回结果的操作。常见的行动操作有：
- **collect**：将 RDD 中的所有元素收集到驱动程序中并返回一个数组。
```scala
val rdd = sc.parallelize(List(1, 2, 3))
val result = rdd.collect()
```
- **count**：返回 RDD 中元素的数量。
```scala
val rdd = sc.parallelize(List(1, 2, 3))
val count = rdd.count()
```
- **reduce**：对 RDD 中的元素进行聚合操作。
```scala
val rdd = sc.parallelize(List(1, 2, 3))
val sum = rdd.reduce((x, y) => x + y)
```

## RDD 的宽依赖与窄依赖
### 窄依赖
窄依赖是指父 RDD 的每个分区最多被一个子 RDD 的分区使用。这种依赖关系的特点是计算可以在本地进行，不需要进行数据的跨节点传输，例如 `map`、`filter` 等操作产生的依赖就是窄依赖。

### 宽依赖
宽依赖是指父 RDD 的每个分区可能被多个子 RDD 的分区使用。宽依赖在计算时需要进行数据的洗牌（Shuffle）操作，即数据需要在不同节点之间进行传输，这会带来较大的开销，例如 `groupByKey`、`reduceByKey` 等操作产生的依赖就是宽依赖。

理解 RDD 的宽依赖和窄依赖对于优化 Spark 程序的性能非常重要，合理安排操作顺序，减少宽依赖的使用，可以有效提高程序的执行效率。