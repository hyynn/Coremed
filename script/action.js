document.addEventListener('DOMContentLoaded', function () {

    // 헤더 로드
    fetch('include/header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            // 현재 페이지에 맞는 메뉴 활성화
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const gnbItems = document.querySelectorAll('header .gnb > li');

            gnbItems.forEach(li => {
                const link = li.querySelector('a');
                if (link && link.getAttribute('href') === currentPage) {
                    li.classList.add('on');
                }
            });
        });

    // 푸터 로드
    fetch('include/footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
});

// 카운터 애니메이션

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// 스크롤 시 실행 (content3가 화면에 보일 때)

const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

const counter = document.querySelector('.content3 .counter');
if (counter) {
    counterObserver.observe(counter);
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// 애니메이션 적용할 섹션들
document.querySelectorAll('#section1, #section2, #section3, #section4').forEach(section => {
    section.classList.add('scroll-fade');
    observer.observe(section);
});

// 카드 순차 등장 애니메이션
const cardObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.content_item');
            cards.forEach(card => {
                card.classList.add('show');
            });
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

// section1, section2, sub04에 적용
document.querySelectorAll('#section1, #section2, .sub04 .content_box').forEach(section => {
    cardObserver.observe(section);
});

// sub01 text_box 애니메이션

const sub01ObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const sub01Observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const textBox = entry.target.querySelector('.text_box');
            if (textBox) {
                textBox.classList.add('show');
            }
            sub01Observer.unobserve(entry.target);
        }
    });
}, sub01ObserverOptions);

document.querySelectorAll('.sub01 .section').forEach(section => {
    sub01Observer.observe(section);
});