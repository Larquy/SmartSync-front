// 实时更新时间
setInterval(() => {
    const date = new Date();
    const timeString = date.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeString;
}, 1000);

// 显示患者详情
function showPatientDetail(name) {
    document.getElementById('patientName').textContent = name;
    document.getElementById('patientModal').classList.add('show');
}

// 关闭弹窗
function closeModal() {
    document.getElementById('patientModal').classList.remove('show');
}

// 点击外部关闭弹窗
document.getElementById('patientModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});