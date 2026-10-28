// 
import axios from "axios";

// 创建全局唯一的自定义实例
const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
})

// 导出这个封装好的实例
export default service;

