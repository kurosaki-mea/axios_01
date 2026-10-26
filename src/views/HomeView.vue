<script setup>
// 1. 导入 Vue 的响应式工具和生命周期钩子
import { ref, onMounted } from 'vue'

// 导入 axios
// 2. 导入安装的 axios 库
import axios from 'axios'

// 定义一个响应式变量 info
// 对比 AJAX：以前需要用 document.getElementById('xxx').innerHTML = data 来改页面
// 在 Vue 里，只需要修改变量的值，页面就会“自动”更新（响应式）
const info = ref('')

// 3. 定义一个异步函数来发送网络请求
// 对比 AJAX：这里用了现代的 async/await 语法，告别了以前层层嵌套的回调函数，
// 让异步代码看起来就像同步代码一样清晰

const fetchData = async () => {
    try {
        // 发送 GET
        // 说明：Axios 拿到响应后，会自动把 JSON 字符串转成 JS 对象，存在 res.data 里
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1')

        // 请求成功，把获取到的数据（标题）赋值给变量
        info.value = res.data.title
    } catch (error) {
        // 对比 AJAX：相当于以前的 error 回调函数，用来捕获网络错误或服务器异常
        console.error('请求失败：', error)
        info.value = '加载失败，请稍后重试~'
    }
}



// 4. onMounted 钩子：当这个组件在页面上挂载（渲染）完成后，立刻执行的代码
// 对比 AJAX：这就相当于你以前写的 window.onload 或者 jQuery 的 $(document).ready()
// 页面加载时发送请求
onMounted(() => {
    fetchData() // 页面一打开，就自动触发请求
})




</script>

<template>
    <main class="home">
        <h2>欢迎来到 Home 首页</h2>

        <!-- 
        插值表达式 {{ }}
        当上面的 fetchData 成功拿到数据并修改了 info 的值后，
        这里的文字会自动变成从服务器请求回来的标题！
      -->
        <p class="result-box">服务器返回的标题是：{{ info }}</p>
        <hr/>
    </main>
</template>
<style scoped>
.home {
    padding: 20px;
}

.result-box {
    margin-top: 15px;
    color: #42b883;
    /* Vue 的标志性绿色 */
    font-weight: bold;
}
</style>