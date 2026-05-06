setInterval(function() {
    var date = new Date();
    var timeString = date.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeString;
}, 1000);

function executeTriage() {
    var btn = document.getElementById('mainTriageBtn');
    if (btn) {
        btn.innerHTML = '执行中...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '执行分流';
            btn.disabled = false;
            alert('分流执行成功！');
        }, 1500);
    }
}

function exportReport() {
    var btn = document.getElementById('exportBtn');
    if (btn) {
        btn.innerHTML = '导出中...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '导出报表';
            btn.disabled = false;
            alert('报表导出成功！');
        }, 1500);
    }
}

function viewDetail(deptName) {
    window.location.href = 'queue-detail.html?dept=' + encodeURIComponent(deptName);
}

function triageDepartment(deptName) {
    var btn = event.target || document.activeElement;
    if (btn) {
        btn.innerHTML = '分流中...';
        btn.disabled = true;
        setTimeout(function() {
            btn.innerHTML = '已分流';
            btn.style.background = '#4caf50';
            btn.disabled = false;
            alert(deptName + ' 分流处理完成！');
        }, 1000);
    }
}