var postSections = document.querySelectorAll(".profile");
var profileNavs = document.querySelectorAll(".p-nav");
var hoverimages = document.querySelectorAll(".display_image");
var imageCounters = document.querySelectorAll(".counters");
var modalClosers = document.querySelectorAll(".close");
var postModal = document.querySelector(".post-modal");
var createPostToggle = document.querySelector(".toggle-add-post");
var disablePost = document.querySelector(".disable-post-button");
if (disablePost) {
    disablePost.addEventListener("click", function () {
        if (createPostToggle) {
            createPostToggle.style.display = "none";
        }
    });
}
if (createPostToggle) {
    createPostToggle.addEventListener("click", function (e) {
        if (postModal) {
            postModal.style.display = "flex";
        }
    });
}
if (profileNavs) {
    for (var _i = 0, _a = profileNavs; _i < _a.length; _i++) {
        var nav = _a[_i];
        nav.addEventListener("click", function (e) {
            for (var _i = 0, _a = profileNavs; _i < _a.length; _i++) {
                var nav_1 = _a[_i];
                nav_1.classList.remove("active");
            }
            e.target.classList.add("active");
            for (var _b = 0, _c = postSections; _b < _c.length; _b++) {
                var section = _c[_b];
                section.classList.remove("active");
                if (section.classList.contains(e.target.textContent.toLowerCase())) {
                    section.classList.add("active");
                }
            }
        });
    }
}
if (hoverimages) {
    for (var _b = 0, _c = hoverimages; _b < _c.length; _b++) {
        var image = _c[_b];
        image.addEventListener("mouseover", function (e) {
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.style.display = "flex";
            }
        });
        image.addEventListener("click", function (e) {
            console.log(e);
        });
    }
}
if (imageCounters) {
    for (var _d = 0, _e = imageCounters; _d < _e.length; _d++) {
        var counter = _e[_d];
        counter.addEventListener("mouseleave", function (e) {
            e.target.style.display = "none";
        });
        counter.addEventListener("click", function (e) {
            e.target.nextElementSibling.style.display = "flex";
            var commentPArentDivs = document.querySelectorAll(".all-comments");
            if (commentPArentDivs) {
                commentPArentDivs.forEach(function (parent) {
                    parent.scrollTo(0, parent.scrollHeight);
                });
            }
        });
    }
}
if (modalClosers) {
    for (var _f = 0, _g = modalClosers; _f < _g.length; _f++) {
        var closer = _g[_f];
        closer.addEventListener("click", function (e) {
            e.target.parentElement.style.display = "none";
        });
    }
}
// emoji picker for the textarea
new EmojiPicker({
    trigger: [
        {
            insertInto: ["#reply-message"],
            selector: "#e-selector"
        },
    ],
    closeButton: true,
    dragButton: true
});
// ajax function to update the likes on a post based on a click event
var likeRequest = function (id, csrf, e) {
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/like/").concat(id, "/");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var res_1 = JSON.parse(req.responseText);
                if (res_1.status) {
                    var text_1 = res_1.likes > 1 || res_1.likes == 0 ? "Likes" : "Like";
                    var count_1 = res_1.likes;
                    var likeButtons = document.querySelectorAll(".ajax-like-button");
                    if (likeButtons) {
                        likeButtons.forEach(function (button) {
                            if (button.getAttribute("data-id") == id) {
                                button.textContent = res_1.button_text;
                            }
                        });
                    }
                    var likeSvgs = document.querySelectorAll(".likes-counter-svg");
                    if (likeSvgs) {
                        likeSvgs.forEach(function (svg) {
                            if (svg.getAttribute("data-id") == id) {
                                svg.textContent = count_1;
                            }
                        });
                    }
                    var likeCounters = document.querySelectorAll(".post-like-counter");
                    if (likeCounters) {
                        likeCounters.forEach(function (counter) {
                            if (counter.getAttribute("data-id") == id) {
                                counter.textContent = "".concat(count_1, " ").concat(text_1);
                            }
                        });
                    }
                }
                else {
                    alert("Error Occured");
                }
            }
        }
    };
    req.send();
};
// ajax function to update the likes on a post based on a click event
var followRequest = function (user1, user2, csrf, id) {
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/users/follow/").concat(user1, "/").concat(user2, "/");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var res_2 = JSON.parse(req.responseText);
                if (res_2.status) {
                    var followButtons = document.querySelectorAll(".ajax-follow-button");
                    if (followButtons) {
                        followButtons.forEach(function (button) {
                            if (button.getAttribute("data-id") == id) {
                                button.textContent = res_2.button_text;
                            }
                        });
                    }
                    var userFollowingCount = document.querySelectorAll(".user-following-count");
                    if (userFollowingCount) {
                        userFollowingCount.forEach(function (count) {
                            count.textContent = res_2.auth_following;
                        });
                    }
                    var followeeCount = document.querySelectorAll(".followee-following-count");
                    if (followeeCount) {
                        followeeCount.forEach(function (count) {
                            count.textContent = res_2.followee_following;
                        });
                    }
                }
                else {
                    alert("Error Occured");
                }
            }
        }
    };
    req.send();
};
// ajax function to update the comments on a post based on a submission event
var updateComment = function (postId, csrf, event) {
    event.preventDefault();
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/comment/").concat(postId, "/");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    var comments = document.querySelectorAll(".comment_field");
    var value;
    if (comments) {
        comments.forEach(function (comment) {
            if (comment.getAttribute("data-id") == postId) {
                value = comment.value;
                comment.value = "";
            }
        });
    }
    var formData = {
        comment: value
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var res = JSON.parse(req.responseText);
            var comments_1 = JSON.parse(res.comments);
            var commentCount_1 = document.querySelectorAll(".comments-counter-svg");
            if (res.status == true && res.comments) {
                var html_1 = "";
                var allComments_1 = document.querySelectorAll(".all-comments");
                comments_1.forEach(function (comment) {
                    html_1 += "\n              <div class=\"single-comment\">\n              <a\n                href=\"".concat(baseURL.origin, "/user/").concat(comment.fields.user[0], "\"\n                class=\"username\"\n                >@").concat(comment.fields.user[0].toLowerCase(), "</a\n              >\n              <br />\n              <p>").concat(comment.fields.content, "</p>\n            </div>\n          ");
                    if (allComments_1) {
                        allComments_1.forEach(function (parent) {
                            if (parent.getAttribute("data-id") == postId) {
                                if (html_1 != "undefined" || !html_1) {
                                    parent.innerHTML = html_1;
                                }
                                parent.scrollTo(0, parent.scrollHeight);
                            }
                        });
                    }
                    if (commentCount_1) {
                        commentCount_1.forEach(function (svg) {
                            if (svg.getAttribute("data-id") == postId) {
                                svg.textContent = String(comments_1.length);
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
var viewThreadMessages = function (threadId, csrf, username, respondent, imageUrl) {
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/messages/thread/").concat(threadId);
    var threadArea = document.querySelector(".view");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        var html = "";
        if (req.readyState == 4 && req.status == 200) {
            var res = JSON.parse(req.responseText);
            // console.log(JSON.parse(res.messages));
            JSON.parse(res.messages).forEach(function (item) {
                if (item.fields.author[0] != username) {
                    html += "\n          <div class=\"respondent\">\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n          </div>\n          <div class=\"dummy\"></div>\n        </div>");
                }
                else {
                    html += "\n          <div class=\"user-messages\">\n          <div class=\"dummy\"></div>\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n          </div>\n          \n        </div>");
                }
            });
            var container = "\n        <div class=\"thread-view\">\n          <div class=respondent-thread>\n            <img src='".concat(imageUrl, "' />\n            <p>").concat(respondent, "</p>\n          </div>\n          <div class=\"thread-messages\">\n            ").concat(html, "\n            <div class=\"reply\">\n              <form method=\"post\" onsubmit=\"threadReply(event, '").concat(threadId, "', '").concat(csrf, "', '").concat(username, "', '").concat(respondent, "', '").concat(imageUrl, "')\">\n              <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"").concat(csrf, "\">\n              <textarea required name=\"reply-message\" id=\"reply-message\"></textarea>\n              <div class=\"form-actions\">\n              <span id=\"e-selector\">\uD83D\uDE00</span>\n              <input type=\"submit\" value=\"Reply\" />\n              </div> \n              \n              </form>\n            </div>\n          </div>\n        </div>\n      ");
            if (container != "undefined" || !container) {
                threadArea.innerHTML = container;
                threadArea.scrollTo(0, threadArea.scrollHeight);
            }
        }
        else if (req.readyState == 4) {
            alert("Something is off in the receiver function");
        }
    };
    req.send();
    return;
};
// function to send thread replies
var threadReply = function (e, threadId, csrf, username, respondent, imageUrl) {
    e.preventDefault();
    var reply = document.getElementById("reply-message");
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/messages/thread/reply/").concat(threadId);
    var threadArea = document.querySelector(".view");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    var data = {
        sender: username,
        receiver: respondent,
        threadId: threadId,
        message: reply.value
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        var html = "";
        if (req.readyState == 4 && req.status == 200) {
            var res = JSON.parse(req.responseText);
            JSON.parse(res.messages).forEach(function (item) {
                if (item.fields.author[0] != username) {
                    html += "\n          <div class=\"respondent\">\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n          </div>\n          <div class=\"dummy\"></div>\n        </div>");
                }
                else {
                    html += "\n          <div class=\"user-messages\">\n          <div class=\"dummy\"></div>\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n          </div>\n          \n        </div>");
                }
            });
            var container = "\n        <div class=\"thread-view\">\n          <div class=respondent-thread>\n            <img src='".concat(imageUrl, "' />\n            <p>").concat(respondent, "</p>\n          </div>\n          <div class=\"thread-messages\">\n            ").concat(html, "\n            <div class=\"reply\">\n              <form method=\"post\" onsubmit=\"threadReply(event, '").concat(threadId, "', '").concat(csrf, "', '").concat(username, "', '").concat(respondent, "', '").concat(imageUrl, "')\">\n              <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"").concat(csrf, "\">\n              <textarea required name=\"reply-message\" id=\"reply-message\"></textarea>\n              <div class=\"form-actions\">\n              <span id=\"e-selector\">\uD83D\uDE00</span>\n              <input type=\"submit\" value=\"Reply\" />\n              </div> \n              </form>\n            </div>\n          </div>\n        </div>\n      ");
            if (container != "undefined" || !container) {
                threadArea.innerHTML = container;
                threadArea.scrollTo(0, threadArea.scrollHeight);
            }
        }
        else if (req.readyState == 4) {
            alert("Something is off in the receiver function");
        }
    };
    req.send(JSON.stringify(data));
};
