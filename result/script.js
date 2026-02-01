// 大运卡片点击交互
document.querySelectorAll('.dayun-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.dayun-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});
