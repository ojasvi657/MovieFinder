// Ensure that this code is placed within a script tag in your HTML file, like this:

// <script src="moviefinder.js"></script>

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=8c905430";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=8c905430";
const searchInput = document.getElementById("search-input");
const card = document.querySelector(".movie-cards");

document.querySelector(".search").addEventListener("click", function () {
    const query = searchInput.value;
    if (query) {
        getMovies(API_URL_SEARCH + "&s=" + query);
    }
});

async function getMovies(url) {
    card.innerHTML = ''; // Clear previous movie cards.

    try {
        const resp = await fetch(url);
        const respData = await resp.json();

        if (respData.Search) {
            showMovies(respData.Search);
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function showMovies(movies) {
    movies.forEach(async function (movie) {
        const movieData = await fetch(API_URL + "&i=" + movie.imdbID);
        const movieDataObj = await movieData.json();
        movieDisplay(movieDataObj);
    });
}

function movieDisplay(imovie) {
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML = `
        <div class="card">
            <img src="${imovie.Poster}" alt="Poster" width="300px" height="300px">
            <br>
            <div class="movie-description">
                <span class="movie-title"><b>Title:</b> <span class="value">${imovie.Title}</span></span>
                <span class="movie-title"><b>Rating:</b> <span class="value">${imovie.imdbRating}</span></span>
                <span class="movie-title"><b>Director:</b> <span class="value">${imovie.Director}</span></span>
                <span class="movie-title"><b>Released:</b> <span class="value">${imovie.Released}</span></span>
                <span class="movie-title"><b>Genre:</b> <span class="value">${imovie.Genre}</span></span>
            </div>
        </div>
    `;
    card.appendChild(movieElm);
}
