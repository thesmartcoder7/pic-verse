let postSections = document.querySelectorAll(
  ".profile"
) as NodeListOf<HTMLDivElement>;
let profileNavs = document.querySelectorAll(
  ".p-nav"
) as NodeListOf<HTMLUListElement>;

let hoverimages = document.querySelectorAll(
  ".display_image"
) as NodeListOf<HTMLImageElement>;
let imageCounters = document.querySelectorAll(
  ".counters"
) as NodeListOf<HTMLDivElement>;

let modalClosers = document.querySelectorAll(
  ".close"
) as NodeListOf<HTMLParagraphElement>;

let postModal = document.querySelector(".post-modal") as HTMLDivElement;
let createPostToggle = document.querySelector(
  ".toggle-add-post"
) as HTMLButtonElement;
let disablePost = document.querySelector(
  ".disable-post-button"
) as HTMLAnchorElement;

if (disablePost) {
  disablePost.addEventListener("click", () => {
    if (createPostToggle) {
      createPostToggle.style.display = "none";
    }
  });
}

if (createPostToggle) {
  createPostToggle.addEventListener("click", (e) => {
    if (postModal) {
      postModal.style.display = "flex";
    }
  });
}

if (profileNavs) {
  for (let nav of profileNavs as any) {
    nav.addEventListener("click", (e: any) => {
      for (let nav of profileNavs as any) {
        nav.classList.remove("active");
      }
      e.target.classList.add("active");

      for (let section of postSections as any) {
        section.classList.remove("active");
        if (section.classList.contains(e.target.textContent.toLowerCase())) {
          section.classList.add("active");
        }
      }
    });
  }
}

if (hoverimages) {
  for (let image of hoverimages as any) {
    image.addEventListener("mouseover", (e: any) => {
      e.target.nextElementSibling.style.display = "flex";
    });

    image.addEventListener("click", (e: any) => {
      console.log(e);
    });
  }
}

if (imageCounters) {
  for (let counter of imageCounters as any) {
    counter.addEventListener("mouseleave", (e: any) => {
      e.target.style.display = "none";
    });

    counter.addEventListener("click", (e: any) => {
      e.target.nextElementSibling.style.display = "flex";
    });
  }
}

if (modalClosers) {
  for (let closer of modalClosers as any) {
    closer.addEventListener("click", (e: any) => {
      e.target.parentElement.style.display = "none";
    });
  }
}
