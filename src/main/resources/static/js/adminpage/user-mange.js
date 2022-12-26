const updateBtns = document.querySelectorAll(".update-btn");
const popupBack = document.querySelector(".popup-back");
const popupUpdateBtn = document.querySelector(".popup-update-btn");
const popupCloseBtn = document.querySelector(".popup-close-btn");

updateBtns.forEach((updateBtn, index) => {
    updateBtn.onclick = () => {
        popupBack.classList.remove("invisible");
    }

})


popupCloseBtn.onclick = () => {
    popupBack.classList.add("invisible");
}

// 수정 팝업에서 수정버튼 클릭시
popupUpdateBtn.onclick = () => {
    alert("수정");
}
