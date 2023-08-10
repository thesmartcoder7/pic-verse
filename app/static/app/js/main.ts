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
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.style.display = "flex";
      }
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
      let commentPArentDivs = document.querySelectorAll(
        ".all-comments"
      ) as NodeListOf<HTMLDivElement>;
      if (commentPArentDivs) {
        commentPArentDivs.forEach((parent) => {
          parent.scrollTo(0, parent.scrollHeight);
        });
      }
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

// emoji picker for the textarea
new EmojiPicker({
  trigger: [
    {
      insertInto: ["#reply-message"],
      selector: "#e-selector",
    },
  ],
  closeButton: true,
  dragButton: true,
});

// ajax function to update the likes on a post based on a click event
let likeRequest = (id: string, csrf: string, e: Event) => {
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/like/${id}/`;
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
          let text = res.likes > 1 || res.likes == 0 ? "Likes" : "Like";
          let count = res.likes;

          let likeButtons = document.querySelectorAll(
            ".ajax-like-button"
          ) as NodeListOf<HTMLAnchorElement>;
          if (likeButtons) {
            likeButtons.forEach((button) => {
              if (button.getAttribute("data-id") == id) {
                button.textContent = res.button_text;
              }
            });
          }

          let likeSvgs = document.querySelectorAll(
            ".likes-counter-svg"
          ) as NodeListOf<HTMLSpanElement>;
          if (likeSvgs) {
            likeSvgs.forEach((svg) => {
              if (svg.getAttribute("data-id") == id) {
                svg.textContent = count;
              }
            });
          }

          let likeCounters = document.querySelectorAll(
            ".post-like-counter"
          ) as NodeListOf<HTMLSpanElement>;
          if (likeCounters) {
            likeCounters.forEach((counter) => {
              if (counter.getAttribute("data-id") == id) {
                counter.textContent = `${count} ${text}`;
              }
            });
          }
        } else {
          alert("Error Occured");
        }
      }
    }
  };

  req.send();
};

// ajax function to update the likes on a post based on a click event
let followRequest = (
  user1: string,
  user2: string,
  csrf: string,
  id: string
) => {
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/users/follow/${user1}/${user2}/`;
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
          let followButtons = document.querySelectorAll(
            ".ajax-follow-button"
          ) as NodeListOf<HTMLAnchorElement>;
          if (followButtons) {
            followButtons.forEach((button) => {
              if (button.getAttribute("data-id") == id) {
                button.textContent = res.button_text;
              }
            });
          }

          let userFollowingCount = document.querySelectorAll(
            ".user-following-count"
          ) as NodeListOf<HTMLParagraphElement>;
          if (userFollowingCount) {
            userFollowingCount.forEach((count) => {
              count.textContent = res.auth_following;
            });
          }

          let followeeCount = document.querySelectorAll(
            ".followee-following-count"
          ) as NodeListOf<HTMLParagraphElement>;
          if (followeeCount) {
            followeeCount.forEach((count) => {
              count.textContent = res.followee_following;
            });
          }
        } else {
          alert("Error Occured");
        }
      }
    }
  };

  req.send();
};

// ajax function to update the comments on a post based on a submission event
let updateComment = (postId: string, csrf: string, event: Event) => {
  event.preventDefault();
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/comment/${postId}/`;
  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf,
  };
  let comments = document.querySelectorAll(
    ".comment_field"
  ) as NodeListOf<HTMLTextAreaElement>;

  let value: any;

  if (comments) {
    comments.forEach((comment) => {
      if (comment.getAttribute("data-id") == postId) {
        value = comment.value;
        comment.value = "";
      }
    });
  }

  let formData = {
    comment: value,
  };

  req.open("POST", url, true);

  for (let header in headers) {
    req.setRequestHeader(header, headers[header]);
  }
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      let res = JSON.parse(req.responseText);
      let comments: object[] = JSON.parse(res.comments);
      let commentCount = document.querySelectorAll(".comments-counter-svg");

      if (res.status == true && res.comments) {
        let html = "";
        let allComments = document.querySelectorAll(
          ".all-comments"
        ) as NodeListOf<HTMLDivElement>;

        comments.forEach((comment: any) => {
          html += `
              <div class="single-comment">
              <a
                href="${baseURL.origin}/user/${comment.fields.user[0]}"
                class="username"
                >@${comment.fields.user[0].toLowerCase()}</a
              >
              <br />
              <p>${comment.fields.content}</p>
            </div>
          `;
          if (allComments) {
            allComments.forEach((parent) => {
              if (parent.getAttribute("data-id") == postId) {
                if (html != "undefined" || !html) {
                  parent.innerHTML = html;
                }

                parent.scrollTo(0, parent.scrollHeight);
              }
            });
          }

          if (commentCount) {
            commentCount.forEach((svg) => {
              if (svg.getAttribute("data-id") == postId) {
                svg.textContent = String(comments.length);
              }
            });
          }
        });
      }
    }
  };

  req.send(JSON.stringify(formData));
  return;
};

// function to view the messages
let viewThreadMessages = (
  threadId: string,
  csrf: string,
  username: string,
  respondent: string,
  imageUrl: string
) => {
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/messages/thread/${threadId}`;
  let threadArea = document.querySelector(".view") as HTMLDivElement;

  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf,
  };

  req.open("POST", url, true);

  for (let header in headers) {
    req.setRequestHeader(header, headers[header]);
  }

  req.onreadystatechange = () => {
    let html = "";
    if (req.readyState == 4 && req.status == 200) {
      let res: any = JSON.parse(req.responseText);
      // console.log(JSON.parse(res.messages));
      JSON.parse(res.messages).forEach((item: any) => {
        if (item.fields.author[0] != username) {
          html += `
          <div class="respondent">
          <div class="main">
            <p>
              ${item.fields.content}
            </p>
          </div>
          <div class="dummy"></div>
        </div>`;
        } else {
          html += `
          <div class="user-messages">
          <div class="dummy"></div>
          <div class="main">
            <p>
              ${item.fields.content}
            </p>
          </div>
          
        </div>`;
        }
      });

      let container = `
        <div class="thread-view">
          <div class=respondent-thread>
            <img src='${imageUrl}' />
            <p>${respondent}</p>
          </div>
          <div class="thread-messages">
            ${html}
            <div class="reply">
              <form method="post" onsubmit="threadReply(event, '${threadId}', '${csrf}', '${username}', '${respondent}', '${imageUrl}')">
              <input type="hidden" name="csrfmiddlewaretoken" value="${csrf}">
              <textarea required name="reply-message" id="reply-message"></textarea>
              <div class="form-actions">
              <span id="e-selector">😀</span>
              <input type="submit" value="Reply" />
              </div> 
              
              </form>
            </div>
          </div>
        </div>
      `;

      if (container != "undefined" || !container) {
        threadArea.innerHTML = container;
        let threadMessages = document.querySelector(
          ".thread-messages"
        ) as HTMLDivElement;
        threadArea.scrollTo(0, threadArea.scrollHeight);
        threadMessages.scrollTo(0, threadMessages.scrollHeight);
      }
    } else if (req.readyState == 4) {
      alert("Something is off in the receiver function");
    }
  };

  req.send();
  return;
};

// function to send thread replies
let threadReply = (
  e: Event,
  threadId: string,
  csrf: string,
  username: string,
  respondent: string,
  imageUrl: string
) => {
  e.preventDefault();
  let reply = document.getElementById("reply-message") as HTMLTextAreaElement;
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/messages/thread/reply/${threadId}`;
  let threadArea = document.querySelector(".view") as HTMLDivElement;

  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf,
  };

  let data = {
    sender: username,
    receiver: respondent,
    threadId: threadId,
    message: reply.value,
  };

  req.open("POST", url, true);

  for (let header in headers) {
    req.setRequestHeader(header, headers[header]);
  }

  req.onreadystatechange = () => {
    let html = "";
    if (req.readyState == 4 && req.status == 200) {
      let res: any = JSON.parse(req.responseText);
      JSON.parse(res.messages).forEach((item: any) => {
        if (item.fields.author[0] != username) {
          html += `
          <div class="respondent">
          <div class="main">
            <p>
              ${item.fields.content}
            </p>
          </div>
          <div class="dummy"></div>
        </div>`;
        } else {
          html += `
          <div class="user-messages">
          <div class="dummy"></div>
          <div class="main">
            <p>
              ${item.fields.content}
            </p>
          </div>
          
        </div>`;
        }
      });

      let container = `
        <div class="thread-view">
          <div class=respondent-thread>
            <img src='${imageUrl}' />
            <p>${respondent}</p>
          </div>
          <div class="thread-messages">
            ${html}
            <div class="reply">
              <form method="post" onsubmit="threadReply(event, '${threadId}', '${csrf}', '${username}', '${respondent}', '${imageUrl}')">
              <input type="hidden" name="csrfmiddlewaretoken" value="${csrf}">
              <textarea required name="reply-message" id="reply-message"></textarea>
              <div class="form-actions">
              <span id="e-selector">😀</span>
              <input type="submit" value="Reply" />
              </div> 
              </form>
            </div>
          </div>
        </div>
      `;

      if (container != "undefined" || !container) {
        threadArea.innerHTML = container;
        let threadMessages = document.querySelector(
          ".thread-messages"
        ) as HTMLDivElement;
        threadArea.scrollTo(0, threadArea.scrollHeight);
        threadMessages.scrollTo(0, threadMessages.scrollHeight);
      }
    } else if (req.readyState == 4) {
      alert("Something is off in the receiver function");
    }
  };

  req.send(JSON.stringify(data));
};
