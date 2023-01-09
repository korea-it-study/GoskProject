let responseData = null;

// 로그인 정보 들고다니기    
function getPrincipal() {
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
        }
    });

    return responseData;
}

// 상품 불러오기
function TimePriceList(){  
    $.ajax({
        async: false,
        type: "GET",
        url: "/api/admin/productlist",
        dataType: "json",
        success: (response) => {
            console.log(response);    
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    })

    return responseData;
}

// 사물함 상품 불러오기
function LockerPriceList(){  
    $.ajax({
        async: false,
        type: "GET",
        url: "/api/admin/locker",
        dataType: "json",
        success: (response) => {
            console.log(response);    
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    })

    return responseData;
}


//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

// 유효성 체크! //
let intCheck = /^[0-9]+$/; 
var userIdCheck = RegExp(/^[A-Za-z0-9_\-]{5,20}$/);
var passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);
var nameCheck = RegExp(/^[가-힣]{2,6}$/);
var nickNameCheck = RegExp(/^[가-힣a-zA-Z0-9]{2,10}$/);
var emailCheck = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
var birthdayCheck = RegExp(/^(19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/);
var phonNumberCheck = RegExp(/^01[0179][0-9]{7,8}$/);
