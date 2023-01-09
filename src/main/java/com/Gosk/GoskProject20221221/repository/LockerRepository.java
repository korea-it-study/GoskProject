package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LockerRepository {
    public List<Locker> getLocker();
    public String getUserLocker(int userId);
    public int repairReq(List<String> arr);
    public int offRepair(List<String> arr);
}
