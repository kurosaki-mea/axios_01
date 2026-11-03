// ==========================================
// 接口文件：a52_post.ts
// ==========================================
import request from '@/utils/a52_request' // 必须引入新底座 a52_request，里面配置了开关

export interface PostItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const getPostLoadingApi = (id: number) => {
    return request.get<PostItem>(`/posts/${id}`) as unknown as Promise<PostItem>;
}