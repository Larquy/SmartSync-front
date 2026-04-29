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
        alert('数据已刷新');
    }, 1000);
}