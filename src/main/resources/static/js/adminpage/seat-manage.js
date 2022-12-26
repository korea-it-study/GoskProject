const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");

// 지정석만 조회
reserved.onclick = () => {
    alert("지정석");
    seatSpecial.classList.remove("invisible");
    seatBasic.classList.add("invisible");
}

// 일반석만 조회
nomal.onclick = () => {
    alert("일반석");
    seatSpecial.classList.add("invisible");
    seatBasic.classList.remove("invisible");
}

const seatBtns = document.querySelectorAll(".seat-btn");

seatBtns.forEach((seatBtn, index) => {
    seatBtn.onclick = () => {
        seatBtn.classList.toggle("selected-seat");
    }
})

const repairBtn = document.querySelector(".repair-btn");

repairBtn.onclick = () => {
    seatBtns.forEach((seatBtn, index) => {
        if (seatBtn.classList.contains("selected-seat")) {
            seatBtn.classList.add("repaire-seat");
        }

    })
}