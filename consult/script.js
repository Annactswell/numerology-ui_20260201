// 自动调整输入框高度
const textarea = document.querySelector('.input-wrapper textarea');
const sendBtn = document.querySelector('.send-btn');
const chatArea = document.querySelector('.chat-area');
const quickQuestions = document.querySelector('.quick-questions');

textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    
    // 更新发送按钮状态
    sendBtn.disabled = !this.value.trim();
});

// 快捷问题点击 - 直接发送
document.querySelectorAll('.quick-item').forEach(item => {
    item.addEventListener('click', function() {
        const question = this.textContent;
        textarea.value = question;
        sendMessage();
    });
});

// 隐藏快捷问题
function hideQuickQuestions() {
    if (quickQuestions) {
        quickQuestions.style.display = 'none';
    }
}

// 显示快捷问题（移动到最后一条AI消息后面）
function showQuickQuestions() {
    if (quickQuestions) {
        quickQuestions.style.display = 'flex';
        // 确保快捷问题在聊天区域的最后
        chatArea.appendChild(quickQuestions);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

// 发送消息
function sendMessage() {
    const message = textarea.value.trim();
    if (!message) return;
    
    // 隐藏快捷问题
    hideQuickQuestions();
    
    // 添加用户消息
    addMessage(message, 'user');
    
    // 清空输入框
    textarea.value = '';
    textarea.style.height = 'auto';
    sendBtn.disabled = true;
    
    // 显示正在输入
    showTyping();
    
    // 模拟 AI 回复
    setTimeout(() => {
        hideTyping();
        const response = getAIResponse(message);
        addMessage(response, 'ai');
        // AI回复完成后显示快捷问题
        showQuickQuestions();
    }, 1500 + Math.random() * 1000);
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatarSvg = type === 'ai' 
        ? `<svg width="20" height="20" viewBox="0 0 48 48">
               <circle cx="24" cy="24" r="20" fill="none" stroke="#333" stroke-width="1.5"/>
               <path d="M24,4 A20,20 0 0,1 24,44 A10,10 0 0,1 24,24 A10,10 0 0,0 24,4" fill="#333"/>
               <circle cx="24" cy="14" r="2.5" fill="#fff"/>
               <circle cx="24" cy="34" r="2.5" fill="#333"/>
           </svg>`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
               <circle cx="12" cy="7" r="4"/>
               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
           </svg>`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarSvg}</div>
        <div class="message-content">${text}</div>
    `;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

let typingDiv = null;

function showTyping() {
    typingDiv = document.createElement('div');
    typingDiv.className = 'message ai';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#333" stroke-width="1.5"/>
                <path d="M24,4 A20,20 0 0,1 24,44 A10,10 0 0,1 24,24 A10,10 0 0,0 24,4" fill="#333"/>
                <circle cx="24" cy="14" r="2.5" fill="#fff"/>
                <circle cx="24" cy="34" r="2.5" fill="#333"/>
            </svg>
        </div>
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatArea.appendChild(typingDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function hideTyping() {
    if (typingDiv) {
        typingDiv.remove();
        typingDiv = null;
    }
}

// 模拟 AI 回复
function getAIResponse(question) {
    const responses = {
        '今天运势': '根据您的八字命盘分析，今日丙午日，火气旺盛。对于您而言，今日宜积极主动，把握机会。工作上可能会有突破性进展，但需注意情绪控制，避免急躁。财运平稳，感情方面宜主动表达。',
        '我的五行': '根据您的出生信息，您的八字五行分布为：金2、木1、水2、火1、土2。整体五行较为均衡，略显金水旺盛。建议在日常生活中可以适当增加木、火元素的物品或颜色，以达到更好的五行平衡。',
        '姻缘何时': '从您的命盘来看，感情宫位有吉星照耀。今年下半年桃花运较旺，尤其是农历七、八月份，有望遇到心仪之人。建议多参加社交活动，保持开放心态。已有对象者，今年感情稳定，有望更进一步。',
        '事业建议': '根据您的命格分析，您具有较强的领导才能和创新思维。目前大运走正财运，事业发展前景良好。建议把握2026-2028年的黄金发展期，可考虑拓展新业务或寻求晋升机会。需注意与同事关系的维护。'
    };
    
    // 简单匹配
    for (const [key, value] of Object.entries(responses)) {
        if (question.includes(key) || key.includes(question.substring(0, 2))) {
            return value;
        }
    }
    
    // 默认回复
    return '感谢您的提问。根据命理学原理，每个人的命运都是独特的。如果您能提供更详细的出生信息（年、月、日、时），我可以为您进行更精准的分析。您也可以尝试询问关于运势、五行、姻缘、事业等具体方面的问题。';
}

// 发送按钮点击
sendBtn.addEventListener('click', sendMessage);

// 回车发送
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 初始化
sendBtn.disabled = true;
