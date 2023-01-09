// 상품추가
let plusTablePick = null; // table 등록 구분용
let plusInfo = null; //ajax 보낼 등록 데이터
let plusItem = null; 
let plusType = null;
let plusTime = null;
let plusPrice = null;

// 상품수정
let updateTablePick = null; // table 등록 구분용
let updateInfo = null; //ajax 보낼 수정 데이터
let fixId = null;
let fixItem = null; 
let fixType = null;
let fixTime = null;
let fixPrice = null;
let fixPickTime = null;

//상품삭제
let deleteTablePick = null; // table 등록 구분용
let deleteId = null;
let deleteItem = null;
let deleteType = null;

// 현재 상품 호출
let timePriceList = TimePriceList();
let lockerPriceList = LockerPriceList();


// 상품 조회
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


// 기본 상품 데이터 조회
$(function(){
    //onedayTime        
    for(i=0; i<timePriceList[0].length; i++){
        $('.product-table').append(`    
            <tr class="normal-item">
                <td class="${timePriceList[0][i].onedayPriceId}">일반석</td>
                <td>
                    <p>원데이</p>
                    <span>${timePriceList[0][i].onedayTime}</span>시간
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
                    <span>${timePriceList[1][i].commuterTpTime}</span>시간
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
                    <span>${timePriceList[2][i].commuterDpTime}</span>주
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
                    <span>${timePriceList[3][i].reservedTime}</span>주
                </td>
                <td><span>${comma(timePriceList[3][i].reservedPrice)}</span>원</td>
                <td><button class="update-btn btn">수정</button></td>
                <td><button class="dlt-btn btn">삭제</button></td>
            </tr>
        `);
    }

    //locker
    for(i=0; i < lockerPriceList.length; i++){
        $('.product-table').append(`  
            <tr class="locker-item">
                <td class="${lockerPriceList[i].lockerPriceId}">사물함</td>
                <td>
                    <p>기간권</p>
                    <span>${lockerPriceList[i].lockerTime}</span>주
                </td>
                <td><span>${comma(lockerPriceList[i].lockerPrice)}</span>원</td>
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
        $(".plus-pop-back").removeClass('invisible');

        // 상품선택
        $('.plus-item').change(function(){
            if($(this).val() == "일반석"){
                $('.plus-type').html( `
                    <option value="원데이">원데이(H)</option>
                    <option value="시간권">시간권(H)</option>
                    <option value="기간권">기간권(W)</option>
                ` )
            }else if($(this).val() == "지정석"){
                $('.plus-type').html( `
                    <option value="기간권">기간권(W)</option>           
                ` )
            }else if($(this).val() == "사물함"){
                $('.plus-type').html( `
                    <option value="기간권">기간권(W)</option>           
                ` )
            }
        });
    });

    // 글자 입력할떄마다
    $(".plus-popup > input").change(function(){
        plusItem = $('.plus-item').val();
        plusType = $('.plus-type').val();     
        plusTime = $('.plus-time').val();
        plusPrice = $('.plus-price').val();     
    });
    
    // 등록 팝업에서 등록버튼 클릭시
    $('.plus-register-btn').click(function(){
    // 값 저장
        if(plusItem == "일반석" && plusType == "원데이"){    
            plusTablePick = "time/oneday";
            //Table7 원데이 가격(oneday_price_mst)
            plusInfo = {
                onedayTime: plusTime, // 등록 시간
                onedayPrice: plusPrice // 등록 가격
            }
        }else if(plusItem == "일반석" && plusType == "시간권"){
            plusTablePick = "time/commuter/tp";
            //Table8 정액권 시간가격(commuter_time_price_mst)
            plusInfo = {
                commuterTpTime: plusTime, // 등록 시간
                commuterTpPrice: plusPrice // 등록 가격
            }
        }else if(plusItem == "일반석" && plusType == "기간권"){
            plusTablePick = "time/commuter/dp";
            //Table9 정액권 기간가격(commuter_day_price_mst)
            plusInfo = {
                commuterDpTime: plusTime, // 등록 시간
                commuterDpPrice: plusPrice // 등록 가격
            }
        }else if(plusItem == "지정석" && plusType == "기간권"){
            plusTablePick = "time/reserved";
            //Table10 지정석 가격(reserved_price_mst)
            plusInfo = {
                reservedTime: plusTime, // 등록 시간
                reservedPrice: plusPrice // 등록 가격
            }
        }else if(plusItem == "사물함" && plusType == "기간권"){
            plusTablePick = "locker/price";
            //Table11 사물함 가격(reserved_price_mst)
            plusInfo = {
                lockerTime: plusTime, // 등록 시간
                lockerPrice: plusPrice // 등록 가격
            }
        }

    // 값 정규식 체크
        if(plusTime == "" || plusPrice == ""){
            alert("빈 값을 확인해주세요");
        }else if(doubleCheck(null, plusTime, plusTablePick)) {
            alert("이미 존재하는 품목입니다.");
            $('.plus-time').val("");
            plusTime == "";
        }else if(!intCheck.test(plusPrice)) {
            alert("수정 시간/기간은 숫자만 입력 가능합니다.");
            $('.plus-time').val("");
            plusTime == "" 
        }else if(!intCheck.test(plusPrice)) {
            alert("수정 가격은 숫자만 입력 가능합니다.");
            $('.plus-price').val("");
            plusPrice = "";
        }else{
            plusInfoData(plusInfo, plusTablePick);
        }
          
        resetData();
    })
    
    // 팝업 닫기
    $('.plus-close-btn').click(function(){
        $('.plus-pop-back').addClass("invisible");
        resetData();
    })
})


// 수정 팝업 // // 수정 팝업 //
$(function(){
    // 팝업 열기
    $(".update-btn").click(function(){
        $('.fix-pop-back').removeClass("invisible");

        // 선택아이템
        var pickIndex = $(this).parents('tr').index() - 1;
        
        $('.fix-popup > input:nth-child(1)').val($('.product-table > tr:eq('+pickIndex+') > td:eq(0)').text());
        $('.fix-popup > input:nth-child(2)').val($('.product-table > tr:eq('+pickIndex+') > td:eq(1) > p').text());
        fixPickTime = $('.product-table > tr:eq('+pickIndex+') > td:eq(1) > span').text();
        
        // 글자 입력할떄마다
        $(".fix-popup > input").change(function(){
            fixId = $('.product-table > tr:eq('+pickIndex+') > td:eq(0)').attr("class");
            fixItem = $('.fix-popup > input:nth-child(1)').val();
            fixType = $('.fix-popup > input:nth-child(2)').val();
            fixTime = $('.fix-time').val();
            fixPrice = $('.fix-price').val();            
        });

        // // 수정 팝업에서 수정버튼 클릭시
        $('.fix-update-btn').click(function(){        
        // 값 저장
            if(fixItem == "일반석" && fixType == "원데이"){    
                updateTablePick = "time/oneday";
                //Table7 원데이 가격(oneday_price_mst)
                updateInfo = {
                    onedayPriceId: fixId, // PK
                    onedayTime: fixTime, // 수정 시간
                    onedayPrice: fixPrice // 수정 가격
                }
            }else if(fixItem == "일반석" && fixType == "시간권"){
                updateTablePick = "time/commuter/tp";
                //Table8 정액권 시간가격(commuter_time_price_mst)
                updateInfo = {
                    commuterTpId: fixId, // PK
                    commuterTpTime: fixTime, // 수정 시간
                    commuterTpPrice: fixPrice // 수정 가격
                }
            }else if(fixItem == "일반석" && fixType == "기간권"){
                updateTablePick = "time/commuter/dp";
                //Table9 정액권 기간가격(commuter_day_price_mst)
                updateInfo = {
                    commuterDpId: fixId, // PK
                    commuterDpTime: fixTime, // 수정 시간
                    commuterDpPrice: fixPrice // 수정 가격
                }
            }else if(fixItem == "지정석" && fixType == "기간권"){
                updateTablePick = "time/reserved";
                //Table10 지정석 가격(reserved_price_mst)
                updateInfo = {
                    reservedPriceId: fixId, // PK
                    reservedTime: fixTime, // 수정 시간
                    reservedPrice: fixPrice // 수정 가격
                }
            }else if(fixItem == "사물함" && fixType == "기간권"){
                updateTablePick = "locker/price";
                //Table11 사물함 가격(reserved_price_mst)
                updateInfo = {
                    lockerPriceId: fixId, // PK
                    lockerTime: fixTime, // 수정 시간
                    lockerPrice: fixPrice // 수정 가격
                }
            }

        // 값 정규식 체크
            if(fixTime == "" || fixPrice == ""){
                alert("빈 값을 확인해주세요");
            }else if(doubleCheck(fixPickTime, fixTime, updateTablePick)) {
                alert("이미 존재하는 품목입니다.");
                $('.fix-time').val("");
                fixTime == "";
            }else if(!intCheck.test(fixTime)) {
                alert("수정 시간/기간은 숫자만 입력 가능합니다.");
                $('.fix-time').val("");
                fixTime == "" 
            }else if(!intCheck.test(fixPrice)) {
                alert("수정 가격은 숫자만 입력 가능합니다.");
                $('.fix-price').val("");
                fixPrice = "";
            }else{
                updateInfoData(updateInfo, updateTablePick);
            }

            resetData();        
        })
    })
    
    // 팝업 닫기
    $(".fix-close-btn").click(function(){
        $('.fix-pop-back').addClass("invisible");
        resetData();
    })
})


// 삭제 클릭 // // 삭제 클릭 //
$(function(){
    // 삭제 클릭
    $(".dlt-btn").click(function(){
        // 선택좌석
        var pickIndex = $(this).parents('tr').index() - 1;
        deleteId = $('.product-table > tr:eq('+pickIndex+') > td:eq(0)').attr("class");

        deleteItem = $('.product-table > tr:eq('+pickIndex+') > td:eq(0)').text();
        deleteType = $('.product-table > tr:eq('+pickIndex+') > td:eq(1) > p').text();

        // 삭제 테이블 구분용    
        if(deleteItem == "일반석" && deleteType == "원데이"){    
            deleteTablePick = "time/oneday"; //Table7 원데이
        }else if(deleteItem == "일반석" && deleteType == "시간권"){
            deleteTablePick = "time/commuter/tp"; //Table8 정액권 시간
        }else if(deleteItem == "일반석" && deleteType == "기간권"){
            deleteTablePick = "time/commuter/dp"; //Table9 정액권 기간
        }else if(deleteItem == "지정석" && deleteType == "기간권"){
            deleteTablePick = "time/reserved"; //Table10 지정석
        }else if(deleteItem == "사물함" && deleteType == "기간권"){
            deleteTablePick = "locker/price"; //Table11 사물함
        }

        let deleteCheck = confirm("선택" + deleteItem + "의 " + deleteType + "을 삭제하시겠습니까?");
        
        if(deleteCheck){
            deleteInfoData(deleteTablePick, deleteId);
        }

        pickIndex = null;
        deleteId = null;
        deleteItem = null;
        deleteType = null;
    })
})



// ajax. 상품 등록 데이터
function plusInfoData(plusInfo, pickLink){ 
    $.ajax({
        async: false,
        type: "POST",
        url: "/api/" + pickLink,
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
        url: "/api/" + updateLink,
        contentType: "application/json",
        data: JSON.stringify(updateInfo),
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

// ajax. 상품 삭제 데이터
function deleteInfoData(deleteTablePick, deleteId){  
    $.ajax({
        async: false,
        type: "delete",
        url: "/api/" + deleteTablePick + "/" + deleteId,
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

// 종복 체크 // // 중복 체크 //
function doubleCheck(pickTime, time, tablePick){
    if(tablePick == "time/oneday"){        
        for(i=0; i<timePriceList[0].length; i++){
            if(time == timePriceList[0][i].onedayTime && time != pickTime){
                return true;
            }            
        }
    }else if(tablePick == "time/commuter/tp"){       
        for(i=0; i<timePriceList[1].length; i++){
            if(time == timePriceList[1][i].commuterTpTime && time != pickTime){
                return true;
            }            
        }
    }else if(tablePick == "time/commuter/dp"){       
        for(i=0; i<timePriceList[2].length; i++){
            if(time == timePriceList[2][i].commuterDpTime && time != pickTime){
                return true;
            }            
        }
    }else if(tablePick == "time/reserved"){       
        for(i=0; i<timePriceList[3].length; i++){
            if(time == timePriceList[3][i].reservedTime && time != pickTime){
                return true;
            }            
        }
    }else if(tablePick == "locker/price"){       
        for(i=0; i<lockerPriceList.length; i++){
            if(time == lockerPriceList[i].lockerTime && time != pickTime){
                return true;
            }            
        }
    }
    return false;
}

// 데이터 값 초기화 //
function resetData(){   
    plusInfo = null;
    plusItem = null; 
    plusType = null;
    plusTime = null;
    plusPrice = null;
    $('.plus-time').val("");
    $('.plus-price').val(""); 
    
    updateInfo = null;
    pickIndex = null;
    fixId = null;
    fixItem = null;
    fixType = null;
    fixTime = null;
    fixPrice = null;

    fixPickTime = null;
    $('.fix-time').val("");
    $('.fix-price').val("");
}