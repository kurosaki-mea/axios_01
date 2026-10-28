<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

// 1. 创建专属于myApi的实例
//    不再污染全局，而是创建一个独立的实例
const myApi = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // 默认url
    timeout: 5000, // 超时
})

const resultTitle = ref('')

const getData = async () => {
    try {
        // 【注意】不在使用axios. 而是myApi.
        const res = await myApi.get('/posts/1');
        resultTitle.value = res.data.title;
        console.log('自定义实例请求成功：', res.data)
    } catch (error) {
        console.log('请求错误：', error)
    }
}

</script>
<template>
    <div style="padding: 20px;">
        <h3>第二阶段：axios.create 自定义实例</h3>
        <p>单独的：axios.create({ baseURL = '' }) </p>
        <button @click="getData">发送专属实例请求</button>
        <p v-if="resultTitle">获取到的标题：{{ resultTitle }}</p>
    </div>
</template>