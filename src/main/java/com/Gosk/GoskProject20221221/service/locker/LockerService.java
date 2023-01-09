package com.Gosk.GoskProject20221221.service.locker;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;

import java.util.List;

public interface LockerService {

    public List<LockerRespDto> getLocker();
    public String getUserLocker(int userId);
    public int repairLocker(List<String> arr);
    public int offRepair(List<String> arr);
}
