package com.Gosk.GoskProject20221221.service.repair;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;

import java.util.List;

public interface RepairService {

    public int repairSpecial(List<String> arr);
    public int offRepairSpecial(List<String> arr);
    public int repairBasic(List<String> arr);
    public int offRepairBasic(List<String> arr);
    public int repairLocker(List<String> arr);
    public int offRepairLocker(List<String> arr);
}
