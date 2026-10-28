<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';


// 定义 接口类型 get 用 photos
interface PhotoItem {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string
}
interface PostItem {
    id?:number;  /// 加上 id（因为是服务器返回的，可以用可选属性 ?）
    title: string;
    content: string
}


// 接收变量
// const UserImage = ref('')
const UserImage = ref<PhotoItem | null>(null)
const postResult = ref<PostItem | null>(null) // 存 POST 提交后服务器返回的结果 // 或者定义一个具体的接口
const delResult = ref<any>(null) // 存 delete 提交后服务器返回的结果

// 错误消息
const errorMessage = ref<string>('');          // 专管错误提示

// 1、get请求 请求资源拉取
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
// 2、post 请求
const postImg = async () => {
    try {
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: '这是post请求的标题。',
            content: '这是内容。'
        })
        postResult.value = res.data
        //该资源实际上并未在JSONPlaceholder服务器上创建，但响应被伪造得好像已创建一样。

    } catch (error) { console.error("post请求失败:", error) }
}

// 清空图片
const DelAll = () => {
    UserImage.value = null;
    errorMessage.value = ''
    // JSONPlaceholder服务器端实际上并没有真正删除该资源，但响应被伪造成了已删除的样子。
    // deleteImg()
}

// 3、delete 请求删除服务上的资源
const deleteImg = async () => {
    try {
        const res = await axios.delete('https://jsonplaceholder.typicode.com/photos/1')
        console.log(res.data)
        delResult.value = res.data
        // JSONPlaceholder服务器端实际上并没有真正删除该资源，但响应被伪造成了已删除的样子。
    } catch (error) { console.error('删除失败：', error) }
}



</script>
<template>
    <h1>get、post、delete 请求</h1>
    <!-- get 请求展示区 -->
    <section class="card">
        <h3>1. get 请求（请求数据）</h3>
        <button @click="getImg">发送 get 请求获取资源</button>
        <button @click="DelAll">清空图片</button>
        <p>{{ UserImage }}</p>
        <!-- 所以，v-if 的本质是在告诉页面：“等数据真正到手了，你再把这块 DOM 渲染出来”。 -->
        <!-- 数据请求回来前显示加载中或不显示，数据回来后才渲染图片 -->
        <!-- 实际开发中常用 v-if 和 ?  -->
        <div v-if="UserImage">
            <p>标题：{{ UserImage.title }}</p>
        </div>
        <img v-if="UserImage" :src="UserImage.url">
        <div v-else>请点击按钮获取↑</div>
    </section>
    <!-- post 请求展示区 -->
    <section class="card">
        <h3>2. POST 请求（提交数据）</h3>
        <button @click="postImg">发送 POST 请求提交文章</button>
        <p v-if="postResult" class="success-msg">【返回的数据】：{{ postResult }}</p>
    </section>
    <!-- delete 请求展示区 -->
    <section class="card">
        <h3>3. delete 请求（删除数据）</h3>
        <button @click="deleteImg">del 发送删除请求</button>
        <p v-if="delResult" class="success-msg">【返回的数据】：{{ delResult }}</p>
    </section>
</template>
<style scoped></style>