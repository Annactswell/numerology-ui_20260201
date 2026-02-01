// 星座选择
document.querySelectorAll('.zodiac-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.zodiac-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // 更新今日运势显示
        const sign = this.dataset.sign;
        updateFortune(sign);
    });
});

// 更新运势显示
function updateFortune(sign) {
    const zodiacData = {
        aries: { name: '白羊座', symbol: '♈', overall: 85, love: 75, career: 90, wealth: 70 },
        taurus: { name: '金牛座', symbol: '♉', overall: 78, love: 82, career: 75, wealth: 88 },
        gemini: { name: '双子座', symbol: '♊', overall: 82, love: 70, career: 85, wealth: 75 },
        cancer: { name: '巨蟹座', symbol: '♋', overall: 75, love: 88, career: 72, wealth: 68 },
        leo: { name: '狮子座', symbol: '♌', overall: 90, love: 78, career: 92, wealth: 85 },
        virgo: { name: '处女座', symbol: '♍', overall: 72, love: 65, career: 80, wealth: 78 },
        libra: { name: '天秤座', symbol: '♎', overall: 80, love: 85, career: 78, wealth: 72 },
        scorpio: { name: '天蝎座', symbol: '♏', overall: 88, love: 80, career: 88, wealth: 82 },
        sagittarius: { name: '射手座', symbol: '♐', overall: 85, love: 72, career: 82, wealth: 90 },
        capricorn: { name: '摩羯座', symbol: '♑', overall: 78, love: 68, career: 88, wealth: 85 },
        aquarius: { name: '水瓶座', symbol: '♒', overall: 82, love: 75, career: 80, wealth: 70 },
        pisces: { name: '双鱼座', symbol: '♓', overall: 75, love: 92, career: 70, wealth: 65 }
    };
    
    const data = zodiacData[sign];
    if (!data) return;
    
    // 更新UI
    document.querySelector('.zodiac-big').textContent = data.symbol;
    document.querySelector('.fortune-title h3').textContent = data.name;
    
    const fills = document.querySelectorAll('.item-fill');
    fills[0].style.width = data.overall + '%';
    fills[1].style.width = data.love + '%';
    fills[2].style.width = data.career + '%';
    fills[3].style.width = data.wealth + '%';
}
