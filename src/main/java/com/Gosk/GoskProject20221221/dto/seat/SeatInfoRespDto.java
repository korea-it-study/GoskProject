package com.Gosk.GoskProject20221221.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Time;
import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class SeatInfoRespDto {
    private int userId;
    private String seatTotalTime;
    private String userPhone;
    private String userTime;
    private LocalDateTime userDate;
    private LocalDateTime reservedSeatTotalTime;

}
