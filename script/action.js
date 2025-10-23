$(document).ready(function () {

    $('header').load('include/header.html', function () {

    })

    $('footer').load('include/footer.html', function () {

    })
})

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
$(window).on('scroll', function () {
    const counter = $('.content3 .counter');
    if (counter.length && !counter.hasClass('animated')) {
        const counterTop = counter.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > counterTop) {
            counter.addClass('animated');
            animateCounter(counter[0]);
        }
    }
});