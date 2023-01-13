// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
    location.href = "/index";
    localStorage.clear();
});

let principal = getPrincipal();

const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

const lockerName = document.querySelectorAll(".locker-management-content > div .btn")
const userShow = document.querySelector(".user-show");

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

// 사물함만 조회
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
});



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

    //함수 호출
    if(selCate.value === "locker"){
        if(confirm(selCate.value + selList.value + "->" + selList2.value + "변경하시겠습니까?")){
            putReq("/api/move/locker");
        }

    }
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

        //원래좌석 선택
        let responseData = getReq("/api/locker/" + principal.user.user_id);
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

//이용중인 좌석, 사용자 좌석 등 get
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

//사용중 사물함 오렌지
function getOrg(){
    let responseData = getReq("/api/allLocker");
    responseData.forEach(lockerUse => {
        lockerName.forEach((lockerAll,index) => {
            if(lockerUse === lockerAll.textContent){
                lockerName[index].classList.add("org-btn");
            }
        })
    })

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
    getOrg();
}