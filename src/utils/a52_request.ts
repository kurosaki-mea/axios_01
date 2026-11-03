// ==========================================
// 网络底座模块：a52_request.ts（带自动 Loading 拦截器的 Axios 实例）
// ==========================================

//////   网络底座与自动安检拦截器   //////


import axios from "axios";
// 引入刚刚写好的总控开关
import { startLoading, endLoading } from '@/utils/a52_loading';

// 1. 创建自定义 Axios 实例
const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',    // 统一接口前缀
    timeout: 5000,              // 超时时间（5秒）
});

// 请求拦截器
// 2. 请求拦截器（发车前触发）
service.interceptors.request.use(
    (config) => {
        // 核心：请求刚要发出去的一瞬间，自动开启全局 Loading
        startLoading(); //  1. 发车，计数器+1，显示 Loading
        return config;  // 必须返回 config，否则请求发不出
    },
    (error) => {
        // 请求配置出错时，也必须关闭 Loading 并抛出错误
        endLoading(); //  失败，关闭 Loading
        return Promise.reject(error);
    }
);

// 响应拦截器
// 3. 响应拦截器（收货后触发）
service.interceptors.response.use(
    (response) => {
        // 核心：服务器成功响应，请求落地，自动关闭全局 Loading
        endLoading(); //  2. 成功落地，计数器-1，归零时关闭
        //数据“脱壳”处理：直接返回里面的 data，组件里省得写 res.data
        return response.data;
    },
/*  
    // new Proise 承诺一个

    // 1. 使用 async 开启异步函数，赋予内部使用 await 的能力
    async (response) => {
        // 模拟延迟：利用 Promise 和 setTimeout 暂停 5 秒（5000毫秒）后再继续往下执行
        // 2. 创建一个 5 秒（5000毫秒）的延时任务：
        //    利用 new Promise 承诺一个异步操作，把 resolve（放行函数）交给 setTimeout，
        //    等 5 秒倒计时一到，系统自动执行 resolve() 兑现承诺，结束等待。
        await new Promise(resolve => setTimeout(resolve, 5000))
        // 3.   5 秒延时结束后，继续向下执行后续代码...
        endLoading();
        return response.data; 
    },
*/
    (error) => {
        // 核心：服务器报错（如 404/500）或断网时，也必须关闭 Loading
        endLoading(); //  3. 响应报错，同样关闭 Loading
        return Promise.reject(error);
    }
);

// 默认导出该实例，供 api 层统一调用
export default service;