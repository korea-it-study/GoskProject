// 변수 선언
let userId = null;
let jsonData = null;
let userListData = getUserAllList();
const userTable = document.querySelector(".user-table");
const modifyInput = document.querySelectorAll(".popup input")

// 아이디 중복 체크

function checkDuplicate(userPhone, userId) {

    let phoneCheck = {
        userPhone: userPhone
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/join/checkDuplicate",
        contentType: "application/json",
        data: JSON.stringify(phoneCheck),
        dataType: "json",
        success: (response) => {
            if(modifyInput[1].value) {
                alert("사용가능한 아이디입니다!");
            }
            userModify(userId);
        },
        error: (error) => {
            console.log(error);
            alert("이미 가입된 아이디입니다!");
        }
    });
}


// 유저 리스트 받아오기

function getUserAllList() {
    let responseData = null;

    $.ajax({
        async: false,
        url: "/api/admin/userList",
        type: "get",
        dataType: "JSON",
        success: (response) => {
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    });

    return responseData;
}

// 유저 좌석 내역 받아오기
function userSeatList(userId) {
    let responseData = null;

    $.ajax({
        async:false,
        url: "/api/admin/seatInfo/" + userId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    });
    return responseData;
}

// 유저 수정 정보 보내기
function userModify(userId) {
    let responseData = null;
    jsonData = {
        userId: modifyInput[3].value,
        userPhone: modifyInput[1].value,
        userPw: modifyInput[2].value,
    }

    $.ajax({
        async: false,
        url: "/api/admin/userModify/" + userId,
        type: "put",
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(jsonData),
        success: (response) => {
            responseData = response.data;
            console.log(responseData);
            alert("수정 완료!");
            location.reload();
        },
        error: (error) => {
            console.log(error);
            alert("수정 실패!")
        }
    })
}

// 유저 정보 삭제하기
function userDelete(userId) {

    $.ajax({
        async: false,
        type: "delete",
        url: "/api/admin/userDelete/" + userId,
        dataType: "json",
        success: (response) => {
            alert("회원 삭제 완료!");

            location.reload();
        },
        error: (error) => {
            alert("회원 삭제 실패!");
            console.log(error);
        }
    });
}


 // 휴대폰 번호로 유저 찾기 (search 버튼 이벤트)
 const phoneNumber = document.querySelector(".phone-number");
 const searchBtn = document.querySelector(".search-btn");

 searchBtn.onclick = () => {
     userTable.innerHTML = "";
     userTable.innerHTML += `
         <colgroup>
             <col width="15%">
             <col width="">
             <col width="15%">
             <col width="15%">
             <col width="15%">
         </colgroup>
     `;

     userListData.forEach(userList => {
         let userPhone = userList.userPhone.replaceAll("-", "");

         if(userPhone.includes(phoneNumber.value)) {
             
             userTable.innerHTML += `
                 <tr>
                     <td>${userList.userId}</td>
                     <td>${userList.userPhone}</td>
                     <td><button class="btn detail-btn">상세</button></td>
                     <td><button class="btn update-btn">수정</button></td>
                     <td><button class="btn dlt-btn">삭제</button></td>
                 </tr>
                     `;
         }else {}
     });

     phoneNumber.value = "";

    updateBtnEvent();
    detailBtnEvent();
    dltBtnEvent();
 }

 phoneNumber.onkeyup = () => {
    
    if(window.event.keyCode == 13){
        searchBtn.click();
    }
}


//유저 리스트 표 안에 뿌리기

function toUserList() {

    userTable.innerHTML = "";
    userTable.innerHTML += `
        <colgroup>
            <col width="15%">
            <col width="">
            <col width="15%">
            <col width="15%">
            <col width="15%">
        </colgroup>
        `;

    userListData.forEach(userList => {
        userTable.innerHTML += `
            <tr>
                <td>${userList.userId}</td>
                <td>${userList.userPhone}</td>
                <td><button class="btn detail-btn">상세</button></td>
                <td><button class="btn update-btn">수정</button></td>
                <td><button class="btn dlt-btn">삭제</button></td>
            </tr>
                `;
    });

    updateBtnEvent();
    detailBtnEvent();
    dltBtnEvent();

}

// 상세 버튼 클릭시 팝업 뜨기

function detailBtnEvent() {

     // 상세 버튼 선언
     const detailBtns = document.querySelectorAll(".detail-btn");
     const detailPopupBack = document.querySelector(".detail-popup-back");
     const detailPopupClose = document.querySelector(".detail-popup-close");

     // 상세 버튼 클릭시 팝업 뜨기
    detailBtns.forEach((detailBtn, index) => {
        detailBtn.onclick = () => {
            detailPopupBack.classList.remove("invisible");
            
            const userList = document.querySelectorAll(".user-table tr td");
            const detailTable = document.querySelector(".detail-table");
            const userInfo = document.querySelector(".user-info");
    
            // 상세 테이블에 데이터 뿌리기
    
            userId = userList[index * 5].innerText; // td가 5개라 순서를 맞춰줌
            let receiptData = getReceiptList(userId);
            let seatData = userSeatList(userId);
    
            //휴대폰 번호, 좌석 번호 띄우기
    
            let lastNumber = seatData[0].userPhone;
            let receiptUse = null;
    
            userInfo.innerHTML = "";
    
            if(seatData[0].reservedSeatId == null && seatData[0].seatId == null) {
                userInfo.innerHTML += `
                    <button class="btn gray-btn">번호 : <span>${lastNumber.substring(lastNumber.lastIndexOf('-') + 1)}</span></button>
                    <button class="btn gray-btn">좌석 없음</button>
                `;
    
            }else if(seatData[0].reservedSeatId == null) {
                userInfo.innerHTML += `
                <button class="btn gray-btn">번호 : <span>${lastNumber.substring(lastNumber.lastIndexOf('-') + 1)}</span></button>
                <button class="btn gray-btn">좌석 : <span>${seatData[0].seatId}</span></button>
            `;
    
            }else if(seatData[0].seatId == null) {
                userInfo.innerHTML += `
                    <button class="btn gray-btn">번호 : <span>${lastNumber.substring(lastNumber.lastIndexOf('-') + 1)}</span></button>
                    <button class="btn gray-btn">좌석 : <span>${seatData[0].reservedSeatId}</span></button>
                `;
            }else {
                userInfo.innerHTML += `
                <button class="btn gray-btn">번호 : <span>${lastNumber.substring(lastNumber.lastIndexOf('-') + 1)}</span></button>
                <button class="btn gray-btn">좌석 중복</button>
            `;
            }
    
            detailTable.innerHTML = "";
    
            receiptData.forEach(receipt => {
    
                if(receipt.receiptUse == "0") {
                    receiptUse = "사용종료";
                }else if(receipt.receiptUse == "1") {
                    receiptUse = "사용중";
                }
        
                if(receipt.receiptDay == "0"){
                    receiptProduct = receipt.receiptTime + " 시간";
                }else if(receipt.receiptTime == "0") {
                    receiptProduct = receipt.receiptDay + " 주";
                }
    
    
                detailTable.innerHTML += `
                <colgroup>
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                    <col width="20%">
                </colgroup>
                <tr>
                    <td>${receipt.receiptId}</td>
                    <td>${receipt.receiptCreateDate}</td>
                    <td><p>${receipt.receiptKinds}<p>${receiptProduct}</td>
                    <td>${comma(receipt.receiptPrice)} 원</td>
                    <td>${receiptUse}</td>
                </tr>
                
                `;
            });
            
    
        }
    });
    
    // 상세 팝업 닫기 버튼
    
    detailPopupClose.onclick = () => {
        detailPopupBack.classList.add("invisible");
    }

}



// 수정 버튼 클릭시 팝업 뜨기

function updateBtnEvent() {

    // 수정 버튼 선언
    const updateBtns = document.querySelectorAll(".update-btn");
    const popupBack = document.querySelector(".popup-back");
    const popupUpdateBtn = document.querySelector(".popup-update-btn");
    const popupCloseBtn = document.querySelector(".popup-close-btn");
    
    updateBtns.forEach((updateBtn, index) => {
        updateBtn.onclick = () => {
            popupBack.classList.remove("invisible");
    
            modifyInput.forEach (modBtn => {
                modBtn.value = "";
            })

            modifyInput[0].value = userListData[index].userPhone;
            modifyInput[3].value = userListData[index].userId;
        }
    })

    modifyInput[1].onkeyup = function(){
        this.value = autoHypenPhone( this.value ) ;
        }
    
    // 수정 팝업 닫기 버튼
    popupCloseBtn.onclick = () => {
        popupBack.classList.add("invisible");
    }
    
    // 수정 팝업에서 수정버튼 클릭시
    popupUpdateBtn.onclick = () => {
        jsonData = {
            userPhone: modifyInput[1].value,
            userPw: modifyInput[2].value,
            userId: modifyInput[3].value
        }

        // 유효성 검사
        const regex = /\d{3}-\d{3,4}-\d{4}/; 
        const pwRegex = /\d{4}/;

        if(!jsonData.userPhone && jsonData.userPw) {
            alert("휴대폰 번호와 비밀번호 둘 다 비워둘 수 없습니다.");
        }

        if(!jsonData.userPhone) {

        }else if(!regex.test(jsonData.userPhone)) {
            alert("휴대폰 번호의 양식에 맞지않습니다.");
            return false;

        }
        
        if(jsonData.userPw == "") {

        }else if(!pwRegex.test(modifyInput[3].value)){
            alert("비밀번호는 네자리 숫자입니다.");
            return false;
        }
        
        checkDuplicate(jsonData.userPhone, jsonData.userId);
    }

    // 엔터로 줄바꿈

    for(let i = 0; i < modifyInput.length; i++) {
        modifyInput[i].onkeyup = () => {
            if(window.event.keyCode == 13){
                if(i != 2) {
                    modifyInput[i + 1].focus();
                }else {
                    popupUpdateBtn.click();
                }
            }
        }
    }
    
}


// 삭제 버튼 클릭 이벤트
function dltBtnEvent() {
    
    const dltBtn = document.querySelectorAll(".dlt-btn");
    const userList = document.querySelectorAll(".user-table tr td");
    
    dltBtn.forEach((dlt, index) => {
        
        dlt.onclick = () => {

            userId = userList[index * 5].innerText;
            userPhone = userList[1 + (index * 5)].innerText;

            if(confirm("정말로  '" + userPhone + "' 회원을 삭제하시겠습니까?")) {
                userDelete(userId);

            }else {
                alert("회원 삭제를 취소하셨습니다!");
            }
        }
    })
}


//전화번호에 자동으로 하이픈 붙여주는 함수

var autoHypenPhone = function(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }

    return str;
}


window.onload = () => {
    toUserList();
}


