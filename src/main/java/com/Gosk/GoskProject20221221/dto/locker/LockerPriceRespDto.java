package com.Gosk.GoskProject20221221.dto.locker;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class LockerPriceRespDto {

    // table11 사물함 가격
    private int lockerPriceId;
    private int lockerTime;
    private int lockerPrice;
}
