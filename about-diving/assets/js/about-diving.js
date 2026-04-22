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

    // 드래그 스와이프
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('dragging');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // 드래그 속도 조절
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('mousedown', stopSlide);
    slider.addEventListener('mouseup', startSlide);
    slider.addEventListener('mouseleave', startSlide);
    
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. 모든 아코디언 헤더(질문 영역)를 선택합니다.
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // 스크립트 에러 방지를 위해 아코디언이 있는 페이지에서만 실행되도록 체크합니다.
    if (accordionHeaders.length === 0) return;

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // 클릭된 헤더의 부모 요소(.accordion-item)를 가져옵니다.
            const currentItem = this.parentElement;

            // 2. 다른 열려있는 아코디언 닫기 (하나만 열어두기)
            // 여러 개를 동시에 열어두고 싶다면 이 아래 forEach 블록을 삭제하세요.
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // 3. 클릭한 아이템의 active 클래스를 토글합니다.
            // active가 있으면 제거(닫기), 없으면 추가(열기)하여 화살표 회전과 높이 변화 CSS를 작동시킵니다.
            currentItem.classList.toggle('active');
        });
    });
});