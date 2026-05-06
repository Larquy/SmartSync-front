setInterval(function() {
    var date = new Date();
    var timeString = date.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeString;
}, 1000);

var currentAlarmId = null;

function showPatientDetail(name, alarmId) {
    currentAlarmId = alarmId;
    document.getElementById('patientName').textContent = name;
    document.getElementById('patientModal').classList.add('show');
}

function closeModal() {
    document.getElementById('patientModal').classList.remove('show');
    currentAlarmId = null;
}

document.getElementById('patientModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

function emergencyBroadcast() {
    var btn = event.target;
    btn.innerHTML = '广播中...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '紧急广播';
        btn.disabled = false;
        alert('紧急广播已发送！');
    }, 1200);
}

function exportRecords() {
    var btn = event.target;
    btn.innerHTML = '导出中...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '导出记录';
        btn.disabled = false;
        alert('记录导出成功！');
    }, 1500);
}

function handleAlarmDirect(alarmId) {
    var alarmItem = document.getElementById('alarm-' + alarmId);
    if (!alarmItem) return;
    
    var actionBtn = alarmItem.querySelector('.alarm-btn.success');
    if (!actionBtn || actionBtn.textContent === '已处理') return;
    
    actionBtn.innerHTML = '处理中...';
    actionBtn.disabled = true;
    
    setTimeout(function() {
        actionBtn.innerHTML = '已处理';
        actionBtn.style.background = '#4caf50';
        actionBtn.disabled = false;
        alarmItem.classList.remove('danger');
        alarmItem.classList.add('success');
        alert('处理成功！');
    }, 1000);
}

function handlePatient() {
    var modalBtn = event.target;
    modalBtn.innerHTML = '处理中...';
    modalBtn.disabled = true;
    
    setTimeout(function() {
        modalBtn.innerHTML = '已处理';
        modalBtn.disabled = false;
        
        if (currentAlarmId) {
            var alarmItem = document.getElementById('alarm-' + currentAlarmId);
            if (alarmItem) {
                var actionBtn = alarmItem.querySelector('.alarm-btn.success');
                if (actionBtn) {
                    actionBtn.innerHTML = '已处理';
                    actionBtn.style.background = '#4caf50';
                }
                alarmItem.classList.remove('danger');
                alarmItem.classList.add('success');
            }
        }
        
        alert('处理成功！');
        closeModal();
    }, 1000);
}

function triagePatient() {
    var btn = event.target;
    btn.innerHTML = '分流中...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '已分流';
        btn.style.background = '#4caf50';
        btn.disabled = false;
        alert('分流处理完成！');
    }, 800);
}

function ignoreAlert() {
    var btn = event.target;
    btn.innerHTML = '已忽略';
    btn.style.background = '#6c757d';
    alert('已忽略此警报');
}

function postponeAlert() {
    var btn = event.target;
    btn.innerHTML = '已延后';
    btn.style.background = '#ff9800';
    alert('已延后处理');
}

function closeAlert() {
    var btn = event.target;
    btn.innerHTML = '已关闭';
    btn.style.background = '#6c757d';
    alert('警报已关闭');
}

function assignMaintenance() {
    var btn = event.target;
    btn.innerHTML = '安排中...';
    btn.disabled = true;
    setTimeout(function() {
        btn.innerHTML = '已安排';
        btn.style.background = '#4caf50';
        btn.disabled = false;
        alert('已安排维护人员');
    }, 1000);
}

function goToAlarmList() {
    window.location.href = 'alarm-list.html';
}