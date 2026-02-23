const generateBtn = document.getElementById('generate-btn');
const menuList = document.getElementById('menu-list');
const themeToggle = document.getElementById('theme-toggle');

// Dark mode
function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Menu data
const menus = [
    // 한식
    { name: '김치찌개',   emoji: '🍲', desc: '얼큰하고 구수한 국민 찌개',        category: '한식', badge: 'korean' },
    { name: '된장찌개',   emoji: '🫕', desc: '구수하고 따뜻한 집밥의 정석',       category: '한식', badge: 'korean' },
    { name: '삼겹살',     emoji: '🥓', desc: '불 위에 지글지글, 항상 옳다',        category: '한식', badge: 'korean' },
    { name: '불고기',     emoji: '🥩', desc: '달콤 짭조름한 양념의 향연',          category: '한식', badge: 'korean' },
    { name: '비빔밥',     emoji: '🍚', desc: '알록달록 영양 가득 한 그릇',         category: '한식', badge: 'korean' },
    { name: '순대국밥',   emoji: '🍜', desc: '든든하고 진한 국물 한 그릇',         category: '한식', badge: 'korean' },
    { name: '갈비탕',     emoji: '🍖', desc: '깊고 진한 사골 갈비 국물',           category: '한식', badge: 'korean' },
    { name: '제육볶음',   emoji: '🌶️', desc: '매콤달콤 밥도둑 메뉴',              category: '한식', badge: 'korean' },
    { name: '닭볶음탕',   emoji: '🍗', desc: '매콤하게 조린 닭고기',               category: '한식', badge: 'korean' },
    { name: '삼계탕',     emoji: '🐓', desc: '몸보신에 최고, 영양 만점',           category: '한식', badge: 'korean' },
    { name: '냉면',       emoji: '🍝', desc: '시원하고 쫄깃한 여름 별미',          category: '한식', badge: 'korean' },
    { name: '쌈밥',       emoji: '🥬', desc: '신선한 채소에 싸먹는 건강 한끼',     category: '한식', badge: 'korean' },
    // 중식
    { name: '짜장면',     emoji: '🍜', desc: '검은 소스의 달콤한 클래식',          category: '중식', badge: 'chinese' },
    { name: '짬뽕',       emoji: '🦐', desc: '얼큰한 해물 국물이 일품',            category: '중식', badge: 'chinese' },
    { name: '탕수육',     emoji: '🍖', desc: '바삭하게 튀긴 달콤새콤 고기',        category: '중식', badge: 'chinese' },
    { name: '마파두부',   emoji: '🌶️', desc: '매콤하고 부드러운 두부 요리',        category: '중식', badge: 'chinese' },
    { name: '볶음밥',     emoji: '🍳', desc: '고소하게 볶은 한 그릇',              category: '중식', badge: 'chinese' },
    { name: '깐풍기',     emoji: '🍗', desc: '바삭달콤 매콤한 중화 닭요리',        category: '중식', badge: 'chinese' },
    // 일식
    { name: '초밥',       emoji: '🍣', desc: '신선한 재료의 한 점 한 점',          category: '일식', badge: 'japanese' },
    { name: '라멘',       emoji: '🍜', desc: '진한 육수의 일본식 국수',             category: '일식', badge: 'japanese' },
    { name: '우동',       emoji: '🍥', desc: '쫄깃한 면과 맑은 국물',              category: '일식', badge: 'japanese' },
    { name: '돈카츠',     emoji: '🍱', desc: '바삭하게 튀긴 돼지고기 커틀릿',      category: '일식', badge: 'japanese' },
    { name: '규동',       emoji: '🥩', desc: '달콤짭조름한 소고기 덮밥',           category: '일식', badge: 'japanese' },
    // 양식
    { name: '파스타',     emoji: '🍝', desc: '다양한 소스로 즐기는 면 요리',        category: '양식', badge: 'western' },
    { name: '스테이크',   emoji: '🥩', desc: '육즙 가득한 고기의 정수',             category: '양식', badge: 'western' },
    { name: '피자',       emoji: '🍕', desc: '치즈 넘치는 둥근 행복',               category: '양식', badge: 'western' },
    { name: '리조또',     emoji: '🍚', desc: '크리미하고 고소한 이탈리안 쌀 요리', category: '양식', badge: 'western' },
    { name: '햄버거',     emoji: '🍔', desc: '두툼한 패티에 신선한 채소',           category: '양식', badge: 'western' },
    // 분식
    { name: '떡볶이',     emoji: '🌶️', desc: '매콤달콤, 영원한 국민 간식',         category: '분식', badge: 'snack' },
    { name: '김밥',       emoji: '🍙', desc: '한 줄이면 든든한 도시락 대표',        category: '분식', badge: 'snack' },
    { name: '라면',       emoji: '🍜', desc: '끓이는 순간 행복해지는 마법',         category: '분식', badge: 'snack' },
];

function pickRandomMenus(count = 5) {
    const shuffled = [...menus].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function displayMenus(picked) {
    menuList.innerHTML = '';
    picked.forEach((menu, index) => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        card.innerHTML = `
            <span class="menu-rank">${index + 1}</span>
            <span class="menu-emoji">${menu.emoji}</span>
            <div class="menu-info">
                <div class="menu-name">${menu.name}</div>
                <div class="menu-desc">${menu.desc}</div>
            </div>
            <span class="menu-badge badge-${menu.badge}">${menu.category}</span>
        `;
        menuList.appendChild(card);
    });
}

generateBtn.addEventListener('click', () => {
    displayMenus(pickRandomMenus());
});

// Initial setup
initTheme();
displayMenus(pickRandomMenus());
