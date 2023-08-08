const markAllReadButton = document.querySelector("#mark-all-read");

markAllReadButton.addEventListener("click", () => {
  const unreadNotices = document.querySelectorAll(".notification--unread");
  unreadNotices.forEach((un) => un.classList.remove("notification--unread"));
  const count = document.querySelector(".header__count");
  count.textContent = 0;
});
