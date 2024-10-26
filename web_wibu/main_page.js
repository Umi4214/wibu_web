window.addEventListener('scroll', function() {
    var bottomNav = document.querySelector('.bottom-nav');
    var banner = document.querySelector('.banner');
    var topNav = document.querySelector('.top-nav');
    var aside = document.querySelector('aside');
    var main = document.querySelector('main');

    var bannerBottom = banner.offsetTop + banner.offsetHeight;
    var scrollPosition = window.scrollY;
    var viewportHeight = window.innerHeight;

    // Xử lý bottom nav
    if (scrollPosition + topNav.offsetHeight >= bannerBottom - bottomNav.offsetHeight) {
        bottomNav.style.position = 'fixed';
        bottomNav.style.top = topNav.offsetHeight + 'px';
        bottomNav.style.bottom = 'auto';
    } else {
        bottomNav.style.position = 'absolute';
        bottomNav.style.top = (bannerBottom - bottomNav.offsetHeight) + 'px';
        bottomNav.style.bottom = 'auto';
    }

    // Xử lý aside
    if (scrollPosition > bannerBottom - topNav.offsetHeight) {
        aside.classList.add('aside-fixed');
        main.classList.add('aside-fixed-active');
    } else {
        aside.classList.remove('aside-fixed');
        main.classList.remove('aside-fixed-active');
    }
});
document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Kiểm tra và áp dụng theme đã lưu
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Giả lập việc đăng nhập
function login(username) {
    document.querySelector('.username').textContent = username;
    document.querySelector('.avatar').src = 'path/to/user-avatar.png'; // Thay đổi avatar khi đăng nhập
    localStorage.setItem('username', username);
}

// Kiểm tra xem người dùng đã đăng nhập chưa khi tải trang
window.addEventListener('load', function() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        login(savedUsername);
    }
});

// Thêm event listener cho nút đăng xuất
document.querySelector('a[href="#logout"]').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.username').textContent = 'Khách';
    document.querySelector('.avatar').src = 'path/to/default-avatar.png';
    localStorage.removeItem('username');
});