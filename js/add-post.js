'use strict';

const url = 'http://localhost:3000';
const addForm = document.querySelector('#addPostForm');
console.log('addForm', addPostForm);
/* Submit and post camping site form */
addForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addForm);
  //const data = Object.fromEntries(fd);
  if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
    alert('You need to log in before posting!');
    openLoginForm();
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      //'Content-Type': 'application/json',
    },
    body: fd,
    //body: JSON.stringify(data),
  };
  const response = await fetch(url + '/post', fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = `camping-post-detail.html?id=${json.post_id}`;
});

const priceSelect = document.querySelector('#price-select');
priceSelect.addEventListener('change', () => {
  if (priceSelect.selectedIndex === 0) {
    hidePrice();
  } else showPrice();
});

function showPrice() {
  const priceInput = document.querySelector('#price-input');
  priceInput.classList.add('showPriceInput');
}
function hidePrice() {
  const priceInput = document.querySelector('#price-input');
  priceInput.classList.remove('showPriceInput');
}

/* ----- */

// NAVIGATION MENU
/*
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

const navLink = document.querySelectorAll('.nav-link');

navLink.forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);
*/
