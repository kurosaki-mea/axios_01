# axios_01

# Axios 学习项目架构分析与实战总结

本项通过由浅入深、模块化的设计，系统地梳理了 Axios 在前端开发中的核心应用场景与高阶技巧。整体设计思路清晰，逻辑严密，包含了从基础请求到企业级封装的完整演进路线。

---

## 项目目录结构总览

```text
src/
├── api/                    # API 接口统一管理模块
│   ├── a3_post.ts          # 基础模块化接口封装
│   ├── a4_post.ts          # 结合拦截器的接口调用
│   ├── a51_post.ts         # 带业务拦截的接口
│   ├── a52_post.ts         # 带 Loading 态的接口
│   ├── a60_post.ts         # 支持取消请求的接口
│   └── a70_post.ts         # 多接口并发请求封装
├── utils/                  # 网络请求与工具函数封装
│   ├── a3_request.ts       # Axios 实例二次封装基础版
│   ├── a4_request.ts       # 基础拦截器封装 (Request/Response)
│   ├── a51_request.ts      # 结合 Token / 错误处理的高阶拦截器
│   ├── a52_loading.ts      # 全局 Loading 状态管理器
│   ├── a52_request.ts      # 绑定 Loading 逻辑的拦截器
│   ├── a60_request.ts      # 结合 AbortController 的请求控制器
│   └── a70_request.ts      # 并发请求辅助工具
├── views/                  # 视图组件 (对应各阶段学习 demo)
│   ├── a1_GetPostDel.vue   # 基础 CRUD 操作练习
│   ├── a2_baseConfig.vue   # 默认配置与基础参数设置
│   ├── a2_baseConfigCreate.vue # axios.create 实例创建
│   ├── a3_Modular.vue      # API 模块化调用演示
│   ├── a4_Interceptors.vue # 拦截器机制效果展示
│   ├── a51_Interceptors.vue # 实际业务拦截器演练
│   ├── a52_InterceptorsLoading.vue # 自动化 Loading 效果展示
│   ├── a60_AbortController.vue # 取消重复请求/手动作废请求演练
│   └── a70_PromiseAllSettled.vue # 优雅处理多并发请求
```

---

## 各阶段核心知识点解析

### 1. 基础入门阶段 (`a1` - `a2`)
* **核心内容**：
  * **HTTP 动词实践**：掌握 `GET`（查询）、`POST`（提交）、`DELETE`（删除）等基础请求语义。
  * **全局与实例配置**：对比 `axios.defaults` 与 `axios.create()` 的区别。
* **主要收获**：了解如何通过 `axios.create` 针对不同的后端服务（不同 `baseURL` 或 `timeout`）创建独立的请求实例，避免全局污染。

### 2. 模块化与工程化解耦 (`a3`)
* **核心内容**：
  * **视图与逻辑分离**：将组件内的 `axios.get/post` 抽离至 `src/api/` 目录下。
  * **类型定义 (TypeScript)**：为请求参数和返回数据建立接口类型约束。
* **主要收获**：实现接口的可复用性与易维护性。当后端接口路径变更时，只需修改 `api/` 目录下的代码，无需改动 Vue 视图组件。

### 3. 拦截器深度应用 (`a4` - `a52`)
* **核心内容**：
  * **请求拦截器 (Request Interceptor)**：自动为每个请求的 Header 注入 JWT/Token，实现鉴权。
  * **响应拦截器 (Response Interceptor)**：统一剥离 Axios 的 `data` 外壳，直接获取后端业务数据；对 HTTP 状态码（如 `401 Unauthorized`, `403 Forbidden`, `500 Server Error`）实施统一报错拦截。
  * **自动化 Loading 态管理 (`a52`)**：通过全局计数器配合拦截器，实现“有请求发起时自动开启 Loading，所有请求结束时自动关闭 Loading”的无感加载体验。

### 4. 高阶网络控制与并发处理 (`a60` - `a70`)
* **核心内容**：
  * **请求取消机制 (`AbortController`)**：利用现代浏览器 API 中断未完成的 HTTP 请求，解决重复点击造成的冗余请求或组件销毁后的内存泄漏问题。
  * **并发请求管理 (`Promise.allSettled`)**：对比传统的 `Promise.all`（一错即毁），使用 `Promise.allSettled` 可以同时并发多个独立请求，无论成功或失败都能全面拿到最终结果，提升复杂页面的渲染健壮性。

---

## 项目亮点总结

1. **结构递进清晰**：代码采用 `a1` 至 `a70` 的编号命名法，非常适合作为后续项目开发的**技术范例与代码片段库**。
2. **注重实战落地**：涵盖的拦截器统一错误处理、全局 Loading 控制、AbortController 防止重复提交等，均属于前端企业级开发中的核心标准实践。
3. **TypeScript 友好**：全量使用 `.ts` 与 `.vue` 配合，为网络请求搭建了良好的类型安全屏障。

---

## 未来可选扩展方向

* **无感刷新 Token (Silent Token Refresh)**：在响应拦截器捕获 `401` 时，挂起当前请求，异步请求刷新 Token 后再重新发起失败请求。
* **接口数据缓存 (Request Caching)**：针对不变的字典类或下拉框接口，在拦截器层加入内存/LocalStorage 缓存机制。
* **自动重试机制 (Request Retry)**：网络抖动或超时时，自动按配置策略重新尝试发起请求。