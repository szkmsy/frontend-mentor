const requestForm = document.querySelector(".product__cta");

requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.querySelector(".email__input").value);
});
