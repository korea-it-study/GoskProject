const productInquiry = document.querySelectorAll(".product-inquiry");

productInquiry[0].onclick = () => {
    location.replace("/templates/adminpage/product-manage.html")
}
productInquiry[1].onclick = () => {
    location.replace("/templates/adminpage/user-manage.html")
}
productInquiry[2].onclick = () => {
    location.replace("/templates/adminpage/seat-manage.html")
}
productInquiry[3].onclick = () => {
    location.replace("/templates/adminpage/sales-manage.html")
}
