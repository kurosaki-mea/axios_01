/*
===========================
|    专门配置axios的       |
===========================
a3_request.ts（网络请求底层配置）
备忘核心：负责抽离公共配置，通过 axios.create 创建独立的网络请求实例，
统一管理基础路径（baseURL）和超时时间。

*/
// ==========================================
// 备忘录：Axios 基础实例封装 (a3_request.ts)
// 作用：统一配置 baseURL 和超时时间，创建独立实例
// ==========================================
// 
import axios from "axios";

// 创建全局唯一的自定义实例
const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // 统一的接口根路径（域名）
    timeout: 5000,  // 超时时间（毫秒），5秒未响应则报错
})

// 导出这个封装好的实例
// 2. 默认导出这个封装好的实例，供 api 层统一调用
export default service;

