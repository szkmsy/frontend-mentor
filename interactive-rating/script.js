const cardForwardForm = document.querySelector(".card--forward .form");

const cardBackward = document.querySelector(".card--backward");
const rateResult = document.querySelector(".card--backward p");

cardForwardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const rate = formData.get("rate");
  cardBackward.style.zIndex = 1;
  rateResult.textContent = rateResult.textContent.replace("$X", rate);
});
