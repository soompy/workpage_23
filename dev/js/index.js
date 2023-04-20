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
    let modeText = document.querySelector(".mode-text");

    window.addEventListener('load', function () {
        document.documentElement.setAttribute('data-theme', 'light');
        modeText.innerHTML = "라이트 <br> 모드"
    });

    document.querySelector('#setMode').addEventListener('change', function (event) {
        if (event.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            modeText.innerHTML = "다크 <br> 모드"
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            modeText.innerHTML = "라이트 <br> 모드"
        }
    })
}

themeSwitcher();

// 탭
const noticeItem = document.querySelectorAll(".notice_item");
const noticeContents = document.querySelectorAll(".notice_contents");

noticeItem.forEach((tabs, idx) => {
  tabs.addEventListener("click", function () {
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
const accHead = document.querySelectorAll(".accordion_head");
const accBody = document.querySelectorAll(".accordion_body");

accHead.forEach((acc, index) => {
  acc.addEventListener("click", function () {
    accHead[index].parentElement.classList.toggle("active");
  });
});
