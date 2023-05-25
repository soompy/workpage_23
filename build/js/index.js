// 모바일 메뉴 열기 닫기 버튼
const mobileMenu =  document.querySelector(".m-menu");
const mobileOpenMenu = document.querySelector(".m-menu .bar");
const mobileCloseMenu = document.querySelector(".m-menu-close");

mobileOpenMenu.addEventListener("click", () => {
    mobileMenu.classList.add("active");
})

mobileCloseMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
})


//   테마
const themeSwitcher = () => {
    let modeText = document.querySelector(".mode-icon");

    window.addEventListener('load', function () {
        document.documentElement.setAttribute('data-theme', 'light');
        modeText.style.backgroundImage = "url('../images/icon/ic_light.svg')";
    });

    document.querySelector('#setMode').addEventListener('change', function (event) {      
      if (event.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            modeText.style.backgroundImage = "url('../images/icon/ic_moon.svg')";            
        } else {
            document.documentElement.setAttribute('data-theme', 'light');            
            modeText.style.backgroundImage = "url('../images/icon/ic_light.svg')";
        }
    })
}

themeSwitcher();

// 탭
const noticeItem = document.querySelectorAll(".notice-item");
const noticeContents = document.querySelectorAll(".notice-contents");

noticeItem.forEach((tabs, idx) => {
  tabs.addEventListener("click", () => {
    noticeItem.forEach((item) => {
      item.classList.remove("active");
    });

    noticeContents.forEach((inner) => {
      inner.classList.remove("on");
    });

    noticeItem[idx].classList.add("active");
    noticeContents[idx].classList.add("on");
  });
});

// 아코디언
const accHead = document.querySelectorAll(".accordion-head");
const accBody = document.querySelectorAll(".accordion-body");

accHead.forEach((acc, index) => {
  acc.addEventListener("click", () => {
    accHead[index].parentElement.classList.toggle("active");
  });
});

// 검색
const pcSearch = document.querySelector(".pc-search");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", () => {
  pcSearch.classList.add("on");
})