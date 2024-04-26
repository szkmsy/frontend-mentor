const signpForm = document.querySelector(".sign-up");
const dialog = document.querySelector(".success-dialog");

function onSubmit(e) {
  e.preventDefault();

  const email = e.currentTarget.querySelector("input[type=email]").value;
  console.log(email);

  dialog.showModal();
}

signpForm.addEventListener("submit", onSubmit);
