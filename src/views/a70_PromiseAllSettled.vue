<!-- 
// 并发请求 Promise.all() 和 Promise.allSettled()
-->
<script setup lang="ts">
import { getPromiseAll, getPromiseAllSettled } from '@/api/a70_post';

// 1. 运行 Promise.all 测试（一荣俱荣，一损俱损）
const runAll = async () => {
    console.log('--- 开始测试 Promise.all ---');
    try {
        const [one, two, three] = await getPromiseAll();
        console.log('成功拿到数据：', { one, two, three });
    } catch (error) {
        console.log('Promise.all 捕获到错误：', error);
    }
};

// 2. 运行 Promise.allSettled 测试（国际邮轮集装箱，各安天命）
const runSettled = async () => {
    console.log('--- 开始测试 Promise.allSettled ---');
    const results = await getPromiseAllSettled();

    console.log('返回的结果大合集：',results)

    results.forEach((box, index) => {
        if (box.status === 'fulfilled') {
            console.log(`第 ${index + 1} 个成功：`, box.value);
        } else {
            console.log(`第 ${index + 1} 个失败：`, box.reason);
        }
    });
};

</script>
<template>
    <div class="box">
        <h2>并发请求测试</h2>

        <!-- 按钮区 -->
        <div class="btns">
            <button @click="runAll">测试 Promise.all</button>
            <button @click="runSettled">测试 Promise.allSettled</button>
        </div>
    </div>

</template>
<style lang="css" scoped></style>

<!-- 
  并发请求

Promise.allSettled()，返回一个对象数组，数组里面是各个对象

results[0]就是第一个，然后内容是：
    {
        status: "fulfilled",
        value: { 我们想要的 请求来的数据内容 }
    }

如果请求失败了，那么里面就是：
    {
        status: "rejected",    // 这个就是失败的
        reason: 失败报错的内容信息
    }




-->