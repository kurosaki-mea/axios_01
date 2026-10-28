<script setup lang="ts">
import { ref } from 'vue';

//  重点：组件里再也不用引入 axios 了，只需要引入写好的 API 函数
import { getPostApi, type PostItem } from '@/api/a3_post';

const postData = ref<PostItem | null>(null)

const getData = async () => {
    try {
        // 直接调用 api 函数，传入 id
        const res = await getPostApi(1)
        postData.value = res.data;
        console.log('模块化请求成功：', res.data)
    } catch (error) { console.error('请求错误：', error) }
}


</script>
<template>
    <div style="padding: 20px;">
        <h3>第二阶段：模块化封装与 API 集中管理</h3>
        <button @click="getData">发送模块化请求</button>
        <div v-if="postData" style="margin-top: 10px;">
            <p><strong>标题：</strong>{{ postData.title }}</p>
            <p><strong>内容：</strong>{{ postData.body }}</p>
        </div>
    </div>

</template>
<style lang="css" scoped></style>