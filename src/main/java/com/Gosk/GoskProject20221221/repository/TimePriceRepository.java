package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TimePriceRepository {
    // Table7~10 상품 등록
    public int onedayPriceInsert(TimePrice oneday_price);
    public int commuterTpInsert(TimePrice commuter_tp_price);
    public int commuterDpInsert(TimePrice commuter_dp_price);
    public int reservedPriceInsert(TimePrice reserved_price);
    
    // Table7~10 상품 조회
    public List<TimePrice> getOnedayPriceListSelect() throws Exception;
    public List<TimePrice> getCommuterTpListSelect() throws Exception;
    public List<TimePrice> getCommuterDpListSelect() throws Exception;
    public List<TimePrice> getReservedPriceListSelect() throws Exception;

    // Table7~10 상품 수정
    public int onedayPriceUpdate(TimePrice oneday_price) throws Exception;
    public int commuterTpUpdate(TimePrice commuter_tp_price) throws Exception;
    public int commuterDpUpdate(TimePrice commuter_dp_price) throws Exception;
    public int reservedPriceUpdate(TimePrice reserved_price) throws Exception;
    
    // Table7~10 상품 삭제
    public int onedayPriceDelete(int oneday_price_id) throws Exception;
    public int commuterTpDelete(int commuter_tp_id) throws Exception;
    public int commuterDpDelete(int commuter_dp_id) throws Exception;
    public int reservedPriceDelete(int reserved_price_id) throws Exception;
}
