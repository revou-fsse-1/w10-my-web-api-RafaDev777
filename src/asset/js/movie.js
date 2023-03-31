import { API_ENDPOINT } from "../../lib/constants.js";
let queryString = window.location.search;
let movieId = new URLSearchParams(queryString).get("id");

const getMoviebyId = async () => {
  try {
    let response = await fetch(`${API_ENDPOINT}/${movieId}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const updateMovieById = async (
  nameInputValue,
  imageInputValue,
  videoInputValue,
  rateInputValue,
  summaryInputValue
) => {
  try {
    let response = await fetch(`${API_ENDPOINT}/${movieId}`, {
      method: "PUT",
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
  } catch (err) {
    console.log(err);
  }
};

const renderMovieDetail = async () => {
  try {
    let movie = await getMoviebyId();
    let mainElement = document.getElementsByTagName("main");
    mainElement[0].innerHTML = "";
    let pageLayout = document.createElement("div");
    pageLayout.className = "content-container";
    pageLayout.innerHTML = `<div class="video-container"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${movie.video}" title="YouTube video player" frameborder="0" allow=" autoplay; encrypted-media" allowfullscreen></iframe></div>
    <div class="movie-detail-container">
      <img class="movie-poster-thumbnail" src="${movie.image}" />
      <div clas="movie-dscr-wrapper">
        <h2 class="movie-name">${movie.name}</h2>
        <p class="movie-rate">${movie.rate}</p>
      </div>
      <p class="movie-summary">${movie.summaries}</p>
      <button class="edit-btn">edit</button>
      <input class="name-input" type="text" placeholder="Movie Name">
      <input class="image-input" type="text" placeholder="Image Link">
      <input class="video-input" type="text" placeholder="Video Link">
      <input class="rate-input" type="number" min="1" max="5" placeholder="Rating(1-5)">
      <input class="summary-input" type="text" placeholder="Movei Summary">
      `;
    mainElement[0].appendChild(pageLayout);

    let nameInput = document.querySelector(".name-input");
    nameInput.defaultValue = movie.name;
    let imageInput = document.querySelector(".image-input");
    imageInput.defaultValue = movie.image;
    let videoInput = document.querySelector(".video-input");
    videoInput.defaultValue = movie.video;
    let rateInput = document.querySelector(".rate-input");
    rateInput.defaultValue = movie.rate;
    let summaryInput = document.querySelector(".summary-input");
    summaryInput.defaultValue = movie.summaries;

    const editBtn = document.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      let name = nameInput.value;
      let image = imageInput.value;
      let video = videoInput.value;
      let rate = rateInput.value;
      let summary = summaryInput.value;
      updateMovieById(name, image, video, rate, summary);
      renderMovieDetail();
    });
  } catch (err) {
    console.log(err);
  }
};

// Execute Render
renderMovieDetail();
