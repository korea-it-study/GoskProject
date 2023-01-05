// 상품추가
let plusTablePick = null; // table 등록 구분용
let plusInfo = null; //ajax 보낼 등록 데이터
let plusSeat = null; 
let plusType = null;
let plusTime = null;
let plusPrice = null;
// 상품수정
let updateTablePick = null; // table 등록 구분용
let updateInfo = null; //ajax 보낼 수정 데이터
let fixId = null;
let fixSeat = null; 
let fixType = null;
let fixTime = null;
let fixPrice = null;

//상품삭제
let deleteId = null;

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
        $('.product-table').find('tr').removeClass("invisible");
    }
});

// 기본 상품 데이터
$(function(){
    //onedayTime        
    for(i=0; i<timePriceList[0].length; i++){
        $('.product-table').append(`    
            <tr class="normal-item">
                <td class="${timePriceList[0][i].onedayPriceId}">일반석</td>
                <td>
                    <p>원데이</p>
                    ${timePriceList[0][i].onedayTime}시간
                </td>
                <td><span>${comma(timePriceList[0][i].onedayPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //commuterTp      
    for(i=0; i<timePriceList[1].length; i++){
        $('.product-table').append(`    
            <tr class="normal-item">
                <td class="${timePriceList[1][i].commuterTpId}">일반석</td>
                <td>
                    <p>시간권</p>
                    ${timePriceList[1][i].commuterTpTime}시간
                </td>
                <td><span>${comma(timePriceList[1][i].commuterTpPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //commuterDp       
    for(i=0; i<timePriceList[2].length; i++){
        $('.product-table').append(`    
            <tr class="normal-item">
                <td class="${timePriceList[2][i].commuterDpId}">일반석</td>
                <td>
                    <p>기간권</p>
                    ${timePriceList[2][i].commuterDpTime}주
                </td>
                <td><span>${comma(timePriceList[2][i].commuterDpPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //reserved      
    for(i=0; i<timePriceList[3].length; i++){
        $('.product-table').append(`  
            <tr class="reserved-item">
                <td class="${timePriceList[3][i].reservedPriceId}">지정석</td>
                <td>
                    <p>기간권</p>
                    ${timePriceList[3][i].reservedTime}주
                </td>
                <td><span>${comma(timePriceList[3][i].reservedPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //locker
    for(i=0; i < 2; i++){
        $('.product-table').append(`  
            <tr class="locker-item">
                <td>사물함</td>
                <td>
                    <p>기간권</p>
                    n주
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
        pickIndex = null;

        $('.fix-pop-back').removeClass("invisible");
    
        // 선택좌석
        var pickIndex = $(this).parents('tr').index() - 1;

        $('.fix-popup > input:nth-child(1)').val($('.product-table > tr:eq('+pickIndex+') > td:eq(0)').text());
        $('.fix-popup > input:nth-child(2)').val($('.product-table > tr:eq('+pickIndex+') > td:eq(1) > p').text());

        // 수정 팝업에서 수정버튼 클릭시
        $('.fix-update-btn').click(function(){
            fixId = $('.product-table > tr:eq('+pickIndex+') > td:eq(0)').attr("class");
            fixSeat = $('.fix-popup > input:nth-child(1)').val();
            fixType = $('.fix-popup > input:nth-child(2)').val();
            fixTime = $('.fix-time').val();
            fixPrice = $('.fix-price').val();
        
            if(fixSeat == "일반석" && fixType == "원데이"){    
                updateTablePick = "oneday";
                //Table7 원데이 가격(oneday_price_mst)
                updateInfo = {
                    onedayPriceId: fixId, // PK
                    onedayTime: fixTime, // 수정 시간
                    onedayPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "일반석" && fixType == "시간권"){
                updateTablePick = "commuter/tp";
                //Table8 정액권 시간가격(commuter_time_price_mst)
                updateInfo = {
                    commuterTpId: fixId, // PK
                    commuterTpTime: fixTime, // 수정 시간
                    commuterTpPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "일반석" && fixType == "기간권"){
                updateTablePick = "commuter/dp";
                //Table9 정액권 기간가격(commuter_day_price_mst)
                updateInfo = {
                    commuterDpId: fixId, // PK
                    commuterDpTime: fixTime, // 수정 시간
                    commuterDpPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "지정석" && fixType == "기간권"){
                updateTablePick = "reserved";
                //Table10 지정석 가격(reserved_price_mst)
                updateInfo = {
                    reservedPriceId: fixId, // PK
                    reservedTime: fixTime, // 수정 시간
                    reservedPrice: fixPrice // 수정 가격
                }
            }
            updateInfoData(updateInfo, updateTablePick);
        })
        
    })
    
    $(".fix-update-btn").click(function(){
        $('.fix-pop-back').addClass("invisible");
    })

    $(".fix-close-btn").click(function(){
        $('.fix-pop-back').addClass("invisible");
    })    
})


// 삭제 클릭 // // 삭제 클릭 //
$(function(){
    // 팝업 열기
    $(".dlt-btn").click(function(){
        // 선택좌석
        var pickIndex = $(this).parents('tr').index() - 1;
        deleteId = $('.product-table > tr:eq('+pickIndex+') > td:eq(0)').attr("class");

        // 수정 팝업에서 수정버튼 클릭시
        $('.fix-update-btn').click(function(){
            fixSeat = $('.fix-popup > input:nth-child(1)').val();
            fixType = $('.fix-popup > input:nth-child(2)').val();
            fixTime = $('.fix-time').val();
            fixPrice = $('.fix-price').val();
        
            if(fixSeat == "일반석" && fixType == "원데이"){    
                updateTablePick = "oneday";
                //Table7 원데이 가격(oneday_price_mst)
                updateInfo = {
                    onedayPriceId: fixId, // PK
                    onedayTime: fixTime, // 수정 시간
                    onedayPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "일반석" && fixType == "시간권"){
                updateTablePick = "commuter/tp";
                //Table8 정액권 시간가격(commuter_time_price_mst)
                updateInfo = {
                    commuterTpId: fixId, // PK
                    commuterTpTime: fixTime, // 수정 시간
                    commuterTpPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "일반석" && fixType == "기간권"){
                updateTablePick = "commuter/dp";
                //Table9 정액권 기간가격(commuter_day_price_mst)
                updateInfo = {
                    commuterDpId: fixId, // PK
                    commuterDpTime: fixTime, // 수정 시간
                    commuterDpPrice: fixPrice // 수정 가격
                }
            }else if(fixSeat == "지정석" && fixType == "기간권"){
                updateTablePick = "reserved";
                //Table10 지정석 가격(reserved_price_mst)
                updateInfo = {
                    reservedPriceId: fixId, // PK
                    reservedTime: fixTime, // 수정 시간
                    reservedPrice: fixPrice // 수정 가격
                }
            }
            deleteInfoData(updateLink, deleteId)
        })
        
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
            console.log(error);
        }
    })
}


// ajax. 상품 수정 데이터
function updateInfoData(updateInfo, updateLink){  
    $.ajax({
        async: false,
        type: "PUT",
        url: "/api/time/" + updateLink,
        contentType: "application/json",
        data: JSON.stringify(updateInfo),
        dataType: "json",
        success: (response) => {
            console.log(response);    
            $('.fix-pop-back').addClass("invisible");
            $(location).prop("href", location.href);
        },
        error: (error) => {
            console.log(error);
        }
    })
}


// ajax. 상품 삭제 데이터
function deleteInfoData(updateLink, oneday_price_id){  
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/time/" + updateLink + "/" + oneday_price_id,
        dataType: "json",
        success: (response) => {
            console.log(response);    
            $(location).prop("href", location.href);
        },
        error: (error) => {
            console.log(error);
        }
    })
}
