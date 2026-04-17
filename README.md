# 乐见AA项目说明

## 项目结构

```
├── LeAa-app/          # React前端应用
├── LeAa-server/       # Java后端应用
├── LeAa-web/          # Vue3后端管理系统
└── README.md          # 项目说明
```

## 技术栈

### 前端 (LeAa-app)
- React 18+
- TypeScript
- Vite
- React Router
- Lucide React (图标库)

### 后端 (LeAa-server)
- Java 8+
- Spring Boot 2.7.18
- MyBatis Plus
- MySQL
- Redis

## 快速开始

### 1. 后端服务启动

#### 1.1 数据库准备
- 安装MySQL 5.7+
- 创建数据库 `ruoyi-vue-pro`
- 执行 `LeAa-server/sql/mysql/ruoyi-vue-pro.sql` 创建基础表结构
- 执行 `LeAa-server/sql/mysql/aa-activity.sql` 创建乐见AA相关表结构
- 执行 `LeAa-server/sql/mysql/quartz.sql` 创建定时任务表结构

#### 1.2 配置修改
- 修改 `LeAa-server/yudao-server/src/main/resources/application-dev.yaml` 中的数据库连接信息

#### 1.3 启动服务
```bash
cd LeAa-server
mvn clean package -DskipTests
java -jar yudao-server/target/yudao-server.jar
```

### 2. 前端应用启动

#### 2.1 安装依赖
```bash
cd LeAa-app
yarn install
```

#### 2.2 配置修改
- 复制 `.env.example` 为 `.env`
- 修改 `VITE_API_BASE_URL` 为后端服务地址（默认：http://localhost:8080/api/aa）

#### 2.3 启动应用
```bash
yarn dev
```

## 核心功能

### 1. 活动管理
- 创建活动：支持设置活动类型、预算、人数限制、破冰问题等
- 浏览活动：按距离、时间、兴趣标签筛选
- 报名活动：回答破冰问题并支付保证金
- 活动状态管理：开始、结束、取消活动

### 2. 据点管理
- 创建据点：设置名称、描述、位置、标签等
- 浏览据点：查看据点详情和成员
- 加入/退出据点：管理据点成员

### 3. 结算系统
- 活动结束后创建AA账单
- 自动计算人均费用
- 在线支付功能

### 4. 信用评价系统
- 活动结束后双向互评
- 生成信用标签
- 信用分管理

### 5. 聊天功能
- 活动临时群聊
- 活动开始前24小时自动建群
- 活动结束后48小时自动解散

## API文档

后端API文档可通过以下地址访问：
- Swagger UI: http://localhost:8080/doc.html

## 项目说明

- 本项目是一个基于"AA制"和"互相尊重"原则的高质量、轻负担的同城活动社交平台
- 核心价值是解决年轻人的"原子化孤独"，提供"清爽不油腻"的社交选择
- 目标用户是18-30岁的城市"空巢青年"，包括刚毕业的白领、大学生和"社恐"但渴望社交的人
