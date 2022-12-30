package com.Gosk.GoskProject20221221.domain;

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

    // table8 정액권 시간
    private int commuter_tp_id;
    private int commuter_tp_time;
    private int commuter_tp_price;

    // table9 정액권 기간
    private int commuter_dp_id;
    private int commuter_dp_time;
    private int commuter_dp_price;

    // table10 지정석
    private int reserved_price_id;
    private int reserved_time;
    private int reserved_price;


//    public DonateRespDto getDonateEntity(){
//        return DonateRespDto.builder()
//                .donateId(donate_id)
//                .userId(user_id)
//                .donateType(donate_type)
//                .donateArea(donate_area)
//                .donateAmount(donate_amount)
//                .createDate(create_date)
//                .build();
//    }
}
