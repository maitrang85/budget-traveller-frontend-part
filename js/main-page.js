'use strict';
const url = '10.114.32.115:3000/app';

// SCRIPT TO CREATE CARDS FROM POSTS
const cards = document.querySelector('#grid');

// CHECK IF VIEWER IS NOT LOGGIN YET, CAN NOT SEE POST A NEW SITE button

const addPostButton = document.getElementById('addPost');
const token = sessionStorage.getItem('token');
console.log(document.getElementById('addPost'));
if (!token) {
  addPostButton.style.display = 'none';
} else {
  addPostButton.style.display = 'inline-block';
}

const createCards = (posts) => {
  console.log(posts);
  renderCards(posts);

  const free = document.querySelector('#free_btn');
  const paid = document.querySelector('#paid_btn');
  const most_recent = document.querySelector('#most_recent_btn');
  const show_all = document.querySelector('#show_all_btn');
  const region = document.querySelector('#region_select');

  free.addEventListener('click', () => {
    const posts_free = posts.filter((post) => {
      return post.free_or_not === 'free';
    });
    renderCards(posts_free);
  });

  paid.addEventListener('click', () => {
    const posts_paid = posts.filter((post) => {
      return post.free_or_not === 'paid';
    });
    renderCards(posts_paid);
  });

  most_recent.addEventListener('click', () => {
    const posts_most_recent = posts.filter((post) => {});
    renderCards(posts_most_recent);
  });

  show_all.addEventListener('click', () => {
    renderCards(posts);
  });

  region.addEventListener('change', () => {
    const posts_region = posts.filter((post) => {
      return post.region_id === region.value;
    });
    renderCards(posts_region);
  });
};
function renderCards(posts) {
  cards.innerHTML = '';
  posts.forEach((post) => {
    const card_item = document.createElement('div');
    card_item.className = `grid_item`;

    const card = document.createElement('div');
    card.className = 'card';

    const thumbnail = document.createElement('div');
    thumbnail.className = 'card-thumbnail';

    const img = document.createElement('img');
    img.className = 'card_img';
    img.src = url + '/' + post.filename;

    const info = document.createElement('div');
    info.className = 'card_info';

    const s1 = document.createElement('span');
    const s2 = document.createElement('span');
    s1.innerHTML += `<i class='fa fa-thumbs-up'></i> 47`;
    s2.innerHTML += `<i class='fa fa-thumbs-down'></i> 3`;

    const card_content = document.createElement('div');
    card_content.className = 'card_content';

    const h1 = document.createElement('h1');
    h1.className = 'card_header';
    h1.innerHTML = post.title;

    const p = document.createElement('p');
    p.className = 'card_text';
    p.innerHTML = post.content;

    const btn = document.createElement('button');
    btn.className = 'card_btn';
    btn.innerHTML = 'Read more';
    console.log('post_id', post.post_id);
    btn.addEventListener('click', () => {
      location.href = `camping-post-detail.html?id=${post.post_id}`;
    });

    const span = document.createElement('span');
    span.innerHTML = '→';

    card_item.appendChild(card);
    card.appendChild(thumbnail);
    thumbnail.appendChild(img);
    thumbnail.appendChild(info);
    info.appendChild(s1);
    info.appendChild(s2);
    card.appendChild(card_content);
    card_content.appendChild(h1);
    card_content.appendChild(p);
    card_content.appendChild(btn);
    btn.appendChild(span);
    cards.appendChild(card_item);
  });
}

// GET POST
const getPosts = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/post', fetchOptions);
    const posts = await response.json();
    createCards(posts);
  } catch (e) {
    console.log(e.message);
  }
};
getPosts();

// ADDING ACTIVE CLASS TO THE CURRENT BUTTON (HIGHLIGHTING IT)
let buttonContainer = document.getElementById('filtering');
let buttons = buttonContainer.getElementsByClassName('btn');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    let current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
  });
}
