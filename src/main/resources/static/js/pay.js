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

// 결제 데이터 정리 //// 결제 데이터 정리 //
$(function(){
    time = localStorage.getItem("time");   

    if(time == "oneday"){
        time = "원데이"
    }else if(time == "commuter"){
        time = "정액권"
    }else if(time == "reserved"){
        time = "지정석"
    }else {
        time = "사물함"
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

// 결제 api // 결제 api
const payBtn = document.querySelector(".pay-btn");

payBtn.onclick = () => {
    payment();
}


// 주문번호 만들기
function createOrderNum(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let orderNum = year + month + day;
    for(let i=0;i<10;i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return orderNum;
}


function payment() {
    const data = {
        userPhone : principal.user.user_phone,
        time : time,
        pickTime : pickTime,
        pickSeat : pickSeat,
        pickPrice : pickPrice,
        orderNum : createOrderNum()
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
	   	buyer_name: data.userPhone,
	  	buyer_tel: data.user_phone
  	}, 
	function (rsp) { // callback
		if (rsp.success) {
         // 결제 성공 시 로직,
         alert("결제가 완료되었습니다!");
         infoSeatData(data);
            if(data.time == "정액권") {
                infoUserData(data);
            }
        infoReceiptData(data);
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

// 결제 정보 좌석 데이터 넘기기
function infoSeatData(data) {
    let url = null;
    let jsonData = null;
    
    if(time == "원데이") { // 원데이일 때 보내지는 링크와 데이터
        // 원데이의 경우 seat데이터에서만 남은 시간이 있게!
        url = "/api/pay/seat";
        jsonData = {
            seatId: data.pickSeat,
            userId: principal.user.user_id,
            seatTotalTime: data.pickTime.replace("시간", "")
        }

    }else if(time == "지정석") { // 지정석일 때 보내지는 링크와 데이터
        url = "/api/pay/reserved";
        jsonData = {
            reservedSeatId: data.pickSeat,
            userId: principal.user.user_id,
            reservedTotalTime: (data.pickTime.replace("주", "") * 7)
        }

    }else if(time == "정액권") { // 일반석과 url은 같이 들어가지만 user_mst에 따로 들어가게함
        url = "/api/pay/seat";
        jsonData = {
            seatId: data.pickSeat,
            userId: principal.user.user_id
        }
    }else if(time == "사물함"){
        url = "/api/pay/locker";
        jsonData = {
            lockerId: data.pickSeat,
            userId: principal.user.user_id,
            lockerEndTime: (data.pickTime.replace("주(사물함)", "") * 7)
        }
    }
    
    $.ajax({
        async:false,
        url: url, // seat_mst 링크
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(jsonData),
        dataType: "json",
        success: (response) => {
            // alert("seat data 보내기 성공");
            console.log(response);
        },
        error: (error) => {
//            alert("seat data 보내기 실패");
            console.log(error);
        }
    });
}

// 결제정보 유저 데이터 넘기기 (정액권용!!!!!!!!!!!!!!!!!!!!!!)
// 얘는 정액권에서 user_mst의 user_time, user_date로 넘어가야함

function infoUserData(data) {
    let jsonUserData = null;

    if(data.pickTime.includes("주")) {
        jsonUserData = {
            userId: principal.user.user_id,
            userDate: data.pickTime.replace("주", ""),
            userTime: 0
        }

    }else if(data.pickTime.includes("시간")){
        jsonUserData = {
            userId: principal.user.user_id,
            userTime: data.pickTime.replace("시간", "") * 60 * 60
        }
    }

    // userData 업데이트
    $.ajax({
        async:false,
        url: "/api/account/timeData",
        type: "put",
        contentType: "application/json",
        data: JSON.stringify(jsonUserData),
        dataType: "json",
        success: (response) => {
            // alert("user data 보내기 성공");
            console.log(response);
        },
        error: (error) => {
//            alert("user data 보내기 실패");
            console.log(error);
        }
    });
}

// 구매내역 (영수증) 데이터 보내기 //

function infoReceiptData(data) {
    let receiptData = null;

    if(data.pickTime.includes("주(사물함)")) {
        receiptData = {
            userId: principal.user.user_id,
            receiptKinds: data.time,
            receiptPrice: data.pickPrice.replace("원", "").replace(",", ""),
            receiptDay: data.pickTime.replace("주(사물함)", ""),
            receiptTime: 0
        }
    }else if(data.pickTime.includes("주")) {
        receiptData = {
            userId: principal.user.user_id,
            receiptKinds: data.time,
            receiptPrice: data.pickPrice.replace("원", "").replace(",", ""),
            receiptDay: data.pickTime.replace("주", ""),
            receiptTime: 0
        }
    }else if(data.pickTime.includes("시간")) {
        receiptData = {
            userId: principal.user.user_id,
            receiptKinds: data.time,
            receiptPrice: data.pickPrice.replace("원", "").replace(",", ""),
            receiptDay: 0,
            receiptTime: data.pickTime.replace("시간", ""),
        }
    }

    $.ajax({
        async:false,
        url: "/api/mypage/receipt",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(receiptData),
        dataType: "json",
        success: (response) => {
//            alert("receipt data 보내기 성공");
            console.log(response);
        },
        error: (error) => {
//            alert("receipt data 보내기 실패");
//            alert(JSON.stringify(receiptData));
            console.log(error);
        }
    })
}
