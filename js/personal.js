document.addEventListener('DOMContentLoaded', () => {
    // 创建自定义光标元素
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // 鼠标移动跟随
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    });

    // 获取所有交互元素
    // 包括返回按钮、卡片、标签、头像容器等
    const hoverTargets = document.querySelectorAll('a, button, .nav-tab, .lang-btn, .back-btn, .card-scene, .tags span, .avatar-container');

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // --- 卡片点击翻转逻辑 ---
    const cards = document.querySelectorAll('.card-scene');
    const flipSound = document.getElementById('flipSound');

    cards.forEach(scene => {
        scene.addEventListener('click', () => {
            const cardInner = scene.querySelector('.card');
            if (cardInner) {
                cardInner.classList.toggle('flipped');

                // 播放机械音效
                if (flipSound) {
                    flipSound.currentTime = 0; // 重置进度，实现快速连点重播
                    flipSound.play().catch(e => console.log('Audio play failed:', e));
                }
            }
        });
    });

    // --- 页面 Tab 切换逻辑 ---
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.page-section');
    const switchToResumeBtn = document.querySelector('.switch-to-resume'); // "关于我"卡片里的链接

    function switchTab(targetId) {
        // 1. 切换 Tab 样式
        tabs.forEach(tab => {
            if (tab.dataset.target === targetId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // 2. 切换内容显示
        sections.forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === targetId) {
                sec.classList.add('active');
            }
        });

        // 3. 切换背景模式
        if (targetId === 'resume-section') {
            document.body.classList.add('resume-mode-bg');
        } else {
            document.body.classList.remove('resume-mode-bg');
        }
    }

    // 导航栏点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            switchTab(targetId);
        });
    });

    // 卡片内部链接点击切换到简历 Tab
    if (switchToResumeBtn) {
        switchToResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('resume-section');
        });
    }

    // --- 语言切换逻辑 ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('.t-text');

    function setLanguage(lang) {
        // 1. 更新按钮状态
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 2. 更新文本内容
        translatableElements.forEach(el => {
            if (el.dataset[lang]) {
                el.innerText = el.dataset[lang];
            }
        });
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });

    // 默认初始语言设为英文
    setLanguage('en');
});