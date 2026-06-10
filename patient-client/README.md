# 智环引诊 - 患者客户端

## 项目结构

```
patient-client/
├── index.html              # 重构后的主HTML文件
├── css/                    # 样式文件目录
│   ├── main.css           # 主样式文件(导入所有CSS)
│   ├── base.css           # 基础样式(重置、变量)
│   ├── layout.css         # 布局样式(容器、页面、头部)
│   ├── buttons.css        # 按钮和表单样式
│   ├── cards.css          # 卡片组件样式
│   ├── progress.css       # 进度指示器样式
│   ├── maps.css           # 地图和导航样式
│   ├── queue-chat.css     # 队列和聊天样式
│   ├── emergency-rating.css # 紧急求助和评价样式
│   ├── calendar.css       # 日历样式
│   ├── profile.css        # 个人中心样式
│   ├── animations.css     # 动画效果样式
│   ├── nfc-bind.css       # NFC绑定流程样式
│   ├── task.css           # 任务详情样式
│   └── responsive.css     # 响应式样式
└── js/                     # JavaScript文件目录
    ├── main.js            # 主脚本文件(导入所有JS)
    ├── utils.js           # 工具函数
    ├── interactions.js    # 交互逻辑
    ├── nfc.js             # NFC相关功能
    └── app.js             # 应用初始化
```

## 页面说明

### 1. home - 首次页面
- **功能**: 手环感应引导界面
- **文件**: `index.html` (id="home")
- **依赖**: `animations.css`, `nfc.js`

### 2. nfc-bind - NFC绑定流程
- **功能**: 三步绑定流程引导
- **文件**: `index.html` (id="nfc-bind")
- **依赖**: `nfc-bind.css`, `nfc.js`

### 3. overview - 就诊概览
- **功能**: 患者信息和就诊进度
- **文件**: `index.html` (id="overview")
- **依赖**: `cards.css`, `progress.css`

### 4. task-detail - 当前任务详情
- **功能**: 显示当前任务信息
- **文件**: `index.html` (id="task-detail")
- **依赖**: `task.css`

### 5. navigation - 路线导航
- **功能**: 医院地图导航
- **文件**: `index.html` (id="navigation")
- **依赖**: `maps.css`

### 6. progress - 进度总览
- **功能**: 完整就诊进度
- **文件**: `index.html` (id="progress")
- **依赖**: `progress.css`

### 7. queue - 等待队列
- **功能**: 排队信息显示
- **文件**: `index.html` (id="queue")
- **依赖**: `queue-chat.css`

### 8. chat - 语音咨询
- **功能**: 智能问答系统
- **文件**: `index.html` (id="chat")
- **依赖**: `queue-chat.css`

### 9. emergency - 紧急求助
- **功能**: 紧急求助功能
- **文件**: `index.html` (id="emergency")
- **依赖**: `emergency-rating.css`

### 10. reports - 报告列表
- **功能**: 就诊报告列表
- **文件**: `index.html` (id="reports")
- **依赖**: `cards.css`

### 11. report-detail - 报告详情
- **功能**: 单个报告详细信息
- **文件**: `index.html` (id="report-detail")
- **依赖**: `cards.css`

### 12. reminder - 复诊提醒
- **功能**: 日历和复诊提醒
- **文件**: `index.html` (id="reminder")
- **依赖**: `calendar.css`

### 13. rating - 满意度评价
- **功能**: 星级评分系统
- **文件**: `index.html` (id="rating")
- **依赖**: `emergency-rating.css`, `interactions.js`

### 14. trace - 就诊轨迹
- **功能**: 轨迹地图和统计
- **文件**: `index.html` (id="trace")
- **依赖**: `maps.css`

### 15. family-mode - 家属关怀模式
- **功能**: 家属绑定和关怀
- **文件**: `index.html` (id="family-mode")
- **依赖**: `profile.css`

### 16. profile - 个人中心
- **功能**: 用户信息和菜单
- **文件**: `index.html` (id="profile")
- **依赖**: `profile.css`

### 17. post-visit - 诊后服务
- **功能**: 诊后总结和关怀
- **文件**: `index.html` (id="post-visit")
- **依赖**: `cards.css`, `progress.css`

## 使用方法

### 开发环境
直接在浏览器中打开 `index.html` 文件即可。

### 生产环境
建议使用构建工具(如Webpack、Vite)进行打包优化。

## 核心功能

### 1. 页面切换
使用 `showPage(pageId)` 函数切换页面:
```javascript
showPage('overview'); // 跳转到就诊概览页面
```

### 2. NFC绑定
使用 `simulateNfcBind()` 函数模拟NFC绑定流程:
```javascript
simulateNfcBind(); // 模拟NFC绑定
```

### 3. 语音交互
使用 `toggleVoice()` 函数切换语音交互:
```javascript
toggleVoice(); // 切换语音交互状态
```

### 4. 适老化模式
使用 `toggleSeniorMode()` 函数切换适老化模式:
```javascript
toggleSeniorMode(); // 切换适老化模式
```

### 5. 提示信息
使用 `showTouchHint(message)` 函数显示提示信息:
```javascript
showTouchHint('操作成功'); // 显示提示信息
```

## 样式规范

### CSS变量
项目使用CSS变量管理颜色和尺寸:
```css
--primary-color: #4285f4;     /* 主色调 */
--success-color: #4caf50;     /* 成功色 */
--danger-color: #ea4335;      /* 危险色 */
--text-primary: #333;         /* 主文本色 */
--text-secondary: #666;       /* 次要文本色 */
--bg-primary: #fff;           /* 主背景色 */
--bg-secondary: #f8f9fa;      /* 次要背景色 */
```

### 响应式设计
项目支持三种断点:
- **桌面**: > 480px
- **平板**: ≤ 480px
- **手机**: ≤ 320px

## 浏览器兼容性

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发建议

### 1. 代码规范
- 使用语义化HTML标签
- CSS类名使用kebab-case命名
- JavaScript函数使用camelCase命名

### 2. 性能优化
- 压缩CSS和JS文件
- 使用图片懒加载
- 减少DOM操作

### 3. 可访问性
- 添加ARIA标签
- 支持键盘导航
- 提供高对比度模式

## 更新日志

### v1.0.0 (2026-05-06)
- 完成页面拆分和重构
- 分离CSS和JavaScript
- 添加CSS变量系统
- 优化响应式设计

## 联系方式

如有问题或建议，请联系开发团队。
