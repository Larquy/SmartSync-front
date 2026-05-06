# 智环引诊 - 前端项目

## 项目概述

智环引诊是一个基于云边协同架构的智慧医疗导诊系统，为患者提供无感化的就医体验，同时为医院提供实时态势监控和智能调度能力。

## 核心功能

### 1. 控制中心 (Control Center)
- **实时态势监控** - 院区数字孪生、科室负载监控、患者流量分析
- **柔性动态调度** - 任务优先级抢占、智能分流决策
- **紧急情况处理** - 实时警报管理、患者紧急求助响应
- **数据分析报表** - 就诊趋势、满意度分析、资源利用率
- **系统设置** - 基础配置、通知管理、设备管理

### 2. 患者客户端 (Patient Client)
- **预约管理** - 查看预约信息、就诊提醒
- **院内导航** - 实时路径指引、电梯调度
- **诊后服务** - 就诊总结、复诊提醒、健康建议
- **家属关怀** - 实时位置共享、就诊状态通知

### 3. 子站终端 (Sub Station)
- **身份识别** - NFC手环感应、语音交互
- **导航指引** - 动态路径规划、实时导航
- **紧急求助** - 一键呼叫、实时定位

## 技术栈

- **前端框架**: 原生HTML5 + CSS3 + JavaScript (ES6+)
- **样式方案**: 组件化CSS、响应式设计
- **图标方案**: 无图标设计，纯文字界面
- **图表方案**: SVG原生图表

## 文件结构

```
front/
├── control-center/              # 控制中心（云端调度中心）
│   ├── css/                     # 样式文件
│   │   ├── components/          # 组件化样式
│   │   │   ├── cards/           # 卡片组件
│   │   │   │   ├── kpi-card.css
│   │   │   │   └── content-card.css
│   │   │   ├── charts/          # 图表组件
│   │   │   │   ├── line-chart.css
│   │   │   │   ├── bar-chart.css
│   │   │   │   ├── pie-chart.css
│   │   │   │   ├── trend-chart.css
│   │   │   │   └── trend-indicator.css
│   │   │   ├── lists/           # 列表组件
│   │   │   │   ├── alarm-list.css
│   │   │   │   └── dept-load.css
│   │   │   ├── widgets/         # 小部件组件
│   │   │   │   ├── area-twin.css
│   │   │   │   ├── filter-bar.css
│   │   │   │   ├── source-distribution.css
│   │   │   │   └── system-status.css
│   │   │   └── responsive/      # 响应式样式
│   │   │       ├── responsive.css
│   │   │       └── analytics-responsive.css
│   │   ├── common.css           # 公共样式
│   │   ├── index.css            # 首页样式入口
│   │   ├── analytics.css        # 数据分析样式入口
│   │   ├── dispatch.css         # 调度管理样式
│   │   ├── emergency.css        # 紧急情况样式
│   │   └── settings.css         # 系统设置样式
│   ├── html/                    # HTML页面
│   │   ├── index.html           # 首页 - 实时态势监控
│   │   ├── dispatch.html        # 调度管理
│   │   ├── emergency.html       # 紧急情况
│   │   ├── analytics.html       # 数据分析
│   │   └── settings.html        # 系统设置
│   └── js/                      # JavaScript脚本
│       ├── index.js
│       ├── dispatch.js
│       ├── emergency.js
│       ├── analytics.js
│       └── settings.js
├── patient-client.html          # 患者客户端页面
└── sub-station.html             # 子站终端页面
```

## 页面说明

| 页面 | 文件路径 | 功能描述 |
|------|----------|----------|
| 首页 | `control-center/html/index.html` | 实时态势监控大屏 |
| 调度管理 | `control-center/html/dispatch.html` | 任务调度与分流 |
| 紧急情况 | `control-center/html/emergency.html` | 警报管理与处理 |
| 数据分析 | `control-center/html/analytics.html` | 数据报表与分析 |
| 系统设置 | `control-center/html/settings.html` | 系统配置管理 |
| 患者客户端 | `patient-client.html` | 患者端H5页面 |
| 子站终端 | `sub-station.html` | 边缘子站界面 |

## 设计规范

### 配色方案

| 用途 | 颜色 | 说明 |
|------|------|------|
| 主色调 | `#5c7cfa` | 柔和蓝紫色 |
| 成功色 | `#51cf66` | 柔和绿色 |
| 警告色 | `#fcc419` | 柔和黄色 |
| 危险色 | `#ff6b6b` | 柔和红色 |
| 背景色 | `#f8f9fa` | 浅灰背景 |
| 文字色 | `#495057` | 深灰色文字 |

### 卡片样式

- 圆角: 14px
- 阴影: `0 2px 8px rgba(0, 0, 0, 0.04)`
- 边框: `1px solid #f1f3f5`

## 运行方式

### 开发环境

直接使用浏览器打开HTML文件即可运行：

```bash
# 方式1: 使用浏览器直接打开
open front/control-center/html/index.html

# 方式2: 使用本地服务器
python -m http.server 8080
# 访问: http://localhost:8080/front/control-center/html/index.html
```

### 生产部署

1. 将 `front/` 目录部署到Web服务器
2. 配置静态资源服务
3. 确保CSS和JS路径正确

## 响应式设计

系统支持多种设备尺寸：

- **桌面端**: 三列布局，完整功能展示
- **平板端**: 自适应双列布局
- **移动端**: 单列布局，触控友好

## 组件化架构

CSS采用组件化设计，每个组件独立一个文件：

```
components/
├── cards/       # 卡片类组件
├── charts/      # 图表类组件
├── lists/       # 列表类组件
├── widgets/     # 小部件组件
└── responsive/  # 响应式样式
```

## 更新日志

### v1.0.0 (2026-04-30)
- 完成控制中心基础功能
- 实现患者客户端页面
- 实现子站终端页面
- 组件化CSS架构
- 响应式设计适配

## 开发说明

### CSS修改流程

1. 找到对应的组件CSS文件
2. 修改组件样式
3. 刷新浏览器查看效果

### 新增组件流程

1. 在对应分类文件夹创建新CSS文件
2. 在入口CSS文件中添加@import引用
3. 在HTML中使用对应类名

## 注意事项

1. 所有CSS文件使用相对路径引用
2. 保持类名语义化命名
3. 遵循统一的设计规范
4. 响应式样式放在responsive文件夹

---

**智环引诊** - 云边协同智慧医疗导诊系统