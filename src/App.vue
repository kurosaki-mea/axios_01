<script setup lang="ts">

import HomeView from './views/HomeView.vue';

// 1. get post delete 页面
import a1_GetPostDel from './views/a1_GetPostDel.vue';
// 2. baseURL
import a2_baseConfig from './views/a2_baseConfig.vue';
import a2_baseConfigCreate from './views/a2_baseConfigCreate.vue';
// 3. 模块化
import a3_Modular from './views/a3_Modular.vue';
// 4. 拦截器 interceptors request response
import a4_Interceptors from './views/a4_Interceptors.vue';
// 5. 错误状态码
import a51_Interceptors from './views/a51_Interceptors.vue';
// 5.1 Loading
// 6. 请求取消与防止重复提交
import a60_AbortController from './views/a60_AbortController.vue';

</script>

<template>
  <div id="app">
    <!-- <HomeView /> -->
    <!-- <a1_GetPostDel /> -->
    <hr />
    <a2_baseConfig />
    <a2_baseConfigCreate />
    <hr />
    <a3_Modular />
    <hr />
    <a4_Interceptors />
    <hr />
    <a51_Interceptors />
    <hr />
    <a60_AbortController />
  </div>
</template>

<style scoped></style>
