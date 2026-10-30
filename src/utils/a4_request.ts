/*
a4_request.ts（网络请求底层配置）
备忘核心：负责抽离公共配置，通过 axios.create 创建独立的网络请求实例，
统一管理基础路径（baseURL）和超时时间。

*/
// ==========================================
// 升级版：带拦截器的网络请求底座 (a4_request.ts)
// ==========================================
// 
import axios from "axios";

// 1. 创建自定义实例
const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // 统一的接口根路径（域名）
    timeout: 5000,  // 超时时间（毫秒），5秒未响应则报错
})

// 2. 请求拦截器（发请求之前触发）
service.interceptors.request.use(
    (config) => {
        console.log('【拦截器-请求前】准备出发，处理完事就起飞！正在发送请求到：', config.url)
        // 可以在这里统一携带 Token，比如：
        // config.headers.Authorization = 'Bearer token_xxxxxx';
        return config; // 必须返回 config，否则请求发不出去
    },
    (error) => {
        // 请求配置出错时的回调
        console.error('【拦截器-请求错误】', error);
        return Promise.reject(error);
    }
);

// 3. 响应拦截器（收到服务器数据后触发）
service.interceptors.response.use(
    (response) => {
        console.log('【拦截器-响应后】数据安全返回！飞机落地开始处理货物', response);

        // 经典操作：在这里直接把响应的 data 剥离出来
        // 这样组件里拿到的一直接就是核心数据，不用每次都写 res.data 了
        // return response;
        //在响应拦截器里直接做一次“脱壳处理”：
        return response.data;
        // 🌟核心优化：直接把最外层的包装剥掉，只把里面的 data 传给组件
        // 然后 a4_Interceptors.vue 里接收返回数据不用res.data 直接 res 就行
    },(error) => {
        // 服务器响应报错（如 404, 500 等）
        console.log('【拦截器-响应错误】服务器出小差了：',error);
        return Promise.reject(error);
    }
)




// 导出这个封装好的实例
// 4. 默认导出这个封装好的实例，供 api 层统一调用
export default service;

