package com.Gosk.GoskProject20221221.domain;

import com.Gosk.GoskProject20221221.dto.Time.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TimePrice {
    // Table7 원데이 가격(oneday_price_mst)
    private int oneday_price_id;
    private int oneday_time;
    private int oneday_price;

    public OnedayPriceRespDto getOnedayPriceEntity(){
        return OnedayPriceRespDto.builder()
                .onedayPriceId(oneday_price_id)
                .onedayTime(oneday_time)
                .onedayPrice(oneday_price)
                .build();
    }

    // table8 정액권 시간
    private int commuter_tp_id;
    private int commuter_tp_time;
    private int commuter_tp_price;

    public CommuterTpRespDto getCommuterTpEntity(){
        return CommuterTpRespDto.builder()
                .commuterTpId(commuter_tp_id)
                .commuterTpTime(commuter_tp_time)
                .commuterTpPrice(commuter_tp_price)
                .build();
    }

    // table9 정액권 기간
    private int commuter_dp_id;
    private int commuter_dp_time;
    private int commuter_dp_price;

    public CommuterDpRespDto getCommuterDpEntity(){
        return CommuterDpRespDto.builder()
                .commuterDpId(commuter_dp_id)
                .commuterDpTime(commuter_dp_time)
                .commuterDpPrice(commuter_dp_price)
                .build();
    }

    // table10 지정석
    private int reserved_price_id;
    private int reserved_time;
    private int reserved_price;

    public ReservedPriceRespDto getReservedPriceEntity() {
        return ReservedPriceRespDto.builder()
                .reservedPriceId(reserved_price_id)
                .reservedTime(reserved_time)
                .reservedPrice(reserved_price)
                .build();
    }
}
