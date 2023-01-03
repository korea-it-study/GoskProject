package com.Gosk.GoskProject20221221.dto.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommuterTpPriceRespDto {

    // table8 정액권 시간
    private int commuterTpTime;
    private int commuterTpPrice;


}
