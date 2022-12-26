const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

// 지정석만 조회
reserved.onclick = () => {
    alert("지정석");
    seatSpecial.classList.remove("invisible");
    lockerManage.classList.add("invisible");
    seatBasic.classList.add("invisible");
}

// 일반석만 조회
nomal.onclick = () => {
    alert("일반석");
    seatSpecial.classList.add("invisible");
    lockerManage.classList.add("invisible");
    seatBasic.classList.remove("invisible");
}

locker.onclick = () => {
    alert("사물함");
    seatSpecial.classList.add("invisible");
    lockerManage.classList.remove("invisible");
    seatBasic.classList.add("invisible");
    
}

const seatBtns = document.querySelectorAll(".seat-btn");

seatBtns.forEach((seatBtn, index) => {
    seatBtn.onclick = () => {
        seatBtn.classList.toggle("selected-seat");
        seatBtn.classList.toggle("seatborder");
    }
})

const repairBtn = document.querySelector(".repair-btn");

repairBtn.onclick = () => {
    seatBtns.forEach((seatBtn, index) => {
        if (seatBtn.classList.contains("selected-seat")) {
            seatBtn.classList.add("repaire-seat");
            seatBtn.classList.remove("seatborder");
        }else if(seatBtn.classList.contains("repaire-seat")){
            seatBtn.classList.remove("repaire-seat");
            seatBtn.classList.remove("seatborder");
        }

    })
}

// 팝업 띄우기

const registerBtn = document.querySelector(".register-btn");
const popup = document.querySelector(".popup-seat");
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
    alert("수정 완료!");
}