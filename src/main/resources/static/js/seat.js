let principal = getPrincipal();
let receiptData = getReceiptList(principal.user.user_id);

window.onload = () => {
    getSeatData();
}

// 페이지 이동 //// 페이지 이동 //
$(function(){
    var time = localStorage.getItem("time");
    if(time == "reserved"){
        $('.basic').addClass('invisible');
        $('.seat-basic').addClass('invisible');
    }else if(time == "oneday" || time == "commuter" ||time =="enter") {
        $('.special').addClass('invisible');
        $('.seat-special').addClass('invisible');
    }
})

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});


// 다음단계
$('.next-btn').click(function(){
    localStorage.setItem("pickSeat", $('.seat-select-name').val());
    var time = localStorage.getItem("time");
if(document.referrer.includes("enter")){

    //controller 에서 seatTotalTime에 null값이면 안 받아져서 처리
    if($('.seat-select-name').val() != ""){
        let data = {
            userId : localStorage.getItem("userId"),
            pickSeat: localStorage.getItem("pickSeat"),
            seatTotalTime: localStorage.getItem("seatTotalTime")
        }
        if(localStorage.getItem("seatTotalTime") === "non"){
            data = {
                userId : localStorage.getItem("userId"),
                pickSeat: localStorage.getItem("pickSeat")
            }
        }


        $.ajax({
            async: false,
            type: "put",
            url: "/api/seat/enter",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: (response) => {
                if(response.data){
                    location.href = "/enter";
                }else{
                    alert("입실 실패");
                    location.replace("/index");
                }
            },
            error : (error) => {
                console.log(error);
            }

        })


        location.href = "/enter";
    }else{
        alert("좌석을 선택해 주세요.");
    }
}else{
    if($('.seat-select-name').val() != ""){
        location.href = "/time/" + time;
    }else{
        alert("좌석을 선택해 주세요.");
    }
}

});

const seatbasic = document.querySelector(".seat-basic");
const seatspecial = document.querySelector(".seat-special");
const basic = document.querySelector(".basic");
const special = document.querySelector(".special");

//일반석,지정석 변경버튼 클릭 이벤트
special.onclick =() => {
    seatspecial.classList.remove("invisible");
    seatbasic.classList.add("invisible");
    basic.classList.remove("sky-btn");
    special.classList.add("sky-btn");
}
basic.onclick =() => {
    seatbasic.classList.remove("invisible");
    seatspecial.classList.add("invisible");
    special.classList.remove("sky-btn");
    basic.classList.add("sky-btn");
}

//선택한 좌석 클릭 시 버튼색깔 변경 및 좌석 이름 표시
$(".seat-content button").click(function(){

    if($(this).hasClass('org-btn') == false){

        if($(this).hasClass('sky-btn') == true){

            $(this).removeClass('sky-btn');
            $(".seat-select-name").attr('value',"");

        }else{
            $(this).addClass('sky-btn').siblings().removeClass('sky-btn');
            $('.seat-select-name').attr('value',$(this).text());

        }
    } else {
        $(".seat-select-name").attr('value',"");
    }
})


// 데이터 받아서 사용중인 좌석 org-btn으로 바꾸기 //

//일반석 데이터 받아오기
function getSeatData() {
    let responseData = null;
    let url = null;

    if(seatbasic.classList.contains("invisible")) {
        url = "/api/seat/allReservedSeat"
    }else if(seatspecial.classList.contains("invisible")){
        url = "/api/seat/allSeat"
    }

    $.ajax({
        async:false,
        url: url,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            responseData = response.data;
            getSeatList(responseData);
            console.log(response);
        },
        error: (error) => {
            alert("seat data 받아오기 실패");
            console.log(error);
        }
    });
}


// 사용중인 좌석 오렌지색으로 바꾸기
function getSeatList(responseData) {

    responseData.forEach(seatUse => {
        const seatName = document.querySelectorAll(".btn")
        seatName.forEach(seatAll => {
            if(seatUse.userId !== 0 && seatUse.seatId === seatAll.textContent){
                seatAll.classList.add("org-btn");
                if(seatUse.userId === -1){
                    seatAll.classList.remove("org-btn");
                    seatAll.classList.add("repair-seat");
                }
            }else if(seatUse.userId === 0 && seatUse.seatId === seatAll.textContent){
                seatAll.classList.remove("repair-seat");
            }
        })
    });
}

window.onload = () => {
    getSeatData();
}

// 중복구매 방지 //// 중복구매 방지 //
$(function(){
    for(i=0; i < receiptData.length; i++){
        if(receiptData[i].receiptKinds != "사물함" && receiptData[i].receiptUse == 1){
            alert("상품은 중복 구매가 불가능합니다.")
            location.href = "/index";
        }
    }
})
