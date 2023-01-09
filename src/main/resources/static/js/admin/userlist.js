
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
            console.log(error)
        }
    });
}

// 유저 상세 내역 받아오기
function userDetailList() {

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