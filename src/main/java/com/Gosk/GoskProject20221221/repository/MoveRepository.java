package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.dto.seat.LockerRespDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MoveRepository {
    public LockerRespDto getLockerDetail(String lockerId);
    public int MoveLocker(String lockerId);
}
