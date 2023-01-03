
// 로그인 정보 들고다니기
    
function getPrincipal() {
    let responseData = null;

    $.ajax({
        async: false,
        type: "GET",
        url: "/api/account/principal/member",
        dataType: "json",
        success: (response) => {
            console.log(response);
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
            alert("로그인 정보 들고오기 실패???");
        }
    });

    return responseData;
}



// 유저 정보 리스트 들고오기

// function getUserList() {
//     let userListData = null;

//     $.ajax({
//         async: false,
//         type: "GET",
//         url: "/api/admin/userlist",
//         dataType: "json",
//         success: (response) => {
//             console.log(response);
//             userListData = response.data;
//             alert("유저 리스트 정보 불러오기 성공!");
//         },
//         error: (error) => {
//             console.log(error);
//             alert("유저 리스트 정보 불러오기 실패!");
//         }

//     });
    
//     return userListData;
// }
//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 유효성 체크! //
var userIdCheck = RegExp(/^[A-Za-z0-9_\-]{5,20}$/);
var passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);
var nameCheck = RegExp(/^[가-힣]{2,6}$/);
var nickNameCheck = RegExp(/^[가-힣a-zA-Z0-9]{2,10}$/);
var emailCheck = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
var birthdayCheck = RegExp(/^(19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/);
var phonNumberCheck = RegExp(/^01[0179][0-9]{7,8}$/);
