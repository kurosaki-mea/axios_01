// ==========================================
// 升级版：API 接口文件 (a4_post.ts)
// ==========================================

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