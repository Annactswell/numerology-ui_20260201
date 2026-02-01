// 分类切换
document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 收藏切换
document.querySelectorAll('.product-like').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        const svg = this.querySelector('svg');
        if (this.classList.contains('active')) {
            svg.setAttribute('fill', 'currentColor');
        } else {
            svg.setAttribute('fill', 'none');
        }
    });
});
