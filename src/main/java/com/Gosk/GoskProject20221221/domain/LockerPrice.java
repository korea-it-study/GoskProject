package com.Gosk.GoskProject20221221.domain;

import com.Gosk.GoskProject20221221.dto.Time.CommuterDpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterTpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.OnedayPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.ReservedPriceRespDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LockerPrice {
    // Table11 사물함 가격(locker_price_mst)
    private int locker_price_id;
    private int locker_time;
    private int locker_price;

    public LockerPriceRespDto getLockerPriceEntity(){
        return LockerPriceRespDto.builder()
                .lockerPriceId(locker_price_id)
                .lockerTime(locker_time)
                .lockerPrice(locker_price)
                .build();
    }
}
