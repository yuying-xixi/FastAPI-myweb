(() => {
    const storedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    // 定义一个applyTheme函数，接受theme参数
    const applyTheme = (theme) => {
        if (theme === 'auto') {
            //   判断系统色
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
        } else {
            root.setAttribute('data-bs-theme', theme);
        }
    };

    // 高亮导航栏
    const dropdownItems = document.querySelectorAll('[data-bs-theme-value]');
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const theme = item.getAttribute('data-bs-theme-value');
            localStorage.setItem('theme', theme);
            dropdownItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            applyTheme(theme);
        });
    });

    applyTheme(storedTheme || 'auto');

    // Detect system theme changes (auto mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((localStorage.getItem('theme') || 'auto') === 'auto') {
            applyTheme('auto');
        }
    });
})();

// 等待页面加载完成
document.addEventListener("DOMContentLoaded", function () {
    // 获取导航栏的a标签集合
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    // 获取主要内容的标签
    const sections = document.querySelectorAll(".container div[data-section]");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
           navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
            const target = link.dataset.section; // 获取link的data-section属性
            // 移除所有的内容标签
            sections.forEach(section => {section.style.display = "none"})

            sections.forEach(section => {
            if (section.dataset.section === target) {
                section.style.display = "block";
            }
            })

        });
    })
})
