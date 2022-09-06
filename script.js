//movie  API
document.addEventListener("DOMContentLoaded", function () {
  getMovies();
  showMovies();
});
const apiKey = 'api_key=1cf50e6248dc270629e802686245c2c8';
const mainURL = 'https://api.themoviedb.org/3';
const apiURL = `${mainURL}/discover/movie?sort_by=popularity.desc&${apiKey}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${mainURL}/search/movie?${apiKey}&query=`;
//api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8&query=ragnarok

//get the movie genres using the apikey
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
//get data from API for movies on landing page
function getMovies(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.results)
      showMovies(data.results);
    })
  // .catch(err => alert.warn(err.message))
}

getMovies(apiURL);


//display movies on 
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
    <img class = "img"
      src="${IMG_URL + poster_path}" alt="${title}"/>
    <div class="movie-info">
      <h3>${title}</h3>
    </div>
    <div class="overview">
      ${overview}
    </div>
`;
    main.appendChild(movieElement);
  });
}

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const searchTitle = search.value;
//   if (searchTitle) {
//     getMovies(`${searchURL}&query=${searchTitle}`);
//   } else {
//     getMovies(apiURL);
//   }
// });

search.addEventListener("keyup", (event) => {
  event.preventDefault();

  const searchTitle = search.value;
  main.innerHTML="";
  fetch(searchURL + searchTitle)
    .then(response => { return response.json() })
    .then(data => {
      console.log(data)
      data.results.forEach((result) => {
       
        let poster_path = result.poster_path;
        // alert(poster_path);
        let title = result.title;
        let overview = result.overview;
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
    <img class = "img"
      src="${IMG_URL + poster_path}" alt="${title}"/>
    <div class="movie-info">
      <h3>${title}</h3>
    </div>
    <div class="overview">
      ${overview}
    </div>`;
    main.appendChild(movieElement);
      })
    });


})

//random film button
const randomButton = document.getElementById("random");

randomButton.addEventListener("click", function () {

  function generateRandom(maxLimit = 40) {
    let rand = Math.random() * maxLimit;

    rand = Math.floor(rand);

    return rand;
  }
  let randomNum = generateRandom();
  console.log(randomNum);

  let year = 1990 + randomNum;
  const popularURL = `${mainURL}/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&${apiKey}`;

  getMovies(popularURL);
});

//home Button
const homeButton = document.getElementById("home");
homeButton.addEventListener("click", function () {
  window.location.reload();
})

///image click
let container = document.getElementById("main");
let confirmBtn = document.getElementById("confirm");

container.addEventListener("click", function (e) {
  let selectedEl = document.querySelector(".selected");
  console.log(selectedEl);
  if (selectedEl) {
    selectedEl.classList.remove("selected");
  }
  e.target.classList.add("selected");
});



confirmBtn.addEventListener("click", function () {

  let alt = document.querySelector(".selected").alt;
  alt = alt.toUpperCase();
  alert(`${alt} has been added to your watch list`);
  let source = document.querySelector(".selected").src;
  console.log(source)

  //display in modal
  let modal = document.getElementById("myModal");
  let span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  let para = document.querySelector(".modal-content p")
  para.innerHTML = `${alt} has been added to your watch list.`;
  document.getElementById("modalImg").src = source;


  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  const watchlist = {
    title: `${alt}`,
    id: `${alt}`
  };
  console.log(JSON.stringify(watchlist));
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(watchlist)
  }
  fetch(`http://localhost:3000/posts`, options)
    .then(response => { return response.json() })
    .then(data => {
      console.log(data)
    });


});
