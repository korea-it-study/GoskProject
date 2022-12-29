// 페이지 이동 //// 페이지 이동 //

// 취소하기
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

// 결제하기
$('.pay-btn').click(function(){

});

// 결제 데이터 정리 //// 결제 데이터 정리 //
$(function(){
    var time = localStorage.getItem("time");   

    if(time == "oneday"){
        time = "원데이"
    }else if(time == "commuter"){
        time = "정액권"
    }else if(time == "reserved"){
        time = "지정석"
    }

    var pickSeat = localStorage.getItem("pickSeat");
    var pickTime = localStorage.getItem("pickTime");
    var pickPrice = localStorage.getItem("pickPrice");

    $('.pay-content > ul').html(`
        <li>
            <div class="product1">
                <p>${time}</p>
            </div>
            <div class="product2">
                <p>상품명</p>
                <span>${pickTime}</span>
            </div>
            <div class="product3">
                <p>결제할 금액</p>
                <span>${pickPrice}</span>
            </div>
        </li>
    `);
})