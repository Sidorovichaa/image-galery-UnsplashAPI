const API = 'https://api.unsplash.com/search/photos?client_id=0ma9uzbHcEgD9jEZQtXKFEzgiwE3VI9BCUqQwSBcJn4&orientation=squarish&per_page=12&query=';
let query = 'autumn';
let url = API + query;
let inputText = document.getElementById('header__input');
let clearBtn = document.getElementById('header__clear-btn');
let searchBtn = document.getElementById('header__search-btn');
let gallery = document.getElementById('gallery');

/*--------------LOAD IMAGES ON A PAGE--------------*/
function showData(data) {
  let images = [];
  for (let i = 0; i < data.results.length; i++) {
    const element = data.results[i].urls.small;
    images.push(element);
  }

  images.map(function (src) {
    const img = `<li class="find"><img class="gallery-img" src="` + src + `" alt="image"></li>`;
    gallery.insertAdjacentHTML('beforeend', img);
  })
}

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

/*-----------CLEAR AN INPUT FIELD-------------*/
clearBtn.addEventListener('click', function () {
  inputText.value = "";
})

/*--------LOAD BY PRESSING A SEARCH BUTTON-----------*/
function submitQuery() {

  let allImages = document.querySelectorAll('.find');
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].parentNode.removeChild(allImages[i]);   //delete previouse images
  }

  query = inputText.value;
  url = API + query
  getData();
}

/*--------LOAD BY PRESSING ENTER-----------*/
inputText.addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

getData();