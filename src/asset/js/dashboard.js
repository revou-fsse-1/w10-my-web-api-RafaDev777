import { API_ENDPOINT } from "../../lib/constants.js";

// ------------------------ Load Movies Data ----------------//

const getAllMovies = async () => {
  try {
    let response = await fetch(API_ENDPOINT);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const renderMovies = async () => {
  try {
    let movies = await getAllMovies();
    let movieListContainer = document.querySelector(".movie-list-container");
    movieListContainer.innerHTML = "";
    movies.forEach((movie) => {
      let movieCard = document.createElement("div");
      movieCard.className = "movie-card";
      movieCard.innerHTML = `
      <a href="../movie/?id=${movie.id}">
        <img src="${movie.image}" class="movie-thumbnail" />
        <p class="movie-title"><strong>${movie.name}</strong></p>
        </a>
        <button class="delete-btn" id="delete-${movie.id}">Delete</button>`;
      movieListContainer.appendChild(movieCard);
    });
    // ---------------------------------Delete Movie ---------------------//
    const deleteMovie = async (movieId) => {
      let response = await fetch(`${API_ENDPOINT}/${movieId}`, {
        method: "DELETE",
      });
      return await response.json();
    };

    const deleteBtn = document.querySelectorAll("button.delete-btn");
    deleteBtn.forEach((movie) => {
      movie.addEventListener("click", async () => {
        let movieId = movie.attributes.id.value.slice(7);
        await deleteMovie(movieId);
        renderMovies("");
      });
    });
  } catch (err) {
    console.log(err);
  }
};

//execute render
renderMovies();

// ----------------------Add Movie --------------------------------//
const addMovie = async (
  nameInputValue,
  imageInputValue,
  videoInputValue,
  rateInputValue,
  summaryInputValue
) => {
  let response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInputValue,
      image: imageInputValue,
      video: videoInputValue,
      rate: rateInputValue,
      summarries: summaryInputValue,
    }),
  });
  return await response.json();
};

let nameInput = document.querySelector(".name-input");
let imageInput = document.querySelector(".image-input");
let videoInput = document.querySelector(".video-input");
let rateInput = document.querySelector(".rate-input");
let summaryInput = document.querySelector(".summary-input");

const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  let name = nameInput.value;
  let image = imageInput.value;
  let video = videoInput.value;
  let rate = rateInput.value;
  let summary = summaryInput.value;
  addMovie(name, image, video, rate, summary);
  renderMovies();
});
