// 페이지 이동 //// 페이지 이동 //

// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    location.href = "/index";
    localStorage.clear();
});


// 나의 구매내역 받아오기

function getReceiptList() {
    
    let receiptData = null;

    $.ajax({
        async: false
    })
}