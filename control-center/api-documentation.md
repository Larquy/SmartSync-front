# 智环引诊云端调度中心 - API接口文档

## 1. 首页接口 (Dashboard)

| API路径 | HTTP方法 | 功能描述 |
|---------|---------|---------|
| `/api/dashboard/kpi` | GET | 获取实时KPI指标（今日就诊人数、当前在院人数、科室利用率、警报数量） |
| `/api/dashboard/dept-load` | GET | 获取科室负载排行 |
| `/api/dashboard/alarms` | GET | 获取紧急求助实时警报列表 |
| `/api/dashboard/source-distribution` | GET | 获取患者来源分布数据 |
| `/api/dashboard/traffic-trend` | GET | 获取24小时流量趋势 |
| `/api/dashboard/system-status` | GET | 获取系统运行状态（子站终端、服务器、设备状态） |

## 2. 调度管理接口 (Dispatch)

| API路径 | HTTP方法 | 功能描述 |
|---------|---------|---------|
| `/api/dispatch/dept-load` | GET | 获取科室实时负载表 |
| `/api/dispatch/task-preemption` | GET | 获取任务优先级抢占机制数据 |
| `/api/dispatch/suggestions` | GET | 获取柔性动态分流决策建议 |
| `/api/dispatch/execute` | POST | 执行分流操作 |
| `/api/dispatch/report` | GET | 导出调度报表 |
| `/api/dispatch/triage/{deptName}` | POST | 科室分流处理 |

## 3. 紧急情况接口 (Emergency)

| API路径 | HTTP方法 | 功能描述 |
|---------|---------|---------|
| `/api/emergency/alarms` | GET | 获取实时警报列表 |
| `/api/emergency/records` | GET | 获取今日处理记录 |
| `/api/emergency/alarm/{alarmId}` | PUT | 处理警报 |
| `/api/emergency/alarm/{alarmId}` | GET | 获取患者详情 |
| `/api/emergency/broadcast` | POST | 发送紧急广播 |
| `/api/emergency/export` | GET | 导出处理记录 |
| `/api/emergency/alarm/{alarmId}/ignore` | PUT | 忽略警报 |
| `/api/emergency/alarm/{alarmId}/postpone` | PUT | 延后处理警报 |
| `/api/emergency/alarm/{alarmId}/close` | PUT | 关闭警报 |
| `/api/emergency/alarm/{alarmId}/maintenance` | POST | 安排设备维护 |

## 4. 数据分析接口 (Analytics)

| API路径 | HTTP方法 | 功能描述 |
|---------|---------|---------|
| `/api/analytics/monthly-trend` | GET | 获取月度就诊趋势 |
| `/api/analytics/dept-ranking` | GET | 获取科室就诊量排行 |
| `/api/analytics/satisfaction` | GET | 获取患者满意度分布 |
| `/api/analytics/detail` | GET | 获取就诊统计详情 |
| `/api/analytics/query` | GET | 条件查询数据（时间范围、报告类型） |
| `/api/analytics/export` | GET | 导出分析报表 |

## 5. 系统设置接口 (Settings)

| API路径 | HTTP方法 | 功能描述 |
|---------|---------|---------|
| `/api/settings` | GET | 获取系统基础设置 |
| `/api/settings` | PUT | 保存系统设置 |
| `/api/settings/defaults` | POST | 恢复默认设置 |
| `/api/settings/substations` | GET | 获取子站终端列表 |
| `/api/settings/substations` | POST | 添加子站终端 |
| `/api/settings/substations/{name}/restart` | POST | 重启子站终端 |
| `/api/settings/substations/{name}` | DELETE | 删除子站终端 |
| `/api/settings/backup` | POST | 立即备份数据 |
| `/api/settings/backup/restore` | POST | 恢复备份数据 |

## 接口通用规范

### 请求格式
- Content-Type: `application/json`

### 成功响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 错误响应格式
```json
{
  "code": 400/500,
  "message": "错误描述"
}
```

## 数据模型参考

### 警报数据结构
```json
{
  "alarmId": "string",
  "time": "string",
  "location": "string",
  "desc": "string",
  "status": "pending/processing/completed",
  "type": "emergency/wheelchair/maintenance"
}
```

### 患者数据结构
```json
{
  "patientId": "string",
  "name": "string",
  "age": "number",
  "gender": "string",
  "dept": "string",
  "location": "string",
  "medicalHistory": "string"
}
```

### 科室负载数据结构
```json
{
  "deptName": "string",
  "queueCount": "number",
  "avgWaitTime": "string",
  "loadStatus": "normal/warning/danger"
}
```