



//선택한 사물함 클릭 시 버튼색깔 변경 및 사물함 이름 표시
$(".locker-management-content button").click(function(){
    if($(this).hasClass('org-btn') == false){
        if($(this).hasClass('sky-btn') == true){
            $(this).removeClass('sky-btn');
            $(".locker-select-name").attr('value',"");
        }else{           
            $(this).parent().siblings().children().removeClass('sky-btn');
            $(this).addClass('sky-btn').siblings().removeClass('sky-btn');
            $('.locker-select-name').attr('value',$(this).text());
        }
    }
})


// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    location.replace("/index");
    localStorage.clear();
});


$('.next-btn').click(function(){
    localStorage.setItem("pickSeat", $('.locker-select-name').val());
    var time = localStorage.getItem("time");

    if($('.locker-select-name').val() != ""){
        location.href = "/time/" + time;
    }else{
        alert("좌석을 선택해 주세요.");
    }
});

//locker만 정보 가져옴
function getLocker(){
    let responseData = null;
    $.ajax({
       async: false,
       url: "/api/locker",
        type: "get",
        success : (response) => {
           console.log("get 결과" + response.data);
           responseData = response.data;
        },
        error : (error) =>{
           console.log(error)
        }
    });
    //사용중 사물함이름 - 전체 사물함 이름
    responseData.forEach(lockerUse => {
        const lockerName = document.querySelectorAll(".locker-management-content > div .btn ")
        lockerName.forEach((lockerAll,index) => {
            //비교중에 Use랑 특정 lockerAll의 값이 같아 질때 특정 index에 org 해준다
            if(lockerUse === lockerAll.textContent){
                lockerName[index].classList.add("org-btn");
            }
        });
    })
}
window.onload = () => {
    getLocker();
}
