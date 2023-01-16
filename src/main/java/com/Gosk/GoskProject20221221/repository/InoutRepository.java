package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.user.InInfo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InoutRepository {

    public InInfo getInfo(int user_id);

}
