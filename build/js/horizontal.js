// 마우스 휠 가로스크롤 js
var swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    freeMode: {
        enabled: true,
        sticky: true,
    },

    spaceBetween: 10,
    mousewheel: true
});
//
function selectElementByClass(className) {
    return document.querySelector(`.${className}`);
}

const sections = [
    selectElementByClass("firstClass"),
    selectElementByClass("secondClass"),
    selectElementByClass("thirdClass"),
    selectElementByClass("fourthClass"),
    selectElementByClass("fifthClass"),
    selectElementByClass("sixtClass")
];

const navItems = {
    firstID: selectElementByClass("FirstNavItem"),
    secondID: selectElementByClass("SecondNavItem"),
    thirdID: selectElementByClass("ThirdNavItem"),
    fourthID: selectElementByClass("FourthNavItem"),
    fifthID: selectElementByClass("FifthNavItem"),
    sixtID: selectElementByClass("SixtNavItem")
};

// intersection observer setup
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7
};

function observerCallback(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // get the nav item corresponding to the id of the section
            // that is currently in view
            const navItem = navItems[entry.target.id];
            //get the "alt" tag of section in view
            // alt tag equals slide index of swiper
            const navItemAlt = navItem.getAttribute("alt");
            // tell swiper to slide to the slide with index of "alt"
            swiper.slideTo(navItemAlt, 300, true)
            // add 'active' class on the navItem
            navItem.classList.add("swiper-slide-active2");
            // remove 'active' class from any navItem that is not
            // same as 'navItem' defined above
            Object.values(navItems).forEach((item) => {
                if (item != navItem) {
                    item.classList.remove("swiper-slide-active2");
                }
            });
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((sec) => observer.observe(sec));