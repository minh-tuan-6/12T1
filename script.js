// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo AOS
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 100
    });

    // Khởi tạo particles
    initParticles();

    // Khởi tạo navigation
    initNavigation();

    // Khởi tạo modal
    initModal();

    // Khởi tạo back to top button
    initBackToTop();

    // Khởi tạo floating icons
    initFloatingIcons();

    // Khởi tạo card hover effects
    initCardEffects();

    // Khởi tạo timeline animation
    initTimeline();

    // Khởi tạo scroll animations
    initScrollAnimations();

    // Khởi tạo detail modal system
    initDetailModal();
});

// Detail Modal System
function initDetailModal() {
    const detailModal = document.getElementById('detailModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const modalHomeBtn = document.getElementById('modalHomeBtn');
    
    let currentModalId = null;
    let modalHistory = [];
    let isModalLoading = false;

    // Sự kiện mở modal
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalId = this.getAttribute('data-modal');
            openDetailModal(modalId);
        });
    });

    // Mở modal
    function openDetailModal(modalId) {
        if (isModalLoading) return;
        
        currentModalId = modalId;
        modalHistory.push(modalId);
        
        // Hiển thị modal
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load nội dung
        loadModalContent(modalId);
        
        // Cập nhật navigation
        updateModalNavigation();
    }

    // Đóng modal
    function closeDetailModal() {
        detailModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset sau 300ms
        setTimeout(() => {
            modalBody.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Đang tải kỷ niệm...</p>
                </div>
            `;
            currentModalId = null;
            modalHistory = [];
        }, 300);
    }

    // Load nội dung modal
    function loadModalContent(modalId) {
        isModalLoading = true;
        
        // Hiển thị loading
        modalBody.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Đang tải kỷ niệm...</p>
            </div>
        `;
        
        // Dữ liệu mẫu cho từng modal
        const modalData = getModalData(modalId);
        
        // Simulate loading delay
        setTimeout(() => {
            modalTitle.textContent = modalData.title;
            modalBody.innerHTML = createModalContent(modalData);
            isModalLoading = false;
            
            // Thêm sự kiện cho các nút liên quan trong modal
            attachModalEvents();
        }, 500);
    }

    // Lấy dữ liệu cho modal
    function getModalData(modalId) {
        const dataMap = {
            '1': {
                title: 'Câu Chuyện Về Người Thầy Đầu Tiên',
                image: '1.jpg',
                content: `
                    <div class="modal-detail-header">
                        <h1 class="modal-detail-title">Câu Chuyện Về Người Thầy Đầu Tiên</h1>
                        <p class="modal-detail-subtitle">Kỷ niệm sâu sắc với thầy chủ nhiệm lớp 12 Toán 1 - Người đã dìu dắt chúng tôi suốt ba năm học</p>
                    </div>
                    
                    <div class="modal-detail-image-container">
                        <img src="1.jpg" alt="Thầy chủ nhiệm" class="modal-detail-image">
                    </div>
                    
                    <div class="modal-detail-text">
                        <h2>Người Thầy Đặc Biệt</h2>
                        <p>Thầy Nguyễn Văn A - người thầy chủ nhiệm lớp 12 Toán 1, không chỉ là một giáo viên dạy Toán xuất sắc mà còn là người cha thứ hai của chúng tôi trong suốt ba năm học dưới mái trường THPT.</p>
                        
                        <p>Tôi còn nhớ như in ngày đầu tiên thầy bước vào lớp với nụ cười ấm áp. Thầy nói: "Các em ạ, Toán học không chỉ là những con số khô khan. Nó là ngôn ngữ của vũ trụ, là công cụ để các em thay đổi thế giới." Những lời nói đó đã thắp lên trong chúng tôi ngọn lửa đam mê với môn Toán.</p>
                        
                        <p>Thầy không bao giờ đến muộn, dù trời mưa to hay nắng gắt. Mỗi bài giảng của thầy đều được chuẩn bị công phu, từ những công thức cơ bản nhất đến những bài toán nâng cao. Thầy luôn kiên nhẫn giải thích cho từng học sinh, không bao giờ tỏ ra mệt mỏi hay khó chịu.</p>
                    </div>
                    
                    <div class="modal-detail-meta">
                        <div class="modal-meta-item">
                            <i class="far fa-calendar"></i>
                            <span>Ngày: 15/11/2024</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="far fa-clock"></i>
                            <span>Đọc: 5 phút</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="fas fa-user-graduate"></i>
                            <span>Tác giả: Học sinh 12T1</span>
                        </div>
                    </div>
                `,
                related: ['2', '3', '12']
            },
            '2': {
                title: 'Chuyến Đi Sầm Sơn Đầu Tiên',
                image: '2.jpg',
                content: `
                    <div class="modal-detail-header">
                        <h1 class="modal-detail-title">Chuyến Đi Sầm Sơn Đầu Tiên</h1>
                        <p class="modal-detail-subtitle">Kỷ niệm đáng nhớ tại bãi biển Sầm Sơn - Chuyến dã ngoại đầu tiên của lớp 12 Toán 1</p>
                    </div>
                    
                    <div class="modal-detail-image-container">
                        <img src="2.jpg" alt="Biển Sầm Sơn" class="modal-detail-image">
                    </div>
                    
                    <div class="modal-detail-text">
                        <h2>Khởi Đầu Hành Trình</h2>
                        <p>Tháng 9/2023, ngay sau lễ khai giảng, cả lớp chúng tôi đã có chuyến dã ngoại đầu tiên đến bãi biển Sầm Sơn. Đây là chuyến đi xa đầu tiên của nhiều bạn trong lớp, và nó đã để lại những kỷ niệm không thể nào quên.</p>
                        
                        <p>Chúng tôi khởi hành từ rất sớm, trên chuyến xe đầy ắp tiếng cười và bài hát. Thầy chủ nhiệm đã chuẩn bị rất nhiều trò chơi thú vị để chúng tôi làm quen với nhau tốt hơn.</p>
                        
                        <p>Khi đến biển, cả lớp như được "thả" ra khỏi khuôn khổ trường học. Những trò chơi tập thể, những bữa ăn ngon lành, và đặc biệt là khoảnh khắc ngắm hoàng hôn trên biển đã trở thành ký ức đẹp mãi trong lòng mỗi người.</p>
                    </div>
                    
                    <div class="modal-detail-meta">
                        <div class="modal-meta-item">
                            <i class="far fa-calendar"></i>
                            <span>Tháng 9/2023</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="fas fa-users"></i>
                            <span>45 thành viên</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Sầm Sơn, Thanh Hóa</span>
                        </div>
                    </div>
                `,
                related: ['5', '9', '10']
            },
            '3': {
                title: 'Giờ Toán Đầu Tiên Năm Lớp 12',
                image: '3.jpg',
                content: `
                    <div class="modal-detail-header">
                        <h1 class="modal-detail-title">Giờ Toán Đầu Tiên Năm Lớp 12</h1>
                        <p class="modal-detail-subtitle">Bài học đầu tiên với thầy chủ nhiệm - Khởi đầu hành trình ôn thi đại học</p>
                    </div>
                    
                    <div class="modal-detail-image-container">
                        <img src="3.jpg" alt="Giờ học Toán" class="modal-detail-image">
                    </div>
                    
                    <div class="modal-detail-text">
                        <h2>Bài Học Đáng Nhớ</h2>
                        <p>Giờ Toán đầu tiên của năm lớp 12 diễn ra trong không khí vừa háo hức vừa lo lắng. Thầy chủ nhiệm bước vào lớp với nụ cười ấm áp và bắt đầu bài giảng bằng câu nói: "Năm nay sẽ là năm khó khăn, nhưng thầy tin các em sẽ làm được."</p>
                        
                        <p>Thầy không chỉ dạy kiến thức mà còn chia sẻ phương pháp học tập, cách quản lý thời gian, và quan trọng nhất là tâm lý vững vàng trước kỳ thi. Mỗi bài toán thầy giảng không chỉ là lời giải, mà còn là bài học về sự kiên trì và logic.</p>
                        
                        <p>Giờ học kết thúc với lời hứa từ thầy: "Thầy sẽ đồng hành cùng các em suốt năm học này. Chúng ta cùng nhau cố gắng!" Những lời nói đó đã tiếp thêm động lực cho cả lớp.</p>
                    </div>
                    
                    <div class="modal-detail-meta">
                        <div class="modal-meta-item">
                            <i class="far fa-calendar"></i>
                            <span>Tháng 9/2023</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="far fa-clock"></i>
                            <span>45 phút</span>
                        </div>
                        <div class="modal-meta-item">
                            <i class="fas fa-chalkboard-teacher"></i>
                            <span>Thầy Nguyễn Văn A</span>
                        </div>
                    </div>
                `,
                related: ['1', '4', '12']
            },
            // Thêm dữ liệu cho các modal khác tương tự
            '4': {
                title: 'Lễ Khai Giảng Năm Học Cuối Cấp',
                image: '4.jpg',
                content: 'Nội dung chi tiết cho ảnh 4...',
                related: ['1', '3', '6']
            },
            '5': {
                title: 'Hoạt Động Teambuilding',
                image: '5.jpg',
                content: 'Nội dung chi tiết cho ảnh 5...',
                related: ['2', '9', '11']
            },
            '6': {
                title: 'Giờ Thể Dục Đầy Nhiệt Huyết',
                image: '6.jpg',
                content: 'Nội dung chi tiết cho ảnh 6...',
                related: ['3', '4', '12']
            },
            '9': {
                title: 'Đêm Lửa Trại Đáng Nhớ',
                image: '9.jpg',
                content: 'Nội dung chi tiết cho ảnh 9...',
                related: ['2', '5', '10']
            },
            '10': {
                title: 'Khám Phá Vườn Quốc Gia',
                image: '10.jpg',
                content: 'Nội dung chi tiết cho ảnh 10...',
                related: ['2', '5', '9']
            },
            '11': {
                title: 'Những Khoảnh Khắc Hài Hước',
                image: '11.jpg',
                content: 'Nội dung chi tiết cho ảnh 11...',
                related: ['2', '5', '9']
            },
            '12': {
                title: 'Giờ Văn Cuối Cùng Đầy Cảm Xúc',
                image: '12.jpg',
                content: 'Nội dung chi tiết cho ảnh 12...',
                related: ['1', '3', '6']
            }
        };

        return dataMap[modalId] || {
            title: 'Kỷ Niệm Đáng Nhớ',
            image: 'default.jpg',
            content: '<p>Đang tải nội dung...</p>',
            related: []
        };
    }

    // Tạo nội dung modal
    function createModalContent(data) {
        let relatedHTML = '';
        
        if (data.related && data.related.length > 0) {
            relatedHTML = `
                <div class="modal-related-memories">
                    <h3 class="modal-related-title">Những Kỷ Niệm Liên Quan</h3>
                    <div class="modal-related-grid">
            `;
            
            data.related.forEach(relatedId => {
                const relatedData = getModalData(relatedId);
                relatedHTML += `
                    <div class="modal-related-card" data-modal="${relatedId}">
                        <img src="${relatedData.image}" alt="${relatedData.title}">
                        <div class="modal-related-card-content">
                            <h3>${relatedData.title}</h3>
                            <p>${relatedData.content.substring(0, 100)}...</p>
                        </div>
                    </div>
                `;
            });
            
            relatedHTML += `
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="modal-detail-content">
                ${data.content}
                ${relatedHTML}
            </div>
        `;
    }

    // Cập nhật navigation buttons
    function updateModalNavigation() {
        if (!currentModalId) return;
        
        const currentId = parseInt(currentModalId);
        const prevId = currentId - 1;
        const nextId = currentId + 1;
        
        // Cập nhật nút Previous
        if (prevId >= 1) {
            prevBtn.disabled = false;
            prevBtn.onclick = () => openDetailModal(prevId.toString());
        } else {
            prevBtn.disabled = true;
            prevBtn.onclick = null;
        }
        
        // Cập nhật nút Next
        if (nextId <= 12) {
            nextBtn.disabled = false;
            nextBtn.onclick = () => openDetailModal(nextId.toString());
        } else {
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
        
        // Nút Home
        modalHomeBtn.onclick = closeDetailModal;
    }

    // Thêm sự kiện cho các phần tử trong modal
    function attachModalEvents() {
        // Sự kiện cho các card liên quan
        document.querySelectorAll('.modal-related-card').forEach(card => {
            card.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                openDetailModal(modalId);
            });
        });
        
        // Sự kiện click ảnh để phóng to
        const modalImage = document.querySelector('.modal-detail-image');
        if (modalImage) {
            modalImage.addEventListener('click', function() {
                this.classList.toggle('zoomed');
            });
        }
    }

    // Sự kiện đóng modal
    modalClose.addEventListener('click', closeDetailModal);
    modalOverlay.addEventListener('click', closeDetailModal);
    modalHomeBtn.addEventListener('click', closeDetailModal);

    // Đóng modal bằng phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detailModal.classList.contains('active')) {
            closeDetailModal();
        }
        
        // Navigation bằng phím mũi tên
        if (detailModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
                const currentId = parseInt(currentModalId);
                openDetailModal((currentId - 1).toString());
            }
            
            if (e.key === 'ArrowRight' && !nextBtn.disabled) {
                const currentId = parseInt(currentModalId);
                openDetailModal((currentId + 1).toString());
            }
        }
    });

    // Prevent body scroll when modal is open
    detailModal.addEventListener('wheel', function(e) {
        if (e.target.closest('.modal-body')) {
            e.stopPropagation();
        }
    });

    // Thêm CSS cho ảnh phóng to
    const zoomStyle = document.createElement('style');
    zoomStyle.textContent = `
        .modal-detail-image.zoomed {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            z-index: 3000;
            background: rgba(0, 0, 0, 0.9);
            cursor: zoom-out;
            padding: 20px;
        }
        
        .modal-detail-image {
            cursor: zoom-in;
            transition: transform 0.3s ease;
        }
        
        .modal-detail-image:hover:not(.zoomed) {
            transform: scale(1.02);
        }
    `;
    document.head.appendChild(zoomStyle);
}

// Particles background
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const colors = ['#6a11cb', '#2575fc', '#ff6b6b', '#00b09b', '#ffa500'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animation
        particle.style.animation = `floatParticle ${duration}s ease-in-out infinite ${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                transform: translate(100px, -100px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translate(0, -200px) rotate(180deg);
                opacity: 0.1;
            }
            75% {
                transform: translate(-100px, -100px) rotate(270deg);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// Navigation
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Toggle menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal cho viết thư tri ân
function initModal() {
    const writeLetterBtn = document.getElementById('writeLetterBtn');
    const letterModal = document.getElementById('letterModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (!writeLetterBtn) return;
    
    // Open modal
    writeLetterBtn.addEventListener('click', function() {
        letterModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    function closeModal() {
        letterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    letterModal.addEventListener('click', function(e) {
        if (e.target === letterModal) {
            closeModal();
        }
    });
    
    // Submit letter
    submitBtn.addEventListener('click', function() {
        const letterText = document.getElementById('letterText').value;
        
        if (letterText.trim()) {
            alert('Cảm ơn bạn đã gửi lời tri ân đến thầy cô! Lời nhắn của bạn đã được lưu lại.');
            document.getElementById('letterText').value = '';
            closeModal();
        } else {
            alert('Vui lòng viết lời tri ân của bạn trước khi gửi!');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && letterModal.style.display === 'flex') {
            closeModal();
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Floating icons
function initFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach(icon => {
        // Random movement
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        icon.style.animation = `floatAround ${duration}s linear infinite ${delay}s`;
        
        // Random color on hover
        icon.addEventListener('mouseenter', function() {
            const colors = ['#6a11cb', '#2575fc', '#ff6b6b', '#00b09b', '#ffa500'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.color = randomColor;
            this.style.transform = 'scale(1.5)';
            this.style.opacity = '1';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = '';
            this.style.opacity = '0.3';
        });
    });
}

// Card effects
function initCardEffects() {
    const cards = document.querySelectorAll('.memory-card');
    
    cards.forEach(card => {
        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
        
        // Click to flip
        card.addEventListener('click', function(e) {
            if (e.target.closest('.detail-link') || e.target.closest('.gallery-link')) return;
            
            const wrapper = this.querySelector('.card-wrapper');
            wrapper.style.transform = wrapper.style.transform.includes('rotateY(180deg)') ? 
                'rotateY(0deg)' : 
                'rotateY(180deg)';
        });
    });
}

// Timeline animation
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        
        observer.observe(item);
    });
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Thêm CSS cho nút chi tiết nhỏ
const detailLinkStyle = document.createElement('style');
detailLinkStyle.textContent = `
    .detail-link.small {
        padding: 8px 15px;
        font-size: 0.9rem;
        margin-top: 10px;
    }
    
    button.detail-link {
        background: var(--gradient);
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: var(--transition);
        font-family: 'Poppins', sans-serif;
    }
    
    button.detail-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(106, 17, 203, 0.3);
    }
    
    button.gallery-link {
        background: var(--gradient);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    button.gallery-link:hover {
        transform: rotate(90deg) scale(1.1);
        background: var(--gradient-2);
    }
`;
document.head.appendChild(detailLinkStyle);