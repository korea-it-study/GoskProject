package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.Time.*;

import java.util.List;

public interface TimeService {
    // 상품 등록
    public boolean onedayPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterTp(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterDp(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean reservedPrice(TimePriceReqDto timePriceReqDto) throws Exception;

    // 상품 조회
    public List<OnedayPriceRespDto> getOnedayPriceListSelect() throws Exception;
    public List<CommuterTpRespDto> getCommuterTpListSelect() throws Exception;
    public List<CommuterDpRespDto> getCommuterDpListSelect() throws Exception;
    public List<ReservedPriceRespDto> getReservedPriceListSelect() throws Exception;

    // 상품 수정
    public boolean onedayPriceUpdate(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterTpUpdate(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterDpUpdate(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean reservedPriceUpdate(TimePriceReqDto timePriceReqDto) throws Exception;

}
