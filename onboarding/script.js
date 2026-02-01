// 当前步骤
let currentStep = 1;

// 步骤切换
function goToStep(step) {
    const steps = document.querySelectorAll('.step');
    const dots = document.querySelectorAll('.step-dot');
    
    // 标记当前步骤为prev（向左滑出）
    steps.forEach(s => {
        const stepNum = parseInt(s.dataset.step);
        s.classList.remove('active', 'prev');
        if (stepNum < step) {
            s.classList.add('prev');
        }
    });
    
    // 激活目标步骤
    const targetStep = document.querySelector(`.step[data-step="${step}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    // 更新步骤指示器
    dots.forEach(dot => {
        const dotStep = parseInt(dot.dataset.step);
        dot.classList.toggle('active', dotStep === step);
    });
    
    currentStep = step;
}

// 登录方式切换
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabType = this.dataset.tab;
        
        // 切换tab状态
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // 切换表单显示
        if (tabType === 'phone') {
            document.getElementById('phone-form').style.display = 'block';
            document.getElementById('wechat-form').style.display = 'none';
        } else {
            document.getElementById('phone-form').style.display = 'none';
            document.getElementById('wechat-form').style.display = 'block';
        }
    });
});

// 发送验证码
let countdown = 0;
document.getElementById('send-code-btn').addEventListener('click', function() {
    const phone = document.getElementById('phone-input').value;
    
    if (!phone || phone.length !== 11) {
        alert('请输入正确的手机号');
        return;
    }
    
    if (countdown > 0) return;
    
    // 模拟发送验证码
    alert('验证码已发送至 ' + phone);
    
    // 开始倒计时
    countdown = 60;
    const btn = this;
    btn.disabled = true;
    
    const timer = setInterval(() => {
        countdown--;
        btn.textContent = `${countdown}s`;
        
        if (countdown <= 0) {
            clearInterval(timer);
            btn.textContent = '获取验证码';
            btn.disabled = false;
        }
    }, 1000);
});

// 手机号登录
function handlePhoneLogin() {
    const phone = document.getElementById('phone-input').value;
    const code = document.getElementById('code-input').value;
    const agreed = document.getElementById('agree-checkbox').checked;
    
    if (!phone || phone.length !== 11) {
        alert('请输入正确的手机号');
        return;
    }
    
    if (!code || code.length !== 6) {
        alert('请输入6位验证码');
        return;
    }
    
    if (!agreed) {
        alert('请先同意用户协议和隐私政策');
        return;
    }
    
    // 模拟登录成功，跳转到填写信息页
    goToStep(3);
}

// 性别选择
document.querySelectorAll('.gender-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.gender-option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
    });
});

// 初始化日期选择器
function initDateSelectors() {
    const yearSelect = document.getElementById('birth-year');
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');
    
    // 年份 (1940-2020)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 6; year >= 1940; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }
    
    // 月份
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = month + '月';
        monthSelect.appendChild(option);
    }
    
    // 日期
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day + '日';
        daySelect.appendChild(option);
    }
    
    // 根据年月更新日期选项
    function updateDays() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        
        if (!year || !month) return;
        
        const daysInMonth = new Date(year, month, 0).getDate();
        const currentDay = parseInt(daySelect.value);
        
        // 清空现有日期选项
        daySelect.innerHTML = '<option value="">日</option>';
        
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            if (day === currentDay) {
                option.selected = true;
            }
            daySelect.appendChild(option);
        }
    }
    
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
}

// 完成引导
function completeOnboarding() {
    const name = document.getElementById('name-input').value;
    const gender = document.querySelector('.gender-option.active')?.dataset.gender;
    const year = document.getElementById('birth-year').value;
    const month = document.getElementById('birth-month').value;
    const day = document.getElementById('birth-day').value;
    const hour = document.getElementById('birth-hour').value;
    const birthplace = document.getElementById('birthplace-input').value;
    
    // 保存用户信息到本地存储（实际项目中应发送到服务器）
    const userInfo = {
        name,
        gender,
        birthDate: year && month && day ? `${year}-${month}-${day}` : '',
        birthHour: hour,
        birthplace,
        onboardingCompleted: true
    };
    
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 跳转到主页
    location.href = '../index.html';
}

// 检查是否已完成引导
function checkOnboardingStatus() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const info = JSON.parse(userInfo);
        if (info.onboardingCompleted) {
            // 已完成引导，直接跳转主页
            // location.href = '../index.html';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initDateSelectors();
    checkOnboardingStatus();
});
