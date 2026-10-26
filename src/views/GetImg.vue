<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';


// 定义 接口类型
interface PhotoItem {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string
}

// 接收变量
// const UserImage = ref('')
const UserImage = ref<PhotoItem | null>(null)

// 错误消息
const errorMessage = ref<string>('');          // 专管错误提示

const getImg = async () => {
    errorMessage.value = ''; // 每次请求前先清空旧错误
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/photos/1')
        UserImage.value = res.data
    } catch (error) {
        console.error("请求失败:", error)
        errorMessage.value = '加载失败，请稍后重试~'
    }
}

const DelAll = () => {
    UserImage.value = null;
    errorMessage.value = ''
    
}


</script>
<template>
    <h2>getImg</h2>
    <button @click="getImg">GET IMG</button>
    <button @click="DelAll">Del All</button>

    <div>
        <p>{{ UserImage }}</p>
        <!-- 所以，v-if 的本质是在告诉页面：“等数据真正到手了，你再把这块 DOM 渲染出来”。 -->
        <!-- 数据请求回来前显示加载中或不显示，数据回来后才渲染图片 -->
        <!-- 实际开发中常用 v-if 和 ?  -->
        <img v-if="UserImage" :src="UserImage.url">
        <div v-else>图片加载中...</div>
    </div>
</template>
<style scoped></style>