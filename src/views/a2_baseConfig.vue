<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'; // 引入axios

// 设置axios根路径 baseURL ;全局配置 特点是全局污染的 很少用 测试用
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.timeout = 5000; // 5秒超时

const resultTitle = ref('');

// 发送请求
const getData = async () => {
    try {
        // 前面完全不用写域名了，直接写 '/posts/1' 即可
        const res = await axios.get('/posts/1')
        resultTitle.value = res.data.title
        console.log('请求成功：', res.data)
    } catch (error) { console.error('请求错误：', error) }
}

</script>
<template>
    <div style="padding: 20px;">
        <h3>第二阶段：baseURL </h3>
        <p>全局：axios.defaults.baseURL = ''; 全局污染的 很少用 测试用</p>
        <button @click="getData">发送请求</button>
        <p v-if="resultTitle">获取到的标题：{{ resultTitle }}</p>
    </div>
</template>