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

// ajax function to update the likes on a post based on a click event
let likeRequest = (id: string, csrf: string, e: Event) => {
  let req = new XMLHttpRequest();
  let url = `${document.URL}like/${id}/`;
  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf,
  };

  req.open("POST", url, true);

  for (let header in headers) {
    req.setRequestHeader(header, headers[header]);
  }

  req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        let res = JSON.parse(req.responseText);
        if (res.status) {
          let txt = res.likes > 1 || res.likes == 0 ? "Likes" : "Like";
          let count = res.likes;
          let element = e.target as HTMLAnchorElement;
          element.textContent = res.button_text;
          let counter = element.offsetParent?.querySelector(
            ".likes-counter"
          ) as HTMLSpanElement;
          counter.textContent = `${count} ${txt}`;
          console.log(e);
          let svg = element.offsetParent?.previousElementSibling?.querySelector(
            ".likes-counter-svg"
          ) as HTMLSpanElement;
          svg.textContent = count;
        } else {
          alert("Error Occured");
        }
      }
    }
  };

  req.send();
};
