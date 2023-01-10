let userId = null;

// 유저 리스트 받아오기

function getUserAllList() {
    let userListData = null;

    $.ajax({
        async: false,
        url: "/api/admin/userList",
        type: "get",
        dataType: "JSON",
        success: (response) => {
            userListData = response.data;
            console.log(userListData);
            toUserList(userListData);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

// 유저 좌석 내역 받아오기
function userSeatList(userId) {
    $.ajax({
        async:false,
        url: "/api/admin/seatInfo/" + userId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            console.log(responseData);
        },
        error: (error) => {
            console.log(error);
        }
    });
    return responseData;
}

// 유저 수정 정보 보내기
function userModify() {

}

// 유저 정보 삭제하기
function userDelete() {

}


// 휴대폰 번호로 유저 찾기
function userSearch() {

}


//유저 리스트 표 안에 뿌리기

function toUserList(userListData) {
    
    const userTable = document.querySelector(".user-table");

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

    // 수정 버튼 선언
    const updateBtns = document.querySelectorAll(".update-btn");
    const popupBack = document.querySelector(".popup-back");
    const popupUpdateBtn = document.querySelector(".popup-update-btn");
    const popupCloseBtn = document.querySelector(".popup-close-btn");

    // 상세 버튼 선언
    const detailBtns = document.querySelectorAll(".detail-btn");
    const detailPopupBack = document.querySelector(".detail-popup-back");
    const detailPopupClose = document.querySelector(".detail-popup-close");

    // 수정 버튼 클릭시 팝업 뜨기

    updateBtns.forEach((updateBtn, index) => {
        updateBtn.onclick = () => {
            popupBack.classList.remove("invisible");
            const preModifyPhone = document.querySelectorAll('input[name="pre-modify-phone"]');

            preModifyPhone[0].value = "";
            preModifyPhone[0].value = "010-1111-1111 : " + index;
        }
    })

    // 수정 팝업 닫기 버튼
    popupCloseBtn.onclick = () => {
        popupBack.classList.add("invisible");
    }

    // 수정 팝업에서 수정버튼 클릭시
    popupUpdateBtn.onclick = () => {
        alert("수정");
    }


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

window.onload = () => {
    getUserAllList();
}


