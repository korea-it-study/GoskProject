package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TimePriceRepository {
    // Table7~10 상품 등록
    public int onedayPriceInsert(TimePrice oneday_price);
    public int commuterTpPriceInsert(TimePrice commuter_tp_price);
    public int commuterDpPriceInsert(TimePrice commuter_dp_price);
    public int reservedPriceInsert(TimePrice reserved_price);
    
    // Table7~10 상품 조회
    public List<TimePrice> getOnedayPriceListSelect() throws Exception;
    public List<TimePrice> getCommuterTpPriceListSelect() throws Exception;
    public List<TimePrice> getCommuterDpPriceListSelect() throws Exception;
    public List<TimePrice> getReservedPriceListSelect() throws Exception;

}
