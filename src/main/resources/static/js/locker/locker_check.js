let principal = getPrincipal();
let receiptData = getReceiptList(principal.user.user_id);


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

//사용중인 locker만 정보 가져옴
function getLocker(){
    let responseData = null;
    $.ajax({
       async: false,
       url: "/api/allLocker",
        type: "get",
        success : (response) => {
           responseData = response.data;
        },
        error : (error) =>{
           console.log(error)
        }
    });
        const lockerName = document.querySelectorAll(".locker-management-content > div .btn ")
    //사용중 사물함이름 - 전체 사물함 이름
    responseData.forEach(lockerUse => {
        lockerName.forEach(lockerAll=> {
            if(lockerUse.userId !== 0 && lockerUse.lockerId === lockerAll.textContent){
                lockerAll.classList.add("org-btn");
                if(lockerUse.userId === -1){
                    lockerAll.classList.remove("org-btn");
                    lockerAll.classList.add("repair-seat");
                }
            }else if(lockerUse.userId === 0 && lockerUse.lockerId === lockerAll.textContent){
                lockerAll.classList.remove("repair-seat");
            }
        });
    });
}

window.onload = () => {
    getLocker();
}



// 중복구매 방지 //// 중복구매 방지 //
$(function(){
    for(i=0; i < receiptData.length; i++){
        if(receiptData[i].receiptKinds == "사물함" && receiptData[i].receiptUse == 1){
            alert("상품은 중복 구매가 불가능합니다.")
            location.href = "/index";
        }
    }
})
