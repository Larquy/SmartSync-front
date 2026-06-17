// 总站任务序列监控 - 页面逻辑

// 模拟数据：患者任务队列
let patientTasks = [
    {
        id: 1,
        name: '王大爷',
        maskedId: 'PAT-7A3B-9C2D',
        dept: '心内科',
        station: 'A-08',
        stationLocation: '1F-电梯厅',
        sequence: [
            { name: '前往内科', status: 'completed' },
            { name: '内科问诊', status: 'completed' },
            { name: '心电图检查', status: 'current' },
            { name: '缴费结算', status: 'pending' },
            { name: '取药', status: 'pending' }
        ],
        currentTask: '心电图检查',
        currentStatus: 'executing',
        lastUpdate: '2026-06-17 14:32:15',
        insertedTasks: []
    },
    {
        id: 2,
        name: '李女士',
        maskedId: 'PAT-2E8F-4D1A',
        dept: '内分泌科',
        station: 'B-12',
        stationLocation: '2F-内科走廊',
        sequence: [
            { name: '前往内科', status: 'completed' },
            { name: '血糖检测', status: 'completed' },
            { name: '内分泌科问诊', status: 'current' },
            { name: '缴费结算', status: 'pending' },
            { name: '取药', status: 'pending' }
        ],
        currentTask: '内分泌科问诊',
        currentStatus: 'executing',
        lastUpdate: '2026-06-17 14:28:42',
        insertedTasks: []
    },
    {
        id: 3,
        name: '张先生',
        maskedId: 'PAT-5B1C-7E3F',
        dept: '消化内科',
        station: 'A-08',
        stationLocation: '1F-电梯厅',
        sequence: [
            { name: '前往内科', status: 'completed' },
            { name: '内科问诊', status: 'completed' },
            { name: '前往洗手间', status: 'inserted' },
            { name: '消化内科问诊', status: 'pending' },
            { name: '胃镜预约', status: 'pending' }
        ],
        currentTask: '前往洗手间',
        currentStatus: 'inserted',
        lastUpdate: '2026-06-17 14:35:08',
        insertedTasks: [
            { name: '前往洗手间', from: '前往内科', at: '2026-06-17 14:35:08' }
        ],
        changeLog: [
            {
                time: '2026-06-17 14:35:08',
                type: 'INSERT',
                oldTask: '前往内科',
                newTask: '前往洗手间',
                desc: '患者在子站 A-08 请求变更任务'
            }
        ]
    },
    {
        id: 4,
        name: '赵阿姨',
        maskedId: 'PAT-9D4A-2B8E',
        dept: '内科',
        station: 'C-05',
        stationLocation: '1F-大厅',
        sequence: [
            { name: '前往内科', status: 'completed' },
            { name: '内科问诊', status: 'current' },
            { name: '缴费结算', status: 'pending' },
            { name: '取药', status: 'pending' }
        ],
        currentTask: '内科问诊',
        currentStatus: 'executing',
        lastUpdate: '2026-06-17 14:30:22',
        insertedTasks: []
    },
    {
        id: 5,
        name: '孙大爷',
        maskedId: 'PAT-1F7C-5A3D',
        dept: '外科',
        station: 'D-03',
        stationLocation: '2F-外科诊室',
        sequence: [
            { name: '前往外科', status: 'completed' },
            { name: '外科问诊', status: 'completed' },
            { name: '术前检查', status: 'current' },
            { name: '缴费结算', status: 'pending' }
        ],
        currentTask: '术前检查',
        currentStatus: 'executing',
        lastUpdate: '2026-06-17 14:33:50',
        insertedTasks: []
    },
    {
        id: 6,
        name: '周女士',
        maskedId: 'PAT-6E2B-8F4C',
        dept: '皮肤科',
        station: 'A-08',
        stationLocation: '1F-电梯厅',
        sequence: [
            { name: '前往内科', status: 'completed' },
            { name: '内科问诊', status: 'completed' },
            { name: '前往洗手间', status: 'inserted' },
            { name: '皮肤科问诊', status: 'pending' },
            { name: '皮肤检测', status: 'pending' }
        ],
        currentTask: '前往洗手间',
        currentStatus: 'inserted',
        lastUpdate: '2026-06-17 14:34:55',
        insertedTasks: [
            { name: '前往洗手间', from: '前往内科', at: '2026-06-17 14:34:55' }
        ]
    }
];

// 实时事件日志
let eventLogs = [
    {
        time: '2026-06-17 14:35:08',
        type: 'insert',
        title: '任务插入',
        desc: '<strong>张先生</strong> 在子站 <strong>A-08</strong> 插入任务：<span class="old-task">前往内科</span> → <span class="new-task">前往洗手间</span>',
        patientId: 3
    },
    {
        time: '2026-06-17 14:34:55',
        type: 'insert',
        title: '任务插入',
        desc: '<strong>周女士</strong> 在子站 <strong>A-08</strong> 插入任务：<span class="old-task">前往内科</span> → <span class="new-task">前往洗手间</span>',
        patientId: 6
    },
    {
        time: '2026-06-17 14:33:50',
        type: 'execute',
        title: '任务执行',
        desc: '<strong>孙大爷</strong> 正在执行任务：<strong>术前检查</strong>',
        patientId: 5
    },
    {
        time: '2026-06-17 14:32:15',
        type: 'execute',
        title: '任务执行',
        desc: '<strong>王大爷</strong> 正在执行任务：<strong>心电图检查</strong>',
        patientId: 1
    },
    {
        time: '2026-06-17 14:30:22',
        type: 'execute',
        title: '任务执行',
        desc: '<strong>赵阿姨</strong> 正在执行任务：<strong>内科问诊</strong>',
        patientId: 4
    },
    {
        time: '2026-06-17 14:28:42',
        type: 'execute',
        title: '任务执行',
        desc: '<strong>李女士</strong> 正在执行任务：<strong>内分泌科问诊</strong>',
        patientId: 2
    }
];

// 状态映射
const statusMap = {
    executing: '执行中',
    inserted: '已插入',
    paused: '已暂停'
};

const statusTextMap = {
    executing: '执行中',
    inserted: '已插入',
    paused: '已暂停',
    completed: '已完成',
    current: '执行中'
};

// 当前选中的患者（用于任务调整）
let currentPatient = null;

// 任务调整的临时数据
let tempSequence = [];

// 初始化
document.addEventListener('DOMContentLoaded', function () {
    updateDateTime();
    renderTaskList();
    renderEventLog();
    updateKpiStats();
    listenStorageEvents();
    setInterval(updateDateTime, 1000);
});

// 监听 localStorage 变化（接收子站事件）
function listenStorageEvents() {
    window.addEventListener('storage', (e) => {
        if (e.key === 'controlCenterEvents') {
            try {
                const events = JSON.parse(e.newValue || '[]');
                if (events.length > 0) {
                    const latest = events[0];
                    if (latest.type === 'INSERT_TASK') {
                        handleInsertTask(latest);
                    }
                }
            } catch (err) {
                console.error('解析事件失败:', err);
            }
        }
    });

    // 模拟子站事件：演示模式
    simulateSubStationEvents();
}

// 处理任务插入事件
function handleInsertTask(event) {
    const patient = patientTasks.find(p => p.maskedId === event.patientId);
    if (!patient) return;

    // 找到原任务位置
    const oldIndex = patient.sequence.findIndex(s => s.name === event.oldTask);
    if (oldIndex === -1) return;

    // 插入新任务
    patient.sequence.splice(oldIndex + 1, 0, {
        name: event.newTask,
        status: 'inserted'
    });

    // 更新当前任务
    patient.currentTask = event.newTask;
    patient.currentStatus = 'inserted';
    patient.lastUpdate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // 添加到变更记录
    if (!patient.insertedTasks) patient.insertedTasks = [];
    patient.insertedTasks.push({
        name: event.newTask,
        from: event.oldTask,
        at: patient.lastUpdate
    });

    // 添加到事件日志
    addEventLog({
        time: patient.lastUpdate,
        type: 'insert',
        title: '任务插入',
        desc: `<strong>${patient.name}</strong> 在子站 <strong>${event.stationId}</strong> 插入任务：<span class="old-task">${event.oldTask}</span> → <span class="new-task">${event.newTask}</span>`,
        patientId: patient.id
    });

    renderTaskList();
    updateKpiStats();
}

// 模拟子站事件（演示）
function simulateSubStationEvents() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            // 随机推进某个患者的任务
            const executingTasks = patientTasks.filter(p => p.currentStatus === 'executing');
            if (executingTasks.length > 0) {
                const patient = executingTasks[Math.floor(Math.random() * executingTasks.length)];
                const currentIdx = patient.sequence.findIndex(s => s.status === 'current');
                if (currentIdx >= 0 && currentIdx < patient.sequence.length - 1) {
                    patient.sequence[currentIdx].status = 'completed';
                    const nextTask = patient.sequence[currentIdx + 1];
                    if (nextTask.status === 'pending') {
                        nextTask.status = 'current';
                        patient.currentTask = nextTask.name;
                    }
                    patient.lastUpdate = new Date().toISOString().replace('T', ' ').substring(0, 19);
                    renderTaskList();
                }
            }
        }
    }, 8000);
}

// 渲染任务列表
function renderTaskList() {
    const container = document.getElementById('taskList');
    const deptFilter = document.getElementById('deptFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    let filtered = patientTasks;
    if (deptFilter) {
        filtered = filtered.filter(p => p.dept === deptFilter);
    }
    if (statusFilter) {
        filtered = filtered.filter(p => p.currentStatus === statusFilter);
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无符合条件的数据</div>';
        return;
    }

    filtered.forEach(patient => {
        const card = document.createElement('div');
        card.className = 'task-item-card ' + patient.currentStatus;
        card.onclick = () => showTaskDetail(patient);

        const seqHtml = patient.sequence.map((task, i) => {
            let cls = '';
            if (task.status === 'completed') cls = 'completed';
            else if (task.status === 'current') cls = 'current';
            else if (task.status === 'inserted') cls = 'inserted';

            return `
                <span class="seq-task ${cls}">${task.name}</span>
                ${i < patient.sequence.length - 1 ? '<span class="seq-arrow">→</span>' : ''}
            `;
        }).join('');

        const changeHtml = patient.insertedTasks && patient.insertedTasks.length > 0 ? `
            <div class="task-change-info">
                <span class="change-label">最新变更：</span>
                <span class="change-old">${patient.insertedTasks[patient.insertedTasks.length - 1].from}</span>
                <span class="change-arrow">→</span>
                <span class="change-new">${patient.insertedTasks[patient.insertedTasks.length - 1].name}</span>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="task-header">
                <div class="task-patient">
                    <div class="task-avatar">${patient.name.charAt(0)}</div>
                    <div>
                        <div class="task-name">${patient.name}</div>
                        <div class="task-masked">${patient.maskedId}</div>
                    </div>
                </div>
                <div class="task-status-badge ${patient.currentStatus}">
                    ${statusMap[patient.currentStatus] || patient.currentStatus}
                </div>
            </div>
            <div class="task-sequence">${seqHtml}</div>
            ${changeHtml}
            <div class="task-footer">
                <div class="task-station">
                    <span class="station-marker">LOC</span>
                    <span>${patient.stationLocation} · 子站 ${patient.station}</span>
                </div>
                <div class="task-time">${patient.lastUpdate}</div>
            </div>
        `;

        container.appendChild(card);
    });
}

// 渲染事件日志
function renderEventLog() {
    const container = document.getElementById('eventLog');
    container.innerHTML = '';

    if (eventLogs.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无事件记录</div>';
        return;
    }

    eventLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'event-item ' + log.type;

        item.innerHTML = `
            <div class="event-header">
                <div class="event-title">
                    <span>${log.title}</span>
                </div>
                <span class="event-time">${log.time}</span>
            </div>
            <div class="event-desc">${log.desc}</div>
        `;
        container.appendChild(item);
    });
}

// 添加事件日志
function addEventLog(log) {
    eventLogs.unshift(log);
    if (eventLogs.length > 50) eventLogs.pop();
    renderEventLog();
}

// 更新 KPI 统计
function updateKpiStats() {
    const executing = patientTasks.filter(p => p.currentStatus === 'executing').length;
    const inserted = patientTasks.filter(p => p.currentStatus === 'inserted').length;
    const completed = patientTasks.filter(p => p.sequence.every(s => s.status === 'completed')).length;

    document.getElementById('executingCount').textContent = executing;
    document.getElementById('insertCount').textContent = inserted;
    document.getElementById('completedCount').textContent = 156;
    document.getElementById('activeStations').textContent = 24;
}

// 筛选任务
function filterTasks() {
    renderTaskList();
}

// 清空日志
function clearLogs() {
    if (confirm('确定要清空所有事件日志吗？')) {
        eventLogs = [];
        renderEventLog();
    }
}

// 刷新数据
function refreshData() {
    renderTaskList();
    renderEventLog();
    updateKpiStats();
}

// 显示任务详情
function showTaskDetail(patient) {
    currentPatient = patient;
    const content = document.getElementById('taskDetailContent');

    const seqHtml = patient.sequence.map(task => {
        let cls = '';
        if (task.status === 'completed') cls = 'completed';
        else if (task.status === 'current') cls = 'current';
        else if (task.status === 'inserted') cls = 'inserted';

        return `<span class="detail-seq-task ${cls}">${task.name}</span>`;
    }).join('<span style="color: #adb5bd; margin: 0 4px;">→</span>');

    const insertedHtml = patient.insertedTasks && patient.insertedTasks.length > 0 ? `
        <div class="detail-section-title">任务变更记录</div>
        ${patient.insertedTasks.map(t => `
            <div class="task-change-info">
                <span class="change-label">${t.at}</span>
                <span class="change-old">${t.from}</span>
                <span class="change-arrow">→</span>
                <span class="change-new">${t.name}</span>
            </div>
        `).join('')}
    ` : '<div class="detail-section-title">暂无任务变更</div>';

    content.innerHTML = `
        <div class="detail-patient">
            <div class="detail-patient-name">${patient.name}</div>
            <div class="detail-patient-id">${patient.maskedId} · ${patient.dept}</div>
        </div>

        <div class="detail-section-title">任务序列</div>
        <div class="detail-sequence">${seqHtml}</div>

        <div class="detail-meta">
            <div class="detail-meta-item">
                <span class="detail-meta-label">当前位置</span>
                <span class="detail-meta-value">${patient.stationLocation}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">所在子站</span>
                <span class="detail-meta-value">${patient.station}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">当前任务</span>
                <span class="detail-meta-value" style="color: #5c7cfa;">${patient.currentTask}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">当前状态</span>
                <span class="detail-meta-value">${statusMap[patient.currentStatus]}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">最后更新</span>
                <span class="detail-meta-value" style="font-family: monospace;">${patient.lastUpdate}</span>
            </div>
            <div class="detail-meta-item">
                <span class="detail-meta-label">变更次数</span>
                <span class="detail-meta-value">${patient.insertedTasks ? patient.insertedTasks.length : 0}</span>
            </div>
        </div>

        ${insertedHtml}
    `;

    document.getElementById('taskDetailModal').classList.add('show');
}

function closeTaskDetail() {
    document.getElementById('taskDetailModal').classList.remove('show');
}

// 打开任务调整弹窗
function openTaskAdjustModal() {
    closeTaskDetail();
    document.getElementById('taskAdjustModal').classList.add('show');
    refreshAdjustForm();
}

// 关闭任务调整弹窗
function closeTaskAdjustModal() {
    document.getElementById('taskAdjustModal').classList.remove('show');
    tempSequence = [];
}

// 刷新任务调整表单
function refreshAdjustForm() {
    if (!currentPatient) return;

    // 深拷贝当前序列用于临时编辑
    tempSequence = JSON.parse(JSON.stringify(currentPatient.sequence));

    // 渲染任务序列列表
    renderAdjustSequenceList();

    // 更新选择框选项
    updateSelectOptions();

    // 更新暂停/恢复按钮状态
    updatePauseButtons();
}

// 渲染调整序列列表
function renderAdjustSequenceList() {
    const container = document.getElementById('adjustSequenceList');
    container.innerHTML = '';

    tempSequence.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = 'adjust-sequence-item';
        if (task.status === 'current') item.classList.add('current');
        if (task.status === 'completed') item.classList.add('completed');
        if (task.status === 'inserted') item.classList.add('inserted');
        if (task.status === 'paused') item.classList.add('paused');

        item.innerHTML = `
            <div class="adjust-item-index">${index + 1}</div>
            <div class="adjust-item-content">
                <div class="adjust-item-name">${task.name}</div>
                <div class="adjust-item-status">${getStatusText(task.status)}</div>
            </div>
            <div class="adjust-item-actions">
                <button class="adjust-btn adjust-btn-up" onclick="moveTaskUp(${index})" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="adjust-btn adjust-btn-down" onclick="moveTaskDown(${index})" ${index === tempSequence.length - 1 ? 'disabled' : ''}>↓</button>
            </div>
        `;

        container.appendChild(item);
    });
}

// 获取状态文本
function getStatusText(status) {
    const map = {
        completed: '已完成',
        current: '执行中',
        inserted: '已插入',
        pending: '待执行',
        paused: '已暂停'
    };
    return map[status] || status;
}

// 更新选择框选项
function updateSelectOptions() {
    const moveFromTask = document.getElementById('moveFromTask');
    const moveToPosition = document.getElementById('moveToPosition');
    const deleteTask = document.getElementById('deleteTask');

    // 清空现有选项
    moveFromTask.innerHTML = '<option value="">选择要移动的任务</option>';
    moveToPosition.innerHTML = '<option value="">移动到位置</option>';
    deleteTask.innerHTML = '<option value="">选择要删除的任务</option>';

    tempSequence.forEach((task, index) => {
        // 只允许移动非已完成的任务
        if (task.status !== 'completed') {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = task.name;
            moveFromTask.appendChild(option);
        }

        // 位置选项（在第N个任务之后）
        const posOption = document.createElement('option');
        posOption.value = index;
        posOption.textContent = `在"${task.name}"之后`;
        moveToPosition.appendChild(posOption);

        // 删除选项（不允许删除当前执行的任务）
        if (task.status !== 'completed' && task.status !== 'current') {
            const delOption = document.createElement('option');
            delOption.value = index;
            delOption.textContent = task.name;
            deleteTask.appendChild(delOption);
        }
    });

    // 添加"移到开头"选项
    const firstOption = document.createElement('option');
    firstOption.value = '-1';
    firstOption.textContent = '移到开头';
    moveToPosition.insertBefore(firstOption, moveToPosition.firstChild);
}

// 更新暂停按钮状态
function updatePauseButtons() {
    const btnPause = document.getElementById('btnPauseTask');
    const btnResume = document.getElementById('btnResumeTask');

    if (currentPatient.currentStatus === 'paused') {
        btnPause.style.display = 'none';
        btnResume.style.display = 'inline-block';
    } else {
        btnPause.style.display = 'inline-block';
        btnResume.style.display = 'none';
    }
}

// 移动任务向上
function moveTaskUp(index) {
    if (index <= 0) return;
    const temp = tempSequence[index];
    tempSequence[index] = tempSequence[index - 1];
    tempSequence[index - 1] = temp;
    renderAdjustSequenceList();
    updateSelectOptions();
}

// 移动任务向下
function moveTaskDown(index) {
    if (index >= tempSequence.length - 1) return;
    const temp = tempSequence[index];
    tempSequence[index] = tempSequence[index + 1];
    tempSequence[index + 1] = temp;
    renderAdjustSequenceList();
    updateSelectOptions();
}

// 插入新任务
function insertNewTask() {
    const taskName = document.getElementById('newTaskName').value.trim();
    const position = document.getElementById('insertPosition').value;

    if (!taskName) {
        alert('请输入任务名称');
        return;
    }

    // 找到当前任务位置
    const currentIndex = tempSequence.findIndex(t => t.status === 'current');
    let insertIndex = currentIndex;

    if (position === 'after') {
        insertIndex = currentIndex + 1;
    }

    // 如果没有当前任务，插入到末尾
    if (currentIndex === -1) {
        insertIndex = tempSequence.length;
    }

    tempSequence.splice(insertIndex, 0, {
        name: taskName,
        status: 'inserted'
    });

    document.getElementById('newTaskName').value = '';
    renderAdjustSequenceList();
    updateSelectOptions();

    addEventLog({
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'insert',
        title: '任务插入（手动）',
        desc: `<strong>${currentPatient.name}</strong> 插入任务：<span class="new-task">${taskName}</span>`,
        patientId: currentPatient.id
    });
}

// 移动任务
function moveTask() {
    const fromIndex = parseInt(document.getElementById('moveFromTask').value);
    const toPosition = parseInt(document.getElementById('moveToPosition').value);

    if (isNaN(fromIndex) || isNaN(toPosition)) {
        alert('请选择要移动的任务和目标位置');
        return;
    }

    if (fromIndex === toPosition) {
        return;
    }

    const task = tempSequence.splice(fromIndex, 1)[0];

    // 如果目标位置在原位置之后，需要调整索引
    let insertIndex = toPosition + 1;
    if (fromIndex < toPosition) {
        insertIndex = toPosition;
    }

    // 如果是移到开头
    if (toPosition === -1) {
        insertIndex = 0;
    }

    tempSequence.splice(insertIndex, 0, task);

    document.getElementById('moveFromTask').value = '';
    document.getElementById('moveToPosition').value = '';
    renderAdjustSequenceList();
    updateSelectOptions();

    addEventLog({
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'insert',
        title: '任务顺序调整',
        desc: `<strong>${currentPatient.name}</strong> 调整任务顺序：<strong>${task.name}</strong>`,
        patientId: currentPatient.id
    });
}

// 删除任务
function deleteSelectedTask() {
    const deleteIndex = parseInt(document.getElementById('deleteTask').value);

    if (isNaN(deleteIndex)) {
        alert('请选择要删除的任务');
        return;
    }

    const task = tempSequence[deleteIndex];
    if (!confirm(`确定要删除任务"${task.name}"吗？`)) {
        return;
    }

    tempSequence.splice(deleteIndex, 1);

    document.getElementById('deleteTask').value = '';
    renderAdjustSequenceList();
    updateSelectOptions();

    addEventLog({
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'complete',
        title: '任务删除（手动）',
        desc: `<strong>${currentPatient.name}</strong> 删除任务：<span class="old-task">${task.name}</span>`,
        patientId: currentPatient.id
    });
}

// 暂停/恢复任务
function togglePauseTask() {
    if (!currentPatient) return;

    const isPaused = currentPatient.currentStatus === 'paused';
    const newStatus = isPaused ? 'executing' : 'paused';

    currentPatient.currentStatus = newStatus;

    // 更新当前任务的状态
    const currentTask = tempSequence.find(t => t.status === 'current');
    if (currentTask) {
        currentTask.status = isPaused ? 'current' : 'paused';
    }

    updatePauseButtons();
    renderAdjustSequenceList();

    addEventLog({
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: isPaused ? 'execute' : 'pause',
        title: isPaused ? '任务恢复' : '任务暂停',
        desc: `<strong>${currentPatient.name}</strong> ${isPaused ? '恢复' : '暂停'}任务：<strong>${currentPatient.currentTask}</strong>`,
        patientId: currentPatient.id
    });
}

// 保存任务调整
function saveTaskAdjustment() {
    if (!currentPatient) return;

    // 更新患者的任务序列
    currentPatient.sequence = tempSequence;
    currentPatient.lastUpdate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // 重新确定当前任务
    const currentTask = tempSequence.find(t => t.status === 'current' || t.status === 'paused' || t.status === 'inserted');
    if (currentTask) {
        currentPatient.currentTask = currentTask.name;
        if (currentTask.status === 'paused') {
            currentPatient.currentStatus = 'paused';
        } else if (currentTask.status === 'inserted') {
            currentPatient.currentStatus = 'inserted';
        } else {
            currentPatient.currentStatus = 'executing';
        }
    }

    // 刷新UI
    renderTaskList();
    updateKpiStats();

    closeTaskAdjustModal();

    addEventLog({
        time: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'execute',
        title: '任务调整保存',
        desc: `<strong>${currentPatient.name}</strong> 的任务序列已更新`,
        patientId: currentPatient.id
    });
}

// 更新时间
function updateDateTime() {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeStr;
}