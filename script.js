const MOVIE_API_KEY = "6a16fb7543675c64129939e587e41a8e";

let form = document.querySelector("#playingForm");

let searchBar = document.querySelector("#searchBar");
let movieCard = document.querySelector(".movie-card");
let image = document.querySelector("#movie-poster");
let userInput = document.querySelector("textBar");
let searchForm = document.querySelector("#searchForm");
let loadBtn = document.querySelector("#loadFrom");

// display now playing movies
form.addEventListener("click", getNowPlayingMovies);

async function getNowPlayingMovies(evt) {
    evt.preventDefault();
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=1`);
    let responseData = await response.json();
    console.log(responseData);
    displayNowPlayingMovies(responseData);
    document.querySelector("#nowPlayingBtn").classList.add("hidden");

    //remove hidden load button
    document.querySelector("#loadBtn").classList.remove("hidden");

}

function displayNowPlayingMovies(movieData) {
    movieCard.innerHTML = "";
    for (let i = 0; i < movieData.results.length; i++) {
        movieCard.innerHTML += `<div id="movie-poster"><img src="http://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" alt="" /></div>
    <div class="movie-title">${movieData.results[i].title}</div>
    <div class="movie-votes">${movieData.results[i].vote_average}</div>`;
    }
}

// search movies
searchForm.addEventListener("click", getSearchMovies);

async function getSearchMovies(evt) {
    evt.preventDefault();
    //userInput = document.querySelector("#textBar");
    // console.log(evt);
    let search = searchBar.value;
    console.log(search);
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&include_adult=false&query=${search}`);
    // console.log("response", response); OK
    let responseData = await response.json();
    console.log("responseData", responseData);
    displaySearchMovies(responseData);
    document.querySelector("#nowPlayingBtn").classList.remove("hidden");
    // for(int i = 0; i < responseData.results.length; i++){

    // }
}

function displaySearchMovies(movieData) {
    movieCard.innerHTML = "";
    for (let i = 0; i < movieData.results.length; i++) {
        movieCard.innerHTML += `<div id="movie-poster"><img src="http://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" alt="" /></div>
    <div class="movie-title">${movieData.results[i].title}</div>
    <div class="movie-votes">${movieData.results[i].vote_average}</div>`;
        console.log(i);
    }

}
