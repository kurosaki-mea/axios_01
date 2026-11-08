// 并发请求 Promise.all() 和 Promise.allSettled()

// ==========================================
// 接口文件：a70_post.ts
// ==========================================
// 导入 a70_request.ts 文件
import request from '@/utils/a70_request'

// 模拟三个独立的接口   API 请求函数
// ==========================================
// 1. 独立的单接口定义（货轮航线）
export const getPostOneApi = () => request.get('/posts/1');
export const getPostTwoApi = () => request.get('/posts/2');
export const getPostThreeApi = () => request.get('/posts=/3');

// ==========================================
// 并发请求：Promise.all() 或者 Promise.allSettled()
// ==========================================

// 方式一：Promise.all 连坐打包版
export const getPromiseAll = async () => {
    try {
        // 组团发车
        const results = await Promise.all([
            getPostOneApi(),
            getPostTwoApi(),
            getPostThreeApi()
        ]);
        return results; // 成功就把数据返回给页面
    } catch (error) {
        console.error('【API层捕捉】Promise.all 翻车，有接口挂了：', error);
        throw error; // 把错误继续抛出去，或者在这里统一处理
    }
};


// 方式二：Promise.allSettled （国际邮轮集装箱 - 性格温和，无需 try...catch）
export const getPromiseAllSettled = async () => {
    // 稳稳返回一整船的集装箱报告，绝不半路报错
    return await Promise.allSettled([
        getPostOneApi(),
        getPostTwoApi(),
        getPostThreeApi()
    ]);
};