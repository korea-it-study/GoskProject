package com.Gosk.GoskProject20221221.service.locker;

import com.Gosk.GoskProject20221221.dto.Time.*;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceRespDto;

import java.util.List;

public interface LockerPriceService {
    // 상품 등록
    public boolean lockerPriceInsert(LockerPriceReqDto lockerPriceReqDto) throws Exception;

    // 상품 조회
    public List<LockerPriceRespDto> getLockerPriceListSelect() throws Exception;

    // 상품 수정
    public boolean lockerPriceUpdate(LockerPriceReqDto lockerPriceReqDto) throws Exception;

    // 상품 삭제
    public boolean lockerPriceDelete(int locker_price_id) throws Exception;

}
