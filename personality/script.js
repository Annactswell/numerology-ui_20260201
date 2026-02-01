// 获取完整报告
function handleGetReport() {
    alert('正在跳转到支付页面...\n\n人格分析完整报告\n价格：¥19.9');
}

// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    const fills = document.querySelectorAll('.dimension-fill');
    fills.forEach((fill, index) => {
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
            fill.style.width = width;
        }, 100 + index * 100);
    });
});
