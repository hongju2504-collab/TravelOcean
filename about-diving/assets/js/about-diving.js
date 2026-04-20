document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector('.attractions-slider');
    const cards = document.querySelectorAll('.attraction-card');

    let index = 0;
    let interval;

    function getGap() {
        const style = window.getComputedStyle(slider);
        return parseInt(style.gap) || 0;
    }

    function autoSlide() {
        if (!cards.length) return;

        const gap = getGap();
        const cardWidth = cards[0].offsetWidth + gap;

        index++;

        if (index >= cards.length) {
            index = 0;
        }

        slider.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
    }

    function startSlide() {
        interval = setInterval(autoSlide, 2000);
    }

    function stopSlide() {
        clearInterval(interval);
    }

    slider.addEventListener('mouseenter', stopSlide);
    slider.addEventListener('mouseleave', startSlide);

    startSlide();

});