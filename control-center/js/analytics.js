const date = new Date();
document.getElementById('dateInfo').textContent = date.toISOString().split('T')[0];

function exportReport() {
    const btn = event.target;
    btn.innerHTML = '导出中...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '导出报表';
        btn.disabled = false;
        alert('报表导出成功！');
    }, 1500);
}

function queryData() {
    const btn = event.target;
    btn.innerHTML = '查询中...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '查询';
        btn.disabled = false;
        alert('查询完成！');
    }, 1000);
}

window.addEventListener('load', function() {
    document.querySelector('.btn.success').addEventListener('click', exportReport);
    document.querySelector('.filter-bar .btn:last-child').addEventListener('click', queryData);
});