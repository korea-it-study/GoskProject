// 페이지 이동 //// 페이지 이동 //

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
    location.href = "/index";
    localStorage.clear();
});

// 선택 구매정보
$('.time-content > ul > li').click(function(){
    localStorage.setItem("pickTime", $(this).find("span").text());
    localStorage.setItem("pickPrice", $(this).find("div").text());
    
    location.href = "/pay";
});