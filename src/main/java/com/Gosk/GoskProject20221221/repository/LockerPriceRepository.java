package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.LockerPrice;
import com.Gosk.GoskProject20221221.domain.TimePrice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LockerPriceRepository {
    // Table11 상품 등록
    public int lockerPriceInsert(LockerPrice locker_price);

    // Table11 상품 조회
    public List<LockerPrice> getLockerPriceListSelect() throws Exception;

    // Table11 상품 수정
    public int lockerPriceUpdate(LockerPrice locker_price) throws Exception;

    // Table11 상품 삭제
    public int lockerPriceDelete(int locker_price_id) throws Exception;

}
