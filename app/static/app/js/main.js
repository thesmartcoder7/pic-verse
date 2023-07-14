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
    var req = new XMLHttpRequest();
    var url = "".concat(document.URL, "like/").concat(id, "/");
    var headers = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    req.open("POST", url, true);
    for (var header in headers) {
        req.setRequestHeader(header, headers[header]);
    }
    req.onreadystatechange = function () {
        var _a, _b, _c;
        if (req.readyState == 4) {
            if (req.status == 200) {
                var res = JSON.parse(req.responseText);
                if (res.status) {
                    var txt = res.likes > 1 || res.likes == 0 ? "Likes" : "Like";
                    var count = res.likes;
                    var element = e.target;
                    element.textContent = res.button_text;
                    var counter = (_a = element.offsetParent) === null || _a === void 0 ? void 0 : _a.querySelector(".likes-counter");
                    counter.textContent = "".concat(count, " ").concat(txt);
                    console.log(e);
                    var svg = (_c = (_b = element.offsetParent) === null || _b === void 0 ? void 0 : _b.previousElementSibling) === null || _c === void 0 ? void 0 : _c.querySelector(".likes-counter-svg");
                    svg.textContent = count;
                }
                else {
                    alert("Error Occured");
                }
            }
        }
    };
    req.send();
};
