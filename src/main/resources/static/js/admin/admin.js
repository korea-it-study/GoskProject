const productInquiry = document.querySelectorAll(".product-inquiry");

productInquiry[0].onclick = () => {
    location.href = "/admin/userlist";
}
productInquiry[1].onclick = () => {
    location.href = "/admin/seatlist";
}
productInquiry[2].onclick = () => {
    location.href = "/admin/productlist";
}
productInquiry[3].onclick = () => {
    location.href = "/admin/saleslist";
}
