API_KEY = "AIzaSyCJSgZnlysG9QoUsoHBCVTG2Bm5EY2C7Vc";

let form = document.getElementById("search-form");
let searchResult = document.querySelector("#searchResults");

function getNoResults() {
  let noResultElement = document.createElement("div");
  noResultElement.classList.add("noResult");
  noResultElement.innerHTML = `
        <h3>No Results found</h3>
        <p>Please try with another search term</p>
    `;
  return noResultElement;
}

function getResultsElement(item) {
  const element = document.createElement("a");
  element.classList.add("result");

  let innerContent = `
    <img
      src=${item.volumeInfo.imageLinks.thumbnail}
      alt=""
    />
    <div class="title">${item.volumeInfo.title}</div>
    <div class="sm">Average Rating: ${
      item.volumeInfo.averageRating ? item.volumeInfo.averageRating : "-"
    }</div>
  `;

  element.innerHTML = innerContent;
  element.setAttribute("id", item.id);
  element.setAttribute("href", `./review-page.html?id=${item.id}`);
  return element;
}

function displayOutput(data) {
  searchResult.classList.remove("none");
  searchResult.classList.add("block-grid");
  if (data.totalItems == 0) {
    elem = getNoResults();
    searchResult.appendChild(elem);
  } else {
    // Create a card for each item in the result
    for (const item of data.items) {
      const element = getResultsElement(item);
      searchResult.appendChild(element);
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchResult.innerHTML = "";
  let q;
  let searchValue = document.querySelector("#search-field").value;
  let radioBtns = document.querySelectorAll("input[type='radio']");

  let type;
  for (const radioButton of radioBtns) {
    if (radioButton.checked) {
      type = radioButton.value;
      break;
    }
  }
  console.log(type);
  if (type == "isbn") {
    q = `isbn:${searchValue}`;
  } else if (type == "author") {
    q = `inauthor:${searchValue}`;
  } else {
    q = `intitle:${searchValue}`;
  }

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=${API_KEY}`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      displayOutput(result);
    });
});
