package com.Gosk.GoskProject20221221.dto.seat;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ReservedSeatReqDto {
    private String reservedSeatId;
    private int userId;
    private LocalDateTime reservedStartTime;
    private LocalDateTime reservedTotalTime;

    public ReservedSeat toReservedEntity() {
        return ReservedSeat.builder()
                .reserved_seat_id(reservedSeatId)
                .user_id(userId)
                .reserved_start_time(reservedStartTime)
                .reserved_total_time(reservedTotalTime)
                .build();
    }
}
