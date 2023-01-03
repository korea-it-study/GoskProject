package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.Time.*;

import java.util.List;

public interface TimeService {
    // 상품 등록
    public boolean onedayPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterTpPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterDpPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean reservedPrice(TimePriceReqDto timePriceReqDto) throws Exception;

    // 상품 조회
    public List<OnedayPriceRespDto> getOnedayPriceListSelect() throws Exception;
    public List<CommuterTpPriceRespDto> getCommuterTpPriceListSelect() throws Exception;
    public List<CommuterDpPriceRespDto> getCommuterDpPriceListSelect() throws Exception;
    public List<ReservedPriceRespDto> getReservedPriceListSelect() throws Exception;

}
