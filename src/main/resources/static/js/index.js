
// 로그인 정보 //// 로그인 정보 //
window.onload = () => {
    let principal = getPrincipal();
    
    if(principal != "") {
        location.replace("/logout");
    }
}

// 페이지 이동 //// 페이지 이동 //

// 관리자 페이지
$(".admin-btn").dblclick(function() {
    location.replace("/admin/userlist"); 
})

// 회원가입
$('.join-btn').click(function(){
    location.href = "/account/join";
});

// 내 정보
$('.myinfo-btn').click(function(){
    location.href = "/mypage";
});

// 자리이동
$('.seatmove-btn').click(function(){
    location.href = "/move";
});

// time(원데이/정액권/지정권)
$('.oneday-btn, .commuter-btn, .reserved-btn').click(function(){
    localStorage.setItem("time", $(this).val());
    location.href = "/seat";
});

// 사물함
$('.locker-btn').click(function(){
    localStorage.setItem("time", $(this).val());
    location.href = "/locker/check";
});

// 입실
$('.in-btn').click(function(){
    location.href = "/inout";
});

// 퇴실
$('.out-btn').click(function(){
    location.href = "/inout";
});


// 입실 데이터 보내기



// 퇴실 데이터 보내기


// 현재시간 안내 //// 현재시간 안내 //
function printTime(){
    $(".main-content > p").text(dateToStr());
}

$(function init(){
    setInterval(printTime, 1000); //1초마다

});

function dateToStr(){
    date = new Date();
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
  
    var localTime = date.toLocaleTimeString();
  
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayName = week[date.getDay()];
  
    return year+'년 '+month+'월 '+day+'일 '+dayName+'요일 '+localTime;
}

window.onload = () => {
    let principal = getPrincipal();
    
    if(principal != "") {
        location.replace("/logout");
    }
}
