package com.Gosk.GoskProject20221221.dto;

import com.Gosk.GoskProject20221221.domain.TimePrice;
import lombok.Data;

@Data
public class TimePriceReqDto {

    // table7 원데이 가격
    private int onedayPriceId;
    private int onedayTime;
    private int onedayPrice;

    public TimePrice toOnedayPriceEntity() {
        return TimePrice.builder()
                .oneday_price_id(onedayPriceId)
                .oneday_time(onedayTime)
                .oneday_price(onedayPrice)
                .build();
    }

    // table8 정액권 시간
    private int commuterTpId;
    private int commuterTpTime;
    private int commuterTpPrice;

    public TimePrice toCommuterTpPriceEntity() {
        return TimePrice.builder()
                .commuter_tp_id(commuterTpId)
                .commuter_tp_time(commuterTpTime)
                .commuter_tp_price(commuterTpPrice)
                .build();
    }

    // table9 정액권 기간
    private int commuterDpId;
    private int commuterDpTime;
    private int commuterDpPrice;

    public TimePrice toCommuterDpPriceEntity() {
        return TimePrice.builder()
                .commuter_dp_id(commuterDpId)
                .commuter_dp_time(commuterDpTime)
                .commuter_dp_price(commuterDpPrice)
                .build();
    }

    // table10 지정석
    private int reservedPriceId;
    private int reservedTime;
    private int reservedPrice;

    public TimePrice toReservedPriceEntity() {
        return TimePrice.builder()
                .reserved_price_id(reservedPriceId)
                .reserved_time(reservedTime)
                .reserved_price(reservedPrice)
                .build();
    }

}
