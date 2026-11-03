<!-- ========================================== -->
<!-- 测试全局 Loading 与拦截器的 Vue 页面 (a52_Interceptors.vue) -->
<!-- ========================================== -->

<script setup lang="ts">
import { ref } from 'vue';
import { getPostLoadingApi, type PostItem } from '@/api/a52_post';

const postData = ref<PostItem | null>(null);

const getData = async () => {
    try {
        // 调用走新底座（带全局 Loading）的接口
        const res = await getPostLoadingApi(1);
        postData.value = res;
        console.log('组件里成功拿到脱壳后的数据：', res);
    } catch (error) {
        console.error('组件获取数据错误：', error);
    }
};
</script>

<template>
    <div style="padding: 20px;">
        <h3>第四阶段：Axios 全局 Loading 联动测试</h3>
        <p>提示：点击下方按钮，观察屏幕是否会弹出全屏的<strong>“拼命加载中...”</strong>转圈遮罩</p>
        <button @click="getData" style="padding: 6px 12px; cursor: pointer;">发送带 Loading 的测试请求</button>

        <div v-if="postData" style="margin-top: 15px; border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #f9f9f9;">
            <p><strong>标题：</strong>{{ postData.title }}</p>
            <p><strong>内容：</strong>{{ postData.body }}</p>
        </div>
    </div>
</template>