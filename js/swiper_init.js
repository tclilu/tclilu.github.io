// 首页轮播图开始
var swiper = new Swiper('.blog-slider', {
    passiveListeners: true,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    autoplay: {
        disableOnInteraction: true,
        delay: 3000
    },
    mousewheel: false,
    // autoHeight: true,
    pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
    }
});

var container = document.getElementById('swiper_container');
container.onmouseenter = function() {
    swiper.autoplay.stop();
};
container.onmouseleave = function() {
    swiper.autoplay.start();
};
// 首页轮播图结束