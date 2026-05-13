function toggleVoice() {
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.classList.toggle('active');

    if (voiceBtn.classList.contains('active')) {
        showTouchHint('正在听您说话...');
        setTimeout(() => {
            voiceBtn.classList.remove('active');
            showTouchHint('语音识别完成');
            setTimeout(() => {
                showPage('overview');
            }, 1000);
        }, 3000);
    }
}

function simulateRingDetection() {
    showTouchHint('正在感应手环...');
    setTimeout(() => {
        showTouchHint('手环识别成功');
        setTimeout(() => {
            showPage('overview');
        }, 1000);
    }, 2000);
}

function simulateNfcBind() {
    const steps = document.querySelectorAll('.bind-step');
    const activeStep = document.querySelector('.bind-step.active');
    const activeIndex = Array.from(steps).indexOf(activeStep);

    if (activeIndex < steps.length - 1) {
        steps[activeIndex].classList.remove('active');
        steps[activeIndex].classList.add('completed');
        steps[activeIndex].querySelector('.bind-step-content p').textContent = '写入成功';

        steps[activeIndex + 1].classList.add('active');

        showTouchHint('NFC写入成功，正在跳转到就诊概览...');

        setTimeout(() => {
            showPage('overview');
        }, 1500);
    }
}

function toggleSeniorMode() {
    const container = document.querySelector('.container');
    const toggle = document.getElementById('seniorModeToggle');

    if (toggle.checked) {
        container.classList.add('senior-friendly');
        showTouchHint('适老化模式已开启');
    } else {
        container.classList.remove('senior-friendly');
        showTouchHint('适老化模式已关闭');
    }
}

function exportReport() {
    showTouchHint('正在生成报告...');
    setTimeout(() => {
        showTouchHint('报告生成成功，正在下载...');
        setTimeout(() => {
            showTouchHint('报告已下载到本地');
        }, 1000);
    }, 2000);
}

window.toggleVoice = toggleVoice;
window.simulateRingDetection = simulateRingDetection;
window.simulateNfcBind = simulateNfcBind;
window.toggleSeniorMode = toggleSeniorMode;
window.exportReport = exportReport;
