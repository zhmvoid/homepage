// 等待 HTML 加载完毕后执行
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 鼠标跟随光标逻辑 ---
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // 移动效果
    document.addEventListener('mousemove', (e) => {
        // 使用 translate3d 提升性能
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    });

    // 悬停交互效果 (针对所有链接和按钮)
    const hoverTargets = document.querySelectorAll('a, button, .enter-btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // 隐藏默认鼠标 (可选，这里仅在 CSS 中不强制隐藏，保留用户习惯)
    // document.body.style.cursor = 'none'; 

    // --- 2. 滚动动画逻辑 ---
    const carContainer = document.getElementById('carContainer');
    const frontWheel = document.getElementById('frontWheel');
    const rearWheel = document.getElementById('rearWheel');
    const carReflection = document.getElementById('carReflection');
    const rearWheelReflection = document.getElementById('rearWheelReflection');
    const frontWheelReflection = document.getElementById('frontWheelReflection');
    const revealSection = document.getElementById('revealSection');
    const scrollHintText = document.querySelector('.hint-text');
    const topRightBtn = document.querySelector('.top-right-btn');

    window.addEventListener('scroll', () => {
        // 1. 获取当前滚动距离和最大可滚动距离
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        // 2. 计算滚动进度比例 (范围 0 到 1)
        // 防止 maxScroll 为 0 导致的报错
        const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        // 3. 设定动画参数
        // 赛车需要移动的距离 (vw = 视窗宽度的百分比)
        // 从左侧(-25vw)出发，调整移动距离以确保平滑驶出
        const moveDistanceX = scrollProgress * 145; 
        
        // 车轮旋转的角度 (乘以 1440 意味着从页面顶端滚到底部时，车轮正好转 4 圈)
        const rotationAngle = scrollProgress * 1440; 

        // 计算新页面揭示的宽度
        // 赛车初始位置现在是 left: -25% (约为 -25vw)
        // 我们希望白色背景跟随赛车的“车尾”或“中心”出现
        // 计算公式：初始偏移(-25) + 移动距离(moveDistanceX) + 微调偏移(5)
        const revealWidth = -25 + moveDistanceX + 5;
        // 限制宽度最小为0，最大为100
        revealSection.style.width = `${Math.max(0, Math.min(100, revealWidth))}vw`;

        // 4. 将计算结果应用到 CSS 的 transform 属性上
        // 注意：carContainer 原本有 translateY(-50%) 用于垂直居中，这里必须保留
        carContainer.style.transform = `translateY(-80%) translateX(${moveDistanceX}vw)`;
        
        // 分别旋转前后车轮
        frontWheel.style.transform = `rotate(${rotationAngle}deg)`;
        rearWheel.style.transform = `rotate(${rotationAngle}deg)`;

        // 轮胎倒影也旋转
        if (frontWheelReflection) {
            frontWheelReflection.style.transform = `scaleY(-1) rotate(${rotationAngle}deg)`;
        }
        if (rearWheelReflection) {
            rearWheelReflection.style.transform = `scaleY(-1) rotate(${rotationAngle}deg)`;
        }

        // 倒影保持翻转状态，跟随容器移动，无需额外transform

        // 5. 顶部提示文字随着滚动逐渐消失
        if (scrollHintText) {
            // 设置淡出速度：乘以 5 意味着滚动页面 20% 的距离时，提示文字完全消失（比原来快一倍）
            scrollHintText.style.opacity = Math.max(0, 1 - scrollProgress * 2);
        }

        // 6. 右上角按钮随着滚动逐渐消失
        if (topRightBtn) {
            topRightBtn.style.opacity = Math.max(0, 1 - scrollProgress * 2);
        }
    });
});