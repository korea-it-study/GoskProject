package com.Gosk.GoskProject20221221.dto.locker;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.LockerPrice;
import com.Gosk.GoskProject20221221.domain.TimePrice;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LockerPriceReqDto {

    // table11 원데이 가격
    private int lockerPriceId;
    private int lockerTime;
    private int lockerPrice;

    public LockerPrice toLockerPriceEntity() {
        return LockerPrice.builder()
                .locker_price_id(lockerPriceId)
                .locker_time(lockerTime)
                .locker_price(lockerPrice)
                .build();
    }
}
