const pageCache = {};
const defaultPage = 'home';

let currentPageId = null;
let isVoiceActive = false;

function registerPages() {
    pageCache['home'] = document.getElementById('home').outerHTML;
}

function loadPage(pageId) {
    if (pageCache[pageId]) {
        return Promise.resolve(pageCache[pageId]);
    }

    const pages = {
        'nfc-bind': `<div class="page" id="nfc-bind">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('home')">‹</button>
                    <h2 class="header-title">NFC手环绑定</h2>
                </div>
            </div>
            <div class="bind-container">
                <div class="bind-step completed">
                    <div class="step-circle">1</div>
                    <div class="step-line"></div>
                    <div class="step-content">
                        <div class="step-title">身份识别</div>
                        <div class="step-desc">读取身份证信息完成</div>
                        <div class="step-status completed">✓ 已完成</div>
                    </div>
                </div>
                <div class="bind-step active">
                    <div class="step-circle active">2</div>
                    <div class="step-line"></div>
                    <div class="step-content">
                        <div class="step-title">NFC写入</div>
                        <div class="step-desc">将手环靠近感应区</div>
                        <div class="nfc-animation-wrapper">
                            <div class="nfc-write-animation">
                                <div class="write-ring"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bind-step">
                    <div class="step-circle">3</div>
                    <div class="step-content">
                        <div class="step-title">绑定完成</div>
                        <div class="step-desc">等待写入确认</div>
                    </div>
                </div>
            </div>
            <div class="bind-tips">
                <div class="tip-item">
                    <span class="tip-icon">💡</span>
                    <span class="tip-text">请将纸质手环贴紧感应区域</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">⏱️</span>
                    <span class="tip-text">等待3秒即可完成绑定</span>
                </div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-primary btn-block" onclick="simulateNfcBind()">模拟写入</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'overview': `<div class="page" id="overview">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('home')">‹</button>
                    <h2 class="header-title">就诊概览</h2>
                </div>
                <div class="header-right">
                    <span class="header-badge">今日已完成 5/8 项</span>
                </div>
            </div>
            <div class="patient-card">
                <div class="patient-avatar-wrapper">
                    <div class="patient-avatar">王</div>
                    <div class="avatar-badge"></div>
                </div>
                <div class="patient-info">
                    <h3 class="patient-name">王大爷</h3>
                    <p class="patient-detail">ID: #8102 | 男 | 72岁</p>
                </div>
            </div>
            <div class="appointment-card">
                <div class="appointment-header">
                    <div class="appointment-department">心内科诊室</div>
                    <div class="appointment-floor">3F 心内科</div>
                </div>
                <div class="appointment-body">
                    <div class="appointment-row"><span class="label">就诊时间</span><span class="value">14:30</span></div>
                    <div class="appointment-row"><span class="label">预计等待</span><span class="value highlight">28分钟</span></div>
                </div>
                <button class="btn btn-primary btn-block" onclick="showPage('task-detail')">查看下一步任务</button>
                <div class="appointment-actions">
                    <button class="action-btn" onclick="showPage('chat')"><span class="action-icon">💬</span><span>咨询</span></button>
                    <button class="action-btn" onclick="showPage('emergency')"><span class="action-icon">⚠️</span><span>求助</span></button>
                </div>
            </div>
            <div class="section">
                <h3 class="section-title">就诊进度</h3>
                <div class="progress-timeline">
                    <div class="progress-item completed"><div class="progress-dot"></div><div class="progress-line"></div><div class="progress-info"><div class="progress-title">挂号</div><div class="progress-time">09:00</div></div></div>
                    <div class="progress-item completed"><div class="progress-dot"></div><div class="progress-line"></div><div class="progress-info"><div class="progress-title">就诊</div><div class="progress-time">09:30</div></div></div>
                    <div class="progress-item completed"><div class="progress-dot"></div><div class="progress-line"></div><div class="progress-info"><div class="progress-title">检查</div><div class="progress-time">10:15</div></div></div>
                    <div class="progress-item active"><div class="progress-dot"></div><div class="progress-line"></div><div class="progress-info"><div class="progress-title">心电图检查</div><div class="progress-time">进行中</div></div></div>
                    <div class="progress-item pending"><div class="progress-dot"></div><div class="progress-line"></div><div class="progress-info"><div class="progress-title">血液化验</div><div class="progress-time">待进行</div></div></div>
                    <div class="progress-item pending"><div class="progress-dot"></div><div class="progress-info"><div class="progress-title">影像检查</div><div class="progress-time">待进行</div></div></div>
                </div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'task-detail': `<div class="page" id="task-detail">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">当前任务</h2>
                </div>
                <div class="header-right"><span class="task-progress">2/8</span></div>
            </div>
            <div class="task-card">
                <div class="task-header">
                    <div class="task-icon">📊</div>
                    <div class="task-meta">
                        <div class="task-department">心电图检查</div>
                        <div class="task-location">3F 心电图室</div>
                    </div>
                </div>
                <div class="task-info">
                    <div class="info-item"><span class="info-label">预计等待</span><span class="info-value">15分钟</span></div>
                </div>
                <div class="direction-section">
                    <div class="direction-header"><span class="direction-title">导航指引</span></div>
                    <div class="direction-content">
                        <div class="direction-arrow">↑</div>
                        <div class="direction-text">直行30米右转</div>
                        <div class="direction-sub">前方电梯上3楼</div>
                    </div>
                </div>
                <button class="btn btn-primary btn-block" onclick="showPage('navigation')">查看路线</button>
            </div>
            <div class="tips-card">
                <div class="tips-header"><span class="tips-icon">💡</span><span class="tips-title">温馨提示</span></div>
                <div class="tips-content">
                    <p>检查前请保持安静休息5分钟</p>
                    <p>请穿着宽松衣物，便于检查</p>
                    <p>检查过程约需10-15分钟</p>
                </div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'navigation': `<div class="page" id="navigation">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('task-detail')">‹</button>
                    <h2 class="header-title">路线导航</h2>
                </div>
                <div class="header-right"><span class="nav-target">心电图室</span></div>
            </div>
            <div class="map-container">
                <div class="map-header"><span class="map-floor">3F</span><span class="map-title">心电图室</span></div>
                <div class="map-content">
                    <div style="background: #f5f7fa; height: 180px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                        <div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 8px;">🗺️</div><div style="color: #8f959e;">地图区域</div></div>
                    </div>
                </div>
                <div class="map-legend">
                    <div class="legend-item"><span class="legend-dot current"></span><span class="legend-text">当前位置</span></div>
                    <div class="legend-item"><span class="legend-dot destination"></span><span class="legend-text">目的地</span></div>
                </div>
            </div>
            <div class="route-info">
                <div class="route-summary">
                    <div class="route-stat"><span class="stat-value">120米</span><span class="stat-label">全程距离</span></div>
                    <div class="route-stat"><span class="stat-value">2分钟</span><span class="stat-label">预计时间</span></div>
                    <div class="route-stat"><span class="stat-value">1</span><span class="stat-label">途经电梯</span></div>
                </div>
            </div>
            <div class="direction-list">
                <div class="direction-item"><div class="direction-step">1</div><div class="direction-info"><div class="direction-main">直行30米</div><div class="direction-sub">沿走廊直行</div></div></div>
                <div class="direction-item"><div class="direction-step">2</div><div class="direction-info"><div class="direction-main">右转</div><div class="direction-sub">前方电梯</div></div></div>
                <div class="direction-item"><div class="direction-step">3</div><div class="direction-info"><div class="direction-main">乘坐电梯上3楼</div><div class="direction-sub">出电梯后左转</div></div></div>
                <div class="direction-item"><div class="direction-step">4</div><div class="direction-info"><div class="direction-main">到达目的地</div><div class="direction-sub">心电图室</div></div></div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-primary btn-block" onclick="showPage('progress')">到达目的地</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'progress': `<div class="page" id="progress">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('navigation')">‹</button>
                    <h2 class="header-title">就诊进度</h2>
                </div>
            </div>
            <div class="progress-header">
                <div class="progress-title">就诊进度</div>
                <div class="progress-percent">62.5%</div>
            </div>
            <div class="progress-bar-large"><div class="progress-fill" style="width: 62.5%;"></div></div>
            <div class="progress-stats">
                <div class="stat-card"><div class="stat-value completed">5</div><div class="stat-label">已完成</div></div>
                <div class="stat-card active"><div class="stat-value">1</div><div class="stat-label">进行中</div></div>
                <div class="stat-card"><div class="stat-value pending">2</div><div class="stat-label">待完成</div></div>
            </div>
            <div class="progress-list">
                <div class="progress-item completed"><div class="progress-icon">✅</div><div class="progress-content"><div class="progress-title">挂号建档</div><div class="progress-time">09:00 已完成</div></div><div class="progress-status">已完成</div></div>
                <div class="progress-item completed"><div class="progress-icon">✅</div><div class="progress-content"><div class="progress-title">医生问诊</div><div class="progress-time">09:30 已完成</div></div><div class="progress-status">已完成</div></div>
                <div class="progress-item completed"><div class="progress-icon">✅</div><div class="progress-content"><div class="progress-title">心电图检查</div><div class="progress-time">10:15 已完成</div></div><div class="progress-status">已完成</div></div>
                <div class="progress-item active"><div class="progress-icon">🔄</div><div class="progress-content"><div class="progress-title">血液化验</div><div class="progress-time">进行中</div></div><div class="progress-status active-text">进行中</div></div>
                <div class="progress-item pending"><div class="progress-icon">○</div><div class="progress-content"><div class="progress-title">影像检查</div><div class="progress-time">待进行</div></div><div class="progress-status pending-text">待进行</div></div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-primary btn-block" onclick="showPage('queue')">查看当前队列</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'queue': `<div class="page" id="queue">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('progress')">‹</button>
                    <h2 class="header-title">心电图检查 (3F)</h2>
                </div>
            </div>
            <div class="queue-card">
                <div class="queue-header"><span class="queue-label">当前排队</span></div>
                <div class="queue-number-wrapper"><span class="queue-number">第12号</span></div>
                <div class="queue-info"><span class="queue-wait">预计等待 15分钟</span></div>
            </div>
            <div class="queue-stats">
                <div class="queue-stat"><div class="stat-value">11人</div><div class="stat-label">前面等待人数</div></div>
                <div class="queue-stat"><div class="stat-value">1.5分钟</div><div class="stat-label">平均就诊时长</div></div>
            </div>
            <div class="section">
                <h3 class="section-title">排队提醒</h3>
                <div class="reminder-card">
                    <div class="reminder-icon">🔔</div>
                    <div class="reminder-content">
                        <div class="reminder-title">轮到您时将提醒</div>
                        <div class="reminder-desc">您可以在休息区等待，我们会通过语音和震动提醒您</div>
                    </div>
                </div>
            </div>
            <div class="section">
                <h3 class="section-title">当前进度</h3>
                <div class="current-progress">
                    <div class="progress-item"><span class="progress-number">8号</span><span class="progress-status">就诊中</span></div>
                    <div class="progress-item"><span class="progress-number">9号</span><span class="progress-status">准备中</span></div>
                    <div class="progress-item"><span class="progress-number">10号</span><span class="progress-status">等待中</span></div>
                    <div class="progress-item"><span class="progress-number">11号</span><span class="progress-status">等待中</span></div>
                    <div class="progress-item current"><span class="progress-number">12号</span><span class="progress-status">您</span></div>
                </div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-primary btn-block" onclick="showPage('chat')">语音咨询</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'chat': `<div class="page" id="chat">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('queue')">‹</button>
                    <h2 class="header-title">语音咨询</h2>
                </div>
            </div>
            <div class="chat-container">
                <div class="message-list">
                    <div class="message system"><div class="message-content">您好！我是智环引诊助手，有什么可以帮助您的吗？</div></div>
                    <div class="message user"><div class="message-content">洗手间在哪里？</div></div>
                    <div class="message system"><div class="message-content">洗手间在走廊尽头右转，大约50米处。</div></div>
                </div>
                <div class="input-area">
                    <button class="voice-input-btn" onclick="toggleVoiceInput()"><span class="voice-icon">🎤</span></button>
                    <input type="text" class="chat-input" placeholder="请输入您的问题...">
                    <button class="send-btn">发送</button>
                </div>
            </div>
            <div class="quick-questions">
                <h3 class="quick-title">快捷问题</h3>
                <div class="quick-list">
                    <button class="quick-item" onclick="addQuickQuestion('检查报告什么时候出来？')">检查报告什么时候出来？</button>
                    <button class="quick-item" onclick="addQuickQuestion('医生什么时候上班？')">医生什么时候上班？</button>
                    <button class="quick-item" onclick="addQuickQuestion('哪里可以吃饭？')">哪里可以吃饭？</button>
                    <button class="quick-item" onclick="addQuickQuestion('如何办理住院？')">如何办理住院？</button>
                </div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-secondary btn-block" onclick="showPage('emergency')">紧急求助</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'emergency': `<div class="page" id="emergency">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('chat')">‹</button>
                    <h2 class="header-title">紧急求助</h2>
                </div>
            </div>
            <div class="emergency-container">
                <div class="emergency-icon-wrapper">
                    <div class="emergency-icon">SOS</div>
                    <div class="emergency-ring"></div>
                </div>
                <h2 class="emergency-title">紧急求助</h2>
                <p class="emergency-desc">如需帮助，请立即呼叫医护人员</p>
                <p class="emergency-hint">求助将优先通知最近的医护人员</p>
                <button class="btn btn-danger btn-large" onclick="confirmEmergency()">确认求助</button>
                <div style="padding: 16px;">
                    <button class="btn btn-secondary btn-block" onclick="showPage('chat')">取消</button>
                </div>
            </div>
            <div class="emergency-info">
                <div class="info-card"><div class="info-icon">📍</div><div class="info-content"><div class="info-title">当前位置</div><div class="info-desc">3楼 心电图室门口</div></div></div>
                <div class="info-card"><div class="info-icon">⏱️</div><div class="info-content"><div class="info-title">预计到达时间</div><div class="info-desc">医护人员将在2分钟内到达</div></div></div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item active" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'reports': `<div class="page" id="reports">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">就诊报告</h2>
                </div>
            </div>
            <div class="report-card" onclick="showPage('report-detail')">
                <div class="report-header">
                    <div class="report-icon">📊</div>
                    <div class="report-info"><div class="report-title">心电图检查报告</div><div class="report-date">2026-04-18 09:45</div></div>
                    <div class="report-status normal">正常</div>
                </div>
                <div class="report-preview"><p>窦性心律，心率未见明显异常...</p></div>
                <div class="report-footer"><span class="report-action">查看详情</span><span class="report-arrow">›</span></div>
            </div>
            <div class="report-card">
                <div class="report-header">
                    <div class="report-icon">🧪</div>
                    <div class="report-info"><div class="report-title">血液化验报告</div><div class="report-date">2026-04-17 14:30</div></div>
                    <div class="report-status completed">已出结果</div>
                </div>
                <div class="report-preview"><p>各项指标基本正常...</p></div>
                <div class="report-footer"><span class="report-action">查看详情</span><span class="report-arrow">›</span></div>
            </div>
            <div class="report-card">
                <div class="report-header">
                    <div class="report-icon">🩻</div>
                    <div class="report-info"><div class="report-title">影像检查报告</div><div class="report-date">2026-04-16 10:15</div></div>
                    <div class="report-status completed">已出结果</div>
                </div>
                <div class="report-preview"><p>胸部CT检查未见明显异常...</p></div>
                <div class="report-footer"><span class="report-action">查看详情</span><span class="report-arrow">›</span></div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item active" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'report-detail': `<div class="page" id="report-detail">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('reports')">‹</button>
                    <h2 class="header-title">心电图检查报告</h2>
                </div>
                <div class="report-status-badge normal">正常</div>
            </div>
            <div class="report-detail-card">
                <div class="report-header"><div class="report-title">心电图检查报告</div><div class="report-date">2026-04-18 09:45</div></div>
                <div class="report-section">
                    <h3 class="section-title">检查结论</h3>
                    <div class="section-content"><p>窦性心律，心电图未见明显异常。</p></div>
                </div>
                <div class="report-section">
                    <h3 class="section-title">关键指标</h3>
                    <div class="indicators">
                        <div class="indicator-item"><div class="indicator-label">心率</div><div class="indicator-value">78次/分</div><div class="indicator-range">(60-100次/分)</div></div>
                        <div class="indicator-item"><div class="indicator-label">P-R间期</div><div class="indicator-value">160ms</div><div class="indicator-range">(120-200ms)</div></div>
                    </div>
                </div>
                <div class="report-section">
                    <h3 class="section-title">医生建议</h3>
                    <div class="section-content">
                        <ul>
                            <li>保持规律作息，避免过度劳累</li>
                            <li>低盐饮食，控制血压</li>
                            <li>定期监测心率变化</li>
                        </ul>
                    </div>
                </div>
                <div class="report-footer">
                    <button class="btn btn-primary" onclick="downloadReport()">下载报告</button>
                    <button class="btn btn-secondary" onclick="shareReport()">分享报告</button>
                </div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item active" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'reminder': `<div class="page" id="reminder">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">复诊提醒</h2>
                </div>
            </div>
            <div class="reminder-card" style="text-align: center;">
                <div class="reminder-icon">📅</div>
                <div class="reminder-title">下次复诊时间</div>
                <div class="reminder-date">2026-05-03 (周六) 09:30</div>
                <div class="reminder-details">
                    <div class="detail-item"><span class="detail-label">科室</span><span class="detail-value">心内科</span></div>
                    <div class="detail-item"><span class="detail-label">医生</span><span class="detail-value">王医生</span></div>
                    <div class="detail-item"><span class="detail-label">诊室</span><span class="detail-value">3楼-302</span></div>
                </div>
                <button class="btn btn-primary btn-block" onclick="addToCalendar()">添加到日历</button>
            </div>
            <div class="reminder-tips">
                <h3 class="tips-title">复诊提醒</h3>
                <div class="tips-content">
                    <p>📌 请携带上次就诊的病历本和检查报告</p>
                    <p>⏰ 建议提前30分钟到达医院</p>
                    <p>💊 请按时服用药物</p>
                </div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item active" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'rating': `<div class="page" id="rating">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">满意度评价</h2>
                </div>
            </div>
            <div class="rating-card">
                <div class="rating-title">本次就诊体验如何？</div>
                <div class="stars-section">
                    <div class="stars">
                        <span class="star active" onclick="setRating(1)">★</span>
                        <span class="star active" onclick="setRating(2)">★</span>
                        <span class="star active" onclick="setRating(3)">★</span>
                        <span class="star active" onclick="setRating(4)">★</span>
                        <span class="star" onclick="setRating(5)">★</span>
                    </div>
                    <div class="rating-text">非常满意</div>
                </div>
                <div class="options-section">
                    <button class="option-btn active">非常满意</button>
                    <button class="option-btn">满意</button>
                    <button class="option-btn">一般</button>
                    <button class="option-btn">不满意</button>
                </div>
                <div class="comment-section">
                    <textarea class="comment-input" placeholder="请输入您的意见或建议（选填）"></textarea>
                </div>
                <button class="btn btn-primary btn-block" onclick="submitRating()">提交评价</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'trace': `<div class="page" id="trace">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">就诊轨迹</h2>
                </div>
                <div class="header-right"><span class="trace-date">2026-04-18</span></div>
            </div>
            <div class="trace-map-container">
                <div style="background: #f5f7fa; height: 200px; display: flex; align-items: center; justify-content: center; border-radius: 12px;">
                    <div style="text-align: center;"><div style="font-size: 48px; margin-bottom: 8px;">🗺️</div><div style="color: #8f959e;">轨迹地图区域</div></div>
                </div>
            </div>
            <div class="trace-stats">
                <div class="trace-stat"><div class="stat-value">1.2 km</div><div class="stat-label">步行距离</div></div>
                <div class="trace-stat"><div class="stat-value">8个</div><div class="stat-label">途经节点</div></div>
                <div class="trace-stat"><div class="stat-value">4h 10m</div><div class="stat-label">总耗时</div></div>
            </div>
            <div class="timeline-section">
                <h3 class="section-title">就诊时间线</h3>
                <div class="timeline">
                    <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-line"></div><div class="timeline-content"><div class="timeline-time">09:00</div><div class="timeline-title">入院登记</div><div class="timeline-location">门诊楼A入口</div></div></div>
                    <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-line"></div><div class="timeline-content"><div class="timeline-time">09:35</div><div class="timeline-title">心内科候诊</div><div class="timeline-location">等待时间: 25分钟</div></div></div>
                    <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-line"></div><div class="timeline-content"><div class="timeline-time">10:00</div><div class="timeline-title">心电图检查</div><div class="timeline-location">医技楼2层</div></div></div>
                    <div class="timeline-item last"><div class="timeline-dot completed"></div><div class="timeline-content"><div class="timeline-time">11:15</div><div class="timeline-title">取药离院</div><div class="timeline-location">药房</div></div></div>
                </div>
            </div>
            <div style="padding: 16px;">
                <button class="btn btn-primary btn-block" onclick="showPage('overview')">重新规划</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'family-mode': `<div class="page" id="family-mode">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">家属关怀模式</h2>
                </div>
            </div>
            <div class="mode-card">
                <div class="mode-header"><div class="mode-icon">👨‍👩‍👧</div><div class="mode-title">关怀模式设置</div></div>
                <div class="mode-item">
                    <div class="mode-info"><div class="mode-name">快捷模式</div><div class="mode-desc">简化操作流程，一键完成常用功能</div></div>
                    <div class="toggle-wrapper"><label class="toggle-switch"><input type="checkbox" checked><span class="toggle-slider"></span></label></div>
                </div>
                <div class="mode-item">
                    <div class="mode-info"><div class="mode-name">关怀模式（需绑定）</div><div class="mode-desc">家属可查看就诊进度和位置信息</div></div>
                    <div class="toggle-wrapper"><label class="toggle-switch"><input type="checkbox"><span class="toggle-slider"></span></label></div>
                </div>
            </div>
            <div class="bind-section">
                <h3 class="section-title">绑定家人手环</h3>
                <div class="bind-desc">为家人绑定手环后，您可以实时查看他们的就诊进度和位置信息。</div>
                <div class="family-list">
                    <div class="family-item"><div class="family-avatar">👨</div><div class="family-info"><div class="family-name">王小明</div><div class="family-relation">儿子 · 138****5678</div></div><div class="family-status connected">已关联</div></div>
                </div>
                <button class="btn btn-primary btn-block" onclick="bindFamily()">绑定手环</button>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`,

        'profile': `<div class="page" id="profile">
            <div class="header">
                <div class="header-left">
                    <button class="back-btn" onclick="showPage('overview')">‹</button>
                    <h2 class="header-title">个人中心</h2>
                </div>
            </div>
            <div class="profile-card">
                <div class="profile-avatar-wrapper"><div class="profile-avatar">王</div><div class="avatar-status"></div></div>
                <div class="profile-info"><h3 class="profile-name">王大爷</h3><p class="profile-id">ID: #8102 | 72岁</p></div>
            </div>
            <div class="menu-section">
                <button class="menu-item" onclick="showPage('reports')"><span class="menu-icon">📋</span><span class="menu-text">就诊报告</span><span class="menu-arrow">›</span></button>
                <button class="menu-item" onclick="showPage('reminder')"><span class="menu-icon">📅</span><span class="menu-text">复诊提醒</span><span class="menu-arrow">›</span></button>
                <button class="menu-item" onclick="showPage('rating')"><span class="menu-icon">⭐</span><span class="menu-text">满意度评价</span><span class="menu-arrow">›</span></button>
                <button class="menu-item" onclick="showPage('trace')"><span class="menu-icon">📍</span><span class="menu-text">就诊轨迹</span><span class="menu-arrow">›</span></button>
                <button class="menu-item" onclick="showPage('family-mode')"><span class="menu-icon">👨‍👩‍👧</span><span class="menu-text">家属关怀模式</span><span class="menu-arrow">›</span></button>
            </div>
            <div class="senior-mode-section">
                <div class="mode-toggle">
                    <div class="mode-info"><span class="mode-icon">👵</span><span class="mode-text">适老化模式</span></div>
                    <label class="toggle-switch"><input type="checkbox" id="seniorModeToggle" checked><span class="toggle-slider"></span></label>
                </div>
            </div>
            <div class="bottom-nav">
                <button class="nav-item" onclick="showPage('overview')"><span class="nav-icon">🏠</span><span class="nav-text">首页</span></button>
                <button class="nav-item" onclick="showPage('reports')"><span class="nav-icon">📋</span><span class="nav-text">报告</span></button>
                <button class="nav-item" onclick="showPage('reminder')"><span class="nav-icon">📅</span><span class="nav-text">复诊</span></button>
                <button class="nav-item active" onclick="showPage('profile')"><span class="nav-icon">👤</span><span class="nav-text">我的</span></button>
            </div>
        </div>`
    };

    for (const [pageId, html] of Object.entries(pages)) {
        pageCache[pageId] = html;
    }
}

function showPage(pageId) {
    const container = document.getElementById('pageContainer');
    if (!container) return;

    if (currentPageId === pageId) {
        return;
    }

    if (pageCache[pageId]) {
        const currentPage = document.querySelector('.page.active');
        if (currentPage) {
            currentPage.classList.remove('active');
        }
        container.innerHTML = pageCache[pageId];
        const newPage = document.getElementById(pageId);
        if (newPage) {
            newPage.classList.add('active');
            currentPageId = pageId;
            updateNavigation(pageId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        showToast('页面加载失败');
    }
}

function updateNavigation(pageId) {
    setTimeout(() => {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            const navText = item.querySelector('.nav-text');
            if (navText) {
                const text = navText.textContent.trim();
                if ((pageId === 'overview' && text === '首页') ||
                    (pageId === 'reports' && text === '报告') ||
                    (pageId === 'reminder' && text === '复诊') ||
                    (pageId === 'profile' && text === '我的')) {
                    item.classList.add('active');
                }
            }
        });
    }, 0);
}

function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('active');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('active');
    }
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function toggleVoice() {
    isVoiceActive = !isVoiceActive;

    const voiceFloatBtn = document.getElementById('voiceFloatBtn');
    if (voiceFloatBtn) {
        voiceFloatBtn.classList.toggle('active', isVoiceActive);
    }

    if (isVoiceActive) {
        showToast('正在听您说话...');
        setTimeout(() => {
            isVoiceActive = false;
            if (voiceFloatBtn) voiceFloatBtn.classList.remove('active');
            showToast('语音识别完成');
            setTimeout(() => {
                showPage('overview');
            }, 1000);
        }, 3000);
    }
}

function simulateNfcBind() {
    showToast('NFC写入成功，正在跳转到就诊概览...');
    setTimeout(() => {
        showPage('overview');
    }, 1500);
}

function confirmEmergency() {
    showToast('已通知医护人员，他们将尽快赶到您的位置！');
}

function downloadReport() {
    showToast('正在生成报告...');
    setTimeout(() => {
        showToast('报告生成成功，正在下载...');
        setTimeout(() => {
            showToast('报告已下载到本地');
        }, 1000);
    }, 2000);
}

function shareReport() {
    showToast('正在生成分享链接...');
    setTimeout(() => {
        showToast('链接已复制到剪贴板');
    }, 1000);
}

function addToCalendar() {
    showToast('已添加到日历提醒！');
}

function submitRating() {
    showToast('感谢您的评价！');
    setTimeout(() => {
        showPage('overview');
    }, 1000);
}

function bindFamily() {
    showToast('正在绑定家人手环...');
    setTimeout(() => {
        showToast('绑定成功！');
    }, 1500);
}

function addQuickQuestion(question) {
    showToast(`已发送: ${question}`);
}

function setRating(stars) {
    const starElements = document.querySelectorAll('.star');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });

    const ratingTexts = ['非常不满意', '不满意', '一般', '满意', '非常满意'];
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
        ratingText.textContent = ratingTexts[stars - 1];
    }
}

function toggleVoiceInput() {
    const voiceBtn = document.querySelector('.voice-input-btn');
    if (voiceBtn) {
        voiceBtn.classList.toggle('active');
        if (voiceBtn.classList.contains('active')) {
            showToast('正在听您说话...');
            setTimeout(() => {
                voiceBtn.classList.remove('active');
                showToast('语音输入完成');
            }, 3000);
        }
    }
}

window.showPage = showPage;
window.toggleVoice = toggleVoice;
window.simulateNfcBind = simulateNfcBind;
window.confirmEmergency = confirmEmergency;
window.downloadReport = downloadReport;
window.shareReport = shareReport;
window.addToCalendar = addToCalendar;
window.submitRating = submitRating;
window.bindFamily = bindFamily;
window.addQuickQuestion = addQuickQuestion;
window.setRating = setRating;
window.toggleVoiceInput = toggleVoiceInput;
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', () => {
    registerPages();

    const voiceFloatBtn = document.getElementById('voiceFloatBtn');
    if (voiceFloatBtn) {
        voiceFloatBtn.addEventListener('click', toggleVoice);
    }

    hideLoading();
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    hideLoading();
    showToast('应用程序发生错误，请刷新重试');
});
