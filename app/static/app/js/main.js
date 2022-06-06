let postSections = document.querySelectorAll(".profile");
let profileNavs = document.querySelectorAll(".p-nav");

for (let nav of profileNavs) {
  nav.addEventListener("click", (e) => {
    for (let nav of profileNavs) {
      nav.classList.remove("active");
    }
    e.target.classList.add("active");

    for (section of postSections) {
      section.classList.remove("active");
      if (section.classList.contains(e.target.textContent.toLowerCase())) {
        section.classList.add("active");
      }
    }
  });
}
