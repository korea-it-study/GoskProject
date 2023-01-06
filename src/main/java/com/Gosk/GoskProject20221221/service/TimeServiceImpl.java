package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import com.Gosk.GoskProject20221221.dto.Time.*;
import com.Gosk.GoskProject20221221.exception.CustomValidationException;
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
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table7", "table7 에러입니다");
            throw new CustomValidationException("error table7", errorMap);
        }
        return false;
    }

    @Override
    public boolean commuterTp(TimePriceReqDto timePriceReqDto) throws Exception {
        // table8 정액권 시간(commuter_tp_price_mst)
        TimePrice commuterTp = timePriceReqDto.toCommuterTpEntity();
        log.info("[TimeServiceImpl] 정액제 시간 가격: {}", commuterTp);
        int result8 = timePrice.commuterTpInsert(commuterTp);

        if(result8 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table8", "table8 에러입니다");
            throw new CustomValidationException("error table8", errorMap);
        }
        return false;
    }

    @Override
    public boolean commuterDp(TimePriceReqDto timePriceReqDto) throws Exception {
        // table9 정액권 기간(commuter_Dp_price_mst)
        TimePrice commuterDp = timePriceReqDto.toCommuterDpEntity();
        log.info("[TimeServiceImpl] 정액제 시간 가격: {}", commuterDp);
        int result9 = timePrice.commuterDpInsert(commuterDp);

        if(result9 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table9", "table9 에러입니다");
            throw new CustomValidationException("error table9", errorMap);
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
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table10", "table10 에러입니다");
            throw new CustomValidationException("error table10", errorMap);
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
    public List<CommuterTpRespDto> getCommuterTpListSelect() throws Exception {
        // 정액 시간제 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<CommuterTpRespDto> commuterTpPriceList = new ArrayList<CommuterTpRespDto>();

        timePrice.getCommuterTpListSelect().forEach(timePrice -> {
            commuterTpPriceList.add(timePrice.getCommuterTpEntity());
        });

        log.info("[TimeServiceImpl] commuterTp 상품리스트 성공");
        return commuterTpPriceList;
    }

    @Override
    public List<CommuterDpRespDto> getCommuterDpListSelect() throws Exception {
        // 정액 기간제 상품 리스트 가져오기
        Map<String, Object> paramsMap = new HashMap<String, Object>();
        List<CommuterDpRespDto> commuterDpPriceList = new ArrayList<CommuterDpRespDto>();

        timePrice.getCommuterDpListSelect().forEach(timePrice -> {
            commuterDpPriceList.add(timePrice.getCommuterDpEntity());
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

        log.info("[TimeServiceImpl] reserved 상품리스트 성공");
        return reservedPriceList;
    }

    @Override
    public boolean onedayPriceUpdate(TimePriceReqDto timePriceReqDto) throws Exception {
        // Table7 원데이 가격(oneday_price_mst)
        TimePrice onedayPrice = timePriceReqDto.toOnedayPriceEntity();

        TimePrice onedayPriceRespDto = TimePrice.builder()
                .oneday_price_id(onedayPrice.getOneday_price_id())
                .oneday_time(onedayPrice.getOneday_time())
                .oneday_price(onedayPrice.getOneday_price())
                .build();

        log.info("[TimeServiceImpl] 원데이 수정가격: {}", onedayPriceRespDto);
        int resultUD7 = timePrice.onedayPriceUpdate(onedayPriceRespDto);

        if(resultUD7 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table7", "UPDATE table7 에러입니다");
            throw new CustomValidationException("error table7", errorMap);
        }
        return false;
    }

    @Override
    public boolean commuterTpUpdate(TimePriceReqDto timePriceReqDto) throws Exception {
        // Table8 정액권 시간 가격
        TimePrice commuterTpPrice = timePriceReqDto.toCommuterTpEntity();

        TimePrice commuterTpRespDto = TimePrice.builder()
                .commuter_tp_id(commuterTpPrice.getCommuter_tp_id())
                .commuter_tp_time(commuterTpPrice.getCommuter_tp_time())
                .commuter_tp_price(commuterTpPrice.getCommuter_tp_price())
                .build();

        log.info("[TimeServiceImpl] 정액권 시간 수정가격: {}", commuterTpRespDto);
        int resultUD8 = timePrice.commuterTpUpdate(commuterTpRespDto);

        if(resultUD8 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table8", "UPDATE table8 에러입니다");
            throw new CustomValidationException("error table8", errorMap);
        }
        return false;
    }

    @Override
    public boolean commuterDpUpdate(TimePriceReqDto timePriceReqDto) throws Exception {
        // Table9 정액권 기간 가격
        TimePrice commuterDpPrice = timePriceReqDto.toCommuterDpEntity();

        TimePrice commuterDpRespDto = TimePrice.builder()
                .commuter_dp_id(commuterDpPrice.getCommuter_dp_id())
                .commuter_dp_time(commuterDpPrice.getCommuter_dp_time())
                .commuter_dp_price(commuterDpPrice.getCommuter_dp_price())
                .build();

        log.info("[TimeServiceImpl] 정액권 기간 수정가격: {}", commuterDpRespDto);
        int resultUD9 = timePrice.commuterDpUpdate(commuterDpRespDto);

        if(resultUD9 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table9", "UPDATE table9 에러입니다");
            throw new CustomValidationException("error table9", errorMap);
        }
        return false;
    }

    @Override
    public boolean reservedPriceUpdate(TimePriceReqDto timePriceReqDto) throws Exception {
        // Table10 지정석 가격
        TimePrice reservedPrice = timePriceReqDto.toReservedPriceEntity();

        TimePrice reservedRespDto = TimePrice.builder()
                .reserved_price_id(reservedPrice.getReserved_price_id())
                .reserved_time(reservedPrice.getReserved_time())
                .reserved_price(reservedPrice.getReserved_price())
                .build();

        log.info("[TimeServiceImpl] 지정석 기간 수정가격: {}", reservedRespDto);
        int resultUD10 = timePrice.reservedPriceUpdate(reservedRespDto);

        if(resultUD10 == 0){ // 위에가 문제될 경우 resultCount가 0이되어 강제발생된다.
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("error table10", "UPDATE table10 에러입니다");
            throw new CustomValidationException("error table10", errorMap);
        }
        return false;
    }

    @Override
    public boolean onedayPriceDelete(int oneday_price_id) throws Exception {
        if(timePrice.onedayPriceDelete(oneday_price_id) > 0){
            return true;
        }
        return false;
    }

    @Override
    public boolean commuterTpDelete(int commuter_tp_id) throws Exception {
        if(timePrice.commuterTpDelete(commuter_tp_id) > 0){
            return true;
        }
        return false;
    }

    @Override
    public boolean commuterDpDelete(int commuter_dp_id) throws Exception {
        if(timePrice.commuterDpDelete(commuter_dp_id) > 0){
            return true;
        }
        return false;
    }

    @Override
    public boolean reservedPriceDelete(int reserved_price_id) throws Exception {
        if(timePrice.reservedPriceDelete(reserved_price_id) > 0){
            return true;
        }
        return false;
    }
}
