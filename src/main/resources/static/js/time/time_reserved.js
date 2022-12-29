// 페이지 이동 //// 페이지 이동 //

// 홈으로
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

// 선택 구매정보
$('.time-content > ul > li').click(function(){
    localStorage.setItem("pickTime", $(this).find("span").text());
    localStorage.setItem("pickPrice", $(this).find("div").text());
    
    location.href = "/pay";
});