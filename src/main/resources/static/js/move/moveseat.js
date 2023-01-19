let principal = getPrincipal();
let receiptData = getReceiptList(principal.user.user_id);
let seatLoadData = null;
let getLockerData = getLocker();

const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");
const locker = document.querySelector(".locker");

const seatBasic = document.querySelector(".seat-basic");
const seatSpecial = document.querySelector(".seat-special");
const lockerManage = document.querySelector(".locker-management-content");

const lockerName = document.querySelectorAll(".locker-management-content > div .btn")
const userShow = document.querySelector(".user-show");
const normSeatName = document.querySelectorAll(".seat-basic .seat-btn");
const specialSeatName = document.querySelectorAll(".seat-special .seat-btn");

// 좌석선택
let reservedUseName = null;
let lockerUseName = null;
let normalUseName = null;

let seatUseName = null;
let seatMoveName = null;

// 좌석 전체선택
const seatBtns = document.querySelectorAll(".seat-btn");

// 자리이동 팝업
const moveBtn = document.querySelector(".move-btn");
const selCate = document.querySelector(".sel_cate");
const selList = document.querySelector(".sel_list"); // 소분류
const selList2 = document.querySelector(".sel_list2"); // 소소분류

const popupBack = document.querySelector(".popup-back");
const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const popupRegisterBtn = document.querySelector(".popup-register-btn");



// 홈으로 버튼 index로 보내기 //// 홈으로 버튼 index로 보내기 //
$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});


// 구매목록 확인 //// 구매목록 확인 //
$(function(){    
    var useDone = 0;

    for(i=0; i < receiptData.length; i++){
        if(receiptData[i].receiptKinds == "지정석" && receiptData[i].receiptUse == 1){
    // 지정석
            //색상
            $(".reserved").removeClass("gray-btn").addClass("white-btn");
            //이미지view
            $('.seat-special').removeClass("invisible");
            $('.seat-special').siblings().addClass("invisible");

        } else if(receiptData[i].receiptKinds == "사물함" && receiptData[i].receiptUse == 1){
    // 사물함
            //색상
            $(".locker").removeClass("gray-btn").addClass("white-btn");
            //이미지view
            $('.seat-management-content').removeClass("invisible");
            $('.seat-management-content').siblings().addClass("invisible");

        } else if(receiptData[i].receiptUse == 1){
    // 일반+정액석
            //색상
            $(".normal").removeClass("gray-btn").addClass("white-btn");
            //이미지view
            $('.seat-basic').removeClass("invisible");
            $('.seat-basic').siblings().addClass("invisible");
            
        } else{
    // 구매상품이 없다
            useDone += 1;
            if(receiptData.length == useDone){
                alert("상품 구매를 먼저 진행해주세요.")
                location.href = "/index";
            }
        }
    }
    
    // 좌석 + 사물함 중복 구매시
    if($(".normal").hasClass('white-btn') && $(".locker").hasClass('white-btn')){
        $(".normal").removeClass("white-btn").addClass("sky-btn");
    }else if($(".reserved").hasClass('white-btn') && $(".locker").hasClass('white-btn')){
        $(".reserved").removeClass("white-btn").addClass("sky-btn");
    }else if($(".locker").hasClass('white-btn')){
        $(".locker").removeClass("white-btn").addClass("sky-btn");
    }
      
    if($('.normal').hasClass('sky-btn')){
    //일반+정액석
        $('.seat-basic').removeClass("invisible");
        $('.seat-special').addClass("invisible");
        $('.locker-management-content').addClass("invisible");
    }else if($('.reserved').hasClass('sky-btn')){
    //지정석
        $('.seat-special').removeClass("invisible");
        $('.seat-basic').addClass("invisible");
        $('.locker-management-content').addClass("invisible");
    }else if($('.locker').hasClass('sky-btn')){
    //사물함
        $('.locker-management-content').removeClass("invisible");
        $('.seat-basic').addClass("invisible");
        $('.seat-special').addClass("invisible");
    }

    getColor();
    seatLoadData = getSeatData();
})

// 사용석 체크
$(function(){    
    for(i=0; i < receiptData.length; i++){
        if(receiptData[i].receiptKinds == "지정석" && receiptData[i].receiptUse == 1){
    // 지정석
            for(j = 0; j < seatLoadData.length; j++){
                if(seatLoadData[j].userId == receiptData[i].userId){
                    reservedUseName = seatLoadData[j].reservedSeatId;         
                }
            }
        } else if(receiptData[i].receiptKinds == "사물함" && receiptData[i].receiptUse == 1){
    // 사물함
            for(j = 0; j < getLockerData.length; j++){
                if(getLockerData[j].userId == receiptData[i].userId){
                    lockerUseName = getLockerData[j].lockerId;
                }
            }

        } else if(receiptData[i].receiptUse == 1){
    // 일반+정액석
            for(j = 0; j < seatLoadData.length; j++){
                if(seatLoadData[j].userId == receiptData[i].userId){
                    normalUseName = seatLoadData[j].seatId;                  
                }
            }
        }
    }

    // 사용석 명시
    if($(".normal").hasClass('sky-btn')){
        $('.seat-use-name').val(normalUseName);        
    }else if($(".reserved").hasClass('sky-btn')){
        $('.seat-use-name').val(reservedUseName);       
    }else if($(".locker").hasClass('sky-btn')){
        $('.seat-use-name').val(lockerUseName);    
    }
})

// 좌석 버튼 클릭
$('.seat-content > article > button').click(function(){
    $('.seat-content > article > button').removeClass("selected-seat").removeClass("seatborder");
    $(this).addClass("selected-seat").addClass("seatborder");

    seatMoveName = $('.seat-content > article > button.seatborder').text();
    $('.seat-move-name').val(seatMoveName);  
})

// 사물함 버튼 클릭
$('.locker-management-content > div > div > button').click(function(){
    $('.locker-management-content > div > div > button').removeClass("selected-seat").removeClass("seatborder");
    $(this).addClass("selected-seat").addClass("seatborder");

    seatMoveName = $('.locker-management-content > div > div > button.seatborder').text();
    $('.seat-move-name').val(seatMoveName);  
})


// 좌석 조회 (색상 변경) 클릭할때
$('.seat-category > button').click(function(){
    $('.seat-move-name').val("");  

    if($(this).hasClass("gray-btn") === false){
        $(this).siblings().removeClass("sky-btn");
        $(this).removeClass("white-btn").addClass("sky-btn");
        
        if($('.normal').hasClass('sky-btn')){
        // 일반+정액석
            $('.seat-basic').removeClass("invisible");
            $('.seat-special').addClass("invisible");
            $('.locker-management-content').addClass("invisible");
            $('.seat-use-name').val(normalUseName);       

        }else if($('.reserved').hasClass('sky-btn')){
        // 지정석
            $('.seat-special').removeClass("invisible");
            $('.seat-basic').addClass("invisible");
            $('.locker-management-content').addClass("invisible");
            $('.seat-use-name').val(reservedUseName);      

        }else if($('.locker').hasClass('sky-btn')){
        // 사물함
            $('.locker-management-content').removeClass("invisible");
            $('.seat-basic').addClass("invisible");
            $('.seat-special').addClass("invisible");
            $('.seat-use-name').val(lockerUseName);     
        }
    }
});

//초기 seat 설정 (value 달아주기)
seatBtns.forEach(seatBtn => {
    seatBtn.value = seatBtn.textContent;
});


// 자리이동 버튼 클릭
$('.move-btn').click(function(){  
    
    if(confirm("해당 좌석을 변경하시겠습니까?")){
        if($('.normal').hasClass('sky-btn')){
            putReq("/api/move/" + "seat");
        }else if($('.reserved').hasClass('sky-btn')){
            putReq("/api/move/" + "special");     
        }else if($('.locker').hasClass('sky-btn')){
            putReq("/api/move/" + "locker");     
        }
    }
})



//getAjax
function getReq(url) {
    let responseData = null;
    $.ajax({
        async: false,
        url: url,
        type: "get",
        dataType: "JSON",
        success: (response) => {
             responseData = response.data;
        },
        error: (error) => {
            console.log(error)
        }
    });

    return responseData;
}


//사용중 좌석 오렌지 바르기 (새로고침)
function getColor(){
    //사물함
    let lockerResponseData = getReq("/api/allLocker");
        lockerResponseData.forEach(lockerUse => {
            lockerName.forEach(lockerAll=> {
                //0이면 아무변화 x
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

    //일반석
    let normalSeatResponseData = getReq("/api/seat/allSeat");
        normalSeatResponseData.forEach(normSeatUse =>{
            normSeatName.forEach(normAll => {
                if(normSeatUse.userId !== 0 && normSeatUse.seatId === normAll.textContent){
                    normAll.classList.add("org-btn");
                    if(normSeatUse.userId === -1){
                        normAll.classList.remove("org-btn");
                        normAll.classList.add("repair-seat");
                    }
                }else if(normSeatUse.userId === 0 && normSeatUse.seatId === normAll.textContent){
                    normAll.classList.remove("repair-seat");
                }
            });
        });

    //지정석
    let reservedSeatResponseData = getReq("/api/seat/allReservedSeat");
        reservedSeatResponseData.forEach(reservedUse =>{
            specialSeatName.forEach(reservedAll => {
                if(reservedUse.userId !== 0 && reservedUse.reservedSeatId === reservedAll.textContent){
                    reservedAll.classList.add("org-btn");
                    if(reservedUse.userId === -1){
                        reservedAll.classList.remove("org-btn");
                        reservedAll.classList.add("repair-seat");
                    }
                }else if(reservedUse.userId === 0 && reservedUse.reservedSeatId === reservedAll.textContent){
                    reservedAll.classList.remove("repair-seat");
                }
            });
        });

}

//좌석 변경 요청
function putReq(url){
    let data = {
        nowSeat : $('.seat-use-name').val(),
        afterSeat : seatMoveName
    }

    $.ajax({
        async: false,
        type: "put",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            if(response.data != 0){
                alert("변경 성공" + data.nowSeat + "->" + data.afterSeat);
                location.reload();

            }else{
                alert("좌석을 선택해주세요.");
            }
        },
        error: (error)=>{
            console.log(error);
        }
    });
}


//좌석 데이터 받아오기
function getSeatData() {
    let responseData = null;
    let url = null;

    if(!$('.reserved').hasClass("gray-btn")) {
        url = "/api/seat/allReservedSeat"
    }else if(!$('.normal').hasClass("gray-btn")){
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
            console.log(response);
        },
        error: (error) => {
//            alert("seat data 받아오기 실패");
            console.log(error);
        }
    });
    return responseData;
}


//사용중인 locker만 정보 가져옴
function getLocker(){
    let responseData = null;
    $.ajax({
       async: false,
       url: "/api/allLocker",
        type: "get",
        success : (response) => {
           responseData = response.data;
           console.log(responseData);
        },
        error : (error) =>{
           console.log(error)
        }
    });
    return responseData;
}