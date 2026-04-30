// 设置日期
const date = new Date();
document.getElementById('dateInfo').textContent = date.toISOString().split('T')[0];