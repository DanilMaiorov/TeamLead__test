const slider = document.querySelector('.slider__content');
const prevBtn = document.querySelector('.slider__button--prev');
const nextBtn = document.querySelector('.slider__button--next');

let count;

prevBtn.addEventListener('click', () => {
    count = 1;
    slider.style.transform = 'translate(33.3%)';
});
nextBtn.addEventListener('click', () => {
    count = -1;
    slider.style.transform = 'translate(-33.3%)';
});

slider.addEventListener('transitionend', () => {
    if(count === 1) {
        slider.prepend(slider.lastElementChild);
    } else if(count === -1) {
        slider.append(slider.firstElementChild);
    }
    
    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(() => {
        slider.style.transition = 'all 0.3s';
    });
});

/* Scroll */

const scrollBtns = Array.from(document.querySelectorAll('a'));

scrollBtns.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item = e.target) {
            let idAnchor = item.getAttribute('href');
            document.querySelector(idAnchor).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
        });
});

/*Timer */

const countDownTimer = document.querySelector('.order__countdown--timer');
const price = document.querySelector('.order__prices');

const timerHours = document.querySelector('#timer__hours');
const timerMinutes = document.querySelector('#timer__minutes');
const timerSeconds = document.querySelector('#timer__seconds');
const timerTime = 1800000;
let intervalID;

const clearInt = (int) => {
    clearInterval(int);
};
const getTimeRemaining = (deadline) => {
    let dateStop = new Date(deadline).getTime();
    let dateNow = new Date().getTime();
    let timeRemaining = (dateStop - dateNow) / 1000;
    let hours = Math.floor(timeRemaining / 60 / 60);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60);

    localStorage.setItem('finishTime', JSON.stringify(dateStop));
    return {
        timeRemaining: timeRemaining,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
    
};

const updateClock = (remainTime) => {
    let getTime = getTimeRemaining(remainTime);
    timerHours.textContent = (getTime.hours < 10) ? '0' + getTime.hours : getTime.hours;
    timerMinutes.textContent = (getTime.minutes < 10) ? '0' + getTime.minutes : getTime.minutes;
    timerSeconds.textContent = (getTime.seconds < 10) ? '0' + getTime.seconds : getTime.seconds;

    if(getTime.timeRemaining === 0 || getTime.timeRemaining < 0) {
        countDownTimer.innerHTML = `<span>Акция закончилась</span>`;
        price.innerHTML = `3500 руб`;
        price.classList.remove('order__prices');
        price.classList.add('order__prices-end');
        localStorage.clear();
        clearInt(intervalID);
    }
};

const startTimer = () => {
    window.addEventListener('DOMContentLoaded', () => {
        if(localStorage.length) {
            finishTimer = JSON.parse(localStorage.getItem('finishTime'));
            intervalID = setInterval(updateClock, 100, finishTimer);
        } else {
            intervalID = setInterval(updateClock, 100, new Date().getTime() + timerTime);
        }
    });
};
startTimer();

/* window */
const form = document.querySelector('.order__form');
const inputName = form.querySelector('#name');
const inputPhone = form.querySelector('#phone');
const inputHelpers = form.querySelectorAll('.order__form--extra');

const nameHelper = document.createElement('div');
const phoneHelper = document.createElement('div');


inputName.addEventListener('focus', () => {
    nameHelper.classList.add('plus');
    nameHelper.innerHTML = 'Например: Иван';
    inputHelpers[0].prepend(nameHelper); 
});
inputName.addEventListener('blur', () => {
    nameHelper.remove();
});


inputPhone.addEventListener('focus', () => {
    phoneHelper.classList.add('plus');
    phoneHelper.innerHTML = 'Например: 88005553535';
    inputHelpers[1].prepend(phoneHelper); 
});
inputPhone.addEventListener('blur', () => {
    phoneHelper.remove();
});

/* validation */

const formBtn = document.querySelector('.form__button');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isError = false;

    if(!/[^а-яА-Я]/g.test(inputName.value) && inputName.value !== '') {
    } else {
        isError = true;
    }
    if(!/[^\d]/g.test(inputPhone.value) && inputPhone.value !== '') {
    } else {
        isError = true;
    }
    if(!isError) {
        console.log('Отвалидировано');
        form.reset();
    }
});