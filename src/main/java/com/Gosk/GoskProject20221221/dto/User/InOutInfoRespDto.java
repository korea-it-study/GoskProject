package com.Gosk.GoskProject20221221.dto.User;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class InOutInfoRespDto {



    private int userId;
    private Integer userTime;
    private LocalDateTime userDate;
    private String seatId;
    private LocalDateTime seatTotalTime;
    private String reservedSeatId;
    private LocalDateTime reservedTotalTime;
    private String receiptKinds;
    private int receiptTime;
    private int receiptDay;
    private String leftTime;



    private String seatStartTime;
    private int afterUserSecond;


}
