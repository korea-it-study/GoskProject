// 상품추가
let plusTablePick = null; // table 구분용
let plusInfo = null; //ajax 보낼 등록 데이터
let updateInfo = null; //ajax 보낼 수정 데이터
let plusSeat = null; 
let plusType = null;
let plusTime = null;
let plusPrice = null;

// 현재 상품 호출
let timePriceList = TimePriceList();

// 좌석 조회
$('.product-category > button').click(function(){
    if($(this).hasClass("sky-btn") === false){
        $(this).siblings().removeClass("sky-btn");
        $(this).removeClass("white-btn").addClass("sky-btn");

        if($('.reserved').hasClass('sky-btn')){
            $('.reserved-item').removeClass("invisible");
            $('.normal-item').addClass("invisible");
            $('.locker-item').addClass("invisible");
        }else if($('.normal').hasClass('sky-btn')){
            $('.normal-item').removeClass("invisible");
            $('.reserved-item').addClass("invisible");
            $('.locker-item').addClass("invisible");
        }else if($('.locker').hasClass('sky-btn')){
            $('.locker-item').removeClass("invisible");
            $('.normal-item').addClass("invisible");
            $('.reserved-item').addClass("invisible");
        }
    }else{
        $('.product-category > button').removeClass("sky-btn");
        $('.prouct-table').find('tr').removeClass("invisible");
    }
});

// 기본 상품 데이터
$(function(){
    //onedayTime        
    for(i=0; i<timePriceList[0].length; i++){
        $('.prouct-table').append(`    
            <tr class="normal-item">
                <td>일반석</td>
                <td>원데이
                    <br>${timePriceList[0][i].onedayTime}시간
                </td>
                <td><span>${comma(timePriceList[0][i].onedayPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //commuterTp      
    for(i=0; i<timePriceList[1].length; i++){
        $('.prouct-table').append(`    
            <tr class="normal-item">
                <td>일반석</td>
                <td>시간권
                    <br>${timePriceList[1][i].commuterTpTime}시간
                </td>
                <td><span>${comma(timePriceList[1][i].commuterTpPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //commuterDp       
    for(i=0; i<timePriceList[2].length; i++){
        $('.prouct-table').append(`    
            <tr class="normal-item">
                <td>일반석</td>
                <td>기간권
                    <br>${timePriceList[2][i].commuterDpTime}주
                </td>
                <td><span>${comma(timePriceList[2][i].commuterDpPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //reserved      
    for(i=0; i<timePriceList[3].length; i++){
        $('.prouct-table').append(`  
            <tr class="reserved-item">
                <td>지정석</td>
                <td>기간권
                    <br>${timePriceList[3][i].reservedTime}주
                </td>
                <td><span>${comma(timePriceList[3][i].reservedPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //locker
    for(i=0; i < 2; i++){
        $('.prouct-table').append(`  
            <tr class="locker-item">
                <td>사물함</td>
                <td>기간권
                    <br>n주
                </td>
                <td><span>000000</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }     
});


// 등록 팝업 // // 등록 팝업 //
$(function(){
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
})


// 수정 팝업 // // 수정 팝업 //
$(function(){
    // 팝업 열기
    $(".update-btn").click(function(){
        $('.fix-time').val("");
        $('.fix-price').val("");
        updateInfo = null;

        $('.fix-pop-back').removeClass("invisible");
    
        // 선택좌석
        var pickIndex = $(this).parents('tr').index();
        alert(pickIndex);
        alert($('tr:eq('+pickIndex+')').html());
        alert($('.prouct-table > tr:eq('+pickIndex+') > td:eq(1)').html());
        alert($('.prouct-table > tr:eq('+pickIndex+') > td:eq(1)').text());
    })
    
    $(".fix-update-btn").click(function(){
        alert("수정")
        $('.fix-pop-back').addClass("invisible");
    })

    $(".fix-close-btn").click(function(){
        alert("완료")
        $('.fix-pop-back').addClass("invisible");
    })    
})




// ajax. 상품 등록 데이터
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
            $('.plus-pop-back').addClass("invisible");
            $(location).prop("href", location.href);
        },
        error: (error) => {
            alert(error);
            console.log(error);
        }
    })
}

