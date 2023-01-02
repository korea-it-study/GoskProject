// 페이지 이동 //// 페이지 이동 //

// 관리자 페이지
$(".admin-btn").dblclick(function() {
    location.replace("/index"); 
})

//

const productInquiry = document.querySelectorAll(".product-inquiry");

productInquiry[0].onclick = () => {
    location.href = "/admin/productlist";
}
productInquiry[1].onclick = () => {
    location.href = "/admin/userlist";
}
productInquiry[2].onclick = () => {
    location.href = "/admin/seatlist";
}
productInquiry[3].onclick = () => {
    location.href = "/admin/saleslist";
}
