package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RepairRepository {

    public int repairSpecialReq(List<String> arr);
    public int offRepairSpecial(List<String> arr);
    public int repairBasicReq(List<String> arr);
    public int offRepairBasic(List<String> arr);
}
