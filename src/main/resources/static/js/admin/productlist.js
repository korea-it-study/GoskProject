// 등록 팝업
const registerBtn = document.querySelector(".register-btn");
const popup = document.querySelector(".popup");
const popupBack = document.querySelector(".popup-back");
const closeBtn = document.querySelector(".close-btn");
const popupRegisterBtn = document.querySelector(".popup-register-btn");

registerBtn.onclick = () => {
    // popup.classList.remove("invisible");
    popupBack.classList.remove("invisible");

}

closeBtn.onclick = () => {
    // popup.classList.add("invisible");
    popupBack.classList.add("invisible");
}

// 등록 팝업에서 등록버튼 클릭시
popupRegisterBtn.onclick = () => {
    alert("등록");
}

// 수정 팝업
const updateBtns = document.querySelectorAll(".update-btn");
const popupBack2 = document.querySelector(".popup-back2");
const popup2UpdateBtn = document.querySelector(".popup2-update-btn");
const popup2CloseBtn = document.querySelector(".popup2-close-btn");

updateBtns.forEach((updateBtn, index) => {
    updateBtn.onclick = () => {
        popupBack2.classList.remove("invisible");
    }

})


popup2CloseBtn.onclick = () => {
    popupBack2.classList.add("invisible");
}

// 수정 팝업에서 수정버튼 클릭시
popup2UpdateBtn.onclick = () => {
    alert("수정");
}


const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");

// 지정석만 조회
reserved.onclick = () => {
    alert("지정석");
}

// 일반석만 조회
nomal.onclick = () => {
    alert("일반석");
}