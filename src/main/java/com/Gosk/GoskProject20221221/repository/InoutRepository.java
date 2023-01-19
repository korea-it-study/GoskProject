package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.user.InOutInfo;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InoutRepository {

    public InOutInfo getInInfo(int user_id);
    public int terminateOneday(int userId);
    public int terminateReserved(int userId);
    public int terminateCommutation(int userId);

    public int exitDay(InOutReqDto inOutReqDto);
    public int exitTime(InOutReqDto inOutReqDto);



}
