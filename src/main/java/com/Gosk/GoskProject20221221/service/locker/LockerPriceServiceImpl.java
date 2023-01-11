package com.Gosk.GoskProject20221221.service.locker;

import com.Gosk.GoskProject20221221.domain.LockerPrice;
import com.Gosk.GoskProject20221221.domain.TimePrice;
import com.Gosk.GoskProject20221221.dto.Time.*;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceRespDto;
import com.Gosk.GoskProject20221221.exception.CustomValidationException;
import com.Gosk.GoskProject20221221.repository.LockerPriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class LockerPriceServiceImpl implements LockerPriceService {
    private final LockerPriceRepository lockerPrice;

    @Override // 사물함 상품 등록
    public boolean lockerPriceInsert(LockerPriceReqDto lockerPriceReqDto) throws Exception {
        LockerPrice lockerInsert = lockerPriceReqDto.toLockerPriceEntity();
        log.info("[LockerServiceImpl] 사물함 가격: {}", lockerInsert);
        int result11 = lockerPrice.lockerPriceInsert(lockerInsert);

        if(result11 == 0){
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table11", "table11 에러입니다");
            throw new CustomValidationException("error table11", errorMap);
        }
        return false;
    }

    @Override // 사물함 상품 리스트 가져오기
    public List<LockerPriceRespDto> getLockerPriceListSelect() throws Exception {
        List<LockerPriceRespDto> lockerPriceList = new ArrayList<LockerPriceRespDto>();

        lockerPrice.getLockerPriceListSelect().forEach(price -> {
            lockerPriceList.add(price.getLockerPriceEntity());
        });

        log.info("[LockerServiceImpl] Locker 상품리스트 성공");
        return lockerPriceList;
    }

    @Override // Table11 사물함 수정
    public boolean lockerPriceUpdate(LockerPriceReqDto lockerPriceReqDto) throws Exception {

        LockerPrice lockerUpdate = lockerPriceReqDto.toLockerPriceEntity();

        LockerPrice lockerUpPriceRespDto = LockerPrice.builder()
                .locker_price_id(lockerUpdate.getLocker_price_id())
                .locker_time(lockerUpdate.getLocker_time())
                .locker_price(lockerUpdate.getLocker_price())
                .build();

        log.info("[LockerServiceImpl] Locker 수정가격: {}", lockerUpPriceRespDto);
        int resultUD11 = lockerPrice.lockerPriceUpdate(lockerUpPriceRespDto);

        if(resultUD11 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table7", "UPDATE table7 에러입니다");
            throw new CustomValidationException("error resultUD11", errorMap);
        }
        return false;
    }


    @Override
    public boolean lockerPriceDelete(int locker_price_id) throws Exception {
        if(lockerPrice.lockerPriceDelete(locker_price_id) > 0){
            return true;
        }
        return false;
    }
}
