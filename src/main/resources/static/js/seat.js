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


// 홈으로
$('.index-btn').click(function(){
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
        $(this).addClass('sky-btn').siblings().removeClass('sky-btn');
        $(".seat-select-name").attr('value',"");
    }
})

