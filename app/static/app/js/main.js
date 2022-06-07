let postSections = document.querySelectorAll(".profile");
let profileNavs = document.querySelectorAll(".p-nav");

let hoverimages = document.querySelectorAll(".display_image");
let imageCounters = document.querySelectorAll(".counters");
console.log(imageCounters);

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

for (let image of hoverimages) {
  image.addEventListener("mouseenter", (e) => {
    console.log(e);
    e.target.nextElementSibling.style.display = "flex";
  });
}

for (let counter of imageCounters) {
  counter.addEventListener("mouseleave", (e) => {
    console.log(e);
    e.target.style.display = "none";
  });
}
