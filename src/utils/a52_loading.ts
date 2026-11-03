// ==========================================
// 工具模块：a52_loading.ts（全局 Loading 状态控制器）
// ==========================================

//////   总控开关与计数器   /////


import { ref } from 'vue';

// 全局 Loading 状态
// 1. 全局响应式状态：控制 Loading 遮罩的显隐（true 为显示，false 为隐藏）
export const isLoading = ref(false);

// 2. 请求计数器：记录当前正在进行中的网络请求数量
let requestCount = 0;

/**
 * 开启 Loading 的方法
 * 每发起一个请求，计数器就 +1。如果是第一个请求，则立刻把全局 loading 设为 true 开启遮罩
 */
export const startLoading = () => {
    if (requestCount === 0) {
        isLoading.value = true;
    }
    requestCount++;
};

/**
 * 关闭 Loading 的方法
 * 每完成一个请求（无论成功或失败），计数器就 -1。
 * 只有当所有并发请求全部落地（计数器归零或小于0）时，才真正关闭全局 loading 遮罩
 */
export const endLoading = () => {
    requestCount--;
    if (requestCount <= 0) {
        requestCount = 0;
        isLoading.value = false;
    }
};