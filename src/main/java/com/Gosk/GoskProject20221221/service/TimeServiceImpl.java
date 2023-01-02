package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import com.Gosk.GoskProject20221221.dto.TimePriceReqDto;
import com.Gosk.GoskProject20221221.repository.TimePriceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimeServiceImpl implements TimeService {
    private final TimePriceRepository timePrice;

    @Override
    public boolean onedayPrice(TimePriceReqDto timePriceReqDto) throws Exception {
        // Table7 원데이 가격(oneday_price_mst)
        TimePrice onedayPrice = timePriceReqDto.toOnedayPriceEntity();
        log.info("[TimeServiceImpl] 원데이 가격: {}", onedayPrice);
        int result7 = timePrice.onedayPriceInsert(onedayPrice);

        if(result7 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            log.info("[TimeServiceImpl] 에러7! 페이지 만들어야함");
//            throw new CustomInternalServerErrorException("상품 등록 실패"); //e.getMessage가 상품등록실패뜸
        }
        return false;
    }

    @Override
    public boolean commuterTpPrice(TimePriceReqDto timePriceReqDto) throws Exception {
        // table8 정액권 시간(commuter_tp_price_mst)
        TimePrice commuterTpPrice = timePriceReqDto.toCommuterTpPriceEntity();
        log.info("[TimeServiceImpl] 정액제 시간 가격: {}", commuterTpPrice);
        int result8 = timePrice.commuterTpPriceInsert(commuterTpPrice);

        if(result8 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            log.info("[TimeServiceImpl] 에러8! 페이지 만들어야함");
        }
        return false;
    }

    @Override
    public boolean commuterDpPrice(TimePriceReqDto timePriceReqDto) throws Exception {
        // table9 정액권 기간(commuter_Dp_price_mst)
        TimePrice commuterDpPrice = timePriceReqDto.toCommuterDpPriceEntity();
        log.info("[TimeServiceImpl] 정액제 시간 가격: {}", commuterDpPrice);
        int result9 = timePrice.commuterDpPriceInsert(commuterDpPrice);

        if(result9 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            log.info("[TimeServiceImpl] 에러9! 페이지 만들어야함");
        }
        return false;
    }

    @Override
    public boolean reservedPrice(TimePriceReqDto timePriceReqDto) throws Exception {
        // table10 지정석(reserved_price_mst)
        TimePrice reservedPrice = timePriceReqDto.toReservedPriceEntity();
        log.info("[TimeServiceImpl] 지정석 가격: {}", reservedPrice);
        int result10 = timePrice.reservedPriceInsert(reservedPrice);

        if(result10 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            log.info("[TimeServiceImpl] 에러10! 페이지 만들어야함");
        }
        return false;
    }
}
