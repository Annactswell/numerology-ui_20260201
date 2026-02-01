// 塔罗牌数据
const tarotCards = [
    { name: '愚者', en: 'The Fool', keywords: ['新开始', '冒险', '纯真'], 
      meaning: '新的开始、冒险精神、纯真无邪。代表你正处于人生新阶段的起点，充满无限可能。',
      advice: '相信自己的直觉，勇敢迈出第一步。不要过度担忧未知，保持开放的心态去迎接新的机遇。' },
    { name: '魔术师', en: 'The Magician', keywords: ['创造力', '技能', '意志力'],
      meaning: '你拥有实现目标所需的一切资源和能力，现在是将想法付诸行动的最佳时机。',
      advice: '善用你的才能和资源，专注于目标。你有能力创造奇迹，但需要保持专注和行动力。' },
    { name: '女祭司', en: 'The High Priestess', keywords: ['直觉', '神秘', '内在智慧'],
      meaning: '倾听内心的声音，答案就在你心中。这是一个需要静心思考和信任直觉的时期。',
      advice: '放慢脚步，向内探索。有些事情现在还不适合公开或行动，耐心等待时机成熟。' },
    { name: '女皇', en: 'The Empress', keywords: ['丰盛', '创造', '母性'],
      meaning: '丰收与创造的能量环绕着你，无论是物质还是情感层面都将迎来丰盛。',
      advice: '滋养自己和身边的人，享受生活的美好。创意项目将会开花结果。' },
    { name: '皇帝', en: 'The Emperor', keywords: ['权威', '结构', '稳定'],
      meaning: '建立秩序和结构的时候到了，你需要展现领导力和果断的决策能力。',
      advice: '制定清晰的计划和规则，用理性思维处理问题。建立稳固的基础比冒进更重要。' },
    { name: '恋人', en: 'The Lovers', keywords: ['爱情', '选择', '和谐'],
      meaning: '重要的选择和关系正在你面前，需要你用心去感受和抉择。',
      advice: '遵循内心的真实感受做出选择，无论是感情还是其他重要决定，真诚是关键。' },
    { name: '战车', en: 'The Chariot', keywords: ['胜利', '决心', '自制'],
      meaning: '凭借坚定的意志和明确的方向，你将克服障碍取得胜利。',
      advice: '保持专注和自律，不要被外界干扰。胜利属于那些坚持到底的人。' },
    { name: '力量', en: 'Strength', keywords: ['勇气', '耐心', '内在力量'],
      meaning: '真正的力量来自内心的平静和对自己的掌控，而非外在的强势。',
      advice: '用温柔和耐心处理困难，相信自己拥有克服一切挑战的内在力量。' },
    { name: '星星', en: 'The Star', keywords: ['希望', '灵感', '宁静'],
      meaning: '希望与治愈的能量正在到来，经历风雨后终将见到彩虹。',
      advice: '保持乐观和信念，宇宙正在为你安排最好的结果。这是疗愈和重建信心的时期。' },
    { name: '太阳', en: 'The Sun', keywords: ['快乐', '成功', '活力'],
      meaning: '光明、快乐和成功正在向你走来，这是充满积极能量的美好时期。',
      advice: '享受生活的美好，分享你的快乐。保持孩子般的纯真和热情，好事将会发生。' }
];

// 牌阵选择
document.querySelectorAll('.spread-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.spread-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});

// 问题类型选择
document.querySelectorAll('.question-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.question-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 抽牌
function drawCard() {
    const deck = document.getElementById('cardDeck');
    const drawSection = document.getElementById('drawSection');
    const resultSection = document.getElementById('resultSection');
    
    // 动画效果
    deck.style.transform = 'scale(0.95)';
    setTimeout(() => {
        deck.style.transform = 'scale(1)';
    }, 100);
    
    // 随机选择一张牌
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    const isUpright = Math.random() > 0.3; // 70%概率正位
    
    // 更新结果
    document.getElementById('resultTitle').textContent = `${randomCard.name} (${randomCard.en})`;
    document.getElementById('resultPosition').textContent = isUpright ? '正位' : '逆位';
    document.getElementById('resultMeaning').textContent = randomCard.meaning;
    document.getElementById('resultAdvice').textContent = randomCard.advice;
    document.getElementById('cardName').textContent = randomCard.name;
    
    const keywordsHtml = randomCard.keywords.map(k => `<span>${k}</span>`).join('');
    document.getElementById('resultKeywords').innerHTML = keywordsHtml;
    
    // 显示结果
    setTimeout(() => {
        drawSection.style.display = 'none';
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
}

// 重新抽牌
function resetDraw() {
    document.getElementById('drawSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('drawSection').scrollIntoView({ behavior: 'smooth' });
}
