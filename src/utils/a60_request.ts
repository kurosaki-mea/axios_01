// ==========================================
// 纯净版底座：只包含“防止重复提交与请求取消”
// ==========================================
import axios, { type AxiosRequestConfig } from "axios";

// 1. 准备一个“小本本（Map）”，用来记录当前正在路上的所有请求
// Key 是请求的标识（方法 + 路径），Value 是对应的控制器（AbortController）
//// 规定Map的 键Key 为string类型，值Value 为AbortController 实例类型
const pendingMap = new Map<string, AbortController>();

/**
 * 根据请求的 method 和 url 生成一个唯一的 Key
 */
const getPendingKey = (config: AxiosRequestConfig): string => {
    console.log(`【测试】生成的key：`,[config.method, config.url].join('&'))
    return [config.method, config.url].join('&'); // 比如 "get&/users"
};

/**
 * 发车前检查：检查有没有重复请求
 */
const addPending = (config: AxiosRequestConfig) => {
    // 1. 先算出这个新请求的身份证号
    const key = getPendingKey(config);

    // 如果小本本里已经有这个请求了（说明上一个还没回来）
    // 2. 检查小本本：以前有同名的人还在路上吗？
    // 【】这个.has是检查有没有xxx，如果 Map 中存在这个 key，它会返true，反之 false
    if (pendingMap.has(key)) {
        // 如果有，说明用户手速太快，点第二下了！
        const controller = pendingMap.get(key);
        controller?.abort(); // 【关键动作】：直接一刀切断上一个旧请求！
        pendingMap.delete(key); // 从小本本里删掉
    }

    // 3. 为当前这个“新请求”做一个全新的遥控器/控制器
    const controller = new AbortController();
    config.signal = controller.signal; // 绑定到 axios 的配置里；那个config里面就是
    pendingMap.set(key, controller); // 把新请求登记到小本本里
    console.log('查看config：',config)
};

/**
 * 落地后清理：请求完成了（无论成功或失败），从小本本里移除
 */
const removePending = (config: AxiosRequestConfig) => {
    const key = getPendingKey(config);
    // 
    if (pendingMap.has(key)) {
        pendingMap.delete(key);  // 顺利完成了，从小本本上擦掉名字
    }
};

// 创建 axios 实例
const service = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
});

// ==========================================
// 拦截器生效
// ==========================================

// 1. 请求拦截器（发车前）
service.interceptors.request.use(
    (config) => {
        // 核心：每次发请求前，检查并掐断重复的旧请求
        // 只要调用 axios.get()，出门前必须自动过一下这关（检查重复、切断旧的）
        addPending(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. 响应拦截器（收货后）
service.interceptors.response.use(
    (response) => {
        // 核心：请求顺利完成，从小本本注销
        removePending(response.config); // 成功拿到结果回来啦！自动从小本本里清账
        return response.data;
    },
    (error) => {
        // 🌟 重点特例：如果是被我们自己人用 `abort()` 主动取消的请求
        // 核心：如果是被我们自己用 abort() 主动掐断的旧请求
        if (axios.isCancel(error)) {
            console.warn('【旧请求被成功掐断】：', error.message);
            // 此时可以直接返回一个处于“挂起”状态的 Promise，或者直接中断错误抛出
            // 因为这是我们主动取消的，不是真正的服务器错误，
            // 所以返回一个“挂起”的 Promise，让它安静地死掉，不要报错弹窗
            return new Promise(() => {}); 
        }

        // 如果是真正的服务器报错（如 404/500），正常清理并抛出
        // 如果是真正的服务器报错（比如 404 找不到网页），也要老老实实从小本本清账
        if (error.config) {
            removePending(error.config);
        }
        return Promise.reject(error);
    }
);

export default service;