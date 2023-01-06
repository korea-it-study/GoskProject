package com.Gosk.GoskProject20221221.service.move;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;


public interface MoveService {

    public LockerRespDto getLockerDetail(String lockerId);
    public int MoveLocker(String lockerId);
    }


