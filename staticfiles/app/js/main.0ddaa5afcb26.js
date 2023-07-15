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
            e.target.nextElementSibling.style.display = "flex";
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
