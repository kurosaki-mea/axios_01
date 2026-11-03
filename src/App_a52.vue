<!-- ========================================== -->
<!-- 根组件舞台：App_a52.vue（负责渲染全局 Loading 遮罩层） -->
<!-- ========================================== -->



<script setup lang="ts">
// 引入全局 Loading 的响应式开关
import { isLoading } from '@/utils/a52_loading';
// 引入我的测试业务页面组件
import a52_InterceptorsLoading from './views/a52_InterceptorsLoading.vue';


</script>

<template>
  <div id="app">
    <!-- 渲染当前正在测试的业务组件页面 -->
    <a52_InterceptorsLoading/>
    <!-- 路由视图占位 -->
    <router-view />

    <!-- 全局 Loading 遮罩层 -->
    <!-- 全局 Loading 遮罩层：只要 isLoading 为 true，就会全屏显示 -->
    <div v-if="isLoading" class="global-loading-mask">
      <!-- 转圈圈动画小圆环 -->
      <div class="spinner"></div>
      <p>拼命加载中...</p>
    </div>
  </div>
</template>
<!-- 
这些我都能看懂，先写个loading.ts来控制开关和计数器，每请求一次就运行一次或者加一，
如果这个key为false就是关闭这个加载动态图，然后写个request.ts用来创建axios实例，
在这里面引入那个loading开关，在有请求拦截器和响应拦截器的原本基础上，
分别加上一个开启load和关闭load函数方法，这个axios单独的实例就写好了，
也配置好计数器了，
然后在写一个post.ts，里面都是一些请求的接口api，先引入刚刚写好的axios单独的一个实例request文件，
然后export暴露一个函数getapi（），里面写刚刚的实例.get（路径url），
这个api请求接口的“服务器”就写好了，然后我vue文件的a52interceptorsvue文件，
里面正常请求这个getapi(1)函数，和往常的操作一样，甚至可以忘掉loading，
然后把它引入到主app.vue里面<a52inter..../>，然后在appvue里面引入这个isLoading开关，，
然后主要的来了，是实现效果的来了，先vif这个div隐藏起来，如果isLoading是true，
就vif显示这个转圈圈的Loading内容，如果是false就隐藏起来了，这个Loadingdiv的zindex是999999999。

我对这个Loading理解，写的流水账

-->


<style scoped>
/* 全局遮罩背景 */
/* 全屏半透明遮罩背景样式 */
.global-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 9999;  /* 确保层级最高，盖住所有页面内容 */
}

/* 原生 CSS 旋转小圈圈样式 */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite; /* 无限循环旋转动画 */
}

/* 旋转关键帧动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>