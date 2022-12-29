

$('.join-keybord > button').click(function(){
    var phoneIdInput = $(".phone-id").val();
    var phonePwInput = $(".phone-pw").val();

    if(phoneIdInput.length != 13){
        if($(this).html() == "CLR"){
            $(".phone-id").val("");
        }else if($(this).find("i").hasClass("fa-solid") == true){
            $(".phone-id").val(phoneIdInput.substring(0, phoneIdInput.length - 1).replaceAll("-",""));
        }else{
            $(".phone-id").val(phoneIdInput + $(this).html());
        }  
    
        if($(".phone-id").val().length == 11){
            var phone = phoneFormat($(".phone-id").val());
            $(".phone-id").val(phone);
        }
    }else{
        if(phoneIdInput.length == 13 && phonePwInput.length == 0 && $(this).find("i").hasClass("fa-solid") == true){
            $(".phone-id").val(phoneIdInput.substring(0, phoneIdInput.length - 1).replaceAll("-",""));
        }

        if($(".phone-pw").val().length == 4){
            alert("비밀번호는 4자리 입니다.")
            $(".phone-pw").val(phoneIdInput.substring(0, phoneIdInput.length - 1));
        }
        if($(this).html() == "CLR"){
            $(".phone-id").val("");
            $(".phone-pw").val("");
        }else if($(this).find("i").hasClass("fa-solid") == true){
            $(".phone-pw").val(phoneIdInput.substring(0, phonePwInput.length - 1).replaceAll("-",""));
        }else{
            $(".phone-pw").val(phonePwInput + $(this).html());
        }  
    
    }
});

function phoneFormat(phoneNumber) {
    // 특수문자 제거
    const value = phoneNumber.replace(/[^0-9]/g, '');
    
    // 00 OR 000 지정
    const firstLength = value.length > 9 ? 3 : 2;
  
    // ({2,3}) - ({3,4}) - ({4})
    return [
      // 첫번째 구간 (00 or 000)
      value.slice(0, firstLength),
      // 두번째 구간 (000 or 0000)
      value.slice(firstLength, value.length - 4),
      // 남은 마지막 모든 숫자
      value.slice(value.length - 4),
    ].join('-');
  }


  // 회원가입 정보 보내기

  const joinBtn = document.querySelector(".join-btn");

  joinBtn.onclick = () => {
    checkDuplicate();
  }

function userInfoData() {

    let joinInfo = {
        userPhone : $(".phone-id").val(),
        userPw : $(".phone-pw").val()
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/join",
        contentType: "application/json",
        data: JSON.stringify(joinInfo),
        dataType: "json",
        success: (response) => {
            console.log(response);
            alert("회원가입 완료!");
            alert("userId : " + joinInfo.userPhone + "\n" +
            "userPw : " + joinInfo.userPw);
            location.replace("/account/login");
        },
        error: (error) => {
            console.log(error);
            alert("회원가입 실패!");
        }
    })
}

// 중복체크

function checkDuplicate() {

    let joinInfo = {
        userPhone : $(".phone-id").val()
    }

    $.ajax({
        async: false,
        type: "post",
        url: "/api/account/join/checkDuplicate",
        contentType: "application/json",
        data: JSON.stringify(joinInfo),
        dataType: "json",
        success: (response) => {
            console.log("joinInfo : ", joinInfo);
            alert("사용가능한 아이디입니다!");
            userInfoData();
        },
        error: (error) => {
            console.log(error);
            alert("이미 가입된 아이디입니다!");
        }
    });
}