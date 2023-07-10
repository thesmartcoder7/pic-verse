let postSections = document.querySelectorAll(".profile");
let profileNavs = document.querySelectorAll(".p-nav");
let hoverimages = document.querySelectorAll(".display_image");
let imageCounters = document.querySelectorAll(".counters");
let modalClosers = document.querySelectorAll(".close");
let postModal = document.querySelector(".post-modal");
let createPostToggle = document.querySelector(".toggle-add-post");
let disablePost = document.querySelector(".disable-post-button");
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
    for (let nav of profileNavs) {
        nav.addEventListener("click", (e) => {
            for (let nav of profileNavs) {
                nav.classList.remove("active");
            }
            e.target.classList.add("active");
            for (let section of postSections) {
                section.classList.remove("active");
                if (section.classList.contains(e.target.textContent.toLowerCase())) {
                    section.classList.add("active");
                }
            }
        });
    }
}
if (hoverimages) {
    for (let image of hoverimages) {
        image.addEventListener("mouseover", (e) => {
            e.target.nextElementSibling.style.display = "flex";
        });
        image.addEventListener("click", (e) => {
            console.log(e);
        });
    }
}
if (imageCounters) {
    for (let counter of imageCounters) {
        counter.addEventListener("mouseleave", (e) => {
            e.target.style.display = "none";
        });
        counter.addEventListener("click", (e) => {
            e.target.nextElementSibling.style.display = "flex";
        });
    }
}
if (modalClosers) {
    for (let closer of modalClosers) {
        closer.addEventListener("click", (e) => {
            e.target.parentElement.style.display = "none";
        });
    }
}
