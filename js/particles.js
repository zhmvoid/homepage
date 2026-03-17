document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // 根据窗口大小调整 Canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    // 赛博朋克风色彩搭配: 天蓝, 荧光粉, 紫罗兰, 纯白
    const colors = ['#00f0ff', '#ff003c', '#be00ff', '#ffffff'];

    // 鼠标交互状态
    const mouse = {
        x: null,
        y: null,
        radius: 120 // 鼠标推开粒子的排斥半径
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // 鼠标移出屏幕时重置
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // 动态漂浮粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // 随机移动速度
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            // 粒子大小
            this.radius = Math.random() * 1.5 + 1;
            // 随机分配赛博朋克颜色
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            // 根据速度更新位置
            this.x += this.vx;
            this.y += this.vy;

            // 碰壁后自动反弹
            if (this.x < 0) {
                this.x = 0;
                this.vx *= -1;
            } else if (this.x > width) {
                this.x = width;
                this.vx *= -1;
            }

            if (this.y < 0) {
                this.y = 0;
                this.vy *= -1;
            } else if (this.y > height) {
                this.y = height;
                this.vy *= -1;
            }

            // 鼠标排斥交互模拟物理“斥力”
            if (mouse.x !== null && mouse.y !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const maxDistance = mouse.radius;
                    // 距离越近，受到的斥力越强
                    const force = (maxDistance - distance) / maxDistance;
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    
                    // 将粒子推开 (灵动的避让感)
                    const pushX = forceDirectionX * force * 4;
                    const pushY = forceDirectionY * force * 4;
                    
                    this.x += pushX;
                    this.y += pushY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            // 添加发光炫光特效
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
            ctx.fill();
            // 重置 shadow 避免影响连线绘制，提升性能
            ctx.shadowBlur = 0;
        }
    }

    // 初始化粒子群
    let particles = [];
    const maxParticles = 90; // 粒子数量
    const connectDistance = 120; // 星轨连线触发距离

    function init() {
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
    }

    init();

    // 动画主循环
    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            // 注意：因为画笔状态每次都需要重新设置，所以不影响彼此
            particles[i].draw();

            // 星轨状连线 (Constellation)
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // 当任意两个粒子靠得足够近时，它们之间会自动用半透明的线条连接起来
                if (distance < connectDistance) {
                    ctx.beginPath();
                    // 距离越近，线条越清晰 (透明度越高)
                    let opacity = 1 - (distance / connectDistance);
                    // 赛博朋克风浅蓝色透明连线
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.6})`;
                    ctx.lineWidth = 0.8;
                    
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});
