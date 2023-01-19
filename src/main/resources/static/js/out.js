// 홈으로 버튼 index로 보내기



const inInfo = document.querySelector(".in-info");
const inOutFooter = document.querySelector(".inout-footer");
const inOutHeader = document.querySelector(".inout-header");
const exitBtn = document.querySelector(".out-btn");
const realExitBtn = document.querySelector(".real-exit-btn");
const indexBtn = document.querySelector(".index-btn");


// 입실

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
        let principal = getPrincipal();

        $.ajax({
            async: false,
            type: "get",
            url: "/api/out/" + principal.user.user_id,
            dataType: "json",
            success: (response) => {
                outRespData = response.data;

                console.log(outRespData);
            },
            error: (error) => {
                console.log(error);
            }
        });

        return outRespData;
    }

    loadInOutData() {
        return OutApi.getInstance().getOutData();

    }
}


// 퇴실


window.onload = () => {
        let outApi = OutApi.getInstance();
        let resp = outApi.loadInOutData();//해당 계정의 좌석이 없으면 -> 이용 좌석이 없습니다. -> 로그아웃
        let now = new Date().toLocaleTimeString();
        //기간제, 시간권

        if(resp.receiptKinds === null){
            alert("이용권이 없습니다.");
            location.replace("/index");

        }else if (resp.receiptKinds === "원데이" || resp.receiptKinds === "지정석"){
            exitBtn.classList.add("invisible");
            let time = resp.seatTotalTime.substring(resp.seatTotalTime.indexOf("T") + 1,resp.seatTotalTime.indexOf("T") + 2);
            if(time > 22 || time < 10){
                resp.seatTotalTime = resp.seatTotalTime.substring(0,10) + " 22:00:00";
            }

            inInfo.innerHTML = `
            <li>
            <p><i class="fa-regular fa-clock"></i>퇴실(현재)시간</p>
            <span>${now}</span>
            </li>
            
            <li>
                <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
                <span>${resp.receiptKinds} ${resp.receiptTime > 0 ?  resp.receiptTime + "시간" : resp.receiptDay + "주"}</span>
            </li>
            
            <li class="close">
                <p><i class="fa-regular fa-calendar-xmark"></i>종료예정</p>
                <span>${resp.reservedTotalTime != null ? resp.reservedTotalTime.substring(0,10) :resp.seatTotalTime}<span>
                <span class="close"></span>
            </li>
            
            <li>
                <p><i class="fa-solid fa-chair"></i>이용좌석</p>
                <div>${resp.seatId != null ? resp.seatId : resp.reservedSeatId}</div>
            </li>
            `;

        }else if (resp.receiptKinds === "시간권"){
            //입실 안하고 퇴실 클릭
            if(resp.seatId === null){
                exitBtn.classList.add("invisible");
                inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>퇴실(현재)시간</p>
            <span>${now}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>시간권 ${resp.receiptTime} 시간</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>남은 시간</p>
            <span>${resp.leftTime}<span>
            <span class="close"></span>
        </li>
        `;
            }else{
                inInfo.innerHTML = `
        <li>
            <p><i class="fa-regular fa-clock"></i>퇴실(현재)시간</p>
            <span>${now}</span>
        </li>
        <li>
            <p><i class="fa-solid fa-hourglass-half"></i>구매권</p>
            <span>시간권 ${resp.receiptTime} 시간</span>
        </li>
        <li class="close">
            <p><i class="fa-regular fa-calendar-xmark"></i>남은 시간</p>
            <span>${resp.leftTime}<span>
            <span class="close"></span>
            
        </li>
        
        <li>
            <p><i class="fa-solid fa-chair"></i>이용좌석</p>
            <div>${resp.seatId}</div>
        </li>
        `;
            }


            //기간권
        }else{
            //입실 안하고 퇴실시
            if(resp.seatId === null){
                exitBtn.classList.add("invisible");
                inInfo.innerHTML = `
         <li>
            <p><i class="fa-regular fa-clock"></i>퇴실(현재)시간</p>
            <span>${now}</span>
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
                
        `;
            }else{
                inInfo.innerHTML = `
         <li>
            <p><i class="fa-regular fa-clock"></i>퇴실(현재)시간</p>
            <span>${now}</span>
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
            <p><i class="fa-solid fa-chair"></i>이용좌석</p>
            <div>${resp.seatId}</div>
        </li>                    
                
        `;
            }


        }
        indexBtn.onclick = () => {
            alert(1);
            location.href = "/index";
            localStorage.clear();
        }


        //이용권 종료
        realExitBtn.onclick = () => {
            if(confirm("이용권을 종료하십니까? 기간권 및 시간권의 잔여 시간이 완전히 사라집니다.")){
                let url = "";
                if(resp.receiptKinds === "원데이"){
                    url = "/api/terminate/oneday/" + resp.userId;
                    ExitReq(url,"");
                }else if(resp.receiptKinds === "지정석") {
                    url = "/api/terminate/reserved/" + resp.userId;
                    ExitReq(url,"");
                }else {
                    url = "/api/terminate/commutation/" + resp.userId;
                    ExitReq(url, "");
                }
            }

        }

        //일반퇴실
        exitBtn.onclick = () => {
            // const afterUserSecond = document.querySelector(".after-user-second");
            let url = "";
            let data = null;

            if(resp.receiptKinds === "시간권"){
                url = "/api/out/time";
                data = {
                    userId:resp.userId,
                    userTime:resp.afterUserSecond,
                    pickSeat : resp.seatId
                };
                ExitReq(url,data);

            }else{
                url = "/api/out/day";
                data = {
                    userId:resp.userId,
                    pickSeat : resp.seatId
                };
                ExitReq(url, data);

            }
        }
}


function ExitReq(url,data){
    let responseData= null;
    $.ajax({
        async: false,
        type: "put",
        url : url,
        data:JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: (response) => {
            if(response.data){
                alert("퇴실성공");
                location.replace("/index");

            }else{
                alert("퇴실실패");
                location.replace("/index");
            }
        },
        error: (error) => {
            console.log(error);
        }

    });
    return responseData;
}