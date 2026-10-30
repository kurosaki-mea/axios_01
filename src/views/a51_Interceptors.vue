<!-- ========================================== -->
<!-- 升级版：测试拦截器的 Vue 页面 (a4_Interceptors.vue) -->
<!-- ========================================== -->

<script setup lang="ts">
import { ref } from 'vue';
import { getPostApi, type PostItem } from '@/api/a51_post';

const postData = ref<PostItem | null>(null);

const getData = async () => {
    try {
        const res = await getPostApi(1);
        // 注意看控制台日志、会发现请求前和响应后都被拦截器打印了日志
        // 【注意】这里的 res 返回数据已经脱了一层data，
        //        不需要 res.data了，直接 res 就行
        // postData.value = res.data;
        postData.value = res;
        console.log('组件里成功拿到数据：', res);
    } catch (error) {
        console.error('组件获取数据错误：', error)
    }
}


</script>
<template>
    <div style="padding: 20px;">
        <h3>第 4 阶段：错误状态码</h3>
        <p>提示：点击按钮后，打开浏览器控制台 查看拦截器的打印日志</p>
        <button @click="getData">发送带拦截器的请求</button>

        <div v-if="postData" style="margin-top: 10px;">
            <p><strong>标题：</strong>{{ postData.title }}</p>
            <p><strong>内容：</strong>{{ postData.body }}</p>
        </div>
    </div>

</template>