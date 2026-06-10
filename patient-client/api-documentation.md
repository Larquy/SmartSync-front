# 智环引诊患者客户端 - 接口文档

## 一、接口总览

| 模块 | 接口名称 | 方法 | 路径 |
|------|---------|------|------|
| 患者 | 获取患者信息 | GET | `/api/patient/info` |
| 患者 | 更新患者信息 | PUT | `/api/patient/info` |
| 就诊 | 获取就诊概览 | GET | `/api/visit/overview` |
| 就诊 | 获取就诊进度 | GET | `/api/visit/progress` |
| 就诊 | 获取就诊轨迹 | GET | `/api/visit/trace` |
| 报告 | 获取报告列表 | GET | `/api/reports` |
| 报告 | 获取报告详情 | GET | `/api/reports/{id}` |
| 报告 | 下载报告 | GET | `/api/reports/{id}/download` |
| 导航 | 获取导航路线 | GET | `/api/navigation` |
| 紧急 | 发送求助请求 | POST | `/api/emergency` |
| 评价 | 提交评价 | POST | `/api/rating` |
| 家属 | 获取家人状态 | GET | `/api/family/status` |
| 家属 | 绑定家人手环 | POST | `/api/family/bind` |
| NFC | 绑定手环 | POST | `/api/nfc/bind` |
| NFC | 检测手环 | POST | `/api/nfc/detect` |

## 二、接口详情

### 1. 获取患者信息

**路径**: `GET /api/patient/info`

**请求参数**: 无（通过token识别患者）

**成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "id": "P001",
        "name": "王大爷",
        "gender": "男",
        "age": 72,
        "phone": "138****5678",
        "avatar": "W"
    },
    "message": "success"
}
```

### 2. 获取就诊概览

**路径**: `GET /api/visit/overview`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| visitId | string | 是 | 就诊ID |

**成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "visitId": "V20240115001",
        "department": "心内科",
        "room": "3F 心内科诊室",
        "doctor": "张主任医师",
        "visitTime": "14:30",
        "waitingTime": 28,
        "progress": 5,
        "totalSteps": 8
    },
    "message": "success"
}
```

### 3. 获取就诊进度

**路径**: `GET /api/visit/progress`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| visitId | string | 是 | 就诊ID |

**成功响应** (200):
```json
{
    "code": 200,
    "data": [
        {"step": "挂号", "time": "09:00", "status": "completed"},
        {"step": "就诊", "time": "09:30", "status": "completed"},
        {"step": "心电图检查", "time": "进行中", "status": "active"},
        {"step": "血液化验", "time": "待进行", "status": "pending"}
    ],
    "message": "success"
}
```

### 4. 获取报告列表

**路径**: `GET /api/reports`

**请求参数**: 无

**成功响应** (200):
```json
{
    "code": 200,
    "data": [
        {
            "id": "R001",
            "name": "血常规检查",
            "time": "2024-01-15 10:30",
            "status": "completed"
        },
        {
            "id": "R002",
            "name": "心电图检查",
            "time": "2024-01-15 11:00",
            "status": "processing"
        }
    ],
    "message": "success"
}
```

### 5. 获取报告详情

**路径**: `GET /api/reports/{id}`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 报告ID（路径参数） |

**成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "id": "R001",
        "name": "血常规检查",
        "time": "2024-01-15 10:30",
        "items": [
            {"name": "白细胞", "value": "6.5 ×10^9/L", "normal": true},
            {"name": "红细胞", "value": "4.8 ×10^12/L", "normal": true}
        ]
    },
    "message": "success"
}
```

### 6. 获取导航路线

**路径**: `GET /api/navigation`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| from | string | 是 | 起点位置 |
| to | string | 是 | 终点位置 |

**成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "duration": 5,
        "steps": [
            {"step": 1, "instruction": "从当前位置出发", "detail": "门诊楼1层大厅"},
            {"step": 2, "instruction": "乘坐电梯上3楼", "detail": "电梯在走廊尽头左转"},
            {"step": 3, "instruction": "出电梯左转", "detail": "诊室在走廊尽头"}
        ]
    },
    "message": "success"
}
```

### 7. 发送紧急求助

**路径**: `POST /api/emergency`

**请求体**:
```json
{
    "type": "medical",
    "message": "身体不适，需要帮助",
    "location": "门诊楼3层心内科"
}
```

**成功响应** (200):
```json
{
    "code": 200,
    "data": {"helpId": "H20240115001"},
    "message": "已通知医护人员"
}
```

### 8. 提交评价

**路径**: `POST /api/rating`

**请求体**:
```json
{
    "visitId": "V20240115001",
    "stars": 5,
    "comment": "服务很好，医生很耐心"
}
```

**成功响应** (200):
```json
{
    "code": 200,
    "data": {},
    "message": "评价成功"
}
```

### 9. 获取家人状态

**路径**: `GET /api/family/status`

**请求参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| familyId | string | 是 | 家人ID |

**成功响应** (200):
```json
{
    "code": 200,
    "data": {
        "name": "王小明",
        "relationship": "儿子",
        "floor": "3F",
        "waitingTime": 28,
        "progress": 3,
        "totalSteps": 5,
        "status": "online"
    },
    "message": "success"
}
```

### 10. NFC绑定手环

**路径**: `POST /api/nfc/bind`

**请求体**:
```json
{
    "nfcId": "NFC1234567890",
    "patientId": "P001"
}
```

**成功响应** (200):
```json
{
    "code": 200,
    "data": {"nfcId": "NFC1234567890"},
    "message": "绑定成功"
}
```

## 三、错误码说明

| 错误码 | 说明 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未登录或token失效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 四、接口约定

1. **数据格式**: JSON
2. **编码**: UTF-8
3. **认证**: JWT Token（放在请求头 `Authorization: Bearer {token}`）
4. **时间格式**: ISO 8601（如 `2024-01-15T10:30:00`）