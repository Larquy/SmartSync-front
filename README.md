# SmartSync Front - 智环引诊前端项目

## 项目简介

SmartSync Front 是智环引诊系统的Web前端项目，包含控制中心、患者客户端、数字孪生地图等多个模块。

## 项目结构

```
front/
├── control-center/              # 控制中心 - 医院调度与管理后台
│   ├── html/                    # HTML页面
│   │   ├── index.html           # 首页 - 实时态势监控
│   │   ├── dispatch.html        # 调度管理
│   │   ├── emergency.html       # 紧急情况处理
│   │   ├── analytics.html       # 数据分析报表
│   │   └── settings.html         # 系统设置
│   ├── css/                     # 样式文件
│   │   ├── components/          # 组件化样式
│   │   │   ├── cards/           # 卡片组件
│   │   │   ├── charts/          # 图表组件
│   │   │   ├── lists/           # 列表组件
│   │   │   ├── widgets/         # 小部件组件
│   │   │   ├── common/          # 公共组件
│   │   │   ├── dispatch/        # 调度模块样式
│   │   │   ├── emergency/       # 紧急模块样式
│   │   │   ├── settings/        # 设置模块样式
│   │   │   └── responsive/      # 响应式样式
│   │   ├── index.css            # 首页样式入口
│   │   ├── dispatch.css         # 调度样式入口
│   │   ├── emergency.css        # 紧急样式入口
│   │   ├── analytics.css        # 分析样式入口
│   │   └── settings.css         # 设置样式入口
│   └── js/                      # JavaScript脚本
│       ├── index.js             # 首页逻辑
│       ├── dispatch.js          # 调度逻辑
│       ├── emergency.js        # 紧急逻辑
│       ├── analytics.js         # 分析逻辑
│       └── settings.js         # 设置逻辑
│
├── digital-twin/                 # 数字孪生模块 - 3D医院地图
│   ├── index.html               # 3D地图主页面
│   ├── server.js                # Node.js服务器
│   ├── package.json             # NPM配置
│   ├── js/
│   │   └── twin_scene.js        # Three.js 3D场景核心代码
│   ├── data/
│   │   └── hospital_f1/         # 医院一层数据
│   │       ├── walls.json       # 墙体数据
│   │       ├── wall_segments.json # 墙体线段数据
│   │       ├── departments.json  # 科室数据
│   │       ├── roads.json        # 道路数据
│   │       └── nodes_f1.json     # 导航节点数据
│   └── src/                     # Python数据处理脚本
│       ├── extract_walls.py      # 墙体提取
│       ├── extract_departments.py # 科室提取
│       ├── extract_roads.py       # 道路提取
│       └── process_cad_for_twin.py # CAD数据处理
│
├── patient-client.html          # 患者客户端H5页面
├── sub-station.html             # 子站终端页面
├── package.json                 # 项目根NPM配置
└── vercel.json                  # Vercel部署配置
```

## 核心功能

### 控制中心 (Control Center)

- **实时态势监控** - 院区数字孪生、科室负载监控、患者流量分析
- **柔性动态调度** - 任务优先级抢占、智能分流决策
- **紧急情况处理** - 实时警报管理、患者紧急求助响应
- **数据分析报表** - 就诊趋势、满意度分析、资源利用率
- **系统设置** - 基础配置、通知管理、设备管理

### 数字孪生 (Digital Twin)

- **3D医院地图** - 基于Three.js的交互式3D可视化
- **墙体与科室展示** - 精确还原医院平面布局
- **导航节点** - 支持室内导航路径规划
- **编辑模式** - 支持拖拽、创建、删除地图元素
- **视角控制** - 旋转、缩放、俯视/斜视切换
- **双击聚焦** - 双击对象自动聚焦，双击空白返回默认视角
- **3D可视化增强**:
  - 地板瓷砖纹理效果
  - 墙面纹理与踢脚线装饰
  - 科室门口标记与踢脚线
  - 道路边缘线与斑马线
  - 电梯井与楼梯间3D表示
- **数据持久化** - 支持本地存储和云端同步

### 患者客户端 (Patient Client)

- **预约管理** - 查看预约信息、就诊提醒
- **院内导航** - 实时路径指引、电梯调度
- **诊后服务** - 就诊总结、复诊提醒、健康建议

## 交互说明

### 数字孪生地图交互

| 操作 | 效果 |
|------|------|
| **左键拖动** | 旋转视角 |
| **右键拖动** | 平移场景 |
| **滚轮** | 缩放视图 |
| **双击对象** | 平滑聚焦到该对象 |
| **双击空白** | 平滑返回默认视角 |
| **编辑模式** | 可拖拽、创建、删除元素 |
| **W/A/S/D** | 键盘控制平移 |
| **Q/E** | 键盘控制缩放 |

## 技术栈

| 模块 | 技术 |
|------|------|
| 控制中心 | 原生 HTML5 + CSS3 + JavaScript (ES6+) |
| 数字孪生 | Three.js + WebGL |
| 数据处理 | Python (CAD数据提取) |
| 地图数据 | JSON格式 |
| 服务器 | Node.js + Express |

## 快速开始

### 查看控制中心

```bash
# 直接用浏览器打开
open front/control-center/html/index.html

# 或使用Python服务器
cd front
python -m http.server 8080
# 访问 http://localhost:8080/control-center/html/index.html
```

### 启动数字孪生

```bash
cd front/digital-twin
npm install
node server.js
# 访问 http://localhost:3000/
```

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

### 3D可视化样式

| 元素 | 颜色 | 说明 |
|------|------|------|
| 地板 | `#e8e4df` | 米白色瓷砖纹理 |
| 墙面 | `#f5f0eb` | 淡米色粉刷效果 |
| 踢脚线 | `#8b7355` | 深棕色装饰线 |
| 门口框 | `#5d4e37` | 深棕色门框 |
| 道路 | `#4a4a4a` | 沥青色 |
| 道路标线 | `#ffffff` | 白色边缘线和斑马线 |
| 电梯井 | `#505050` | 深灰色金属质感 |
| 楼梯 | `#6b6b6b` | 深灰色 |

## 部署

### Vercel部署

项目已配置 `vercel.json`，支持一键部署到Vercel：

```bash
npm i -g vercel
vercel
```

### 静态部署

将 `front/` 目录部署到任意Web服务器即可。

## 开发说明

### 组件化CSS架构

CSS采用组件化设计，在 `control-center/css/components/` 目录下按功能分类：

- `cards/` - 卡片类组件
- `charts/` - 图表类组件
- `lists/` - 列表类组件
- `widgets/` - 小部件组件

### 数字孪生开发

3D场景核心代码在 `digital-twin/js/twin_scene.js`，主要类为 `HospitalTwin`，包含以下核心方法：

| 方法 | 功能 |
|------|------|
| `createCamera()` | 创建相机并初始化实例变量 |
| `createScene()` | 创建3D场景 |
| `createWalls()` | 创建墙体（含踢脚线） |
| `createDepartments()` | 创建科室（含门口标记和踢脚线） |
| `createRoads()` | 创建道路（含标线） |
| `createVerticalTransport()` | 创建电梯和楼梯 |
| `focusOnObject()` | 平滑聚焦到指定对象 |
| `resetFocus()` | 重置到默认视角 |
| `saveData()` | 保存场景数据 |
| `saveToLocalStorage()` | 保存到本地存储 |
| `saveToCloud()` | 保存到云端 |

### 数据格式

地图数据使用JSON格式存储在 `digital-twin/data/hospital_f1/` 目录：
- `walls.json` - 墙体位置和尺寸
- `departments.json` - 科室区域
- `roads.json` - 道路信息
- `nodes_f1.json` - 导航节点坐标

## 更新日志

### v1.2.0 (2026-06-10)

**新增功能：**
- ✅ 科室详情浮动卡片 - 点击科室显示跟随位置的详情卡片
- ✅ 医生/病人/排队信息 - 显示科室医生、就诊病人、排队情况、今日统计
- ✅ 自动保存功能 - 每 60 秒自动保存到本地存储
- ✅ 批量选中编辑 - 支持 Ctrl+点击、Shift+框选多选对象
- ✅ 节点信息编辑 - 修改节点名称、类型、拥挤程度、当前人数
- ✅ 保存功能分离 - 分离"保存到本地"和"保存到云端"按钮
- ✅ 3D可视化增强 - 地板瓷砖纹理、墙面纹理、踢脚线、门口标记、道路标线、电梯楼梯

**优化：**
- ✅ 拖动方向修复 - 右键拖动方向与鼠标移动一致
- ✅ 框选功能优化 - Shift+拖动触发框选，不干扰正常旋转操作
- ✅ 普通模式点击科室 - 非编辑模式下也能点击查看科室详情浮动卡片
- ✅ 批量编辑 - 移动、缩放、旋转操作对所有选中对象生效

**修复：**
- ✅ 保存功能 IIFE 语法问题导致云端保存失败
- ✅ CORS 跨域支持
- ✅ 批量编辑只对最后一个选中对象生效的问题
- ✅ 自动保存装饰性元素导致的保存错误

### v1.1.0 (2026-06-07)

**新增功能：**
- ✅ 双击聚焦对象功能 - 双击任意对象平滑聚焦，双击空白返回默认视角
- ✅ 3D可视化增强：
  - 地板瓷砖纹理效果（Canvas程序化生成）
  - 墙面纹理与踢脚线装饰
  - 科室门口标记与底部踢脚线
  - 道路边缘线与斑马线标记
  - 电梯井与楼梯间3D表示

**修复：**
- ✅ 修复保存功能 - 过滤装饰性元素（踢脚线、门口标记）避免保存错误

**优化：**
- ✅ 视图切换改为平滑动画过渡
- ✅ 相机控制变量改为实例属性
- ✅ 使用easeInOutCubic缓动函数实现平滑动画

### v1.0.0 (2026-06-07)
- 新增数字孪生3D地图模块
- 优化控制中心UI组件
- 支持本地存储数据持久化

### 早期版本
- 完成控制中心基础功能
- 实现患者客户端页面
- 组件化CSS架构
- 响应式设计适配

---

**智环引诊** - 云边协同智慧医疗导诊系统