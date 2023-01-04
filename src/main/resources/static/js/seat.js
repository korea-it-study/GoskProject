// 페이지 이동 //// 페이지 이동 //
$(function(){
    var time = localStorage.getItem("time");
    if(time == "reserved"){
        $('.basic').addClass('invisible');
        $('.seat-basic').addClass('invisible');
    }else if(time == "oneday" || time == "commuter"){
        $('.special').addClass('invisible');
        $('.seat-special').addClass('invisible');
    }
})

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
    location.href = "/index";
    localStorage.clear();
});


// 다음단계
$('.next-btn').click(function(){
    localStorage.setItem("pickSeat", $('.seat-select-name').val());
    var time = localStorage.getItem("time");

    if($('.seat-select-name').val() != ""){
        location.href = "/time/" + time;
    }else{
        alert("좌석을 선택해 주세요.");
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

//데이터 받아오기

function getSeatData() {
    $.ajax({
        async:false,
        url: "/api/seat/useSeat",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            alert("seat data 받아오기 성공");
            alert(response.data);
            console.log(response);
        },
        error: (error) => {
            alert("seat data 받아오기 실패");
            console.log(error);
        }
    });
}

window.onload = () => {
    getSeatData();
}

// 사용중인 좌석 오렌지색으로 바꾸기

