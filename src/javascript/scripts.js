document.addEventListener('DOMContentLoaded', function() {

// User's local time in Status bar
function updateClocks () {
    const now = dayjs();
    document.getElementById('time__block').textContent = now.format('HH:mm');
};

setInterval(updateClocks, 1000);


// Changing the interface language
let changeLangButton = document.getElementById('langBTN');

const langArr = {
    en: {
        "lang-search_city": 'Search city',
        "lang-local_time": 'Local time',
        "lang-min": 'min',
        "lang-max": 'max',
        "lang-two_day_forecast": 'Two day forecast',
        "lang-min1": 'min',
        "lang-max1": 'max',
        "lang-min2": 'min',
        "lang-max2": 'max',
    },
    ru: {
        "lang-search_city": 'Поиск города',
        "lang-local_time": 'Местное время',
        "lang-min": 'мин',
        "lang-max": 'макс',
        "lang-two_day_forecast": 'Прогноз на два дня',
        "lang-min1": 'мин',
        "lang-max1": 'макс',
        "lang-min2": 'мин',
        "lang-max2": 'макс',
    }
};

let currentLang = 'en';

changeLangButton.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'ru' : 'en';

    for (const key in langArr[currentLang]) {
        const elements = document.querySelectorAll(`[data-lang="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = langArr[currentLang][key];
            } else if (element.firstChild && element.firstChild.nodeType === Node.TEXT_NODE) {
                element.firstChild.nodeValue = langArr[currentLang][key];
            } else {
                element.textContent = langArr[currentLang][key];
            }
        });
    }
});

});