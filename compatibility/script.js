// 初始化日期选择器
function initDateSelectors() {
    const years = ['myYear', 'taYear'];
    const months = ['myMonth', 'taMonth'];
    const days = ['myDay', 'taDay'];
    
    years.forEach(id => {
        const select = document.getElementById(id);
        for (let y = 2005; y >= 1960; y--) {
            select.innerHTML += `<option value="${y}">${y}年</option>`;
        }
    });
    
    months.forEach(id => {
        const select = document.getElementById(id);
        for (let m = 1; m <= 12; m++) {
            select.innerHTML += `<option value="${m}">${m}月</option>`;
        }
    });
    
    days.forEach(id => {
        const select = document.getElementById(id);
        for (let d = 1; d <= 31; d++) {
            select.innerHTML += `<option value="${d}">${d}日</option>`;
        }
    });
}

initDateSelectors();

// 性别选择
document.querySelectorAll('.gender-options').forEach(group => {
    group.querySelectorAll('.gender-item').forEach(item => {
        item.addEventListener('click', function() {
            group.querySelectorAll('.gender-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// 分析合盘
function analyzeCompatibility() {
    // 生成随机分数
    const score = 70 + Math.floor(Math.random() * 28);
    
    // 确定等级
    let level, desc;
    if (score >= 90) {
        level = '天作之合';
        desc = '你们是命中注定的一对，缘分深厚，珍惜彼此！';
    } else if (score >= 80) {
        level = '良缘天成';
        desc = '你们的缘分契合度很高，携手走向幸福！';
    } else if (score >= 70) {
        level = '佳偶可期';
        desc = '你们有着不错的缘分基础，用心经营会更好。';
    } else {
        level = '缘分待续';
        desc = '你们需要更多磨合，相互理解是关键。';
    }
    
    // 更新显示
    document.getElementById('scoreNum').textContent = score;
    document.getElementById('scoreLevel').textContent = level;
    document.getElementById('scoreDesc').textContent = desc;
    
    // 更新圆环
    const ring = document.getElementById('scoreRing');
    const circumference = 339.3;
    const offset = circumference - (score / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    
    // 随机五维数据
    const dims = document.querySelectorAll('.dim-fill');
    dims.forEach((dim, i) => {
        const value = 65 + Math.floor(Math.random() * 30);
        dim.style.width = value + '%';
        dim.parentElement.nextElementSibling.textContent = value + '%';
    });
    
    // 显示结果
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

// 重置
function resetAnalysis() {
    document.getElementById('resultSection').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
