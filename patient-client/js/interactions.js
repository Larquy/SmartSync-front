function initStarRating() {
    document.querySelectorAll('.star').forEach((star, index) => {
        star.addEventListener('click', function() {
            document.querySelectorAll('.star').forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

function initRatingOptions() {
    document.querySelectorAll('.rating-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.rating-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

function initTouchFeedback() {
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || 
            e.target.classList.contains('menu-item') || 
            e.target.classList.contains('back-btn')) {
            createTouchFeedback(e.clientX, e.clientY);
        }
    });
}

window.initStarRating = initStarRating;
window.initRatingOptions = initRatingOptions;
window.initTouchFeedback = initTouchFeedback;
