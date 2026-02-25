const generateBtn = document.getElementById('generate-btn');
const menuList = document.getElementById('menu-list');
const themeToggle = document.getElementById('theme-toggle');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const langBtns = document.querySelectorAll('.lang-btn');

// ── UI 문구 번역 ─────────────────────────────────
const ui = {
    ko: { title: '🍽️ 오늘 저녁 뭐 먹지?',   subtitle: '고민하지 말고, 추천받으세요!',          btn: '🎲 메뉴 다시 추천' },
    en: { title: '🍽️ What\'s for Dinner?',   subtitle: 'Stop overthinking, get a recommendation!', btn: '🎲 Recommend Again' },
    ja: { title: '🍽️ 今夜の夕食は何？',       subtitle: '悩まず、おすすめを受け取ろう！',          btn: '🎲 もう一度おすすめ' },
    zh: { title: '🍽️ 今晚吃什么？',           subtitle: '别烦恼了，让我来推荐！',                  btn: '🎲 重新推荐' },
};

// ── 카테고리 번역 ────────────────────────────────
const categories = {
    korean:   { ko: '한식', en: 'Korean',   ja: '韓国料理', zh: '韩食' },
    chinese:  { ko: '중식', en: 'Chinese',  ja: '中華料理', zh: '中餐' },
    japanese: { ko: '일식', en: 'Japanese', ja: '日本料理', zh: '日料' },
    western:  { ko: '양식', en: 'Western',  ja: '洋食',     zh: '西餐' },
    snack:    { ko: '분식', en: 'Snack',    ja: '軽食',     zh: '小吃' },
};

// ── 메뉴 데이터 (4개 언어) ───────────────────────
const menus = [
    // 한식
    {
        emoji: '🍲', badge: 'korean',
        name: { ko: '김치찌개',   en: 'Kimchi Stew',          ja: 'キムチチゲ',   zh: '泡菜汤' },
        desc: { ko: '얼큰하고 구수한 국민 찌개',        en: 'Spicy and savory national stew',         ja: '辛くてコクのある定番チゲ',   zh: '辣而鲜美的国民汤锅' },
    },
    {
        emoji: '🫕', badge: 'korean',
        name: { ko: '된장찌개',   en: 'Doenjang Stew',        ja: '味噌チゲ',     zh: '大酱汤' },
        desc: { ko: '구수하고 따뜻한 집밥의 정석',      en: 'Hearty home-style soybean paste stew',  ja: 'ほっこり温かい家庭料理の定番', zh: '醇厚温暖的家常大酱汤' },
    },
    {
        emoji: '🥓', badge: 'korean',
        name: { ko: '삼겹살',     en: 'Pork Belly BBQ',       ja: 'サムギョプサル', zh: '五花肉烤肉' },
        desc: { ko: '불 위에 지글지글, 항상 옳다',      en: 'Sizzling grilled pork, always a right choice', ja: '焼き肉の定番、いつでも正解', zh: '烤肉之选，百吃不厌' },
    },
    {
        emoji: '🥩', badge: 'korean',
        name: { ko: '불고기',     en: 'Bulgogi',              ja: 'プルコギ',     zh: '韩式烤牛肉' },
        desc: { ko: '달콤 짭조름한 양념의 향연',        en: 'Sweet and savory marinated beef',        ja: '甘辛タレの牛肉炒め',         zh: '甜咸相间的腌制牛肉' },
    },
    {
        emoji: '🍚', badge: 'korean',
        name: { ko: '비빔밥',     en: 'Bibimbap',             ja: 'ビビンバ',     zh: '拌饭' },
        desc: { ko: '알록달록 영양 가득 한 그릇',       en: 'Colorful and nutritious mixed rice bowl', ja: 'カラフルで栄養満点の混ぜご飯', zh: '色彩缤纷营养丰富的拌饭' },
    },
    {
        emoji: '🍜', badge: 'korean',
        name: { ko: '순대국밥',   en: 'Sundae Soup & Rice',  ja: 'スンデクッパ', zh: '猪血肠汤饭' },
        desc: { ko: '든든하고 진한 국물 한 그릇',       en: 'Hearty blood sausage soup with rice',    ja: '濃厚スープで体が温まる一杯',  zh: '浓郁鲜美的血肠汤饭' },
    },
    {
        emoji: '🍖', badge: 'korean',
        name: { ko: '갈비탕',     en: 'Galbi Soup',          ja: 'カルビタン',   zh: '排骨汤' },
        desc: { ko: '깊고 진한 사골 갈비 국물',         en: 'Deep and rich short rib bone broth',     ja: '深みのある濃厚なカルビスープ', zh: '醇厚浓郁的牛排骨汤' },
    },
    {
        emoji: '🌶️', badge: 'korean',
        name: { ko: '제육볶음',   en: 'Spicy Pork Stir-fry', ja: 'チェユクポックム', zh: '辣炒猪肉' },
        desc: { ko: '매콤달콤 밥도둑 메뉴',             en: 'Sweet-spicy rice-stealer stir-fry',      ja: '甘辛炒め、ご飯が進む一品',    zh: '甜辣可口的下饭神器' },
    },
    {
        emoji: '🍗', badge: 'korean',
        name: { ko: '닭볶음탕',   en: 'Braised Spicy Chicken', ja: 'タッポックムタン', zh: '辣炖鸡' },
        desc: { ko: '매콤하게 조린 닭고기',             en: 'Spicy braised chicken in bold sauce',    ja: '辛めのタレで煮込んだチキン',  zh: '辣味红烧鸡块' },
    },
    {
        emoji: '🐓', badge: 'korean',
        name: { ko: '삼계탕',     en: 'Ginseng Chicken Soup', ja: '参鶏湯',       zh: '参鸡汤' },
        desc: { ko: '몸보신에 최고, 영양 만점',          en: 'Nutritious whole chicken soup for health', ja: '体に最高、滋養たっぷり',      zh: '养身滋补，营养满分' },
    },
    {
        emoji: '🍝', badge: 'korean',
        name: { ko: '냉면',       en: 'Cold Noodles',        ja: '冷麺',         zh: '冷面' },
        desc: { ko: '시원하고 쫄깃한 여름 별미',        en: 'Cool and chewy summer noodle specialty', ja: '冷たくてコシのある夏の逸品',  zh: '清凉筋道的夏日美食' },
    },
    {
        emoji: '🥬', badge: 'korean',
        name: { ko: '쌈밥',       en: 'Ssambap',             ja: 'サムパプ',     zh: '包饭' },
        desc: { ko: '신선한 채소에 싸먹는 건강 한끼',   en: 'Healthy meal wrapped in fresh vegetables', ja: '新鮮な野菜で包む健康ご飯',   zh: '新鲜蔬菜包裹的健康一餐' },
    },
    // 중식
    {
        emoji: '🍜', badge: 'chinese',
        name: { ko: '짜장면',     en: 'Jajangmyeon',         ja: 'ジャージャー麺', zh: '炸酱面' },
        desc: { ko: '검은 소스의 달콤한 클래식',        en: 'Classic noodles with savory black bean sauce', ja: '甘辛い黒ソースの定番麺',    zh: '香甜可口的经典炸酱面' },
    },
    {
        emoji: '🦐', badge: 'chinese',
        name: { ko: '짬뽕',       en: 'Jjamppong',           ja: 'チャンポン',   zh: '炒码面' },
        desc: { ko: '얼큰한 해물 국물이 일품',          en: 'Fiery seafood noodle soup',              ja: '辛い海鮮スープが絶品',        zh: '鲜辣海鲜汤面' },
    },
    {
        emoji: '🍖', badge: 'chinese',
        name: { ko: '탕수육',     en: 'Sweet & Sour Pork',   ja: '酢豚',         zh: '糖醋肉' },
        desc: { ko: '바삭하게 튀긴 달콤새콤 고기',      en: 'Crispy pork in sweet and sour sauce',    ja: 'カリッと揚げた甘酸っぱい豚肉', zh: '酥脆的甜酸肉' },
    },
    {
        emoji: '🌶️', badge: 'chinese',
        name: { ko: '마파두부',   en: 'Mapo Tofu',           ja: '麻婆豆腐',     zh: '麻婆豆腐' },
        desc: { ko: '매콤하고 부드러운 두부 요리',      en: 'Spicy and silky tofu in savory sauce',   ja: '辛くて滑らかな豆腐料理',      zh: '香辣滑嫩的豆腐料理' },
    },
    {
        emoji: '🍳', badge: 'chinese',
        name: { ko: '볶음밥',     en: 'Fried Rice',          ja: 'チャーハン',   zh: '炒饭' },
        desc: { ko: '고소하게 볶은 한 그릇',            en: 'Savory and aromatic fried rice',         ja: '香ばしく炒めた一皿',          zh: '香气四溢的炒饭' },
    },
    {
        emoji: '🍗', badge: 'chinese',
        name: { ko: '깐풍기',     en: 'Crispy Spicy Chicken', ja: 'カンプンギ',  zh: '干烹鸡' },
        desc: { ko: '바삭달콤 매콤한 중화 닭요리',      en: 'Crispy sweet-spicy Chinese chicken',     ja: 'カリカリ甘辛中華チキン',      zh: '酥脆香辣的中式鸡肉' },
    },
    // 일식
    {
        emoji: '🍣', badge: 'japanese',
        name: { ko: '초밥',       en: 'Sushi',               ja: '寿司',         zh: '寿司' },
        desc: { ko: '신선한 재료의 한 점 한 점',        en: 'Each piece crafted with fresh ingredients', ja: '新鮮な食材を使った一貫一貫', zh: '精心制作的新鲜寿司' },
    },
    {
        emoji: '🍜', badge: 'japanese',
        name: { ko: '라멘',       en: 'Ramen',               ja: 'ラーメン',     zh: '拉面' },
        desc: { ko: '진한 육수의 일본식 국수',          en: 'Rich broth Japanese-style noodles',      ja: '濃厚スープの日本式麺料理',    zh: '浓郁汤底的日式拉面' },
    },
    {
        emoji: '🍥', badge: 'japanese',
        name: { ko: '우동',       en: 'Udon',                ja: 'うどん',       zh: '乌冬面' },
        desc: { ko: '쫄깃한 면과 맑은 국물',            en: 'Chewy noodles in clear dashi broth',     ja: 'もちもち麺と澄んだだし汁',    zh: '劲道面条配清爽汤底' },
    },
    {
        emoji: '🍱', badge: 'japanese',
        name: { ko: '돈카츠',     en: 'Tonkatsu',            ja: 'とんかつ',     zh: '炸猪排' },
        desc: { ko: '바삭하게 튀긴 돼지고기 커틀릿',   en: 'Crispy deep-fried pork cutlet',          ja: 'サクサクに揚げたポークカツ',  zh: '酥脆的炸猪排' },
    },
    {
        emoji: '🥩', badge: 'japanese',
        name: { ko: '규동',       en: 'Gyudon',              ja: '牛丼',         zh: '牛肉盖饭' },
        desc: { ko: '달콤짭조름한 소고기 덮밥',         en: 'Sweet and savory beef rice bowl',        ja: '甘辛い牛肉丼',               zh: '甜咸相间的牛肉盖饭' },
    },
    // 양식
    {
        emoji: '🍝', badge: 'western',
        name: { ko: '파스타',     en: 'Pasta',               ja: 'パスタ',       zh: '意大利面' },
        desc: { ko: '다양한 소스로 즐기는 면 요리',     en: 'Noodle dish enjoyed with various sauces', ja: '様々なソースで楽しむ麺料理', zh: '配搭多样酱汁的意面' },
    },
    {
        emoji: '🥩', badge: 'western',
        name: { ko: '스테이크',   en: 'Steak',               ja: 'ステーキ',     zh: '牛排' },
        desc: { ko: '육즙 가득한 고기의 정수',          en: 'Juicy and flavorful prime cut',          ja: '肉汁あふれる肉の真髄',        zh: '汁水丰盈的肉类精华' },
    },
    {
        emoji: '🍕', badge: 'western',
        name: { ko: '피자',       en: 'Pizza',               ja: 'ピザ',         zh: '披萨' },
        desc: { ko: '치즈 넘치는 둥근 행복',            en: 'Round happiness overflowing with cheese', ja: 'チーズたっぷりの丸い幸福',   zh: '满溢芝士的圆形幸福' },
    },
    {
        emoji: '🍚', badge: 'western',
        name: { ko: '리조또',     en: 'Risotto',             ja: 'リゾット',     zh: '烩饭' },
        desc: { ko: '크리미하고 고소한 이탈리안 쌀 요리', en: 'Creamy and rich Italian rice dish',   ja: 'クリーミーで濃厚なイタリアンライス', zh: '奶香浓郁的意式烩饭' },
    },
    {
        emoji: '🍔', badge: 'western',
        name: { ko: '햄버거',     en: 'Hamburger',           ja: 'ハンバーガー', zh: '汉堡' },
        desc: { ko: '두툼한 패티에 신선한 채소',         en: 'Thick patty with fresh vegetables',      ja: '厚いパティに新鮮な野菜',      zh: '厚实肉饼配新鲜蔬菜' },
    },
    // 분식
    {
        emoji: '🌶️', badge: 'snack',
        name: { ko: '떡볶이',     en: 'Tteokbokki',          ja: 'トッポッキ',   zh: '炒年糕' },
        desc: { ko: '매콤달콤, 영원한 국민 간식',        en: 'Sweet-spicy eternal street snack',       ja: '甘辛い永遠の国民的おやつ',    zh: '香辣微甜的国民小吃' },
    },
    {
        emoji: '🍙', badge: 'snack',
        name: { ko: '김밥',       en: 'Kimbap',              ja: 'キンパ',       zh: '紫菜包饭' },
        desc: { ko: '한 줄이면 든든한 도시락 대표',     en: 'One roll is enough for a hearty meal',   ja: '一本で満足のランチ代表格',    zh: '一卷就够饱的经典便当' },
    },
    {
        emoji: '🍜', badge: 'snack',
        name: { ko: '라면',       en: 'Instant Noodles',     ja: 'ラーメン（インスタント）', zh: '方便面' },
        desc: { ko: '끓이는 순간 행복해지는 마법',      en: 'Magic that brings joy the moment it boils', ja: '作った瞬間に幸せになる魔法', zh: '下锅的瞬间幸福感爆棚' },
    },
];

// ── 언어 상태 ────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'ko';
let currentMenus = [];

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    titleEl.textContent = ui[lang].title;
    subtitleEl.textContent = ui[lang].subtitle;
    generateBtn.textContent = ui[lang].btn;
    document.documentElement.lang = lang;

    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 메뉴는 그대로, 언어만 바꿔서 다시 렌더링
    displayMenus(currentMenus);
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ── 다크모드 ─────────────────────────────────────
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

// ── 메뉴 추천 ─────────────────────────────────────
function pickRandomMenus(count = 5) {
    return [...menus].sort(() => Math.random() - 0.5).slice(0, count);
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
                <div class="menu-name">${menu.name[currentLang]}</div>
                <div class="menu-desc">${menu.desc[currentLang]}</div>
            </div>
            <span class="menu-badge badge-${menu.badge}">${categories[menu.badge][currentLang]}</span>
        `;
        menuList.appendChild(card);
    });
}

generateBtn.addEventListener('click', () => {
    currentMenus = pickRandomMenus();
    displayMenus(currentMenus);
});

// ── 제휴 문의 폼 ─────────────────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    formStatus.textContent = '';
    formStatus.className = '';

    const data = new FormData(contactForm);
    try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
        });
        if (res.ok) {
            formStatus.textContent = '✅ 문의가 전송되었습니다. 감사합니다!';
            formStatus.className = 'status-ok';
            contactForm.reset();
        } else {
            formStatus.textContent = '❌ 전송에 실패했습니다. 다시 시도해주세요.';
            formStatus.className = 'status-err';
        }
    } catch {
        formStatus.textContent = '❌ 네트워크 오류가 발생했습니다.';
        formStatus.className = 'status-err';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '보내기';
    }
});

// ── 초기화 ───────────────────────────────────────
initTheme();
currentMenus = pickRandomMenus();
applyLang(currentLang);
