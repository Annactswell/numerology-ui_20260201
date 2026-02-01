// 类型选择
document.querySelectorAll('.type-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const type = this.dataset.type;
        const input = document.getElementById('numberInput');
        
        switch(type) {
            case 'phone':
                input.placeholder = '请输入11位手机号';
                input.maxLength = 11;
                break;
            case 'car':
                input.placeholder = '请输入车牌号（如：京A12345）';
                input.maxLength = 8;
                break;
            case 'other':
                input.placeholder = '请输入任意号码';
                input.maxLength = 15;
                break;
        }
    });
});

// 清除输入
function clearInput() {
    document.getElementById('numberInput').value = '';
}

// 分析号码
function analyzeNumber() {
    const number = document.getElementById('numberInput').value.trim();
    
    if (!number) {
        alert('请输入号码');
        return;
    }
    
    // 计算分数（模拟算法）
    let score = 60;
    const digits = number.replace(/\D/g, '');
    
    // 幸运数字加分
    const luckyDigits = ['6', '8', '9'];
    for (let d of digits) {
        if (luckyDigits.includes(d)) {
            score += Math.floor(Math.random() * 5) + 3;
        }
    }
    
    // 尾号加成
    const lastDigit = digits[digits.length - 1];
    if (lastDigit === '8') score += 10;
    if (lastDigit === '6') score += 8;
    if (lastDigit === '9') score += 6;
    
    // 限制范围
    score = Math.min(99, Math.max(50, score));
    
    // 确定等级
    let level;
    if (score >= 90) level = '大吉';
    else if (score >= 80) level = '中吉';
    else if (score >= 70) level = '小吉';
    else if (score >= 60) level = '平';
    else level = '凶';
    
    // 更新显示
    document.getElementById('resultScore').textContent = score;
    document.getElementById('resultLevel').textContent = level;
    document.getElementById('resultNumber').textContent = formatNumber(number);
    
    // 运势条
    const wealth = Math.min(100, 60 + Math.floor(Math.random() * 40));
    const career = Math.min(100, 60 + Math.floor(Math.random() * 35));
    const social = Math.min(100, 55 + Math.floor(Math.random() * 35));
    const health = Math.min(100, 50 + Math.floor(Math.random() * 35));
    
    document.getElementById('wealthBar').style.width = wealth + '%';
    document.getElementById('careerBar').style.width = career + '%';
    document.getElementById('socialBar').style.width = social + '%';
    document.getElementById('healthBar').style.width = health + '%';
    
    // 更新数字分析
    updateDigitAnalysis(digits);
    
    // 显示结果
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

// 格式化号码显示
function formatNumber(num) {
    if (num.length === 11) {
        return num.slice(0,3) + ' ' + num.slice(3,7) + ' ' + num.slice(7);
    }
    return num;
}

// 更新数字分析
function updateDigitAnalysis(digits) {
    const meanings = {
        '0': '圆满无缺',
        '1': '一帆风顺',
        '2': '好事成双',
        '3': '三阳开泰',
        '4': '四季平安',
        '5': '五福临门',
        '6': '六六大顺',
        '7': '七星高照',
        '8': '财运旺盛',
        '9': '长长久久'
    };
    
    const uniqueDigits = [...new Set(digits.split(''))].slice(0, 4);
    const container = document.getElementById('digitAnalysis');
    
    container.innerHTML = uniqueDigits.map(d => `
        <div class="digit-item">
            <span class="digit-num">${d}</span>
            <span class="digit-meaning">${meanings[d]}</span>
        </div>
    `).join('');
}

// 重置分析
function resetAnalysis() {
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('numberInput').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
