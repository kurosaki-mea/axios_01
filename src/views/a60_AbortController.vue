<!-- ========================================== -->
<!-- 测试 请求取消与防止重复提交 (a60_AbortController.vue) -->
<!-- ========================================== -->

<script setup lang="ts">
import { ref } from 'vue';
import { getPostLoadingApi, type PostItem } from '@/api/a60_post';

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
    <h3>a60_InterceptorsLoading</h3>
    <div style="padding: 20px;">
        <h3>第4阶段：请求取消与防止重复提交</h3>
        <button @click="getData" style="padding: 6px 12px; cursor: pointer;">发送测试请求</button>
        <div v-if="postData" style="margin-top: 15px; border: 1px solid #ddd; padding: 15px; border-radius: 6px; background: #f9f9f9;">
            <p><strong>标题：</strong>{{ postData.title }}</p>
            <p><strong>内容：</strong>{{ postData.body }}</p>
        </div>
    </div>
</template>