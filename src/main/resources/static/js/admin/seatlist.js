let principal = getPrincipal();

const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

const lockerName = document.querySelectorAll(".locker-management-content > div .btn")
const userShow = document.querySelector(".user-show");


// 지정석만 조회 + 선택 다 풀기
reserved.onclick = () => {
    alert("지정석");
    seatSpecial.classList.remove("invisible");
    lockerManage.classList.add("invisible");
    seatBasic.classList.add("invisible");
    seatBtnService();

}

// 일반석만 조회
nomal.onclick = () => {
    alert("일반석");
    seatSpecial.classList.add("invisible");
    lockerManage.classList.add("invisible");
    seatBasic.classList.remove("invisible");
    seatBtnService();
}

// 사물함만 조회
locker.onclick = () => {
    alert("사물함");
    seatSpecial.classList.add("invisible");
    lockerManage.classList.remove("invisible");
    seatBasic.classList.add("invisible");
    seatBtnService();
    
}

//초기 seat 설정 (value 달아주기)
const seatBtns = document.querySelectorAll(".seat-btn");
seatBtns.forEach(seatBtn => {
    seatBtn.value = seatBtn.textContent;
});

function seatBtnService(){
    offSelectClass();
//좌석버튼 클릭시
    seatBtns.forEach((seatBtn, index) => {
        //value 부여
        let seatName = seatBtn.value
        seatBtn.innerHTML = `${seatName}`;

        seatBtn.onclick = () => {

            seatBtn.classList.toggle("selected-seat");
            seatBtn.classList.toggle("seatborder");
            //사용중인 좌석이면
            if(seatBtn.classList.contains("org-btn")){
                seatBtn.classList.toggle("get-dtl");
                console.log("사용중인 좌석");
                //dtl 포함되어있으면 세부정보 가져와
                if(seatBtn.classList.contains("get-dtl")){
                    console.log("dtl 켜짐");
                    getSeatDtl(seatName, index);
                }else{
                    console.log("dtl 꺼짐");
                    seatBtn.innerHTML = `${seatName}`;
                }

            }
        }
    });
}


function offSelectClass(){
    seatBtns.forEach(seatBtn => {
        seatBtn.classList.remove("selected-seat");
        seatBtn.classList.remove("seatborder");
        seatBtn.classList.remove("get-dtl");
    })
}

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

// 자리이동 팝업 띄우기

const moveBtn = document.querySelector(".move-btn");
const selCate = document.querySelector(".sel_cate");
const selList = document.querySelector(".sel_list"); // 소분류
const selList2 = document.querySelector(".sel_list2"); // 소소분류

const popupBack = document.querySelector(".popup-back");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const popupRegisterBtn = document.querySelector(".popup-register-btn");

moveBtn.onclick = () => {
    popupBack.classList.remove("invisible");
    let userPhone = principal.user.user_phone;
    userShow.innerHTML = `사용자 : ${userPhone.slice(-4)}`
}

closeBtn.onclick = () => {
    popupBack.classList.add("invisible");
}

// 이동 팝업에서 변경버튼 클릭시
popupRegisterBtn.onclick = () => {
    alert("변경");


}


selCate.onchange = () => {
    categoryList(selCate.value);

}


function categoryList(sVal) {

    if(sVal == "option") {
        num = new Array("소분류");
        vnum = new Array("");
   
    } else if(sVal == "special" || sVal == "nomal" ) {

        selList.innerHTML = ""; // 소분류
        selList2.innerHTML = ""; // 소소분류


        for(let i = 0; i < 3; i++) {
            selList.innerHTML += `
            <option value="${i}">${i}</option>
            `;
        }

        for(let i = 0; i < 3; i++) {
            selList2.innerHTML += `
                <option value="2">DATA</option>
            `;
        }
    }else if(sVal == "locker"){
        selList.innerHTML = ""; // 원래 좌석
        selList2.innerHTML = ""; // 이동할 좌석

        //원래 좌석 선택(모든 사용중인 좌석 선택 가능)
        let responseData = getReq("/api/move/locker/");
        if(responseData == null) {
            selList.innerHTML = `
        <option value="null">이용중인 좌석이 없습니다</option>
        `;
        }else{
            selList.innerHTML = `
        <option value="${responseData}">${responseData}</option>
        `;
        }


        //나머지 좌석들
        lockerName.forEach((usableLocker, index) =>{
            if(!usableLocker.classList.contains("org-btn")){
                selList2.innerHTML += `
                <option value="${usableLocker.textContent}">${usableLocker.textContent}</option>
                `;
            }
        })

    }
}


//getAjax
function getReq(url) {
    let responseData = null;
    $.ajax({
        async: false,
        url: url,
        type: "get",
        dataType: "JSON",
        success: (response) => {
             responseData = response.data;
        },
        error: (error) => {
            console.log(error)
        }
    });

    return responseData;
}

//사용중 사물함 오렌지 바르기
function getOrg(){
    let responseData = getReq("/api/locker");
    responseData.forEach(lockerUse => {
        lockerName.forEach((lockerAll,index) => {
            if(lockerUse === lockerAll.textContent){
                lockerName[index].classList.add("org-btn");
            }
        })
    })

}


function getSeatDtl(clickSeat, index){

    //사물함이면
    if(clickSeat.includes("AL") || clickSeat.includes("BL") || clickSeat.includes("CL")){

        let responseData = getReq("/api/move/locker/" + clickSeat);
            seatBtns[index].innerHTML = `
        <span>${clickSeat}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        만료일:<br> ${responseData.lockerEndTime} </p>
        </div>
        `;
    }

}




window.onload =() => {
    getOrg();
}