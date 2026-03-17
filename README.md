# Driver Hengmao's Personal Homepage 🏎️

> 热爱速度与代码。在这里，我记录我的技术旅程和对赛车运动的狂热。每一行代码都是一次完美的进站，每一个项目都是一场大奖赛。

这是我的个人网站[点击访问](https://zhmvoid.github.io/homepage/)，采用了**F1 赛车（法拉利）** 为核心主题。项目包含一个基于滚动驱动动画的炫酷引导页，以及一个支持 3D 交互、中英文切换的“赛车手休息室（Pilot's Lounge）”和个人简历页面。

## ✨ 核心特性

- **🏎️ 沉浸式 F1 滚动引导页**
  - 巧妙运用原生 JavaScript 监听滚动条，实现法拉利赛车跟随滚动前进的视觉特效。
  - 动态透明度遮罩和揭示层，以强烈的速度感引导访客进入主页。

- **🪪 赛车手空间 (Pilot's Lounge) & 互动卡片**
  - **3D 翻转卡片**: 展示个人简介、技术栈、生涯数据和精彩瞬间（点击翻转附带机械音效）。
  - **动态背景与自定义光标**: 支持平移视角的发光网格背景，以及全局红色的自定义鼠标光标。
  - **中英双语切换**: 提供中英文双语一键切换，展示国际化视野。

- **📄 在线专业简历**
  - 支持从暗黑赛车主题平滑过渡至阅读友好的浅色背景简历模式。
  - 详细展示了教育背景（东南大学）、核心能力、以及含金量极高的科研项目（深度学习影像诊断、超高维场景缩减算法、多任务智能交通监控）和学科竞赛荣誉。

## 🛠️ 技术栈

本项目坚持 “Less is more” 的原则，摒弃了臃肿的框架，回归前端本质技术：

- **核心语言**: HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+)
- **布局技术**: Flexbox, CSS Grid
- **动效与视觉**: CSS 3D Transforms (`perspective`, `rotateY`), 贝塞尔曲线过渡 (`cubic-bezier`), DOM 交互动画
- **架构思想**: 原生状态管理、CSS 变量驱动的主题切换、模块化样式拆分

## 🚀 快速开始

本项目为纯静态前端项目，无需任何运行环境（Node.js 或打包工具）即可直接运行：

1. **克隆项目**
   ```bash
   git clone https://github.com/zhmvoid/homepage.git
   cd homepage
   ```
2. **预览页面**
   直接用任意现代浏览器（推荐 Chrome / Edge）双击打开根目录下的 `index.html`。
   > 若需二次开发，推荐使用 VS Code 配合 Live Server 插件进行热更新预览。

## 📁 目录结构

```text
homepage/
├── index.html              # F1 动态滚动引导页
├── pages/
│   └── personal.html       # 个人主页与在线简历容器
├── css/
│   ├── style.css           # 引导页样式组件
│   ├── personal-style.css  # 赛车手空间 3D 卡片与全局动效逻辑
│   └── resume-style.css    # 简历排版布局与响应式样式
├── js/
│   ├── script.js           # 引导页滚动监听引擎
│   └── personal.js         # Tab 切换、语言切换及交互音效控制
├── images/                 # 图形与照片资产
└── sounds/                 # UI 交互音效 (卡片翻转等)
```

## 👨‍💻 关于作者

- **GitHub**: [@zhmvoid](https://github.com/zhmvoid)
- **Email**: [hengmao.zh@outlook.com](mailto:hengmao.zh@outlook.com)

---

*Designed & Coded with passion by Driver Zhuanz. Keep racing! 🏁*
