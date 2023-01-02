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
    location.href = "/";
});

// time(원데이/정액권/지정권)
$('.oneday-btn, .commuter-btn, .reserved-btn').click(function(){
    localStorage.setItem("time", $(this).val());
    location.href = "/seat";
});

// 사물함
$('.locker-btn').click(function(){
    location.href = "/locker/check";
});

// 입실
$('.in-btn').click(function(){
    location.href = "/account/login";
});

// 퇴실
$('.out-btn').click(function(){
    // ajax로 put 버튼 보내면서 popup창 띄우기
});


// 현재시간 안내 //// 현재시간 안내 //
function printTime(){
    $(".main-content > p").text(dateToStr());
};

$(function init(){
    setInterval(printTime, 1000);
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

