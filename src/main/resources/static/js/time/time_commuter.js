// 현재 상품 호출
let timePriceList = TimePriceList();

// 페이지 이동 //// 페이지 이동 //
// 홈으로 버튼 index로 보내기
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

// coummuterTime 상품 목록 //// coummuterTime 상품 목록 //
$(function(){
    //commuterTp    
    for(i=0; i<timePriceList[1].length; i++){
        $('.time-content > ul').append(`  
            <li class="coummuter-item">
                <p>
                    <i class="fa-solid fa-ticket"></i>&nbsp&nbsp&nbsp&nbsp&nbsp
                    <span>${timePriceList[1][i].commuterTpTime}시간</span>
                </p>
                <div>${comma(timePriceList[1][i].commuterTpPrice)}원</div>
            </li>
        `);
    }
    //commuterDp     
    for(i=0; i<timePriceList[2].length; i++){
        $('.time-content > ul').append(`  
            <li class="coummuter-item">
                <p>
                    <i class="fa-solid fa-ticket"></i>&nbsp&nbsp&nbsp&nbsp&nbsp
                    <span>${timePriceList[2][i].commuterDpTime}주</span>
                </p>
                <div>${comma(timePriceList[2][i].commuterDpPrice)}원</div>
            </li>
        `); 
    }
    
    // 상품 선택 후 이동
    $('.coummuter-item').click(function(){
        localStorage.setItem("pickTime", $(this).find("span").text());
        localStorage.setItem("pickPrice", $(this).find("div").text());
        
        location.href = "/pay";
    });
});
