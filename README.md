# 🚀 Axios 核心实战与企业级封装备忘录

> 这是一个系统化、渐进式学习 **Axios (Vue 3 + TypeScript)** 的实战演练项目。项目采用阶段编号（`a1` 至 `a70`）的方式，完整覆盖了从最基础的 HTTP 动词请求、实例配置、API 模块化分层，到高阶的请求/响应拦截器、无感全局 Loading 管控、`AbortController` 请求取消/防重、以及 `Promise.allSettled` 并发容错处理的企业级全栈网络层解决方案。

## 📂 项目目录结构全览

项目严格遵循**关注点分离（SoC）**原则，将底层网络实例封装（`utils/`）、业务接口定义（`api/`）与视图交互展示（`views/`）解耦：

```
src/
├── main.ts                              # 应用入口文件
├── App.vue                              # 默认主入口根组件
├── App_a52.vue                          # 挂载全局 Loading 组件的根组件演练版
├── router/index.ts                      # 路由配置，串联各个阶段的学习 Demo 页面
├── stores/counter.ts                    # Pinia 状态管理模块
│
├── utils/                               # 🛠️ Axios 核心实例与高阶机制封装层
│   ├── a3_request.ts                    # [阶段3] 基础 Axios 实例封装 (baseURL, timeout)
│   ├── a4_request.ts                    # [阶段4] 基础请求/响应拦截器封装
│   ├── a51_request.ts                   # [阶段5.1] 业务级拦截器 (Token 注入、统一状态码错误拦截)
│   ├── a52_loading.ts                   # [阶段5.2] 全局 Loading 状态计数与控制管理器
│   ├── a52_request.ts                   # [阶段5.2] 集成自动 Loading 开关的请求拦截器
│   ├── a60_request.ts                   # [阶段6] 集成 AbortController 的请求中断/防重复控制器
│   └── a70_request.ts                   # [阶段7] 面向并发场景的请求实例配置
│
├── api/                                 # 📡 API 接口业务抽象层 (与视图完全解耦)
│   ├── a3_post.ts                       # 模块化 POST/GET 接口定义
│   ├── a4_post.ts                       # 配合基础拦截器的接口定义
│   ├── a51_post.ts                      # 配合业务级拦截器的接口定义
│   ├── a52_post.ts                      # 配合自动化 Loading 拦截器的接口定义
│   ├── a60_post.ts                      # 支持传参/信号取消的接口定义
│   └── a70_post.ts                      # 并发请求接口集合
│
└── views/                               # 🖼️ 阶段性实战演练视图层
    ├── HomeView.vue                     # 项目导航主页
    ├── a1_GetPostDel.vue                # [a1] 基础 GET / POST / DELETE 请求演练
    ├── a2_baseConfig.vue                # [a2] 全局默认配置 (axios.defaults) 演练
    ├── a2_baseConfigCreate.vue          # [a2] 自定义实例创建 (axios.create) 演练
    ├── a3_Modular.vue                   # [a3] API 模块化调用演练 (调用 api/a3_post.ts)
    ├── a4_Interceptors.vue              # [a4] 请求与响应拦截器执行顺序与数据流转演练
    ├── a51_Interceptors.vue             # [a51] 统一鉴权与异常捕获业务演练
    ├── a52_InterceptorsLoading.vue      # [a52] 多请求并发下的无感全局 Loading 演练
    ├── a60_AbortController.vue          # [a60] 手动取消请求 / 自动取消重复请求演练
    └── a70_PromiseAllSettled.vue        # [a70] 多接口并发与局部容错 (allSettled) 演练
```

---

## ⚡ 核心阶段与技术模块逐一详解

### 1. 基础请求与实例隔离 (`a1` ~ `a2`)
* **`a1_GetPostDel.vue`**：掌握 Axios 最基础的请求语法，包括 `GET`（params 传参）、`POST`（data 请求体传参）和 `DELETE` 删除操作，理解异步 `async/await` 处理流程。
* **`a2_baseConfig.vue` vs `a2_baseConfigCreate.vue`**：
  * 对比直接修改全局 `axios.defaults` 与使用工厂方法 `axios.create({ baseURL, timeout })` 创建独立实例的区别。
  * **核心备忘**：在多后端微服务场景下，必须使用 `axios.create()` 隔离不同服务的配置，防止全局污染。

### 2. 工程化分层与 API 模块化 (`a3`)
* **涉及文件**：`utils/a3_request.ts` $\rightarrow$ `api/a3_post.ts` $\rightarrow$ `views/a3_Modular.vue`
* **架构演进**：这是从“写 Demo”迈向“企业级工程”的关键一步。将底层请求实例、具体接口 URL/参数定义、Vue 组件视图渲染彻底拆分。
* **核心优势**：组件内不再出现任何硬编码的 URL 或 `axios` 原始调用；接口变更只需维护 `api/` 目录，配合 TypeScript 泛型实现请求与响应数据的强类型提示。

### 3. 请求与响应拦截器进阶 (`a4` & `a51`)
* **涉及文件**：`utils/a4_request.ts` / `utils/a51_request.ts`、`api/a4_post.ts` / `api/a51_post.ts`、`views/a4_Interceptors.vue` / `views/a51_Interceptors.vue`
* **核心机制**：
  * **请求拦截器 (`interceptors.request`)**：在请求发出前统一拦截，自动从本地存储读取 `Token` 并挂载到 `config.headers.Authorization` 中。
  * **响应拦截器 (`interceptors.response`)**：
    * **数据脱壳**：直接返回 `response.data`，省去业务层每次写 `res.data.data` 的繁琐。
    * **统一错误处理**：集中处理 HTTP 状态码（如 `401` 登录过期跳转、`403` 无权限、`404` 资源不存在、`500` 服务端异常），避免在每个组件的 `try/catch` 中重复写报错弹窗。

### 4. 企业级无感全局 Loading 管控 (`a52`)
* **涉及文件**：`utils/a52_loading.ts`、`utils/a52_request.ts`、`api/a52_post.ts`、`views/a52_InterceptorsLoading.vue`、`App_a52.vue`
* **设计亮点**：
  * 通过独立的 `a52_loading.ts` 维护**并发请求计数器（Request Counter）**。
  * **请求发起时**：计数器 $+1$，当计数器从 $0 \rightarrow 1$ 时开启全局 Loading 遮罩。
  * **请求完成/报错时**：计数器 $-1$，只有当计数器归 $0$（即所有并发请求全部结束）时才关闭 Loading，完美避免多个接口同时请求时 Loading 闪烁或提前关闭的 Bug。

### 5. 高阶网络控制：`AbortController` 请求取消与防重 (`a60`)
* **涉及文件**：`utils/a60_request.ts`、`api/a60_post.ts`、`views/a60_AbortController.vue`
* **解决痛点**：
  1. **手动取消**：用户点击取消按钮或切换路由页面时，主动中断尚未完成的耗时请求（如大文件导出、长列表查询）。
  2. **自动防重复提交**：利用 `Map` 缓存正在进行的请求标识（如 `method + url + params`），当相同请求再次发起时，自动调用 `controller.abort()` 取消前一个未完成的请求（或拦截当前重复请求），防止接口竞态条件（Race Condition）。

### 6. 多接口并发与高容错处理 (`a70`)
* **涉及文件**：`utils/a70_request.ts`、`api/a70_post.ts`、`views/a70_PromiseAllSettled.vue`
* **技术对比**：
  * 传统的 `Promise.all([req1, req2])` 具有“一荣俱荣，一损俱损”的特性，只要有一个接口报错就会直接进入 `catch`，导致整个页面数据渲染失败。
  * 本模块采用 **`Promise.allSettled([req1, req2])`**，无论各个并发接口是 `fulfilled`（成功）还是 `rejected`（失败），都能完整收集所有接口的最终状态，实现“成功模块正常渲染、失败模块局部降级提示”的高可用页面体验。

---

## 🛠️ 快速复习速查表 (Cheat Sheet)

```ts
// 1. 创建独立 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// 2. 拦截器核心骨架
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

service.interceptors.response.use(
  (response) => response.data, // 数据脱壳
  (error) => {
    // 忽略主动取消请求触发的 CanceledError
    if (axios.isCancel(error)) {
      console.log('请求已取消:', error.message);
      return Promise.reject(error);
    }
    // 统一 HTTP 状态码报错处理...
    return Promise.reject(error);
  }
);

// 3. AbortController 取消请求标准写法
const controller = new AbortController();
service.get('/api/data', { signal: controller.signal });
// 需要取消时调用：
controller.abort();
```