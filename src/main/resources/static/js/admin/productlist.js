// 상품추가
let plusTablePick = null; // table 구분용
let plusInfo = null; //ajax 보낼 데이터
let plusSeat = null; 
let plusType = null;
let plusTime = null;
let plusPrice = null;


const reserved = document.querySelector(".reserved");
const nomal = document.querySelector(".nomal");

const plusPopup = document.querySelector(".plus-popup");
const plusPopBack = document.querySelector(".plus-pop-back");
const plusRegisterBtn = document.querySelector(".plus-register-btn");

const updateBtns = document.querySelectorAll(".update-btn");
const fixPopBack = document.querySelector(".fix-pop-back");
const fixUpdateBtn = document.querySelector(".fix-update-btn");
const fixCloseBtn = document.querySelector(".fix-close-btn");

// 지정석만 조회
reserved.onclick = () => {
    alert("지정석");
}

// 일반석만 조회
nomal.onclick = () => {
    alert("일반석");
}


// 등록 팝업 // // 등록 팝업 //
// 팝업 열기
$('.register-btn').click(function(){
    plusInfo = null;
    $('.plus-time').val("");
    $('.plus-price').val("");

    $(".plus-pop-back").removeClass('invisible');

    // 좌석선택
    $('.plus-seat').change(function(){
        if($(this).val() == "일반석"){
            $('.plus-type').html( `
                <option value="원데이">원데이(H)</option>
                <option value="시간권">시간권(H)</option>
                <option value="기간권">기간권(W)</option>
            ` )
        }else if($(this).val() == "지정석"){
            $('.plus-type').html( `
                <option value="기간권">기간권</option>           
            ` )
        }
    });
});

// 팝업 닫기
$('.plus-close-btn').click(function(){
    $('.plus-pop-back').addClass("invisible");
})

// 등록 팝업에서 등록버튼 클릭시
$('.plus-register-btn').click(function(){
    plusSeat = $('.plus-seat').val();
    plusType = $('.plus-type').val();
    plusTime = $('.plus-time').val();
    plusPrice = $('.plus-price').val();

    if(plusSeat == "일반석" && plusType == "원데이"){    
        plusTablePick = "oneday";
        //Table7 원데이 가격(oneday_price_mst)
        plusInfo = {
            onedayTime: plusTime, // 등록 시간
            onedayPrice: plusPrice // 등록 가격
        }
    }else if(plusSeat == "일반석" && plusType == "시간권"){
        plusTablePick = "commuter/tp";
        //Table8 정액권 시간가격(commuter_time_price_mst)
        plusInfo = {
            commuterTpTime: plusTime, // 등록 시간
            commuterTpPrice: plusPrice // 등록 가격
        }
    }else if(plusSeat == "일반석" && plusType == "기간권"){
        plusTablePick = "commuter/dp";
        //Table9 정액권 기간가격(commuter_day_price_mst)
        plusInfo = {
            commuterDpTime: plusTime, // 등록 시간
            commuterDpPrice: plusPrice // 등록 가격
        }
    }else if(plusSeat == "지정석" && plusType == "기간권"){
        plusTablePick = "reserved";
        //Table10 지정석 가격(reserved_price_mst)
        plusInfo = {
            reservedTime: plusTime, // 등록 시간
            reservedPrice: plusPrice // 등록 가격
        }
    }
    plusInfoData(plusInfo, plusTablePick);
})


// 수정 팝업
updateBtns.forEach((updateBtn, index) => {
    updateBtn.onclick = () => {
        fixPopBack.classList.remove("invisible");
    }
})

fixCloseBtn.onclick = () => {
    fixPopBack.classList.add("invisible");
}



// 수정 팝업에서 수정버튼 클릭시
fixUpdateBtn.onclick = () => {
    alert("수정");
}



// ajax로 보내야 하는 데이터
function plusInfoData(plusInfo, pickLink){  

    $.ajax({
        async: false,
        type: "POST",
        url: "/api/time/" + pickLink,
        contentType: "application/json",
        data: JSON.stringify(plusInfo),
        dataType: "json",
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            alert(error);
            console.log(error);
        }
    })
}

