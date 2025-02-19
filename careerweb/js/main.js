// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    function handleNavScroll() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255,255,255,0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'rgba(255,255,255,0.95)';
            nav.style.boxShadow = 'none';
        }
    }
    window.addEventListener('scroll', handleNavScroll);

    // 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 工作岗位筛选功能
    const jobCards = document.querySelectorAll('.job-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的活跃状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的活跃状态
            this.classList.add('active');

            const filterValue = this.textContent.trim();

            jobCards.forEach(card => {
                if (filterValue === '全部职位') {
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 100);
                } else {
                    if (card.querySelector('h3').textContent.includes(filterValue)) {
                        card.style.display = 'block';
                        // 添加淡入动画
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // 工作卡片悬停效果增强
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        });
    });

    // 表单验证功能
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // 验证表单
            let isValid = true;
            const errors = {};

            // 验证手机号
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phoneRegex.test(formObject.phone)) {
                errors.phone = '请输入有效的手机号码';
                isValid = false;
            }

            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.email && !emailRegex.test(formObject.email)) {
                errors.email = '请输入有效的邮箱地址';
                isValid = false;
            }

            // 显示错误信息或提交表单
            if (!isValid) {
                Object.keys(errors).forEach(key => {
                    const errorElement = document.querySelector(`#${key}Error`);
                    if (errorElement) {
                        errorElement.textContent = errors[key];
                        errorElement.style.display = 'block';
                    }
                });
            } else {
                // 模拟表单提交
                showMessage('提交成功！我们会尽快与您联系。', 'success');
                this.reset();
            }
        });
    }

    // 消息提示功能
    function showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        // 样式设置
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '5px',
            backgroundColor: type === 'success' ? '#4CAF50' : '#2196F3',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        // 显示消息
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 100);

        // 3秒后隐藏消息
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // 返回顶部按钮
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        Object.assign(button.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            zIndex: '999',
            fontSize: '20px'
        });

        document.body.appendChild(button);

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });
    };

    createBackToTopButton();
});