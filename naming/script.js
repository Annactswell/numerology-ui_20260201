// 初始化年月日选择器
const yearSelect = document.getElementById('birthYear');
const monthSelect = document.getElementById('birthMonth');
const daySelect = document.getElementById('birthDay');

for (let y = 2000; y >= 1950; y--) {
    yearSelect.innerHTML += `<option value="${y}">${y}年</option>`;
}

for (let m = 1; m <= 12; m++) {
    monthSelect.innerHTML += `<option value="${m}">${m}月</option>`;
}

for (let d = 1; d <= 31; d++) {
    daySelect.innerHTML += `<option value="${d}">${d}日</option>`;
}

// 行业选择
document.querySelectorAll('.industry-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.industry-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 字数选择
document.querySelectorAll('.length-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.length-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 店名数据库
const nameData = {
    food: {
        prefix: ['福', '鼎', '聚', '香', '味', '御', '品', '金', '瑞', '祥'],
        suffix: ['轩', '坊', '阁', '苑', '居', '庄', '园', '堂', '府', '楼'],
        middle: ['盛', '旺', '隆', '兴', '丰', '源', '来', '顺', '和', '悦']
    },
    retail: {
        prefix: ['百', '万', '亿', '金', '盛', '汇', '优', '臻', '新', '嘉'],
        suffix: ['汇', '城', '坊', '廊', '铺', '阁', '斋', '行', '社', '店'],
        middle: ['达', '利', '通', '发', '财', '富', '贵', '荣', '昌', '茂']
    },
    beauty: {
        prefix: ['丽', '美', '雅', '静', '悦', '韵', '芳', '妍', '姿', '颜'],
        suffix: ['阁', '坊', '轩', '苑', '社', '居', '馆', '堂', '院', '庭'],
        middle: ['容', '华', '秀', '婷', '雯', '萱', '蕙', '兰', '菲', '琳']
    },
    default: {
        prefix: ['鑫', '盛', '瑞', '祥', '福', '顺', '达', '通', '恒', '久'],
        suffix: ['源', '业', '邦', '达', '成', '利', '益', '昌', '隆', '兴'],
        middle: ['泰', '安', '和', '合', '美', '善', '嘉', '德', '信', '义']
    }
};

// 生成名称
function generateNames() {
    const industry = document.querySelector('.industry-item.active').dataset.industry;
    const length = parseInt(document.querySelector('.length-item.active').dataset.length);
    const keywords = document.getElementById('keywords').value;
    
    const data = nameData[industry] || nameData.default;
    const names = [];
    
    for (let i = 0; i < 5; i++) {
        let name = '';
        const score = 85 + Math.floor(Math.random() * 14);
        
        if (length === 2) {
            name = randomPick(data.prefix) + randomPick(data.suffix);
        } else if (length === 3) {
            name = randomPick(data.prefix) + randomPick(data.middle) + randomPick(data.suffix);
        } else {
            name = randomPick(data.prefix) + randomPick(data.middle) + randomPick(data.middle) + randomPick(data.suffix);
        }
        
        // 如果有关键字，尝试融入
        if (keywords && Math.random() > 0.5) {
            const kw = keywords.charAt(Math.floor(Math.random() * keywords.length));
            name = name.substring(0, 1) + kw + name.substring(2);
        }
        
        names.push({
            name: name,
            score: score,
            meaning: generateMeaning(name),
            tags: generateTags()
        });
    }
    
    renderNames(names);
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
}

function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateMeaning(name) {
    const meanings = [
        `"${name}"寓意事业兴旺、财源广进，五行属性与店主命格相生相合。`,
        `此名蕴含吉祥如意之意，能够为店铺带来旺盛人气和财运。`,
        `"${name}"音韵和谐，朗朗上口，易于传播，有助于品牌推广。`,
        `名称五行生旺，与行业属性匹配，有助于事业顺利发展。`,
        `此名格局大气，既有传统韵味又不失现代感，适合长远发展。`
    ];
    return randomPick(meanings);
}

function generateTags() {
    const allTags = ['财运旺', '人气高', '易传播', '五行合', '音韵美', '格局大', '寓意好', '招财进宝'];
    const tags = [];
    for (let i = 0; i < 3; i++) {
        const tag = randomPick(allTags);
        if (!tags.includes(tag)) tags.push(tag);
    }
    return tags;
}

function renderNames(names) {
    const container = document.getElementById('nameList');
    container.innerHTML = names.map(n => `
        <div class="name-card">
            <div class="name-main">
                <span class="name-text">${n.name}</span>
                <span class="name-score">${n.score}分</span>
            </div>
            <p class="name-meaning">${n.meaning}</p>
            <div class="name-tags">
                ${n.tags.map(t => `<span class="name-tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}
