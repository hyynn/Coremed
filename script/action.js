document.addEventListener('DOMContentLoaded', function () {

    // 바깥 클릭 시 nav 닫기
    document.addEventListener('click', function (e) {
        const nav = document.querySelector('header nav');
        const hamburger = document.querySelector('.hamburger');
        if (!nav || !hamburger) return;
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        }
    });

    // 스크롤 시 모바일 헤더 고정
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.innerWidth <= 900) {
            if (window.scrollY > 50) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.width = '100%';
                header.style.background = 'rgba(0,0,0,0.5)';
                header.querySelector('.hamburger span') &&
                    header.querySelectorAll('.hamburger span').forEach(s => s.style.background = 'var(--color-bg)');
                header.querySelectorAll('.mobile-login li a').forEach(a => a.style.color = 'var(--color-bg)');
            } else {
                header.style.position = '';
                header.style.top = '';
                header.style.background = '';
                header.querySelectorAll('.hamburger span').forEach(s => s.style.background = '');
                header.querySelectorAll('.mobile-login li a').forEach(a => a.style.color = '');
            }
        }
    });

    // 헤더 로드
    fetch('include/header.html')
        .then(r => r.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            // 현재 페이지 메뉴 활성화
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('header .gnb > li').forEach(li => {
                const link = li.querySelector('a');
                if (link && link.getAttribute('href') === currentPage) li.classList.add('on');
            });

            // 햄버거 메뉴 토글
            const hamburger = document.querySelector('.hamburger');
            const nav = document.querySelector('header nav');
            if (hamburger && nav) {
                hamburger.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const isOpen = nav.classList.toggle('open');
                    hamburger.classList.toggle('open');
                    hamburger.setAttribute('aria-expanded', isOpen);
                });
            }
        })
        .catch(err => console.error('헤더 로드 실패:', err));

    // 푸터 로드
    fetch('include/footer.html')
        .then(r => r.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(err => console.error('푸터 로드 실패:', err));

    // 스크롤 페이드 애니메이션
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('#section1, #section2, #section3, #section4').forEach(section => {
        section.classList.add('scroll-fade');
        sectionObserver.observe(section);
    });

    // 카드 순차 등장
    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.content-item').forEach(card => card.classList.add('show'));
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('#section1, #section2, .sub04 .content-box').forEach(section => {
        cardObserver.observe(section);
    });

    // sub01 텍스트박스 애니메이션
    const sub01Observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const textBox = entry.target.querySelector('.text-box');
                if (textBox) textBox.classList.add('show');
                sub01Observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.sub01 .section').forEach(section => {
        sub01Observer.observe(section);
    });

    // 카운터 애니메이션
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const counter = document.querySelector('.content3 .counter');
    if (counter) counterObserver.observe(counter);
});

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const step = target / (1000 / 16);
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

window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
        const header = document.querySelector('header');
        if (!header) return;
        header.style.position = '';
        header.style.top = '';
        header.style.background = '';
    }
});