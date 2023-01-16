package com.Gosk.GoskProject20221221.service.move;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;

import java.util.Map;


public interface MoveService {

    public LockerRespDto getLockerDetail(String lockerId);
    public int MoveLocker(Map<String, String > map);
    public int moveSeat(Map<String, String > map);
    public int moveSpecial(Map<String, String > map);
    }


