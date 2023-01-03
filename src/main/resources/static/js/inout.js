// 홈으로 버튼 index로 보내기

$('.index-btn').click(function(){
    alert(1);
    location.href = "/index";
    localStorage.clear();
});


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

        $.ajax({
            async: false,
            type: "get",
            url: "/api/",
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
        let inRespData = InApi.getInstance().getInData();

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