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

// 결제 api

const payBtn = document.querySelector(".pay-btn");

payBtn.onclick = () => {
    payment();
}

function payment() {

    var time = localStorage.getItem("time");  
    var pickSeat = localStorage.getItem("pickSeat");
    var pickTime = localStorage.getItem("pickTime");
    var pickPrice = localStorage.getItem("pickPrice");

    let principal = getPrincipal();

    let orderNum = null;
    
    for(let i=0; i<10; i++) {
        orderNum += Math.floor(Math.random() * 8);
    }

    const data = {
        userId : principal.user.user_phone,
        time : time,
        pickTime : pickTime,
        pickSeat : pickSeat,
        pickPrice : pickPrice,
        orderNum : orderNum
    }
    
    paymentCard(data);

}


// 카드 결제
function paymentCard(data) {
		
	IMP.init("imp14753140"); 
		
	IMP.request_pay({ // param
        pg: "html5_inicis",
	  	pay_method: "card",
	  	merchant_uid: data.orderNum,
	  	name: data.time + " " + data.pickTime,
	  	// amount: data.pickPrice,
        amount: "100",
        buyer_email: "",
	   	buyer_name: data.userId,
	  	buyer_tel: data.userId
  	}, 
	function (rsp) { // callback
		if (rsp.success) {
         // 결제 성공 시 로직,
         alert("결제가 완료되었습니다!");
         alert(JSON.stringify(data));
         location.replace("/index");

		} else {
          // 결제 실패 시 로직,
             var msg = '결제에 실패했습니다. \n';
            msg += rsp.error_msg
            alert(msg);            
            return false;
      }
   });
}

// 결제 정보 데이터 넘기기

function infoData(data) {
    
}