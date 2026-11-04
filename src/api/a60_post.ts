// ==========================================
// 接口文件：a60_post.ts
// ==========================================
// 导入 a60_request.ts 文件
import request from '@/utils/a60_request'

export interface PostItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const getPostLoadingApi = (id: number) => {
    return request.get<PostItem>(`/posts/${id}`) as unknown as Promise<PostItem>;
}