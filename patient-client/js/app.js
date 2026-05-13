window.onload = function() {
    animateProgress();
    
    initStarRating();
    initRatingOptions();
    initTouchFeedback();
    
    setTimeout(() => {
        simulateRingDetection();
    }, 1000);
};
