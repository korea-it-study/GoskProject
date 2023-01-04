package com.Gosk.GoskProject20221221.dto.seat;

import com.Gosk.GoskProject20221221.domain.seat.Seat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class SeatRespDto {
    private String seatId;
    private int userId;
    private LocalDateTime seatStartTime;
    private LocalDateTime seatTotalTime;

}
