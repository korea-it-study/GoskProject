package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.TimePriceReqDto;

public interface TimeService {
    public boolean onedayPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterTpPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean commuterDpPrice(TimePriceReqDto timePriceReqDto) throws Exception;
    public boolean reservedPrice(TimePriceReqDto timePriceReqDto) throws Exception;
}
