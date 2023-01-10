
// 전체 매출 호출
let salesList = salesListSelect();

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


// 조회버튼
const searchBtn = document.querySelector(".search-btn");

const historyStartDate = document.querySelector("#history_start_date");
const historyEndDate = document.querySelector("#history_end_date");
const seatCategory = document.querySelector("#seat-category");


searchBtn.onclick = () => {
    console.log(historyStartDate.value);
    console.log(historyEndDate.value);
    console.log(seatCategory.value);
    alert("시작날짜 :" + historyStartDate.value + "끝 날짜 :" + historyEndDate.value + "좌석종류 : " + seatCategory.value);
}


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
    }

    // 조회 클릭
    $('.search-btn').click(function(){        
        // 상품선택
        $('.seat-category').change(function(){
            if($(this).val() == "전체"){
                // 숨김 처리 전부 삭제
            }else if($(this).val() == "원데이 시간권"){
                
            }else if($(this).val() == "정액권 시간권"){
                
            }else if($(this).val() == "정액권 기간권"){
                
            }else if($(this).val() == "지정석 기간권"){
                
            }else if($(this).val() == "사물함 기간권"){
                
            }
        });
    });
    
});



// 매출내역 가져오기 //// 매출내역 가져오기 //
function salesListSelect(){  
    $.ajax({
        async: false,
        type: "GET",
        url: "/api/admin/saleslist",
        dataType: "json",
        success: (response) => {
            console.log(response);    
            responseData = response.data;
        },
        error: (error) => {
            console.log(error);
        }
    })
    return responseData;
}
