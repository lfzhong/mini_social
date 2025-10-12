# Mini Social Website - Global Rules

## 项目概述
这是一个小型社交网站，用户可以注册登录、发布消息，并进行消息的管理。所有用户都可以浏览所有消息内容。

## 功能要求

### 1. 用户系统 (Firebase Authentication)
- **用户注册**: 支持用户通过邮箱和密码注册新账号
- **用户登录**: 支持用户通过邮箱和密码登录系统
- **用户登出**: 支持用户安全退出登录状态
- **权限控制**: 只有登录用户才能发布、编辑、删除自己的消息
- **数据存储**: 使用 Firebase Authentication 管理用户认证信息

### 2. 消息系统 (Firestore)
- **消息结构**: 每条消息包含以下字段
  - 标题 (title)
  - 内容 (content)
  - 发布人 (author)
  - 发布时间 (createdAt)
- **消息展示**: 采用卡片式布局展示所有消息
- **消息管理**: 支持创建、查看、修改、删除消息的 CRUD 操作
- **权限限制**: 用户只能编辑和删除自己发布的消息
- **数据存储**: 使用 Firestore 数据库存储消息数据

### 3. 前端界面设计
- **界面风格**: 使用简单美观的卡片布局
- **消息展示**: 每条消息以卡片形式显示，包含标题、发布人、发布时间、内容
- **实时更新**: 支持实时刷新或页面刷新后可见最新消息
- **响应式设计**: 确保在不同设备上都能良好显示
- **用户体验**: 清晰区分登录状态和权限范围

### 4. 部署与发布
- **代码托管**: 将项目代码上传并托管到 GitHub
- **自动化部署**: 使用 GitHub Actions Workflows 实现自动部署
- **服务器配置**: 使用 Nginx 作为网页服务器提供访问服务
- **域名配置**: 通过 Cloudflare 配置域名解析
- **安全访问**: 启用 HTTPS 加密访问，确保数据传输安全

## 技术架构
- **前端技术**: HTML, CSS, JavaScript (推荐使用 Vue.js 或 React)
- **后端服务**: Firebase (Authentication + Firestore)
- **部署环境**: GitHub Pages 或 VPS/云服务器
- **域名服务**: Cloudflare

## 开发规范
- 遵循 Firebase 最佳实践进行用户认证和数据存储
- 确保前端代码模块化、可维护
- 实现适当的错误处理和用户反馈
- 遵循 Web 安全最佳实践，防止 XSS、CSRF 等攻击
- 确保响应式设计，在移动端和桌面端都能良好运行

## 测试要求
- 验证所有用户认证功能正常工作
- 测试消息的创建、查看、编辑、删除功能
- 检查权限控制是否正确实现
- 验证前端界面在不同设备上的显示效果
- 测试部署流程和自动化部署是否正常

## 项目结构

### 文件夹结构 (React + TypeScript 版本)
```
mini_social/
├── public/
│   ├── index.html
│   ├── _redirects (用于部署)
│   └── ...
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── ui/                    # 通用UI组件
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── auth/                  # 认证相关组件
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── posts/                 # 帖子相关组件
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostForm.tsx
│   │   │   ├── PostList.tsx
│   │   │   └── PostEditModal.tsx
│   │   ├── layout/                # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── common/               # 通用组件
│   │       ├── LoadingSpinner.tsx
│   │       └── ErrorMessage.tsx
│   ├── hooks/                    # 自定义Hooks
│   │   ├── useAuth.ts
│   │   ├── usePosts.ts
│   │   └── useFirebase.ts
│   ├── context/                  # React Context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/                 # 业务逻辑服务
│   │   ├── firebase.ts           # Firebase配置
│   │   ├── authService.ts        # 认证服务
│   │   └── postService.ts        # 帖子服务
│   ├── utils/                    # 工具函数
│   │   ├── dateUtils.ts
│   │   ├── validation.ts
│   │   └── constants.ts
│   ├── types/                    # TypeScript类型定义
│   │   ├── user.ts
│   │   ├── post.ts
│   │   └── index.ts
│   ├── pages/                    # 页面组件
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions 部署配置
├── config/
│   ├── firebase.json
│   └── environment.ts
├── scripts/
│   └── deploy.sh
├── docs/
│   ├── README.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

### Vue.js 版本文件夹结构
```
mini_social_vue/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/                    # 通用UI组件
│   │   ├── auth/                  # 认证组件
│   │   ├── posts/                 # 帖子组件
│   │   └── layout/                # 布局组件
│   ├── composables/               # Composition API hooks
│   ├── services/                  # 服务层
│   ├── types/                     # 类型定义
│   ├── views/                     # 页面视图
│   ├── router/                    # 路由配置
│   ├── App.vue
│   └── main.ts
├── .github/
│   └── workflows/
├── config/
├── docs/
├── .gitignore
├── package.json
└── ...
```

## 开发规范

### 代码规范
- **命名规范**: 使用 PascalCase (组件), camelCase (变量/函数), kebab-case (文件)
- **组件结构**: 每个组件一个文件夹，包含组件文件、样式、测试等
- **状态管理**: 优先使用 React Context/Vue provide-inject 处理全局状态
- **错误处理**: 使用 try/catch 包装异步操作，提供用户友好的错误提示
- **类型安全**: 使用 TypeScript 进行类型检查，避免运行时错误

### Git 工作流
- **分支管理**: main (主分支), develop (开发分支), feature/* (功能分支)
- **提交规范**: 使用 conventional commits 格式
- **代码审查**: 所有 PR 都需要至少一人审查
- **合并策略**: 使用 squash merge 保持历史整洁

### 测试策略
- **单元测试**: 为工具函数和 hooks 编写单元测试
- **集成测试**: 测试组件间交互
- **E2E 测试**: 使用 Cypress 或 Playwright 测试完整用户流程
- **测试覆盖率**: 目标 80% 以上

## 验收标准
- 用户能够成功注册、登录、登出
- 登录用户可以发布新消息
- 用户只能编辑和删除自己的消息
- 所有用户都可以查看所有消息
- 界面美观，卡片布局清晰
- 部署成功，可通过 HTTPS 域名访问
