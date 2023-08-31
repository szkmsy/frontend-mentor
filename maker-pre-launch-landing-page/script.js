const notifyForm = document.querySelector("#notify-form");

notifyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }
});
