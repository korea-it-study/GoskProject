package com.Gosk.GoskProject20221221.service.inout;

import com.Gosk.GoskProject20221221.dto.User.InInfoRespDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;

import java.util.List;

public interface InoutService {


    public InInfoRespDto getInfo(int user_id);

}
