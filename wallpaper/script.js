// 初始化年份选择器
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');

// 填充年份 (1940-2020)
for (let year = 2020; year >= 1940; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year + '年';
    yearSelect.appendChild(option);
}

// 填充月份
for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month + '月';
    monthSelect.appendChild(option);
}

// 填充日期
function updateDays() {
    const year = parseInt(yearSelect.value) || 2000;
    const month = parseInt(monthSelect.value) || 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const currentDay = daySelect.value;
    daySelect.innerHTML = '<option value="">选择日期</option>';
    
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day + '日';
        daySelect.appendChild(option);
    }
    
    if (currentDay && currentDay <= daysInMonth) {
        daySelect.value = currentDay;
    }
}

// 初始填充日期
for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day + '日';
    daySelect.appendChild(option);
}

// 监听年月变化更新日期
yearSelect.addEventListener('change', updateDays);
monthSelect.addEventListener('change', updateDays);

// 购买处理
function handleBuy() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    const hour = document.getElementById('hour').value;
    
    if (!year || !month || !day || !hour) {
        alert('请完整填写您的生辰信息');
        return;
    }
    
    // 模拟购买流程
    alert('正在为您生成专属旺运壁纸...\n\n生辰信息：' + year + '年' + month + '月' + day + '日\n\n支付金额：¥19.9');
}
