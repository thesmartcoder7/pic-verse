// import { EmojiPicker } from './emoji'
var postSections = document.querySelectorAll(".profile");
var profileNavs = document.querySelectorAll(".p-nav");
var hoverimages = document.querySelectorAll(".display_image");
var imageCounters = document.querySelectorAll(".counters");
var modalClosers = document.querySelectorAll(".close");
var postModal = document.querySelector(".post-modal");
var createPostToggle = document.querySelector(".toggle-add-post");
var disablePost = document.querySelector(".disable-post-button");
var openMessageComposer = document.querySelector(".prof-send-message");
var messageComposer = document.querySelector(".prof-message-compose");
var closeMessageComposer = document.querySelector(".close-message-composer");
if (openMessageComposer) {
    openMessageComposer.addEventListener("click", function () {
        if (messageComposer) {
            messageComposer.style.display = "grid";
        }
    });
}
if (closeMessageComposer) {
    closeMessageComposer.addEventListener("click", function () {
        if (messageComposer) {
            messageComposer.style.display = "none";
        }
    });
}
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
            selector: ".e-selector",
            insertInto: ["#reply-message", "#prof-message", ".comment_field"]
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
        hideCategory: false
    }
});
// format time
function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
        return "".concat(day, "th");
    }
    switch (day % 10) {
        case 1:
            return "".concat(day, "st");
        case 2:
            return "".concat(day, "nd");
        case 3:
            return "".concat(day, "rd");
        default:
            return "".concat(day, "th");
    }
}
function formatTimestamp(timestamp) {
    var now = new Date();
    var inputDate = new Date(timestamp);
    var timeDiff = now.getTime() - inputDate.getTime();
    if (timeDiff < 86400000) {
        // Less than a day
        return "Today, ".concat(inputDate
            .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
            .toLowerCase());
    }
    else if (timeDiff < 604800000) {
        // Less than a week
        var daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return "".concat(daysOfWeek[inputDate.getDay()], " at ").concat(inputDate
            .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
            .toLowerCase());
    }
    else if (now.getFullYear() === inputDate.getFullYear()) {
        // Within the same year
        var dayWithSuffix = getDayWithSuffix(inputDate.getDate());
        return "".concat(dayWithSuffix, " - ").concat(inputDate.toLocaleString("default", {
            month: "short"
        }), " at ").concat(inputDate
            .toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })
            .toLowerCase());
    }
    else {
        // More than a year ago
        var yearsAgo = now.getFullYear() - inputDate.getFullYear();
        return "".concat(yearsAgo, " year").concat(yearsAgo > 1 ? "s" : "", " ago");
    }
}
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
    var allThreads = document.querySelectorAll(".info");
    if (allThreads) {
        allThreads.forEach(function (thread) {
            if (thread.getAttribute("data-id") == threadId) {
                thread.classList.remove("start-message");
            }
        });
    }
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
            JSON.parse(res.messages).forEach(function (item) {
                if (item.fields.author[0] != username) {
                    html += "\n          <div class=\"respondent\">\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n            <p class=\"timestamp\">").concat(formatTimestamp(item.fields.timestamp), "</p>\n          </div>\n          <div class=\"dummy\"></div>\n        </div>");
                }
                else {
                    html += "\n          <div class=\"user-messages\">\n          <div class=\"dummy\"></div>\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n            <p class=\"timestamp\">").concat(formatTimestamp(item.fields.timestamp), "</p>\n          </div>\n          \n          </div>\n          ");
                }
            });
            var container = "\n        <div class=\"thread-view\">\n          <div class=respondent-thread>\n            <img src='".concat(imageUrl, "' />\n            <a href=\"").concat(baseURL.origin, "/user/").concat(respondent, "\">").concat(respondent, "</a>\n          </div>\n          <div class=\"thread-messages\">\n            ").concat(html, "\n            <div class=\"reply\">\n              <form method=\"post\" onsubmit=\"threadReply(event, '").concat(threadId, "', '").concat(csrf, "', '").concat(username, "', '").concat(respondent, "', '").concat(imageUrl, "')\">\n              <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"").concat(csrf, "\">\n              <textarea required name=\"reply-message\" id=\"reply-message\"></textarea>\n              <div class=\"form-actions\">\n              <span class=\"e-selector\">\uD83D\uDE00</span>\n              <input type=\"submit\" value=\"Reply\" />\n              </div> \n              \n              </form>\n            </div>\n          </div>\n        </div>\n      ");
            if (container != "undefined" || !container) {
                threadArea.innerHTML = container;
                var threadMessages = document.querySelector(".thread-messages");
                threadArea.scrollTo(0, threadArea.scrollHeight);
                threadMessages.scrollTo(0, threadMessages.scrollHeight);
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
                    html += "\n          <div class=\"respondent\">\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n            <p class=\"timestamp\">").concat(formatTimestamp(item.fields.timestamp), "</p>\n          </div>\n          <div class=\"dummy\"></div>\n        </div>");
                }
                else {
                    html += "\n          <div class=\"user-messages\">\n          <div class=\"dummy\"></div>\n          <div class=\"main\">\n            <p>\n              ".concat(item.fields.content, "\n            </p>\n            <p class=\"timestamp\">").concat(formatTimestamp(item.fields.timestamp), "</p>\n          </div>\n          \n        </div>");
                }
            });
            var container = "\n        <div class=\"thread-view\">\n          <div class=respondent-thread>\n            <img src='".concat(imageUrl, "' />\n            <a href=\"").concat(baseURL.origin, "/user/").concat(respondent, "\">").concat(respondent, "</a>\n          </div>\n          <div class=\"thread-messages\">\n            ").concat(html, "\n            <div class=\"reply\">\n              <form method=\"post\" onsubmit=\"threadReply(event, '").concat(threadId, "', '").concat(csrf, "', '").concat(username, "', '").concat(respondent, "', '").concat(imageUrl, "')\">\n              <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"").concat(csrf, "\">\n              <textarea required name=\"reply-message\" id=\"reply-message\"></textarea>\n              <div class=\"form-actions\">\n              <span class=\"e-selector\">\uD83D\uDE00</span>\n              <input type=\"submit\" value=\"Reply\" />\n              </div> \n              </form>\n            </div>\n          </div>\n        </div>\n      ");
            if (container != "undefined" || !container) {
                threadArea.innerHTML = container;
                var threadMessages = document.querySelector(".thread-messages");
                threadArea.scrollTo(0, threadArea.scrollHeight);
                threadMessages.scrollTo(0, threadMessages.scrollHeight);
            }
        }
        else if (req.readyState == 4) {
            alert("Something is off in the receiver function");
        }
    };
    req.send(JSON.stringify(data));
};
// function to compose a message
var composeMessage = function (e, recipient, sender, csrf) {
    e.preventDefault();
    var baseURL = new URL(document.URL);
    var req = new XMLHttpRequest();
    var url = "".concat(baseURL.origin, "/messages/compose");
    var message = document.querySelector("#prof-message");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    var data = {
        sender: sender,
        receiver: recipient,
        message: message.value
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var form = document.getElementById("compose-form");
            var successDiv = document.querySelector(".message-sent");
            form.style.display = "none";
            successDiv.style.display = "flex";
            setTimeout(function () {
                messageComposer.style.display = "none";
            }, 2000);
        }
        else if (req.readyState == 4) {
            alert("Something is off in the receiver function");
        }
    };
    req.send(JSON.stringify(data));
};
