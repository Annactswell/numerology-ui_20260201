// 商品详情页脚本

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

// 图片轮播
function initGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoPlayTimer = null;

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    // 下一张
    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }

    // 自动播放
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 3000);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });

    // 触摸滑动支持
    const gallery = document.getElementById('gallery');
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向左滑动，下一张
                goToSlide((currentIndex + 1) % slides.length);
            } else {
                // 向右滑动，上一张
                goToSlide((currentIndex - 1 + slides.length) % slides.length);
            }
        }
    }

    // 开始自动播放
    startAutoPlay();

    // 页面不可见时暂停
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// 收藏功能
document.querySelector('.action-item')?.addEventListener('click', function() {
    const svg = this.querySelector('svg');
    const isActive = svg.getAttribute('fill') === 'currentColor';
    
    if (isActive) {
        svg.setAttribute('fill', 'none');
        this.style.color = '';
    } else {
        svg.setAttribute('fill', 'currentColor');
        this.style.color = '#000';
    }
});

// 加入购物车
document.querySelector('.btn-cart')?.addEventListener('click', function() {
    // 简单的动画反馈
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 100);
    
    // 更新购物车数量
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        const count = parseInt(badge.textContent) + 1;
        badge.textContent = count;
    }
    
    alert('已加入购物车');
});

// 立即购买
document.querySelector('.btn-buy')?.addEventListener('click', function() {
    alert('即将跳转到结算页面');
});

// 规格选择
document.querySelector('.spec-section')?.addEventListener('click', function() {
    // 这里可以弹出规格选择面板
    alert('选择规格：\n\n尺寸：25mm / 30mm\n链绳：红绳 / 黑绳 / 银链');
});
