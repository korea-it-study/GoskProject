package com.Gosk.GoskProject20221221.dto.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OnedayPriceRespDto {

    // table7 원데이 가격
    private int onedayTime;
    private int onedayPrice;
}
