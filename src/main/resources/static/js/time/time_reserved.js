// 현재 상품 호출
let timePriceList = TimePriceList();

// 페이지 이동 //// 페이지 이동 //
// 홈으로
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

// reservedTime 상품 목록 //// reservedTime 상품 목록 //
$(function(){
    //reserved
    for(i=0; i<timePriceList[3].length; i++){
        $('.time-content > ul').append(`  
            <li class="reserved-item">
                <p>
                    <i class="fa-solid fa-ticket"></i>&nbsp&nbsp&nbsp&nbsp&nbsp
                    <span>${timePriceList[3][i].reservedTime}주</span>
                </p>
                <div>${comma(timePriceList[3][i].reservedPrice)}원</div>
            </li>
        `);
    } 
    
    // 상품 선택 후 이동
    $('.reserved-item').click(function(){
        localStorage.setItem("pickTime", $(this).find("span").text());
        localStorage.setItem("pickPrice", $(this).find("div").text());
        
        location.href = "/pay";
    });
});

