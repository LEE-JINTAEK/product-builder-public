
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');

// Dark mode initialization
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(sets) {
    lottoNumbersContainer.innerHTML = '';
    sets.forEach((numbers, index) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('lotto-row');

        const label = document.createElement('span');
        label.classList.add('row-label');
        label.textContent = `${index + 1}`;
        rowDiv.appendChild(label);

        numbers.forEach(number => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('lotto-number');
            numberDiv.textContent = number;
            rowDiv.appendChild(numberDiv);
        });

        lottoNumbersContainer.appendChild(rowDiv);
    });
}

function generateFiveSets() {
    return Array.from({ length: 5 }, generateLottoNumbers);
}

generateBtn.addEventListener('click', () => {
    displayNumbers(generateFiveSets());
});

// Initial setup
initTheme();
displayNumbers(generateFiveSets());
