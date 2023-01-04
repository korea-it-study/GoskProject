let principal = getPrincipal();

var pickSeat = null;
var pickPrice = null;
var pickTime = null;
var time = null;

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
    time = localStorage.getItem("time");   

    if(time == "oneday"){
        time = "원데이"
    }else if(time == "commuter"){
        time = "정액권"
    }else if(time == "reserved"){
        time = "지정석"
    }

    pickSeat = localStorage.getItem("pickSeat");
    pickTime = localStorage.getItem("pickTime");
    pickPrice = localStorage.getItem("pickPrice");

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
         infoSeatData(data);
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

function infoSeatData(data) {

    let url = null;
    let jsonData = null;
    
    if(time == "원데이" || time == "정액권") {
        url = "/api/pay/seat";
        jsonData = {
            seatId: data.pickSeat,
            userId: principal.user_id
        }

    }else if(time == "지정석") {
        url = "/api/pay/reserved";
        jsonData = {
            reservedSeatId: data.pickSeat,
            userId: principal.user_id
        }
    }

    
    $.ajax({
        async:false,
        url: url,
        contentType: "application/json",
        data: JSON.stringify(jsonData),
        dataType: JSON,
        success: (response) => {
            alert("seat data 보내기 성공");
            console.log(response);
        },
        error: (error) => {
            alert("seat data 보내기 실패");
            console.log(error);
        }
    });
}