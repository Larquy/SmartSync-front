// 实时更新时间
setInterval(() => {
    const date = new Date();
    const timeString = date.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('dateInfo').textContent = timeString;
}, 1000);