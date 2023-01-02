
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
            alert("로그인 정보 들고오기 성공????");
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