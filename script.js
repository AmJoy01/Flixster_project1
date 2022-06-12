const MOVIE_API_KEY = "6a16fb7543675c64129939e587e41a8e";

let form = document.querySelector("#playingForm");
let searchBar = document.querySelector("#searchBar");
let movieCard = document.querySelector("#movies-grid");
let image = document.querySelector("#movie-poster");
let searchForm = document.querySelector("#searchForm");
let loadBtn = document.querySelector("#loadForm");
let clearBtn = document.querySelector('#clearForm');

let pages = 1;
// display now playing movies
form.addEventListener("click", getNowPlayingMovies);

async function getNowPlayingMovies(evt) {
    evt.preventDefault();
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=1`);
    let responseData = await response.json();
    console.log(responseData);
    displayMovies(responseData);
    document.querySelector("#nowPlayingBtn").classList.add("hidden");
    document.querySelector("#clearBtn").classList.add("hidden");

    //remove hidden load button
    document.querySelector("#loadBtn").classList.remove("hidden")
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
    movieCard.innerHTML = "";
    displayMovies(responseData);
    document.querySelector("#nowPlayingBtn").classList.remove("hidden");
    document.querySelector("#clearBtn").classList.remove("hidden");
    document.querySelector("#loadBtn").classList.add("hidden");
}

function displayMovies(movieData) {
    // movieCard.innerHTML = "";
    let movieCard1;
    for (let i = 0; i < movieData.results.length; i++) {
        movieCard1 = document.createElement("div");
        movieCard1.setAttribute("class", "movie-card")
        movieCard1.innerHTML += `<div id="movie-poster"><img src="http://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" alt="" /></div>
        <div class="movie-title">${movieData.results[i].title}</div>
        <div class="movie-votes">${movieData.results[i].vote_average}</div>`;
        document.getElementById("movies-grid").appendChild(movieCard1);
        // console.log(i);
    }

}

loadBtn.addEventListener("click", getLoadNowPlayingMovies);
async function getLoadNowPlayingMovies(evt) {
    pages += 1;
    evt.preventDefault();
    console.log(evt);
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=${pages}`);
    let responseData = await response.json();
    console.log(responseData);
    displayMovies(responseData);
    if (pages == 5) {
        document.querySelector("#loadBtn").classList.add("hidden");
    }
}

// function displayLoadMovies(movieData) {
//     for (let i = 0; i < movieData.results.length; i++) {
//         movieCard.innerHTML += `<div id="movie-poster"><img src="http://image.tmdb.org/t/p/w500${movieData.results[i].poster_path}" alt="" /></div>
//     <div class="movie-title">${movieData.results[i].title}</div>
//     <div class="movie-votes">${movieData.results[i].vote_average}</div>`;
//         console.log(i);
//     }

// }

clearBtn.addEventListener("click", getBackNowPlayingMovies);

async function getBackNowPlayingMovies(evt) {
    evt.preventDefault();
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=en-US&page=1`);
    let responseData = await response.json();
    console.log(responseData);
    movieCard.innerHTML = "";
    displayMovies(responseData);
    document.querySelector("#nowPlayingBtn").classList.add("hidden");
    document.querySelector("#clearBtn").classList.add("hidden");

    //remove hidden load button
    document.querySelector("#loadBtn").classList.remove("hidden")
}
