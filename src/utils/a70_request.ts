// 并发请求 Promise.all() 和 Promise.allSettled()

// 第一步：基础底座 (request.ts)
// 负责统一收口和发送请求：

/// src/utils/request.ts
import axios from 'axios';

// 创建独立的 Axios 实例
const request = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // 模拟接口根路径
    timeout: 5000,
});

// 响应拦截器：自动“脱壳”，直接拿到后端返回的数据
request.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;