/* 관리자  좌석 관리  */

let principal = getPrincipal();

const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

const lockerName = document.querySelectorAll(".locker-management-content > div .seat-btn");
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
    seatBtns.forEach((seatBtn, index) => {

        let seatName = seatBtn.value
        seatBtn.innerHTML = `${seatName}`;

        seatBtn.onclick = () => {

            seatBtn.classList.toggle("selected-seat");
            seatBtn.classList.toggle("seatborder");
            //사용중인 좌석이면
            if(seatBtn.classList.contains("org-btn") || seatBtn.classList.contains("repair-seat")){
                seatBtn.classList.toggle("get-dtl");
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
    });
}

//유지보수 클릭
const repairBtn = document.querySelector(".repair-btn");
repairBtn.onclick = () => {
    let delData = [];
    let insData = [];
    let flag = true;
    let post = "post";
    let del = "delete";
    seatBtns.forEach(seatBtn => {

        if (seatBtn.classList.contains("selected-seat") && seatBtn.classList.contains("org-btn")) {
            //안된다
            alert(seatBtn.value + "는 사용중인 좌석입니다. 좌석을 이동한 후 이용하십시오.");
            flag = false;
        }else if(seatBtn.classList.contains("selected-seat") && seatBtn.classList.contains("repair-seat")){
            //repair 푸는 요청(delete)
            delData.push(seatBtn.value);
            seatBtn.classList.remove("repair-seat");

        }else if(seatBtn.classList.contains("selected-seat")){
            //repair 거는 요청(post)
            insData.push(seatBtn.value);
        }



    });
    if(flag && delData.length > 0 && insData.length > 0) {
        console.log("둘다 요청");
        repairReq(post, {data: insData});
        repairReq(del, {data: delData});
    }else if(flag && delData.length > 0 && insData.length === 0){
        console.log("off 요청");
        repairReq(del,{data: delData});
    }else if(flag && insData.length > 0 && delData.length === 0){
        console.log("insert 요청");
        repairReq(post, {data: insData});
    }


    console.log(delData);
    console.log(insData);
    alert("reload");
    getColor();
    seatBtnService();
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
        let responseData = getReq("/api/locker");
        if(responseData == null) {
            selList.innerHTML = `
        <option value="null">이용중인 좌석이 없습니다</option>
        `;
        }else{
            responseData.forEach(seat => {
                if(seat.userId !== -1){
                    selList.innerHTML += `
        <option value="${seat.lockerId}">${seat.lockerId}</option>
        `;
                }

            });

        }
        //나머지 좌석들
        lockerName.forEach((usableLocker, index) =>{
            if(!usableLocker.classList.contains("org-btn") && !usableLocker.classList.contains("repair-seat")){
                selList2.innerHTML += `
                <option value="${usableLocker.textContent}">${usableLocker.textContent}</option>
                `;
            }
        });
        popupRegisterBtn.onclick = () => {
            if(confirm(selCate.value + selList.value + "->" + selList2.value + "변경하시겠습니까?")){
                putReq("/api/move/locker");
            }
        }


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

//사용중 좌석 오렌지 바르기
function getColor(){
    //사물함
    let lockerResponseData = getReq("/api/locker");
    lockerResponseData.forEach(lockerUse => {
        lockerName.forEach(lockerAll=> {
            // lockerAll.classList.remove("repair-seat");
            if(lockerUse.lockerId === lockerAll.textContent){
                lockerAll.classList.add("org-btn");
                if(lockerUse.userId === -1){
                    lockerAll.classList.remove("org-btn");
                    lockerAll.classList.add("repair-seat");
                }
            }
        });
    });
    //일반석


    
    //지정석



}


function getSeatDtl(clickSeat, index){
    //사물함이면
    if(clickSeat.includes("AL") || clickSeat.includes("BL") || clickSeat.includes("CL")){

        let responseData = getReq("/api/move/locker/" + clickSeat);
        if(responseData.userId === -1) {
            seatBtns[index].innerHTML = `
        <span>${clickSeat}</span>
        <div class="seat-div">
        <p class="arrow_box">유지보수 중</p>
        </div>
        `;
        }else{
            seatBtns[index].innerHTML = `
        <span>${clickSeat}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        만료일:<br> ${responseData.lockerEndTime} </p>
        </div>
        `;
        }


    }

}

function repairReq(type, data){

    $.ajax({
        async: false,
        type: type,
        url: "/api/repair/locker",
        data: data,
        traditional : true,
        dataType: "json",
        success: (response) => {
            console.log(type + " 결과: " + response);
            alert(type + "성공");
        },
        error: (error) => {
            console.log(error);
        }


    });
}


//변경 요청
function putReq(url){
    let data = {
        nowSeat : selList.value,
        afterSeat : selList2.value
    }

    $.ajax({
        async: false,
        type: "put",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            if(response.data != 0){
                alert("변경 성공" + data.nowSeat + "->" + data.afterSeat);
                location.replace("/index");

            }else{
                alert("변경 실패");
                location.reload();
            }
        },
        error: (error)=>{
            console.log(error);
        }

    });

}


window.onload =() => {
    getColor();
}