const hamburger = document.querySelector(".hamburger");
const mobileMenuDialog = document.querySelector("#mobile-menu");

hamburger.addEventListener("click", () => {
  if (mobileMenuDialog.open) {
    mobileMenuDialog.close();
  } else {
    mobileMenuDialog.show();
  }
});
