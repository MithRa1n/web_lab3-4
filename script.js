let editingMovie = null;
let movies = [];

const moviesList = document.getElementById('movies-list');
const totalIMDb = document.getElementById('total-imdb');
const formModal = document.getElementById('form-modal');
const createMovieBtn = document.getElementById('create-movie-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const buttonSubmit = document.getElementById("submit");
const movieForm = document.getElementById("movie-form");

createMovieBtn.addEventListener("click", () => {
    formModal.style.display = "flex";
    movieForm.reset();
    editingMovie = null;
});

cancelFormBtn.addEventListener("click", () => {
    formModal.style.display = "none";
});

buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const imdbRating = parseFloat(document.getElementById("imdbRating").value);
    const duration = parseInt(document.getElementById("duration").value);
    const image = document.getElementById("image").value;

    if (editingMovie === null) {
        movies.push({ title, imdbRating, duration, image });
    } else {
        movies[editingMovie] = { title, imdbRating, duration, image };
        editingMovie = null;
    }

    renderItems();
    formModal.style.display = "none";
});

function renderItems() {
    moviesList.innerHTML = '';
    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'space-x-4', 'bg-gray-200', 'p-4', 'rounded', 'shadow');
        li.innerHTML = `
            <img src="${movie.image}" class="w-24 h-36 rounded object-cover">
            <div>
                <h2 class="text-xl font-bold">${movie.title}</h2>
                <p>IMDb Rating: <span class="font-semibold">${movie.imdbRating}</span></p>
                <p>Duration: <span class="font-semibold">${movie.duration}</span> mins</p>
                <button class="edit-button bg-yellow-500 text-white px-4 py-1 rounded mt-2" data-index="${index}">Edit</button>
            </div>
        `;
        li.querySelector('.edit-button').addEventListener('click', () => {
            editingMovie = index;
            document.getElementById("title").value = movie.title;
            document.getElementById("imdbRating").value = movie.imdbRating;
            document.getElementById("duration").value = movie.duration;
            document.getElementById("image").value = movie.image;
            formModal.style.display = "flex";
        });
        moviesList.appendChild(li);
    });

    const total = movies.reduce((acc, movie) => acc + movie.imdbRating, 0);
    totalIMDb.textContent = total.toFixed(1);
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    renderFilteredItems(filteredMovies);
});

function renderFilteredItems(filteredMovies) {
    moviesList.innerHTML = '';
    filteredMovies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'space-x-4', 'bg-gray-200', 'p-4', 'rounded', 'shadow');
        li.innerHTML = `
            <img src="${movie.image}" class="w-24 h-36 rounded object-cover">
            <div>
                <h2 class="text-xl font-bold">${movie.title}</h2>
                <p>IMDb Rating: <span class="font-semibold">${movie.imdbRating}</span></p>
                <p>Duration: <span class="font-semibold">${movie.duration}</span> mins</p>
                <button class="edit-button bg-yellow-500 text-white px-4 py-1 rounded mt-2" data-index="${index}">Edit</button>
            </div>
        `;
        li.querySelector('.edit-button').addEventListener('click', () => {
            editingMovie = index;
            document.getElementById("title").value = movie.title;
            document.getElementById("imdbRating").value = movie.imdbRating;
            document.getElementById("duration").value = movie.duration;
            document.getElementById("image").value = movie.image;
            formModal.style.display = "flex";
        });
        moviesList.appendChild(li);
    });

    const total = filteredMovies.reduce((acc, movie) => acc + movie.imdbRating, 0);
    totalIMDb.textContent = total.toFixed(1);
}

const sortBtn = document.getElementById('sort-btn');
const sortOptions = document.getElementById('sort-options');

sortBtn.addEventListener('click', () => {
    const sortBy = sortOptions.value;
    if (sortBy === 'imdb') {
        movies.sort((a, b) => b.imdbRating - a.imdbRating);
    } else if (sortBy === 'duration') {
        movies.sort((a, b) => b.duration - a.duration);
    }
    renderItems();
});
