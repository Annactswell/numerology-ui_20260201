// 版本选择
document.querySelectorAll('.version-card').forEach(card => {
    card.addEventListener('click', function() {
        // 移除所有active状态
        document.querySelectorAll('.version-card').forEach(c => c.classList.remove('active'));
        // 添加当前active状态
        this.classList.add('active');
        
        // 更新价格显示
        const price = this.querySelector('.version-price').textContent;
        document.querySelector('.btn-buy').textContent = `立即购买 ${price}`;
        
        // 更新主价格显示
        const priceNum = price.replace('¥', '');
        document.querySelector('.price-value').textContent = priceNum;
    });
});

// FAQ展开/收起
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const item = this.parentElement;
        // 关闭其他展开的FAQ
        document.querySelectorAll('.faq-item').forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        // 切换当前FAQ状态
        item.classList.toggle('active');
    });
});

// 收藏功能
function toggleCollect(element) {
    const svg = element.querySelector('svg');
    const span = element.querySelector('span');
    
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        svg.setAttribute('fill', 'none');
        span.textContent = '收藏';
    } else {
        element.classList.add('active');
        svg.setAttribute('fill', 'currentColor');
        span.textContent = '已收藏';
        
        // 简单的动画反馈
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
}

// 立即购买
function buyNow() {
    // 获取当前选中的版本
    const activeVersion = document.querySelector('.version-card.active');
    const versionName = activeVersion.querySelector('.version-name').textContent;
    const versionPrice = activeVersion.querySelector('.version-price').textContent;
    
    alert(`即将购买：${versionName}\n价格：${versionPrice}\n\n请填写您的出生信息以生成报告`);
    
    // 实际项目中这里会跳转到订单确认页面或弹出填写信息的表单
    // location.href = '../birthchart/index.html';
}

// 页面滚动时header背景变化
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 280) {
        header.style.background = 'rgba(255,255,255,0.98)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
    }
    
    lastScrollTop = scrollTop;
});
