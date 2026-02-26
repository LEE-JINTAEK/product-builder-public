const generateBtn = document.getElementById('generate-btn');
const menuList = document.getElementById('menu-list');
const themeToggle = document.getElementById('theme-toggle');
const langBtns = document.querySelectorAll('.lang-btn');

// ── UI 문구 (날씨 관련만 유지, 나머지는 i18n.js 담당) ────
const ui = {
    ko: { weatherLoading: '📍 날씨 정보를 가져오는 중...', weatherBadge: '날씨 추천' },
    en: { weatherLoading: '📍 Getting weather info...',      weatherBadge: 'Weather Pick' },
    ja: { weatherLoading: '📍 天気情報を取得中...',          weatherBadge: 'おすすめ' },
    zh: { weatherLoading: '📍 正在获取天气信息...',          weatherBadge: '天气推荐' },
};

// ── 날씨 메시지 번역 ─────────────────────────────
const weatherMessages = {
    hot:   { ko: '더운 날엔 시원한 음식이 최고!',      en: 'Hot day? Cool food is the best!',         ja: '暑い日には冷たい食べ物が最高！',   zh: '炎热天气，来点清凉食物！' },
    warm:  { ko: '따뜻한 날씨에 어울리는 메뉴예요',   en: 'Perfect menus for warm weather!',         ja: '暖かい日にぴったりのメニュー',     zh: '适合温暖天气的菜单' },
    cool:  { ko: '선선한 날씨, 든든하게 드세요!',     en: 'Cool weather calls for hearty meals!',    ja: '涼しい日は腹ごしらえを！',         zh: '凉爽天气，吃顿饱饭！' },
    cold:  { ko: '추운 날엔 따뜻한 음식이 최고!',     en: 'Cold day? Warm food is the answer!',      ja: '寒い日には温かい料理が一番！',     zh: '寒冷天气，来碗热乎的！' },
    rainy: { ko: '비 오는 날엔 이런 음식이 딱!',      en: 'Rainy day calls for comfort food!',       ja: '雨の日はこんな料理がぴったり！',   zh: '雨天最适合这些美食！' },
    snowy: { ko: '눈 오는 날엔 따뜻하게 드세요!',     en: 'Snowy day? Warm up with these!',          ja: '雪の日は温かくして食べよう！',     zh: '下雪天，暖暖的吃一顿！' },
    sunny: { ko: '맑은 날엔 뭐든 맛있어요!',         en: 'Sunny day, everything tastes great!',     ja: '晴れた日は何でも美味しい！',       zh: '晴天，吃什么都香！' },
};

// ── 카테고리 번역 ────────────────────────────────
const categories = {
    korean:   { ko: '한식', en: 'Korean',   ja: '韓国料理', zh: '韩食' },
    chinese:  { ko: '중식', en: 'Chinese',  ja: '中華料理', zh: '中餐' },
    japanese: { ko: '일식', en: 'Japanese', ja: '日本料理', zh: '日料' },
    western:  { ko: '양식', en: 'Western',  ja: '洋食',     zh: '西餐' },
    snack:    { ko: '분식', en: 'Snack',    ja: '軽食',     zh: '小吃' },
};

// ── 메뉴 데이터 (4개 언어 + 날씨 태그) ──────────
const menus = [
    // 한식
    {
        emoji: '🍲', badge: 'korean',
        weather: ['cold', 'rainy', 'cool', 'snowy'],
        name: { ko: '김치찌개',   en: 'Kimchi Stew',           ja: 'キムチチゲ',    zh: '泡菜汤' },
        desc: { ko: '얼큰하고 구수한 국민 찌개',        en: 'Spicy and savory national stew',          ja: '辛くてコクのある定番チゲ',   zh: '辣而鲜美的国民汤锅' },
    },
    {
        emoji: '🫕', badge: 'korean',
        weather: ['cold', 'rainy', 'cool', 'snowy'],
        name: { ko: '된장찌개',   en: 'Doenjang Stew',         ja: '味噌チゲ',      zh: '大酱汤' },
        desc: { ko: '구수하고 따뜻한 집밥의 정석',      en: 'Hearty home-style soybean paste stew',   ja: 'ほっこり温かい家庭料理の定番', zh: '醇厚温暖的家常大酱汤' },
    },
    {
        emoji: '🥓', badge: 'korean',
        weather: ['cool', 'cold', 'rainy', 'warm'],
        name: { ko: '삼겹살',     en: 'Pork Belly BBQ',        ja: 'サムギョプサル', zh: '五花肉烤肉' },
        desc: { ko: '불 위에 지글지글, 항상 옳다',      en: 'Sizzling grilled pork, always a right choice', ja: '焼き肉の定番、いつでも正解', zh: '烤肉之选，百吃不厌' },
    },
    {
        emoji: '🥩', badge: 'korean',
        weather: ['warm', 'cool'],
        name: { ko: '불고기',     en: 'Bulgogi',               ja: 'プルコギ',      zh: '韩式烤牛肉' },
        desc: { ko: '달콤 짭조름한 양념의 향연',        en: 'Sweet and savory marinated beef',         ja: '甘辛タレの牛肉炒め',         zh: '甜咸相间的腌制牛肉' },
    },
    {
        emoji: '🍚', badge: 'korean',
        weather: ['warm', 'sunny'],
        name: { ko: '비빔밥',     en: 'Bibimbap',              ja: 'ビビンバ',      zh: '拌饭' },
        desc: { ko: '알록달록 영양 가득 한 그릇',       en: 'Colorful and nutritious mixed rice bowl',  ja: 'カラフルで栄養満点の混ぜご飯', zh: '色彩缤纷营养丰富的拌饭' },
    },
    {
        emoji: '🍜', badge: 'korean',
        weather: ['cold', 'rainy', 'snowy', 'cool'],
        name: { ko: '순대국밥',   en: 'Sundae Soup & Rice',   ja: 'スンデクッパ',  zh: '猪血肠汤饭' },
        desc: { ko: '든든하고 진한 국물 한 그릇',       en: 'Hearty blood sausage soup with rice',     ja: '濃厚スープで体が温まる一杯',  zh: '浓郁鲜美的血肠汤饭' },
    },
    {
        emoji: '🍖', badge: 'korean',
        weather: ['cold', 'rainy', 'snowy', 'cool'],
        name: { ko: '갈비탕',     en: 'Galbi Soup',           ja: 'カルビタン',    zh: '排骨汤' },
        desc: { ko: '깊고 진한 사골 갈비 국물',         en: 'Deep and rich short rib bone broth',      ja: '深みのある濃厚なカルビスープ', zh: '醇厚浓郁的牛排骨汤' },
    },
    {
        emoji: '🌶️', badge: 'korean',
        weather: ['warm', 'cool', 'cold'],
        name: { ko: '제육볶음',   en: 'Spicy Pork Stir-fry',  ja: 'チェユクポックム', zh: '辣炒猪肉' },
        desc: { ko: '매콤달콤 밥도둑 메뉴',             en: 'Sweet-spicy rice-stealer stir-fry',       ja: '甘辛炒め、ご飯が進む一品',    zh: '甜辣可口的下饭神器' },
    },
    {
        emoji: '🍗', badge: 'korean',
        weather: ['cold', 'rainy', 'cool'],
        name: { ko: '닭볶음탕',   en: 'Braised Spicy Chicken', ja: 'タッポックムタン', zh: '辣炖鸡' },
        desc: { ko: '매콤하게 조린 닭고기',             en: 'Spicy braised chicken in bold sauce',     ja: '辛めのタレで煮込んだチキン',  zh: '辣味红烧鸡块' },
    },
    {
        emoji: '🐓', badge: 'korean',
        weather: ['hot', 'warm', 'cold'],
        name: { ko: '삼계탕',     en: 'Ginseng Chicken Soup',  ja: '参鶏湯',        zh: '参鸡汤' },
        desc: { ko: '몸보신에 최고, 영양 만점',          en: 'Nutritious whole chicken soup for health', ja: '体に最高、滋養たっぷり',      zh: '养身滋补，营养满分' },
    },
    {
        emoji: '🍝', badge: 'korean',
        weather: ['hot', 'warm', 'sunny'],
        name: { ko: '냉면',       en: 'Cold Noodles',         ja: '冷麺',          zh: '冷面' },
        desc: { ko: '시원하고 쫄깃한 여름 별미',        en: 'Cool and chewy summer noodle specialty',  ja: '冷たくてコシのある夏の逸品',  zh: '清凉筋道的夏日美食' },
    },
    {
        emoji: '🥬', badge: 'korean',
        weather: ['hot', 'warm', 'sunny'],
        name: { ko: '쌈밥',       en: 'Ssambap',              ja: 'サムパプ',      zh: '包饭' },
        desc: { ko: '신선한 채소에 싸먹는 건강 한끼',   en: 'Healthy meal wrapped in fresh vegetables', ja: '新鮮な野菜で包む健康ご飯',   zh: '新鲜蔬菜包裹的健康一餐' },
    },
    {
        emoji: '🫓', badge: 'snack',
        weather: ['rainy'],
        name: { ko: '파전',       en: 'Green Onion Pancake',  ja: 'ネギチヂミ',    zh: '葱饼' },
        desc: { ko: '비 오는 날엔 파전에 막걸리!',      en: 'The perfect rainy day savory pancake',    ja: '雨の日はチヂミとマッコリ！',  zh: '雨天必备葱饼配米酒！' },
    },
    // 중식
    {
        emoji: '🍜', badge: 'chinese',
        weather: ['rainy', 'cool', 'cold'],
        name: { ko: '짜장면',     en: 'Jajangmyeon',          ja: 'ジャージャー麺', zh: '炸酱面' },
        desc: { ko: '검은 소스의 달콤한 클래식',        en: 'Classic noodles with savory black bean sauce', ja: '甘辛い黒ソースの定番麺',    zh: '香甜可口的经典炸酱面' },
    },
    {
        emoji: '🦐', badge: 'chinese',
        weather: ['cold', 'rainy', 'cool', 'snowy'],
        name: { ko: '짬뽕',       en: 'Jjamppong',            ja: 'チャンポン',    zh: '炒码面' },
        desc: { ko: '얼큰한 해물 국물이 일품',          en: 'Fiery seafood noodle soup',               ja: '辛い海鮮スープが絶品',        zh: '鲜辣海鲜汤面' },
    },
    {
        emoji: '🍖', badge: 'chinese',
        weather: ['warm', 'cool'],
        name: { ko: '탕수육',     en: 'Sweet & Sour Pork',    ja: '酢豚',          zh: '糖醋肉' },
        desc: { ko: '바삭하게 튀긴 달콤새콤 고기',      en: 'Crispy pork in sweet and sour sauce',     ja: 'カリッと揚げた甘酸っぱい豚肉', zh: '酥脆的甜酸肉' },
    },
    {
        emoji: '🌶️', badge: 'chinese',
        weather: ['cold', 'rainy', 'cool'],
        name: { ko: '마파두부',   en: 'Mapo Tofu',            ja: '麻婆豆腐',      zh: '麻婆豆腐' },
        desc: { ko: '매콤하고 부드러운 두부 요리',      en: 'Spicy and silky tofu in savory sauce',    ja: '辛くて滑らかな豆腐料理',      zh: '香辣滑嫩的豆腐料理' },
    },
    {
        emoji: '🍳', badge: 'chinese',
        weather: ['warm', 'cool', 'rainy'],
        name: { ko: '볶음밥',     en: 'Fried Rice',           ja: 'チャーハン',    zh: '炒饭' },
        desc: { ko: '고소하게 볶은 한 그릇',            en: 'Savory and aromatic fried rice',          ja: '香ばしく炒めた一皿',          zh: '香气四溢的炒饭' },
    },
    {
        emoji: '🍗', badge: 'chinese',
        weather: ['warm', 'hot'],
        name: { ko: '깐풍기',     en: 'Crispy Spicy Chicken',  ja: 'カンプンギ',   zh: '干烹鸡' },
        desc: { ko: '바삭달콤 매콤한 중화 닭요리',      en: 'Crispy sweet-spicy Chinese chicken',      ja: 'カリカリ甘辛中華チキン',      zh: '酥脆香辣的中式鸡肉' },
    },
    // 일식
    {
        emoji: '🍣', badge: 'japanese',
        weather: ['hot', 'warm', 'sunny'],
        name: { ko: '초밥',       en: 'Sushi',                ja: '寿司',          zh: '寿司' },
        desc: { ko: '신선한 재료의 한 점 한 점',        en: 'Each piece crafted with fresh ingredients', ja: '新鮮な食材を使った一貫一貫', zh: '精心制作的新鲜寿司' },
    },
    {
        emoji: '🍜', badge: 'japanese',
        weather: ['cold', 'rainy', 'cool', 'snowy'],
        name: { ko: '라멘',       en: 'Ramen',                ja: 'ラーメン',      zh: '拉面' },
        desc: { ko: '진한 육수의 일본식 국수',          en: 'Rich broth Japanese-style noodles',       ja: '濃厚スープの日本式麺料理',    zh: '浓郁汤底的日式拉面' },
    },
    {
        emoji: '🍥', badge: 'japanese',
        weather: ['cold', 'rainy', 'cool', 'snowy'],
        name: { ko: '우동',       en: 'Udon',                 ja: 'うどん',        zh: '乌冬面' },
        desc: { ko: '쫄깃한 면과 맑은 국물',            en: 'Chewy noodles in clear dashi broth',      ja: 'もちもち麺と澄んだだし汁',    zh: '劲道面条配清爽汤底' },
    },
    {
        emoji: '🍱', badge: 'japanese',
        weather: ['warm', 'cool'],
        name: { ko: '돈카츠',     en: 'Tonkatsu',             ja: 'とんかつ',      zh: '炸猪排' },
        desc: { ko: '바삭하게 튀긴 돼지고기 커틀릿',   en: 'Crispy deep-fried pork cutlet',           ja: 'サクサクに揚げたポークカツ',  zh: '酥脆的炸猪排' },
    },
    {
        emoji: '🥩', badge: 'japanese',
        weather: ['warm', 'cool', 'cold'],
        name: { ko: '규동',       en: 'Gyudon',               ja: '牛丼',          zh: '牛肉盖饭' },
        desc: { ko: '달콤짭조름한 소고기 덮밥',         en: 'Sweet and savory beef rice bowl',         ja: '甘辛い牛肉丼',               zh: '甜咸相间的牛肉盖饭' },
    },
    // 양식
    {
        emoji: '🍝', badge: 'western',
        weather: ['warm', 'cool', 'sunny'],
        name: { ko: '파스타',     en: 'Pasta',                ja: 'パスタ',        zh: '意大利面' },
        desc: { ko: '다양한 소스로 즐기는 면 요리',     en: 'Noodle dish enjoyed with various sauces',  ja: '様々なソースで楽しむ麺料理', zh: '配搭多样酱汁的意面' },
    },
    {
        emoji: '🥩', badge: 'western',
        weather: ['cool', 'cold', 'warm'],
        name: { ko: '스테이크',   en: 'Steak',                ja: 'ステーキ',      zh: '牛排' },
        desc: { ko: '육즙 가득한 고기의 정수',          en: 'Juicy and flavorful prime cut',           ja: '肉汁あふれる肉の真髄',        zh: '汁水丰盈的肉类精华' },
    },
    {
        emoji: '🍕', badge: 'western',
        weather: ['rainy', 'cool', 'cold'],
        name: { ko: '피자',       en: 'Pizza',                ja: 'ピザ',          zh: '披萨' },
        desc: { ko: '치즈 넘치는 둥근 행복',            en: 'Round happiness overflowing with cheese',  ja: 'チーズたっぷりの丸い幸福',   zh: '满溢芝士的圆形幸福' },
    },
    {
        emoji: '🍚', badge: 'western',
        weather: ['cool', 'cold', 'rainy'],
        name: { ko: '리조또',     en: 'Risotto',              ja: 'リゾット',      zh: '烩饭' },
        desc: { ko: '크리미하고 고소한 이탈리안 쌀 요리', en: 'Creamy and rich Italian rice dish',    ja: 'クリーミーで濃厚なイタリアンライス', zh: '奶香浓郁的意式烩饭' },
    },
    {
        emoji: '🍔', badge: 'western',
        weather: ['warm', 'hot', 'sunny'],
        name: { ko: '햄버거',     en: 'Hamburger',            ja: 'ハンバーガー',  zh: '汉堡' },
        desc: { ko: '두툼한 패티에 신선한 채소',         en: 'Thick patty with fresh vegetables',       ja: '厚いパティに新鮮な野菜',      zh: '厚实肉饼配新鲜蔬菜' },
    },
    // 분식
    {
        emoji: '🌶️', badge: 'snack',
        weather: ['rainy', 'cold', 'cool'],
        name: { ko: '떡볶이',     en: 'Tteokbokki',           ja: 'トッポッキ',    zh: '炒年糕' },
        desc: { ko: '매콤달콤, 영원한 국민 간식',        en: 'Sweet-spicy eternal street snack',        ja: '甘辛い永遠の国民的おやつ',    zh: '香辣微甜的国民小吃' },
    },
    {
        emoji: '🍙', badge: 'snack',
        weather: ['sunny', 'warm', 'hot'],
        name: { ko: '김밥',       en: 'Kimbap',               ja: 'キンパ',        zh: '紫菜包饭' },
        desc: { ko: '한 줄이면 든든한 도시락 대표',     en: 'One roll is enough for a hearty meal',    ja: '一本で満足のランチ代表格',    zh: '一卷就够饱的经典便当' },
    },
    {
        emoji: '🍜', badge: 'snack',
        weather: ['rainy', 'cold', 'snowy', 'cool'],
        name: { ko: '라면',       en: 'Instant Noodles',      ja: 'ラーメン（インスタント）', zh: '方便面' },
        desc: { ko: '끓이는 순간 행복해지는 마법',      en: 'Magic that brings joy the moment it boils', ja: '作った瞬間に幸せになる魔法', zh: '下锅的瞬间幸福感爆棚' },
    },
];

// ── 날씨 상태 ────────────────────────────────────
let currentWeatherConditions = [];
let currentWeatherData = null;
let weatherFetching = false;

// ── 날씨 유틸 함수 ───────────────────────────────
function getWeatherEmoji(code) {
    if (code === 0)                       return '☀️';
    if (code === 1)                       return '🌤️';
    if (code === 2)                       return '⛅';
    if (code === 3)                       return '☁️';
    if (code >= 45 && code <= 48)         return '🌫️';
    if (code >= 51 && code <= 67)         return '🌧️';
    if (code >= 71 && code <= 77)         return '❄️';
    if (code >= 80 && code <= 82)         return '🌦️';
    if (code >= 85 && code <= 86)         return '🌨️';
    if (code >= 95)                       return '⛈️';
    return '🌡️';
}

function getWeatherLabel(code, lang) {
    const labels = {
        ko: code >= 95 ? '뇌우' : code >= 85 ? '눈 소나기' : code >= 80 ? '소나기' :
            code >= 71 ? '눈' : code >= 61 ? '비' : code >= 51 ? '가랑비' :
            code >= 45 ? '안개' : code === 3 ? '흐림' : code === 2 ? '구름 많음' :
            code === 1 ? '대체로 맑음' : '맑음',
        en: code >= 95 ? 'Thunderstorm' : code >= 85 ? 'Snow Showers' : code >= 80 ? 'Showers' :
            code >= 71 ? 'Snow' : code >= 61 ? 'Rain' : code >= 51 ? 'Drizzle' :
            code >= 45 ? 'Fog' : code === 3 ? 'Overcast' : code === 2 ? 'Partly Cloudy' :
            code === 1 ? 'Mainly Clear' : 'Clear',
        ja: code >= 95 ? '雷雨' : code >= 85 ? '雪のにわか降り' : code >= 80 ? 'にわか雨' :
            code >= 71 ? '雪' : code >= 61 ? '雨' : code >= 51 ? '小雨' :
            code >= 45 ? '霧' : code === 3 ? '曇り' : code === 2 ? '部分的に曇り' :
            code === 1 ? 'おおむね晴れ' : '快晴',
        zh: code >= 95 ? '雷雨' : code >= 85 ? '阵雪' : code >= 80 ? '阵雨' :
            code >= 71 ? '雪' : code >= 61 ? '雨' : code >= 51 ? '毛毛雨' :
            code >= 45 ? '雾' : code === 3 ? '阴天' : code === 2 ? '多云' :
            code === 1 ? '大致晴朗' : '晴朗',
    };
    return labels[lang] || labels.ko;
}

function getWeatherConditions(code, temp, precip) {
    const conditions = [];

    const isSnowing = (code >= 71 && code <= 77) || (code >= 85 && code <= 86);
    const isRaining = !isSnowing && ((code >= 51 && code <= 82) || code === 95 || precip > 0.1);
    const isSunny = code === 0 || code === 1;

    if (isSnowing) conditions.push('snowy');
    if (isRaining) conditions.push('rainy');
    if (isSunny)   conditions.push('sunny');

    if (temp >= 27)      conditions.push('hot');
    else if (temp >= 18) conditions.push('warm');
    else if (temp >= 8)  conditions.push('cool');
    else                 conditions.push('cold');

    return conditions;
}

function getPrimaryCondition(conditions) {
    const priority = ['snowy', 'rainy', 'cold', 'hot', 'sunny', 'cool', 'warm'];
    for (const p of priority) {
        if (conditions.includes(p)) return p;
    }
    return conditions[0] || 'warm';
}

// ── 메뉴 선택 ─────────────────────────────────────
function pickRandomMenus(count = 5) {
    return [...menus].sort(() => Math.random() - 0.5).slice(0, count);
}

function pickMenusForWeather(count = 5, conditions = []) {
    if (!conditions.length) return pickRandomMenus(count);

    const matched   = menus.filter(m => m.weather && m.weather.some(w => conditions.includes(w)));
    const unmatched = menus.filter(m => !matched.includes(m));

    const shuffledMatched   = [...matched].sort(() => Math.random() - 0.5);
    const shuffledUnmatched = [...unmatched].sort(() => Math.random() - 0.5);

    const matchedCount = Math.min(3, shuffledMatched.length);
    return [
        ...shuffledMatched.slice(0, matchedCount),
        ...shuffledUnmatched.slice(0, count - matchedCount),
    ];
}

// ── 날씨 배너 ─────────────────────────────────────
function displayWeatherBanner() {
    const banner = document.getElementById('weather-banner');
    if (!banner) return;

    if (weatherFetching) {
        banner.className = 'weather-banner weather-loading-state';
        banner.innerHTML = `<div class="weather-loading-text">${ui[currentLang].weatherLoading}</div>`;
        banner.style.display = 'block';
        return;
    }

    if (!currentWeatherData) {
        banner.style.display = 'none';
        return;
    }

    const { temp, code, city } = currentWeatherData;
    const primary = getPrimaryCondition(currentWeatherConditions);
    const emoji   = getWeatherEmoji(code);
    const label   = getWeatherLabel(code, currentLang);
    const message = weatherMessages[primary]?.[currentLang] || '';

    banner.className = `weather-banner weather-${primary}`;
    banner.innerHTML = `
        <div class="weather-row">
            <span class="weather-emoji-large">${emoji}</span>
            <div class="weather-info">
                <div class="weather-location">${city ? `📍 ${city}` : '📍'} &middot; ${label} &middot; ${Math.round(temp)}°C</div>
                <div class="weather-message">${message}</div>
            </div>
        </div>
    `;
    banner.style.display = 'block';
}

async function fetchWeather() {
    if (!navigator.geolocation) return;

    weatherFetching = true;
    displayWeatherBanner();

    try {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
        });

        const { latitude: lat, longitude: lon } = pos.coords;
        const geoLang = currentLang === 'ko' ? 'ko' : currentLang === 'ja' ? 'ja' : currentLang === 'zh' ? 'zh' : 'en';

        const [weatherRes, geoRes] = await Promise.all([
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,precipitation&timezone=auto`),
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=${geoLang}`),
        ]);

        const weatherJson = await weatherRes.json();
        const geoJson     = await geoRes.json();

        const temp  = weatherJson.current.temperature_2m;
        const code  = weatherJson.current.weather_code;
        const precip = weatherJson.current.precipitation;
        const city  = geoJson.address?.city || geoJson.address?.town || geoJson.address?.village || geoJson.address?.county || '';

        currentWeatherData       = { temp, code, city };
        currentWeatherConditions = getWeatherConditions(code, temp, precip);
        weatherFetching          = false;

        currentMenus = pickMenusForWeather(5, currentWeatherConditions);
        displayMenus(currentMenus, currentWeatherConditions);
        displayWeatherBanner();

    } catch {
        weatherFetching = false;
        const banner = document.getElementById('weather-banner');
        if (banner) banner.style.display = 'none';
    }
}

// ── 언어 상태 ────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'ko';
let currentMenus = [];

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // i18n.js 가 로드된 경우 모든 페이지 정적 텍스트 번역
    if (typeof applyI18n === 'function') applyI18n(lang);

    displayMenus(currentMenus, currentWeatherConditions);
    displayWeatherBanner();
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

// ── 메뉴 표시 ─────────────────────────────────────
function displayMenus(picked, conditions = []) {
    menuList.innerHTML = '';
    picked.forEach((menu, index) => {
        const isWeatherPick = conditions.length > 0 && menu.weather && menu.weather.some(w => conditions.includes(w));
        const badgeEmoji = currentWeatherData ? getWeatherEmoji(currentWeatherData.code) : '🌡️';
        const weatherBadgeHtml = isWeatherPick
            ? `<span class="weather-rec-badge">${badgeEmoji} ${ui[currentLang].weatherBadge}</span>`
            : '';

        const card = document.createElement('div');
        card.classList.add('menu-card');
        card.innerHTML = `
            <span class="menu-rank">${index + 1}</span>
            <span class="menu-emoji">${menu.emoji}</span>
            <div class="menu-info">
                <div class="menu-name-row">
                    <span class="menu-name">${menu.name[currentLang]}</span>
                    ${weatherBadgeHtml}
                </div>
                <div class="menu-desc">${menu.desc[currentLang]}</div>
            </div>
            <span class="menu-badge badge-${menu.badge}">${categories[menu.badge][currentLang]}</span>
        `;
        menuList.appendChild(card);
    });
}

generateBtn.addEventListener('click', () => {
    currentMenus = pickMenusForWeather(5, currentWeatherConditions);
    displayMenus(currentMenus, currentWeatherConditions);
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
fetchWeather();
