function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
}

function showTouchHint(message) {
    const touchHint = document.createElement('div');
    touchHint.className = 'touch-hint';
    touchHint.textContent = message;
    document.body.appendChild(touchHint);

    setTimeout(() => {
        if (touchHint.parentNode) {
            touchHint.parentNode.removeChild(touchHint);
        }
    }, 3000);
}

function createTouchFeedback(x, y) {
    const feedback = document.createElement('div');
    feedback.className = 'touch-feedback';
    feedback.style.left = (x - 20) + 'px';
    feedback.style.top = (y - 20) + 'px';
    document.body.appendChild(feedback);

    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 600);
}

window.showPage = showPage;
window.animateProgress = animateProgress;
window.showTouchHint = showTouchHint;
window.createTouchFeedback = createTouchFeedback;
