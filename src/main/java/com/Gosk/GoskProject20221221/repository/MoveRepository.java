package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MoveRepository {
    public Locker getLockerDetail(String lockerId);
    public int moveLocker(Map<String, String > map);
    public int moveSeat(Map<String, String > map);
    public int moveSpecial(Map<String, String > map);
}
