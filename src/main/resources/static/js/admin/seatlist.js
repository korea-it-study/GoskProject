/* 관리자  좌석 관리  */
let principal = getPrincipal();
let clickUserPhone = null;


const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

const lockerName = document.querySelectorAll(".locker-management-content > div .seat-btn");
const normSeatName = document.querySelectorAll(".seat-basic .seat-btn");
const specialSeatName = document.querySelectorAll(".seat-special .seat-btn");
const userShow = document.querySelector(".user-show");


// 좌석 조회 (색상 변경)
$('.seat-category > button').click(function(){
    if($(this).hasClass("sky-btn") === false){
        $(this).siblings().removeClass("sky-btn");
        $(this).removeClass("white-btn").addClass("sky-btn");
        
        if($('.normal').hasClass('sky-btn')){
            $('.seat-basic').removeClass("invisible");
            $('.seat-special').addClass("invisible");
            $('.locker-management-content').addClass("invisible");
        }else if($('.reserved').hasClass('sky-btn')){
            $('.seat-special').removeClass("invisible");
            $('.seat-basic').addClass("invisible");
            $('.locker-management-content').addClass("invisible");
        }else if($('.locker').hasClass('sky-btn')){
            $('.locker-management-content').removeClass("invisible");
            $('.seat-basic').addClass("invisible");
            $('.seat-special').addClass("invisible");
        }
    }

    seatBtnService();
});


//초기 seat 설정 (value 달아주기)
const seatBtns = document.querySelectorAll(".seat-btn");
seatBtns.forEach(seatBtn => {
    seatBtn.value = seatBtn.textContent;
});

function seatBtnService(){
    offSelectClass();
    seatBtns.forEach((seatBtn, index) => {

        seatBtn.innerHTML = `${seatBtn.value}`;
        seatBtn.onclick = () => {

            seatBtn.classList.toggle("selected-seat");
            seatBtn.classList.toggle("seatborder");
            //사용중인 좌석이면
            if(seatBtn.classList.contains("org-btn") || seatBtn.classList.contains("repair-seat")){
                seatBtn.classList.toggle("get-dtl");
                //dtl 포함되어있으면 세부정보 가져와
                if(seatBtn.classList.contains("get-dtl")){
                    getSeatDtl(seatBtn, index);
                }else{
                    seatBtn.innerHTML = `${seatBtn.value}`;
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

    let isLocker = false;
    let isSpecial = false;
    let Pass = true;

    seatBtns.forEach(seatBtn => {
        if(seatBtn.classList.contains("selected-seat") && seatBtn.classList.contains("org-btn")) {
            //안된다
            flag = false;
            Pass = false;
            return alert(seatBtn.value + "는 사용중인 좌석입니다. 좌석을 이동한 후 이용하십시오.");
        }else if(seatBtn.classList.contains("selected-seat") && seatBtn.classList.contains("repair-seat")){
            //repair 푸는 요청(delete)
            if(seatBtn.parentElement.parentElement.classList.contains("locker-zone")) {
                isLocker = true;
            }else if((seatBtn.parentElement.classList.contains("seat-special"))){
                isSpecial = true;
            }
            delData.push(seatBtn.value);
            Pass = false;

        }else if(seatBtn.classList.contains("selected-seat")){
            //repair 거는 요청(post)
            if(seatBtn.parentElement.parentElement.classList.contains("locker-zone")) {
                isLocker = true;
            }else if((seatBtn.parentElement.classList.contains("seat-special"))){
                isSpecial = true;
            }
            insData.push(seatBtn.value);
            Pass = false;
        }
    });


    if(!Pass && flag && delData.length > 0 && insData.length > 0 ) {
        console.log("둘다 요청");
        if(isLocker){
            customReq("put", {data: insData},"/api/repair/locker");
            customReq("delete", {data: delData},"/api/repair/locker");
        }else if(isSpecial){
            customReq("put", {data: insData},"/api/repair/special");
            customReq("delete", {data: delData},"/api/repair/special");
        }else{
            customReq("put", {data: insData},"/api/repair/basic");
            customReq("delete", {data: delData},"/api/repair/basic");
        }

    }else if(!Pass && flag && delData.length > 0 && insData.length === 0){
        console.log("off 요청");
        if(isLocker){
            console.log("사물함 요청")
            customReq("delete", {data: delData},"/api/repair/locker");
        }else if(isSpecial){
            console.log("스페셜 요청")
            customReq("delete", {data: delData},"/api/repair/special");
        }else{
            console.log("일반좌석 요청")
            customReq("delete", {data: delData},"/api/repair/basic");
        }
    }else if(!Pass && flag && insData.length > 0 && delData.length === 0){
        console.log("put 요청");
        if(isLocker){
            console.log("사물함 요청")
            customReq("put", {data: insData},"/api/repair/locker");
        }else if(isSpecial){
            console.log("스페셜 요청")
            customReq("put", {data: insData},"/api/repair/special");
        }else{
            console.log("일반좌석 요청")
            customReq("put", {data: insData},"/api/repair/basic");
        }
    }

    if(!Pass && flag){
        console.log(delData);
        console.log(insData);
    }else{
        alert("선택한 좌석이 없습니다");
    }
    setTimeout(()=>getColor(), 300);
    seatBtnService();

}


//강제 퇴실 클릭시
const exitBtn = document.querySelector(".exit-btn");
exitBtn.onclick = () => {
    let selectedList = [];
    let seatCondition = "";
    let flag = true;
    seatBtns.forEach(seatBtn => {
        //선택된게 있으면 - 지정석
        if(seatBtn.classList.contains("selected-seat") && (!(seatBtn.classList.contains("org-btn")) || seatBtn.classList.contains("repair-btn"))){
            //선택좌석 중에 공석이나 유지보수 좌석이 포함되어 있으면
            flag = false;
            return ;
        }else if(seatBtn.classList.contains("selected-seat") && seatBtn.parentElement.classList.contains("seat-special")){
            selectedList.push(seatBtn.value + "reserve");
            seatCondition = "지정석 [";

        }else if(seatBtn.classList.contains("selected-seat") && seatBtn.parentElement.classList.contains("seat-basic")) {
            selectedList.push(seatBtn.value + "seat");
            seatCondition = "일반석 [";
        }else if(seatBtn.classList.contains("selected-seat") && seatBtn.parentElement.parentElement.classList.contains("locker-zone")){
            selectedList.push(seatBtn.value + "locker");
            seatCondition = "사물함 [";
        }

        });

    if(selectedList.length > 0 && flag) {
        if (confirm(seatCondition + selectedList + "] 좌석을 강제 퇴장 합니다.")) {
            customReq("put", {data: selectedList}, "/api/seat/exit");
        }
    }else if(selectedList.length == 0){
        alert("좌석을 선택해주세요.");
    }else if(!flag){
        alert("사용자가 없는 좌석이 선택되었습니다.")
    }

}

// 자리이동 팝업 띄우기
const moveBtn = document.querySelector(".move-btn");
const selCate = document.querySelector(".sel_cate"); //
const selList = document.querySelector(".sel_list"); // 소분류
const selList2 = document.querySelector(".sel_list2"); // 소소분류

const popupBack = document.querySelector(".popup-back");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const popupRegisterBtn = document.querySelector(".popup-register-btn");

moveBtn.onclick = () => {
    popupBack.classList.remove("invisible");
}


closeBtn.onclick = () => {
    popupBack.classList.add("invisible");
    selCate.value = "option";
    categoryList(selCate.value);
}


selCate.onchange = () => {
    categoryList(selCate.value);
}


//자리변경 팝업
function categoryList(sVal) {
    let responseData = null;
    let responseUser = null;

    if(sVal === "option") {
        selList.innerHTML = `
        <option value="${null}">소분류</option>
        `;
        selList2.innerHTML = `
        <option value="${null}">소소분류</option>
        `;

    } else if(sVal === "special") {
        selList.innerHTML = ""; // 소분류
        selList2.innerHTML = ""; // 소소분류

        //원래 좌석 선택(모든 사용중인 좌석 선택 가능)
        responseData = getReq("/api/seat/useReservedSeat");
        setSelList("special",responseData);
        responseUser = getReq("/api/seat/special/" + selList.value);

    }else if(sVal == "locker"){
        selList.innerHTML = ""; // 원래 좌석
        selList2.innerHTML = ""; // 이동할 좌석

        //원래 좌석 선택(모든 사용중인 좌석 선택 가능)
        responseData = getReq("/api/useLocker");
        setSelList("locker",responseData);
        responseUser = getReq("/api/move/locker/" + selList.value);
    //일반석
    }else{
        selList.innerHTML = ""; // 원래 좌석
        selList2.innerHTML = ""; // 이동할 좌석
        
        //원래 좌석 선택(모든 사용중인 좌석 선택 가능)
        responseData = getReq("/api/seat/useSeat");
        setSelList("seat",responseData);
        responseUser = getReq("/api/seat/basic/" + selList.value);
    }
    
    clickUserPhone = responseUser.userPhone;

    if(clickUserPhone != null){
        userShow.innerHTML = `사용자 : ${clickUserPhone.slice(-4)}`
    }else{
        userShow.innerHTML = `사용자: -`
    }
        
    selList.onchange = () => {
        if(sVal === "special") {
            responseUser = getReq("/api/seat/special/" + selList.value);
    
        }else if(sVal == "locker"){
            responseUser = getReq("/api/move/locker/" + selList.value);
        }else{
            responseUser = getReq("/api/seat/basic/" + selList.value);
        }
        
        clickUserPhone = responseUser.userPhone;
        userShow.innerHTML = `사용자 : ${clickUserPhone.slice(-4)}`
    }
}


function setSelList(category, responseData){
    if(responseData === null || responseData.length === 0) {
        selList.innerHTML = `
        <option value="null">이용중인 좌석이 없습니다</option>
        `;
    }else{
        responseData.forEach(seat => {
                selList.innerHTML += `
        <option value="${seat}">${seat}</option>
        `;
        });
    }
    //나머지 좌석들 선택
    if(category === "locker"){
        responseData = getReq("/api/noUseLocker");
        responseData.forEach(usableSeat => {
            selList2.innerHTML += `
                <option value="${usableSeat}">${usableSeat}</option>
                `;
        });

    }else if(category === "seat"){
        responseData = getReq("/api/seat/noUseSeat");
        responseData.forEach(usableSeat => {
            selList2.innerHTML += `
                <option value="${usableSeat}">${usableSeat}</option>
                `;
        });
    }else{
        responseData = getReq("/api/seat/noUseReserved");
        responseData.forEach(usableSeat => {
            selList2.innerHTML += `
                <option value="${usableSeat}">${usableSeat}</option>
                `;
        });
    }

    popupRegisterBtn.onclick = () => {
        if(confirm(selCate.value + selList.value + "->" + selList2.value + "변경하시겠습니까?")){
            putReq("/api/move/" + category);
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


//사용중 좌석 오렌지 바르기 (새로고침)
function getColor(){
    //사물함
    let lockerResponseData = getReq("/api/allLocker");
        lockerResponseData.forEach(lockerUse => {
            lockerName.forEach(lockerAll=> {
                lockerAll.classList.remove("repair-seat");
                //0이면 아무변화 x
                if(lockerUse.userId !== 0 && lockerUse.lockerId === lockerAll.textContent){
                    lockerAll.classList.add("org-btn");
                    if(lockerUse.userId === -1){
                        lockerAll.classList.remove("org-btn");
                        lockerAll.classList.add("repair-seat");
                    }
                }else if(lockerUse.userId === 0 && lockerUse.lockerId === lockerAll.textContent){
                    lockerAll.classList.remove("repair-seat");
                }
            });
        });

    //일반석
    let normalSeatResponseData = getReq("/api/seat/allSeat");
        normalSeatResponseData.forEach(normSeatUse =>{
            normSeatName.forEach(normAll => {
                if(normSeatUse.userId !== 0 && normSeatUse.seatId === normAll.textContent){
                    normAll.classList.add("org-btn");
                    if(normSeatUse.userId === -1){
                        normAll.classList.remove("org-btn");
                        normAll.classList.add("repair-seat");
                    }
                }else if(normSeatUse.userId === 0 && normSeatUse.seatId === normAll.textContent){
                    normAll.classList.remove("repair-seat");
                }
            });
        });

    //지정석
    let reservedSeatResponseData = getReq("/api/seat/allReservedSeat");
        reservedSeatResponseData.forEach(reservedUse =>{
            specialSeatName.forEach(reservedAll => {
                if(reservedUse.userId !== 0 && reservedUse.reservedSeatId === reservedAll.textContent){
                    reservedAll.classList.add("org-btn");
                    if(reservedUse.userId === -1){
                        reservedAll.classList.remove("org-btn");
                        reservedAll.classList.add("repair-seat");
                    }
                }else if(reservedUse.userId === 0 && reservedUse.reservedSeatId === reservedAll.textContent){
                    reservedAll.classList.remove("repair-seat");
                }
            });
        });

}



function getSeatDtl(clickSeat, index){
    //사물함이면
    let clickSeatVal = clickSeat.value;
    let responseData = null;
    if(clickSeatVal.includes("AL") || clickSeatVal.includes("BL") || clickSeatVal.includes("CL")){
        responseData = getReq("/api/move/locker/" + clickSeatVal);
        if(responseData.userId === -1) {
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">유지보수 중</p>
        </div>
        `;
        }else{
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        만료일:<br> ${responseData.lockerEndTime} </p>
        </div>
        `;
        }

        //사물함 아니면서 seat-basic이면(원데이,정액권 같이)
    }else if(clickSeat.parentElement.classList.contains("seat-basic")) {
        responseData = getReq("/api/seat/basic/" + clickSeatVal);
        if(responseData.userId === -1) {
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">유지보수 중</p>
        </div>
        `;
            //원데이
        }else if(responseData.seatTotalTime != null){
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        만료 시간:<br> ${responseData.seatTotalTime} </p>
        </div>
        `;
            //정액권 - 시간
        }else if(responseData.userTime != null){
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        남은 시간 :<br> ${responseData.userTime} </p>
        </div>
        `;
            //정액권 - 기간
        }else{
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
       만료일: <br> ${responseData.userDate.substring(0,10)} </p>
        </div>
        `;
        }

        //그 외 reserved
    }else{
        responseData = getReq("/api/seat/special/" + clickSeatVal);
        if(responseData.userId === -1) {
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">유지보수 중</p>
        </div>
        `;
        }else{
            seatBtns[index].innerHTML = `
        <span>${clickSeatVal}</span>
        <div class="seat-div">
        <p class="arrow_box">사용자:<br> ${responseData.userPhone}<br>
        만료일:<br> ${responseData.reservedSeatTotalTime.substring(0,10)} </p>
        </div>
        `;
        }
    }
}

function customReq(type, data, url){
    $.ajax({
        async: false,
        type: type,
        url: url,
        data: data,
        traditional : true,
        dataType: "json",
        success: (response) => {
            console.log(type + " 결과: " + response.data + "건");
            // alert(type + "성공");
            location.reload();
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
                location.reload();

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
    seatBtnService();
}