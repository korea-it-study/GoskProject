
$('.index-btn').click(function(){
    location.replace("/index");
    localStorage.clear();
});

// 선택 구매정보
$('.time-content > ul > li').click(function(){
    localStorage.setItem("pickTime", $(this).find("p").text().trim());
    localStorage.setItem("pickPrice", $(this).find("div").text().trim());
    location.href = "/pay";
});