//헤더 내 링크 클릭 이벤트
const navLinks = document.getElementsByName("header nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});

// 스크롤 이벤트 핸들러
window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  var scrollPosition = window.page;

  if (scrollPosition > 0) {
    header.style.backgroundColor = "#555";
  } else {
    header.style.backgroundColor = "#333";
  }
});

//맨위로 버튼 클릭 이벤트
const scrollTopBtn = document.getElementById("scroll-to-top");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//햄버거바
    const burgerBtn=document.getElementsByClassName("navbar-Btn")[0];
    const menu=document.getElementsByClassName("intro-bar")[0];

    burgerBtn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const output = document.getElementById("output");
  let data = JSON.parse(localStorage.getItem("guestbook")) || [];

  // 폼 제출 시 이벤트 처리
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const contentInput = document.getElementById("content");
    const name = nameInput.value.trim();
    const content = contentInput.value.trim();

    if (name !== "" && content != "") {
      // 새로운 데이터 생성
      const newData = {
        id: Date.now(), // 간단한 방법으로 ID 생성
        name: name,
        content: content,
        date: formatDate(Date.now()),
      };

      // 데이터 추가
      data.push(newData);

      // 화면 갱신
      renderData();

      // 입력 필드 초기화
      nameInput.value = "";
      contentInput.value = "";

      // 데이터 저장
      saveData();
    }
  });

  // 데이터 저장 함수
  function saveData() {
    localStorage.setItem("guestbook", JSON.stringify(data));
  }

  // 데이터 출력 함수
  function renderData() {
    output.innerHTML = "";

    if (data.length === 0) {
      output.innerHTML = "No data available.";
      return;
    }

    data.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.id = "book-wrapper";
      listItem.className = "book-wrapper";
      listItem.innerHTML = `
                <div class="form-top">
                <h4 class="h4-titles">${item.name}</h4>
                <h6 class="contents">
                <button class="contents" data-id="${item.id}" id="edit-btn-${item.id}"><i class="contents fa-regular fa-pen-to-square"></i> Edit</button>
                <button class="contents" data-id="${item.id}" id="delete-btn-${item.id}"><i class="contents fa-solid fa-trash"></i> Delete</button>
                </h6>
                </div>
                <div class="separator " style="margin-top: 0px;margin-bottom: 28px;"></div>
                
                <h6 class="contents">${item.date}</h6>
                <div class="separator" style="margin-top: 20px;margin-bottom: 0px;"></div>
                <p class="contents" style="text-align: left;">${item.content}</p>
                `;
      output.appendChild(listItem);

      // 수정 버튼 클릭 시 이벤트 처리
      const editBtn = document.getElementById(`edit-btn-${item.id}`);
      editBtn.addEventListener("click", () => {
        const id = editBtn.getAttribute("data-id");
        console.log(id);
        editData(id);
      });

      // 삭제 버튼 클릭 시 이벤트 처리
      const deleteBtn = document.getElementById(`delete-btn-${item.id}`);
      deleteBtn.addEventListener("click", () => {
        const id = parseInt(deleteBtn.getAttribute("data-id"));
        deleteData(id);
      });
    });
  }

  // 데이터 삭제 함수
  function deleteData(id) {
    data = data.filter((item) => item.id !== id);
    renderData();
    saveData(); // 삭제 후 데이터 저장
  }

  // 데이터 수정 함수
  function editData(id) {
    const selectedItem = data.find((item) => item.id == id);
    if (selectedItem) {
      const modal = document.getElementById("edit-modal");
      const newNameInput = document.getElementById("new-name");
      const newContentInput = document.getElementById("new-content");
      newNameInput.value = selectedItem.name;
      newContentInput.value = selectedItem.content;

      modal.style.display = "block";

      const saveBtn = document.getElementById("save-btn");
      saveBtn.addEventListener("click", () => {
        const newName = newNameInput.value.trim();
        const newContent = newContentInput.value.trim();
        if (newName !== "" && newContent !== "") {
          selectedItem.name = newName;
          selectedItem.content = newContent;
          renderData();
          saveData();
          modal.style.display = "none";
        } else {
          alert("Please fill out all fields.");
        }
      });

      const cancelBtn = document.getElementById("cancel-btn");
      cancelBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  }

  // 초기 데이터 출력
  renderData();
});

function formatDate(milliseconds) {
  // 밀리초를 포함한 날짜 객체 생성
  const date = new Date(milliseconds);

  // 원하는 날짜 형식으로 변환 (예: yyyy-mm-dd hh:mm:ss)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 문자열로 변환 후 두 자리로 맞춤
  const day = String(date.getDate()).padStart(2, "0"); // 날짜를 문자열로 변환 후 두 자리로 맞춤
  const hours = String(date.getHours()).padStart(2, "0"); // 시간을 문자열로 변환 후 두 자리로 맞춤
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 문자열로 변환 후 두 자리로 맞춤
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 초를 문자열로 변환 후 두 자리로 맞춤

  // 최종적으로 yyyy-mm-dd hh:mm:ss 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 인물소개(프로필, 대표작)

// 토글기능
function contentsToggle(e) {
  e.currentTarget.children[0].classList.toggle("fa-caret-right");
  e.currentTarget.children[0].classList.toggle("fa-caret-down");
  e.currentTarget.nextElementSibling.classList.toggle("show");
}

const toggle = document.getElementsByClassName("toggle");

Array.from(toggle).forEach((item) =>
  item.addEventListener("click", contentsToggle)
);

//카카오톡 공유하기
Kakao.init("76cbad74cc58c781ef5b26d7520a453d"); // 사용하려는 앱의 JavaScript 키 입력
Kakao.isInitialized();

Kakao.Share.createDefaultButton({
  container: "#share-btn",
  objectType: "text",
  text: "Brad Pitt 소개페이지 입니다.",
  link: {
    mobileWebUrl: "http://127.0.0.1:5500/index.html",
    webUrl: "http://127.0.0.1:5500/index.html",
  },
});

// graphic chart

const ctx = document.getElementById("fil-chart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "1995 세븐",
      "2001 오션스일레븐",
      "2004 트로이",
      "2005 오션스 트웰브",
      "2005 미스터&미세스",
      "2007 오션스13",
      "2013 월드워 Z",
    ],
    datasets: [
      {
        label: "단위: 억",
        data: [4478, 6136, 6807, 4958, 6546, 4258, 7395],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

//css animation

var slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("my-slides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000);
}
