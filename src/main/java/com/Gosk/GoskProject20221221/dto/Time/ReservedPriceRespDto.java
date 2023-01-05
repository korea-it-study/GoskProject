package com.Gosk.GoskProject20221221.dto.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReservedPriceRespDto {
    // table10 지정석
    private int reservedPriceId;
    private int reservedTime;
    private int reservedPrice;

}
