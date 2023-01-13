package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LockerRepository {
    public List<Locker> getAllLocker();
    public List<String > getUseLocker();
    public List<String> getUsableLocker();

    public String getUserLocker(int userId);


    public int insertLocker(List<String> arr);
}
