const apiKey = 'e8ccc676e299173067a80520c1fee405'; // Replace with your actual API key
const baseUrl = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');
const pagination = document.getElementById('pagination');

let currentPage = 1;

const getImageUrl = (path) => {
    if (path) {
        return `https://image.tmdb.org/t/p/w500/${path}`;
    }
    return 'placeholder-image-url.jpg'; // Provide a placeholder image URL
};

const fetchMovieDetails = async (movieId) => {
    const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};
// Function to fetch and display movie search results
const searchMovies = async () => {
    const query = searchInput.value;
    const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(response)
        console.log(data.results)

        movieList.innerHTML = ''; // Clear previous results
        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';

            movieCard.innerHTML = `
            <div class="movie">
            <div>
             <img class="img" src="${getImageUrl(movie.poster_path)}" alt="${movie.title} Poster">
              </div>
              <div>
        <h2>${movie.title}</h2>
       
        <p>Release Date: ${movie.release_date}</p>
        <p>Rating: ${movie.vote_average}</p>
          <p class="movie-description">${movie.overview}</p>
          </div>
        </div>
      `;
            movieList.appendChild(movieCard);
        });

        // Pagination logic
        pagination.innerHTML = `
      <button onclick="prevPage()">Previous</button>
      <span>Page ${currentPage}</span>
      <button onclick="nextPage()">Next</button>
    `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to go to the previous page
const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        searchMovies();
    }
};

// Function to go to the next page
const nextPage = () => {
    currentPage++;
    searchMovies();
};

// Event listener for search button click
searchButton.addEventListener('click', () => {
    currentPage = 1;
    searchMovies();
});

// Initial search on page load
searchMovies();
