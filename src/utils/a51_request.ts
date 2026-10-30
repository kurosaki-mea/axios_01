// ==========================================
// 升级版：带全局错误码拦截的网络请求底座 (a51_request.ts)
// ==========================================

import axios from "axios";
// 如果项目里用了 Element Plus，可以引入 ElMessage 做全局弹窗提示
// import { ElMessage } from 'element-plus'; 

const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // baseURL: 'https://jsonplaceholder.typicode.com/123',   // 就会404
    timeout: 4000,
})

// 1. 请求拦截器（发车前）
service.interceptors.request.use(
    (config) => {
        console.log('【拦截器-请求前】准备出发，处理完事就起飞！正在发送请求到：', config.url)
        // 可以在这里统一携带 Token
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        console.error('【拦截器-请求错误】', error);
        return Promise.reject(error);
    }
);

// 2. 响应拦截器（收货后 + 核心错误码处理）
service.interceptors.response.use(
    (response) => {
        console.log('【拦截器-响应后】数据安全返回！飞机落地开始处理货物', response);
        // 经典脱壳：直接返回核心数据，省去一一res.data了
        return response.data;
    },
    (error) => {
        // 🌟核心：统一错误码拦截与处理
        if (error.response) {
            const status = error.response.status;
            
            switch (status) {
                case 401:
                    console.error('【错误 401】登录已过期，或者未登录，请重新登录！');
                    // 然后也可以在这里写：强制跳转到登录页的代码
                    // router.push('/login');
                    break;
                case 403:
                    console.error('【错误 403】对不起，您没有权限访问该资源！');
                    break;
                case 404:
                    console.error('【错误 404】请求的资源路径不存在！');
                    break;
                case 500:
                    console.error('【错误 500】服务器内部开小差了，请稍后再试！');
                    break;
                default:
                    console.error(`【未知错误 ${status}】`, error.message);
            }
        } else {
            // 如果连服务器都连不上（比如断网了、或者请求超时了）
            if (error.code === 'ECONNABORTED') {
                console.error('【超时提醒】请求超时，请检查您的网络！');
            } else {
                console.error('【网络连接失败】请检查网络或后端服务是否正常！');
            }
        }

        return Promise.reject(error);
    }
);

export default service;