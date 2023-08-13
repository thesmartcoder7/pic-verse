// import { EmojiPicker } from './emoji'

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

let openMessageComposer = document.querySelector(
  ".prof-send-message"
) as HTMLAnchorElement;
let messageComposer = document.querySelector(
  ".prof-message-compose"
) as HTMLDivElement;

let closeMessageComposer = document.querySelector(
  ".close-message-composer"
) as HTMLSpanElement;

if (openMessageComposer) {
  openMessageComposer.addEventListener("click", () => {
    if (messageComposer) {
      messageComposer.style.display = "grid";
    }
  });
}

if (closeMessageComposer) {
  closeMessageComposer.addEventListener("click", () => {
    if (messageComposer) {
      messageComposer.style.display = "none";
    }
  });
}

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
      selector: ".e-selector",
      insertInto: ["#reply-message", "#prof-message", ".comment_field"],
    },
  ],
  closeButton: true,
  dragButton: true,
  width: 350,
  height: 370,
  addPosX: -130,
  addPosY: -500,
  tabbed: true,
  navPos: "bottom",
  navButtonReversed: false,
  disableSearch: false,
  hiddenScrollBar: true,
  animation: "slideDown",
  animationDuration: "0.5s",
  disableNav: false,
  emojiDim: {
    emojiPerRow: 6,
    emojiSize: 20,
    emojiButtonHeight: 50,
    hideCategory: false,
  },
});

// format time
function getDayWithSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const inputDate = new Date(timestamp);
  const timeDiff = now.getTime() - inputDate.getTime();

  if (timeDiff < 86400000) {
    // Less than a day
    return `Today, ${inputDate
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()}`;
  } else if (timeDiff < 604800000) {
    // Less than a week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${daysOfWeek[inputDate.getDay()]} at ${inputDate
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()}`;
  } else if (now.getFullYear() === inputDate.getFullYear()) {
    // Within the same year
    const dayWithSuffix = getDayWithSuffix(inputDate.getDate());
    return `${dayWithSuffix} - ${inputDate.toLocaleString("default", {
      month: "short",
    })} at ${inputDate
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()}`;
  } else {
    // More than a year ago
    const yearsAgo = now.getFullYear() - inputDate.getFullYear();
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}

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

  let allThreads = document.querySelectorAll(
    ".info"
  ) as NodeListOf<HTMLDivElement>;
  if (allThreads) {
    allThreads.forEach((thread: HTMLDivElement) => {
      if (thread.getAttribute("data-id") == threadId) {
        thread.classList.remove("start-message");
      }
    });
  }

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
      JSON.parse(res.messages).forEach((item: any) => {
        if (item.fields.author[0] != username) {
          html += `
          <div class="respondent">
          <div class="main">
            <p>
              ${item.fields.content}
            </p>
            <p class="timestamp">${formatTimestamp(item.fields.timestamp)}</p>
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
            <p class="timestamp">${formatTimestamp(item.fields.timestamp)}</p>
          </div>
          
          </div>
          `;
        }
      });

      let container = `
        <div class="thread-view">
          <div class=respondent-thread>
            <img src='${imageUrl}' />
            <a href="${baseURL.origin}/user/${respondent}">${respondent}</a>
          </div>
          <div class="thread-messages">
            ${html}
            <div class="reply">
              <form method="post" onsubmit="threadReply(event, '${threadId}', '${csrf}', '${username}', '${respondent}', '${imageUrl}')">
              <input type="hidden" name="csrfmiddlewaretoken" value="${csrf}">
              <textarea required name="reply-message" id="reply-message"></textarea>
              <div class="form-actions">
              <span class="e-selector">😀</span>
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
            <p class="timestamp">${formatTimestamp(item.fields.timestamp)}</p>
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
            <p class="timestamp">${formatTimestamp(item.fields.timestamp)}</p>
          </div>
          
        </div>`;
        }
      });

      let container = `
        <div class="thread-view">
          <div class=respondent-thread>
            <img src='${imageUrl}' />
            <a href="${baseURL.origin}/user/${respondent}">${respondent}</a>
          </div>
          <div class="thread-messages">
            ${html}
            <div class="reply">
              <form method="post" onsubmit="threadReply(event, '${threadId}', '${csrf}', '${username}', '${respondent}', '${imageUrl}')">
              <input type="hidden" name="csrfmiddlewaretoken" value="${csrf}">
              <textarea required name="reply-message" id="reply-message"></textarea>
              <div class="form-actions">
              <span class="e-selector">😀</span>
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

// function to compose a message
let composeMessage = (
  e: Event,
  recipient: string,
  sender: string,
  csrf: string
) => {
  e.preventDefault();
  let baseURL = new URL(document.URL);
  let req = new XMLHttpRequest();
  let url = `${baseURL.origin}/messages/compose`;
  let message = document.querySelector("#prof-message") as HTMLTextAreaElement;

  let headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf,
  };

  let data = {
    sender: sender,
    receiver: recipient,
    message: message.value,
  };

  req.open("POST", url, true);

  for (let header in headers) {
    req.setRequestHeader(header, headers[header]);
  }

  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      let form = document.getElementById("compose-form") as HTMLFormElement;
      let successDiv = document.querySelector(
        ".message-sent"
      ) as HTMLDivElement;
      form.style.display = "none";
      successDiv.style.display = "flex";
      setTimeout(() => {
        messageComposer.style.display = "none";
      }, 2000);
    } else if (req.readyState == 4) {
      alert("Something is off in the receiver function");
    }
  };

  req.send(JSON.stringify(data));
};
