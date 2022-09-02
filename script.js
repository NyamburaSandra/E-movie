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