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
  // 脱壳后就不能这么写了 res.data 可以这样写，但脱壳后不能
  // return request.get<PostItem>(`/posts/${id}`);
  // 脱壳后，在后面写上 as unknown as Promise<PostItem> 就可以了
  //核心修改：用泛型明确告诉它，这里返回的是 Promise<PostItem>，而不是带 AxiosResponse 的大包
  return request.get<PostItem>(`/posts/${id}`) as unknown as Promise<PostItem>;
}

/* 
      💡 重点注释：双重类型断言 (as unknown as Promise<PostItem>)
      
      为什么这里要加这一长串？
      因为底层的响应拦截器（a4_request.ts）已经做过“脱壳处理”了，
      它直接返回的是 response.data（即纯净的 PostItem 数据），
      而不是 Axios 默认带有一大堆属性（status、headers 等）的原始响应大包。
      
      但是 TypeScript 静态检查并不知道拦截器里干了啥，它依然以为返回的是 AxiosResponse。
      所以这里通过双重断言：
      1. 先用 `as unknown` 把原本的类型“清空”抹除。
      2. 再用 `as Promise<PostItem>` 强行纠正为我们实际脱壳后的干净数据类型。
      这样组件在调用时就再也不会报红线了！
    */