
// 전체 매출 호출
let salesList = salesListSelect();

// 정의
let total = 0; //총액
let startDate = null; //시작날짜
let endDate = null; //마지막 날짜

// datepicker
$(document).ready(function () {
    $.datepicker.setDefaults({
        closeText: "닫기",
        currentText: "오늘",
        prevText: "이전 달",
        nextText: "다음 달",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        dayNames: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        weekHeader: "주",
        yearSuffix: "년",
    });
});

$(function () {
    $("#history_start_date, #history_end_date").datepicker({
        dateFormat: "yy-mm-dd",
        showOn: "button",
        buttonImage: "/static/images/admin/calendar.png",
        buttonImageOnly: true,
        showButtonPanel: true,
        maxDate: "today",
        minDate: "-2y",
    });

    $("#history_start_date, #history_end_date").datepicker("setDate", "today");
});





// 제출 데이터 조회
$(function(){      
    //전체 매출 조회        
    for(i=0; i<salesList.length; i++){
        if(salesList[i].receiptDay != 0){
            $('.sales-table').append(`  
                <tr>
                    <td>${salesList[i].receiptKinds} 기간권</td>
                    <td>${salesList[i].receiptDay}주</td>
                    <td>${salesList[i].receiptCount}회</td>
                    <td>${comma(salesList[i].receiptPrice)}원</td>
                </tr>      
            `);
        }else if(salesList[i].receiptTime != 0){
            $('.sales-table').append(`  
                <tr>
                    <td>${salesList[i].receiptKinds} 시간권</td>
                    <td>${salesList[i].receiptTime}시간</td>
                    <td>${salesList[i].receiptCount}회</td>
                    <td>${comma(salesList[i].receiptPrice)}원</td>
                </tr>      
            `);
        }
        total += salesList[i].receiptPrice;
    }

    //전체 매출 기본 현황
    $(".total-price > div > b").html(`
        ${comma(total)}원
    `)
      
    // 조회 클릭선택
    $('.search-btn').click(function(){       
        $('.sales-table > tr').addClass("invisible");

        startDate = new Date($("#history_start_date").val());
        endDate = new Date($("#history_end_date").val());
        total = 0;

        for(i=0; i<salesList.length; i++){
            if(startDate <= new Date(salesList[i].receiptCreateDate) && new Date(salesList[i].receiptCreateDate) <= endDate){
                if($('.seat-category').val() == "원데이 시간권" && salesList[i].receiptKinds == "원데이" && salesList[i].receiptTime != 0){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }else if($('.seat-category').val() == "정액권 시간권" && salesList[i].receiptKinds == "정액권" && salesList[i].receiptTime != 0){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }else if($('.seat-category').val() == "정액권 기간권" && salesList[i].receiptKinds == "정액권" && salesList[i].receiptDay != 0){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }else if($('.seat-category').val() == "지정석 기간권" && salesList[i].receiptKinds == "지정석" && salesList[i].receiptDay != 0){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }else if($('.seat-category').val() == "사물함 기간권" && salesList[i].receiptKinds == "사물함" && salesList[i].receiptDay != 0){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }else if($('.seat-category').val() == "전체"){
                    $('.sales-table > tr:eq('+i+')').removeClass("invisible");
                    total += salesList[i].receiptPrice;
                }
            }
        }
            
        $(".total-price > div > b").html(`
            ${comma(total)}원
        `)        
    }); 
});



