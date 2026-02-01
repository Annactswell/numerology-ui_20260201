// 初始化年份选项 (1940-2026)
const yearSelect = document.getElementById('birthYear');
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1940; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year + '年';
    yearSelect.appendChild(option);
}

// 初始化月份选项
const monthSelect = document.getElementById('birthMonth');
for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month + '月';
    monthSelect.appendChild(option);
}

// 初始化日期选项
const daySelect = document.getElementById('birthDay');
for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day + '日';
    daySelect.appendChild(option);
}

// 性别选择
function selectGender(element) {
    document.querySelectorAll('.gender-item').forEach(item => {
        item.classList.remove('selected');
    });
    element.classList.add('selected');
}

// 时辰选择
function selectShichen(element) {
    document.querySelectorAll('.shichen-item').forEach(item => {
        item.classList.remove('selected');
    });
    element.classList.add('selected');
}

// 表单提交
document.getElementById('birthchartForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.querySelector('.form-input').value;
    const gender = document.querySelector('.gender-item.selected')?.dataset.value;
    const year = yearSelect.value;
    const month = monthSelect.value;
    const day = daySelect.value;
    const shichen = document.querySelector('.shichen-item.selected')?.dataset.value;

    if (!shichen) {
        alert('请选择出生时辰');
        return;
    }

    // 跳转到结果页面
    console.log('提交数据:', { name, gender, year, month, day, shichen });
    location.href = '../result/index.html';
});
