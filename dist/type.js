"use strict";
window.addEventListener('load', function () {
    this.setInterval(() => {
        document.querySelector('.nav_bar_wrapper').classList.add('nav_bar_unset');
    }, 300);
});
window.addEventListener('resize', () => {
    let getNavContainer = document.querySelector('.nav_bar_wrapper').childNodes[1];
    if (window.innerWidth <= 1000) {
        getNavContainer.classList.remove('container');
        getNavContainer.classList.add('container-fluid');
    }
    else {
        getNavContainer.classList.remove('container-fluid');
        getNavContainer.classList.add('container');
    }
});
if (window.innerWidth <= 1000) {
    let getNavContainer = document.querySelector('.nav_bar_wrapper').childNodes[1];
    getNavContainer.classList.remove('container');
    getNavContainer.classList.add('container-fluid');
}
let RuRoller = document.querySelector('.language_ru');
let roller = document.querySelector('.roller');
RuRoller.addEventListener('mouseenter', () => {
    roller.classList.add('to_roll');
});
RuRoller.addEventListener('mouseleave', () => {
    roller.classList.remove('to_roll');
});
let modalMobileWindow = document.querySelector('.modal_hamburger_window');
if (window.innerWidth <= 1000) {
    console.log(modalMobileWindow);
    modalMobileWindow.style.height = `${window.innerHeight - 60}px`;
}
let hamburgerBtn = document.querySelector('.hamburger_menu');
let bodyBlock = document.querySelector('body');
hamburgerBtn.addEventListener('click', () => {
    modalMobileWindow.classList.toggle('open_modal_hamburger_window');
    bodyBlock.classList.toggle('stop_body');
});
