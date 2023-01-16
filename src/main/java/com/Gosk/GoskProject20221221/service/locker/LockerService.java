package com.Gosk.GoskProject20221221.service.locker;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;

import java.util.List;

public interface LockerService {

    public List<LockerRespDto> getAllLocker();
    public List<String> getUseLocker();
    public List<String> getUsableLocker();

    public String getUserLocker(int userId);


    public int insertLocker(List<String> arr);
}
