package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TimePriceRepository {
    // Table7~10 상품 등록
    public int onedayPriceInsert(TimePrice oneday_price);
    public int commuterTpPriceInsert(TimePrice commuter_tp_price);
    public int commuterDpPriceInsert(TimePrice commuter_dp_price);
    public int reservedPriceInsert(TimePrice reserved_price);
}
