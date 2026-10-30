/*
===========================
|    的       |
===========================


a3_post.ts（API 接口模块化与类型约束）
备忘核心：业务接口集中管理。将具体的网络请求地址和方法包装成独立函数，
并配合 TypeScript 的 interface 严格约束数据类型。
*/
//
// ==========================================
// 备忘录：文章模块 API 集中管理 (a3_post.ts)
// 作用：统一管理所有文章相关的请求函数，并定义 TS 数据接口
// ==========================================

// 导入 自定义的request
//// 导入前面封装好的自定义 request 实例
import request from '@/utils/a3_request'

// 定义文章的接口类型 保持ts严谨性
// 1. 定义数据接口类型（保证 TS 强类型约束，提升代码提示与安全）
export interface PostItem{
    userId: number;
    id: number;
    title: string;
    body: string;
}

// 封装一个专门用来获取文章的函数
// 2. 封装获取文章的专属函数
// 参数：id（文章编号）
// 返回值：Promise，内部泛型约束了返回数据的类型为 PostItem
export const getPostApi = (id:number) => {
    // 然后，直接用封装好的 request 发请求
    //// 调用封装的 request 发送 GET 请求，拼接动态 id
    return request.get<PostItem>(`/posts/${id}`);
}