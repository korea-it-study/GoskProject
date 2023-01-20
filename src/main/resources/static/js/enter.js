// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
//    alert(1);
    location.href = "/index";
    localStorage.clear();
});

const inInfo = document.querySelector(".in-info");
// 입실

class InApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InApi();
        }
        return this.#instance;
    }

    getInData() {
        let inRespData = null;
        let principal = getPrincipal();

        $.ajax({
            async: false,
            type: "get",
            url: "/api/in/" + principal.user.user_id,
            dataType: "json",
            success: (response) => {
                inRespData = response.data;

                console.log(inRespData);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return inRespData;
    }

    loadInData() {
        return InApi.getInstance().getInData();

    }
}



window.onload = () => {
    // seat 선택하고 나서
    if(document.referrer.includes("seat")){
        let inApi = InApi.getInstance();
        let resp = inApi.loadInData();
        let time = 0;
        //기간제, 시간권
        if(resp.receiptKinds === "시간권"){
            inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>입실(현재)시간</p>
            <span>${new Date().toLocaleTimeString()}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>시간권 ${resp.receiptTime} 시간 </span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>남은 시간</p>
            <span>${resp.leftTime}<span>
            <span class="close"></span>
        </li>
        <li>
            <p><i class="fa-solid fa-chair"></i>입장좌석</p>
            <div>${localStorage.getItem("pickSeat")}</div>
        </li>
        `;

        }else{
            inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>입실(현재)시간</p>
            <span>${new Date().toLocaleTimeString()}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>기간권 ${resp.receiptDay} 주</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>종료일자</p>
            <span>${resp.userDate.substring(0,10)}<span>
            <span class="close"></span>
        </li>
        <li>
            <p><i class="fa-solid fa-chair"></i>입장좌석</p>
            <div>${localStorage.getItem("pickSeat")}</div>
        </li>
        `;
        }


    }else{
        let inApi = InApi.getInstance();
        let resp = inApi.loadInData();//해당 계정의 좌석이 없으면 -> 이용 좌석이 없습니다. -> 로그아웃

        if(resp.receiptKinds === null){
            alert("이용중인 좌석이 없습니다.");
            location.replace("/index");
        }else if(resp.receiptKinds === "원데이" || resp.receiptKinds ==="지정석") {
            alert("그냥 입실하십시오");
            location.replace("/index");
        }else if(resp.seatId != null){
            inInfo.innerHTML = ""; //이미 입실한 사람

        }else if(resp.seatTotalTime !== null){//오늘 퇴실예정시간인 사람
            localStorage.setItem("userId",resp.userId);
            localStorage.setItem("seatTotalTime",resp.seatTotalTime);
            location.href = "/seat";
        }else {//시간 많이 남은 사람
            localStorage.setItem("userId",resp.userId);
            localStorage.setItem("seatTotalTime","non");
            location.href = "/seat";
        }

    }

}