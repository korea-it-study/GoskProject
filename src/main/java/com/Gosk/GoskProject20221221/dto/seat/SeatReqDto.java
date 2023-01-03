package com.Gosk.GoskProject20221221.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SeatReqDto {
    private String seatId;
    private int userId;
    private LocalDateTime seatStartTime;
    private LocalDateTime seatTotalTime;
}
