// 导入 自定义的request
import request from '@/utils/a3_request'

// 定义文章的接口类型 保持ts严谨性
export interface PostItem{
    userId: number;
    id: number;
    title: string;
    body: string;
}

// 封装一个专门用来获取文章的函数
export const getPostApi = (id:number) => {
    // 然后，直接用封装好的 request 发请求
    return request.get<PostItem>(`/posts/${id}`);
}