let principal = getPrincipal();

// 페이지 이동 //// 페이지 이동 //

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});


// 나의 구매내역 받아오기

function getReceiptList() {
    
    let receiptData = null;
    let userId = principal.user.user_id;

    $.ajax({
        async:false,
        url: "/api/mypage/" + userId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            alert("reciept data 받아오기 성공");
            receiptData = response.data;
            alert(JSON.stringify(receiptData));
            getReceipts(receiptData);
            console.log(response);
        },
        error: (error) => {
            alert("receipt data 받아오기 실패");
            alert("userId : " + userId + "\n" +
            "receiptData : " + receiptData);
            console.log(error);
        }
    });

}

$('.myinfo-btns > button').click(function(){
    if($(this).hasClass("white-btn") === false){
        $(this).siblings().removeClass("white-btn");
        $(this).siblings().addClass("black-btn");
        $(this).removeClass("black-btn").addClass("white-btn");

    }else{
        $('.myinfo-btns > button').removeClass("white-btn").addClass("black-btn");
    }
});

// 구매내역 table에 뿌리기

function getReceipts(receiptData) {

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


    receiptData.forEach(receipt => {

        let receiptUse = null;
        let receiptProduct = null;

        if(receipt.receiptUse == "0") {
            receiptUse = "사용종료";
        }else if(receipt.receiptUse == "1") {
            receiptUse = "사용중";
        }

        if(receipt.receiptDay == "0"){
            receiptProduct = receipt.receiptTime;
        }else if(receipt.receiptTime == "0") {
            receiptProduct = receipt.receiptDay;
        }

        salesTable.innerHTML += `
        <tr>
            <td>${receipt.receiptId}</td>
            <td>${receipt.receiptCreateDate}</td>
            <td><p>${receipt.receiptKinds}<p>${receiptProduct}</td>
            <td>${comma(receipt.receiptPrice)} 원</td>
            <td>${receiptUse}</td>
        </tr>

        `
        
    });

}

window.onload = () => {
    getReceiptList();
}
