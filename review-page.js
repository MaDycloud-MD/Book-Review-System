API_KEY = "AIzaSyCJSgZnlysG9QoUsoHBCVTG2Bm5EY2C7Vc";
let id;

function displayReviews(id) {
  document.querySelector(".reviews").innerHTML = "";
  let reviews = getReviews(id);
  console.log(reviews);
  for (const review of reviews) {
    console.log(review);
    let elem = document.createElement("div");
    elem.classList.add("review");
    let childElements = `<div class="username">${review.username}</div>
    <p>${review.review}</p>`;
    elem.innerHTML = childElements;
    document.querySelector(".reviews").appendChild(elem);
  }
}

function saveReview(id, reviewContent) {
  let reviews = getReviews(id);
  reviews.push({ username: "User", review: reviewContent });
  localStorage.setItem(id, JSON.stringify(reviews));
  displayReviews(id);
}

function getReviews(id) {
  let reviews = localStorage.getItem(id);
  if (reviews) {
    return JSON.parse(reviews);
  }
  return [];
}

function reviewSubmission(e) {
  e.preventDefault();
  let reviewContent = document.querySelector("#review-input").value;
  if (reviewContent) {
    saveReview(id, reviewContent);
  } else {
    alert("Please enter review before submission.");
  }
}

function displayBookData(data) {
  document.querySelector("#book-title").innerHTML = data.volumeInfo.title;
  document.querySelector("#rating").innerHTML = `Rating: ${
    data.volumeInfo.averageRating ? data.volumeInfo.averageRating : ""
  }`;
  document.querySelector("#author").innerHTML = `Authors: ${
    data.volumeInfo.authors ? data.volumeInfo.authors.toString() : ""
  }`;
  document.querySelector("#publishedDate").innerHTML = `Published on: ${
    data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : ""
  }`;
  document.querySelector("#description").innerHTML = data.volumeInfo.description
    ? data.volumeInfo.description
    : "";
  document.querySelector("#book-image").src = data.volumeInfo.imageLinks.medium
    ? data.volumeInfo.imageLinks.medium
    : "./assets/placeholder-book.jpg";
}

let reviewSubmitBtn = document.querySelector("#submit-review");
reviewSubmitBtn.addEventListener("click", reviewSubmission);

window.onload = function () {
  try {
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");
    console.log(id);
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`)
      .then((response) => response.json())
      .then((result) => {
        displayBookData(result);
        displayReviews(id);
      });
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
  }
};
