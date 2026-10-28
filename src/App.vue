<script setup lang="ts">

import HomeView from './views/HomeView.vue';

// 1. get post delete 页面
import a1_GetPostDel from './views/a1_GetPostDel.vue';
// 2. baseURL
import a2_baseConfig from './views/a2_baseConfig.vue';
import a2_baseConfigCreate from './views/a2_baseConfigCreate.vue';
// 3. 模块化
import a3_Modular from './views/a3_Modular.vue';

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
  </div>
</template>

<style scoped></style>
