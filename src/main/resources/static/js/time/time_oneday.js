// 현재 상품 호출
let timePriceList = TimePriceList();

// 페이지 이동 //// 페이지 이동 //
// 홈으로
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

// onedayTime 상품 목록 //// onedayTime 상품 목록 //
$(function(){
    for(i=0; i<timePriceList[0].length; i++){
        $('.time-content > ul').append(`  
            <li class="oneday-item">
                <p>
                    <i class="fa-solid fa-ticket"></i>&nbsp&nbsp&nbsp&nbsp&nbsp
                    <span>${timePriceList[0][i].onedayTime}시간</span>
                </p>
                <div>${comma(timePriceList[0][i].onedayPrice)}원</div>
            </li>
        `);
    }    
    
    // 상품 선택 후 이동
    $('.oneday-item').click(function(){
        localStorage.setItem("pickTime", $(this).find("span").text());
        localStorage.setItem("pickPrice", $(this).find("div").text());
        
        location.href = "/pay";
    });
})
