package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import com.Gosk.GoskProject20221221.dto.Time.*;
import com.Gosk.GoskProject20221221.repository.TimePriceRepository;
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

    @Override
    public List<OnedayPriceRespDto> getOnedayPriceListSelect() throws Exception {
        // 원데이 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<OnedayPriceRespDto> onedayPriceList = new ArrayList<OnedayPriceRespDto>();

        timePrice.getOnedayPriceListSelect().forEach(timePrice -> {
            onedayPriceList.add(timePrice.getOnedayPriceEntity());
        });

        log.info("[TimeServiceImpl] Oneday 상품리스트 성공");
        return onedayPriceList;
    }

    @Override
    public List<CommuterTpPriceRespDto> getCommuterTpPriceListSelect() throws Exception {
        // 정액 시간제 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<CommuterTpPriceRespDto> commuterTpPriceList = new ArrayList<CommuterTpPriceRespDto>();

        timePrice.getCommuterTpPriceListSelect().forEach(timePrice -> {
            commuterTpPriceList.add(timePrice.getCommuterTpPriceEntity());
        });

        log.info("[TimeServiceImpl] commuterTp 상품리스트 성공");
        return commuterTpPriceList;
    }

    @Override
    public List<CommuterDpPriceRespDto> getCommuterDpPriceListSelect() throws Exception {
        // 정액 기간제 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<CommuterDpPriceRespDto> commuterDpPriceList = new ArrayList<CommuterDpPriceRespDto>();

        timePrice.getCommuterDpPriceListSelect().forEach(timePrice -> {
            commuterDpPriceList.add(timePrice.getCommuterDpPriceEntity());
        });

        log.info("[TimeServiceImpl] commuterDp 상품리스트 성공");
        return commuterDpPriceList;
    }

    @Override
    public List<ReservedPriceRespDto> getReservedPriceListSelect() throws Exception {
        // 지정석 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<ReservedPriceRespDto> reservedPriceList = new ArrayList<ReservedPriceRespDto>();

        timePrice.getReservedPriceListSelect().forEach(timePrice -> {
            reservedPriceList.add(timePrice.getReservedPriceEntity());
        });

        log.info("[TimeServiceImpl] commuterDp 상품리스트 성공");
        return reservedPriceList;
    }

}
