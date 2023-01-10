// ajax 받아오기
let principal = getPrincipal();
let receiptData = getReceiptList(principal.user.user_id);

// 선언
let today = new Date(); // 오늘 날짜
let oneMon = new Date().setMonth(new Date().getMonth() - 1); // 1개월 기준
let threeMon = new Date().setMonth(new Date().getMonth() - 3); // 3개월 기준

let receiptUse = null;
let receiptProduct = null;
let receiptCreateDate = null;
let receiptDate = null;

//같은 날짜인지 비교하는 함수
const isSameDay = (target1, target2) => {
    return target1.getFullYear() === target2.getFullYear() &&
      target1.getMonth() === target2.getMonth() &&
      target1.getDate() === target2.getDate();
}


// 페이지 이동 //// 페이지 이동 //

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});

//페이지가 열릴 때
$(function(){
    //구매내역 데이터 뿌리는 function
    getReceipts(receiptData); 
})

// 클릭할 떄 버튼 클래스 변경
$(function(){
    $('.myinfo-btns > button').click(function(){

        if($(this).hasClass("white-btn") === false){ // 클릭한 버튼이 white btn이 아닐 때
            $(this).siblings().removeClass("white-btn").addClass("black-btn"); // 형제 버튼 white btn 삭제
            $(this).removeClass("black-btn").addClass("white-btn"); // 본인 white btn 추가
    
        }else{
            $('.myinfo-btns > button').removeClass("white-btn").addClass("black-btn"); // 한 번 더 클릭시 블랙버튼으로 돌아옴
        }
    });

})


// 클릭할 때 뿌리는 데이터 변경 
$(function(){
    $(".myinfo-btns > button").click(function() {
        if($(".btn-today").hasClass("white-btn") === true) { // 오늘 버튼 눌렀을 때
            
            $(".sales-table").html("");

            for(let i = 0; receiptData.length; i++) {
                receiptDate = new Date(receiptData[i].receiptCreateDate);

                    if(isSameDay(today, receiptDate) === true){ // 오늘 날짜와 구매 날짜가 같음
                        $(".sales-table").append(`
                            <tr>
                                <td>${receiptData[i].receiptId}</td>
                                <td>${receiptData[i].receiptCreateDate}</td>
                                <td><p>${receiptData[i].receiptKinds}<p>${receiptProduct}</td>
                                <td>${comma(receiptData[i].receiptPrice)} 원</td>
                                <td>${receiptUse}</td>
                            </tr>
                        `);
                    }else {
                    $(".sales-table").append(``);
                }
            }
            
        }else if($(".btn-oneMon").hasClass("white-btn")  === true) { // 1개월 이내 버튼 누름

            $(".sales-table").html("");

            for(let i = 0; i < receiptData.length; i++) {
                receiptCreateDate = new Date(receiptData[i].receiptCreateDate);

                if(oneMon < receiptCreateDate){ // 1개월 전 날짜보다 구매날짜가 클 때

                    $(".sales-table").append(`
                        <tr>
                            <td>${receiptData[i].receiptId}</td>
                            <td>${receiptData[i].receiptCreateDate}</td>
                            <td><p>${receiptData[i].receiptKinds}<p>${receiptProduct}</td>
                            <td>${comma(receiptData[i].receiptPrice)} 원</td>
                            <td>${receiptUse}</td>
                        </tr>
                        `);
                }else {
                    $(".sales-table").append(``);
                    }
            } 
            
        }else if($(".btn-threeMon").hasClass("white-btn")  === true) { // 3개월 이내 버튼 누름

            $(".sales-table").html("");

            for(let i = 0; i < receiptData.length; i++) {
                receiptCreateDate = new Date(receiptData[i].receiptCreateDate);

                if(threeMon < receiptCreateDate){ // 3개월 전 날짜보다 구매날짜가 클 때
                    $(".sales-table").append(`
                        <tr>
                            <td>${receiptData[i].receiptId}</td>
                            <td>${receiptData[i].receiptCreateDate}</td>
                            <td><p>${receiptData[i].receiptKinds}<p>${receiptProduct}</td>
                            <td>${comma(receiptData[i].receiptPrice)} 원</td>
                            <td>${receiptUse}</td>
                        </tr>
                        `);
                }else {
                    $(".sales-table").append(``);
                }
            }
        }else { // 아무 버튼이 없을 시 전체 데이터 조회
            
            $(".sales-table").html("");
                    for(let j = 0; j < receiptData.length; j++) {
                        receiptCreateDate = new Date(receiptData[j].receiptCreateDate);

                        $(".sales-table").append(`
                            <tr>
                                <td>${receiptData[j].receiptId}</td>
                                <td>${receiptData[j].receiptCreateDate}</td>
                                <td><p>${receiptData[j].receiptKinds}<p>${receiptProduct}</td>
                                <td>${comma(receiptData[j].receiptPrice)} 원</td>
                                <td>${receiptUse}</td>
                            </tr>
                            `);
                    }
            }   
    })
})


// 구매내역 table에 뿌리기
function getReceipts(receiptData) {

    const TIME_ZONE = 3240 * 10000;
    const salesTable = document.querySelector(".sales-table");

    salesTable.innerHTML = "";
    salesTable.innerHTML += `
            <colgroup>
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
            </colgroup>
            `;

    for(let i = 0; i < receiptData.length; i++) {
        receiptCreateDate = new Date(receiptData[i].receiptCreateDate);

        if(receiptData[i].receiptUse == "0") {
            receiptUse = "사용종료";
        }else if(receiptData[i].receiptUse == "1") {
            receiptUse = "사용중";
        }

        if(receiptData[i].receiptDay == "0"){
            receiptProduct = receiptData[i].receiptTime + "시간";
        }else if(receiptData[i].receiptTime == "0") {
            receiptProduct = receiptData[i].receiptDay + "주";
        }

        salesTable.innerHTML += `
            <tr>
                <td>${receiptData[i].receiptId}</td>
                <td>${receiptData[i].receiptCreateDate}</td>
                <td><p>${receiptData[i].receiptKinds}<p>${receiptProduct}</td>
                <td>${comma(receiptData[i].receiptPrice)} 원</td>
                <td>${receiptUse}</td>
            </tr>
                `;
        }
}


