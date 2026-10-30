// ==========================================
// 升级版：API 接口文件 (a4_post.ts)
// ==========================================
/*

  业务 API 接口服务层 / 数据交互契约层

负责实现关注点分离，将具体业务模块的网络请求进行函数化封装。
同时结合 TypeScript 接口（interface）定义严格的数据契约（DTO/类型约束），
为上层组件提供高内聚、可复用的标准 API 调用方法。

*/


import request from '@/utils/a4_request'

export interface PostItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const getPostApi = (id: number) => {
    return request.get<PostItem>(`/posts/${id}`);
}