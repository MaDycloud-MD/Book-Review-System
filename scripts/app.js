// File: app.js

const API_KEY = "AIzaSyCJSgZnlysG9QoUsoHBCVTG2Bm5EY2C7Vc";
const form = document.getElementById("search-form");
const searchResult = document.getElementById("searchResults");
const loading = document.getElementById("loading");

function getNoResults() {
  const noResultElement = document.createElement("div");
  noResultElement.classList.add("noResult");
  noResultElement.innerHTML = `
    <h3>No Results found</h3>
    <p>Please try with another search term</p>
  `;
  return noResultElement;
}

function getResultsElement(item, index) {
  const element = document.createElement("a");
  element.classList.add("result");

  element.style.animationDelay = `${index * 0.05}s`;

  const imageSrc = item.volumeInfo.imageLinks?.thumbnail || './assets/placeholder-book.jpg';
  const title = item.volumeInfo.title || "Untitled";
  const rating = item.volumeInfo.averageRating || "-";

  element.innerHTML = `
    <img src="${imageSrc}" alt="Book Image" />
    <div class="title">${title}</div>
    <div class="sm">Average Rating: ${rating}</div>
  `;

  element.setAttribute("href", `./review-page.html?id=${item.id}`);
  return element;
}

function displayOutput(data) {
  searchResult.innerHTML = "";
  searchResult.classList.remove("none");

  if (!data.totalItems || !data.items || data.items.length === 0) {
    const noResult = getNoResults();
    searchResult.appendChild(noResult);
    return;
  }

  data.items.forEach((item, index) => {
    const resultElement = getResultsElement(item, index);
    searchResult.appendChild(resultElement);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = document.getElementById("search-field").value.trim();
  if (!searchValue) return;

  const type = document.querySelector("input[name='type']:checked").value;
  let q = type === "isbn" ? `isbn:${searchValue}` :
          type === "author" ? `inauthor:${searchValue}` :
          `intitle:${searchValue}`;

  searchResult.innerHTML = "";
  loading.innerHTML = '<div class="spinner"></div>';
  loading.style.display = "block";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      displayOutput(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      loading.innerHTML = "<p style='color:#c00;'>Error loading data.</p>";
    });
});
