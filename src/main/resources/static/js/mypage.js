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

    // 사용중 여부는 다시 봐야함!!

    receiptData.forEach(receipt => {

        let receiptUse = null;

        if(receipt.receiptUse == "0") {
            receiptUse = "사용종료";
        }else if(receipt.receiptUse == "1") {
            receiptUse = "사용중";
        }

        salesTable.innerHTML += `
        <tr>
            <td>${receipt.receiptId}</td>
            <td>${receipt.receiptCreateDate}</td>
            <td>${receipt.receiptKinds}</td>
            <td>${comma(receipt.receiptPrice)} 원</td>
            <td>${receiptUse}</td>
        </tr>

        `
        
    });

}

window.onload = () => {
    getReceiptList();
}
