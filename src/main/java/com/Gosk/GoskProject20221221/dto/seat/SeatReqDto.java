package com.Gosk.GoskProject20221221.dto.seat;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
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

    public Seat toSeatEntity() {
        return Seat.builder()
                .seat_id(seatId)
                .user_id(userId)
                .seat_start_time(seatStartTime)
                .seat_total_time(seatTotalTime)
                .build();
    }

}
