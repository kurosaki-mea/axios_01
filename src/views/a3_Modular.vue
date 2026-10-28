<!-- 
a3_Modular.vue（组件层调用与页面渲染）
备忘核心：视图与网络请求解耦。
.vue 组件中不再直接引入 axios，也不写长网址，
只需导入对应的 API 函数，实现轻量化调用。
-->
<!-- ========================================== -->
<!-- 备忘录：组件层调用示例 (a3_Modular.vue) -->
<!-- 作用：页面只负责响应用户交互与数据渲染，告别底层 axios 细节 -->
<!-- ========================================== -->


<script setup lang="ts">
import { ref } from 'vue';

//  重点：组件里再也不用引入 axios 了，只需要引入写好的 API 函数
import { getPostApi, type PostItem } from '@/api/a3_post';

// 定义响应式变量，存放请求回来的文章数据（初始值为 null）
const postData = ref<PostItem | null>(null)

// 触发请求的函数
const getData = async () => {
    try {
        // 直接调用 api 函数，传入 id
        // 直接调用封装好的 API 函数，传入 id 参数即可
        const res = await getPostApi(1)
        // 将服务器返回的数据赋值给响应式变量
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