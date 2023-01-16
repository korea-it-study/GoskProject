// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
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
            url: "/api/inout/" + principal.user.user_id,
            dataType: "json",
            success: (response) => {
                inRespData = response.data;
                if(inRespData.receiptKinds === null){
                    alert("이용중인 좌석이 없습니다.");
                    location.replace("/index");
                }else if(inRespData.receiptKinds === "정액권"){
                    location.replace("/seat");
                }
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


// 퇴실

class OutApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new OutApi();
        }
        return this.#instance;
    }

    getOutData() {
        let outRespData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/",
            dataType: "json",
            success: (response) => {
                outRespData = response.data;
                console.log(inRespData);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return outRespData;
    }

    loadOutData() {
        let outRespData = OutApi.getInstance().getOutData();

    }
}

window.onload = () => {
    let inApi = InApi.getInstance();
    let resp = inApi.loadInData();//해당 계정의 좌석이 없으면 -> 이용 좌석이 없습니다. -> 로그아웃
    let time = 0;
    if(resp.receiptKinds === "원데이"){
        if(!resp.seatTotalTime.substring(11, 13) < 22){
             time = "22:00";
        }else{
            time = resp.seatTotalTime.substring(11, 16);
        }
        inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>입실(현재)시간</p>
            <span>${new Date().toLocaleTimeString()}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>원데이 ${resp.receiptTime} 시간</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>종료일자</p>
            <span>${resp.seatTotalTime.substring(0,10)}<span>
            <span class="close">${time}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-chair"></i>입장좌석</p>
            <div>${resp.seatId}</div>
        </li>
        
        `;
    }else if(resp.receiptKinds === "지정석"){
        inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>입실(현재)시간</p>
            <span>${new Date().toLocaleTimeString()}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>지정석 ${resp.receiptDay} 주</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>종료일자</p>
            <span>${resp.reservedTotalTime.substring(0,10)}<span>
            <span class="close">22:00</span>
        </li>
        <li>
            <p><i class="fa-solid fa-chair"></i>입장좌석</p>
            <div>${resp.reservedSeatId}</div>
        </li>
        `;
    }else{
        //기간제, 시간권
        let text = resp.receiptDay = null ? "시간" : "주";
        inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>입실(현재)시간</p>
            <span>${new Date().toLocaleTimeString()}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>일반석 ${resp.receiptDay = null ? resp.receiptTime : resp.receiptDay} text</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>종료일자</p>
            <span>${resp.receiptDay}<span>
            <span class="close"></span>
        </li>
        <li>
            <p><i class="fa-solid fa-chair"></i>입장좌석</p>
            <div>${resp.seatId}</div>
        </li>
        `;
    }

}