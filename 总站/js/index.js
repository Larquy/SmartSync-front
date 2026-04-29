// 实时更新时间
setInterval(() => {
    const date = new Date();
    const timeString = date.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeString;
}, 1000);

// 刷新按钮功能
function refreshData() {
    const btn = document.querySelector('.refresh-btn');
    btn.innerHTML = '刷新中...';
    setTimeout(() => {
        btn.innerHTML = '刷新';
        updateAlarmStatus();
        alert('数据已刷新');
    }, 1000);
}

// 更新警报状态
function updateAlarmStatus() {
    const alarmCard = document.getElementById('alarmCard');
    const alarmValue = document.getElementById('alarmValue');
    const alarmStatus = document.getElementById('alarmStatus');
    
    const count = parseInt(alarmValue.textContent);
    
    if (count === 0) {
        alarmCard.classList.remove('alarm');
        alarmStatus.textContent = '正常';
        alarmStatus.className = 'kpi-change positive';
    } else {
        alarmCard.classList.add('alarm');
        alarmStatus.innerHTML = '<span>!</span>待处理';
        alarmStatus.className = 'kpi-change danger';
    }
}

// 页面加载时初始化
window.addEventListener('load', updateAlarmStatus);