//movie  API
document.addEventListener("DOMContentLoaded", function () {
  getMovies();
  showMovies();
});
const apiKey = 'api_key=1cf50e6248dc270629e802686245c2c8';
  const mainURL = 'https://api.themoviedb.org/3';
  const apiURL = `${mainURL}/discover/movie?sort_by=popularity.desc&${apiKey}`;
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const searchURL = `${mainURL}/search/movie?'${apiKey}`;

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
  const main = document.getElementById('main');
  const form =  document.getElementById('form');
  const search = document.getElementById('search');
  

  //display movie in the place holder
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const searchMovie=search.value;

    if(searchMovie){
        getMovies(`${searchURL}&query=${searchTitle}`);
      } else {
        getMovies(apiURL);
      }
    });
  //get data from API for movies on landing page
  function getMovies(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        showMovies(data.results);
      })
      .catch(err => alert.warn(err.message))
  }
  
  getMovies(apiURL);

  //display movies on the landing page
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
  
  fetch(`http://localhost:3000/posts`, options)
          .then(response => { return response.json() })
          .then(data => {
              console.log(data)
          });
        
    
    