package com.Gosk.GoskProject20221221.service.inout;

import com.Gosk.GoskProject20221221.dto.User.InOutInfoRespDto;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;


public interface InoutService {

    //입실, 퇴실 정보 가져오기
    public InOutInfoRespDto getInInfo(int user_id);
    public InOutInfoRespDto getOutInfo(int user_id);


    //이용권 종료
    public boolean terminateOnday(int userId);
    public boolean terminateReserved(int userId);
    public boolean terminateCommutation(int userId);


    //일반 퇴실
    public boolean exitTime(InOutReqDto inOutReqDto);
    public boolean exitDay(InOutReqDto inOutReqDto);

}
