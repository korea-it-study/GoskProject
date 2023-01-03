//선택한 사물함 클릭 시 버튼색깔 변경 및 사물함 이름 표시
$(".locker-management-content button").click(function(){
    if($(this).hasClass('org-btn') == false){
        if($(this).hasClass('sky-btn') == true){
            $(this).removeClass('sky-btn');
            $(".locker-select-name").attr('value',"");
        }else{           
            $(this).parent().siblings().children().removeClass('sky-btn');
            $(this).addClass('sky-btn').siblings().removeClass('sky-btn');
            $('.locker-select-name').attr('value',$(this).text());
        }
    }
})


// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
    location.href = "/index";
    localStorage.clear();
});
