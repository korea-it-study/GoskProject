package com.Gosk.GoskProject20221221.dto.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CommuterDpPriceRespDto {

    // table9 정액권 기간
    private int commuterDpTime;
    private int commuterDpPrice;
}
