package com.Gosk.GoskProject20221221.domain.seat;

import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ReservedSeat {
    private String reserved_seat_id;
    private int user_id;
    private LocalDateTime reserved_start_time;
    private String reserved_total_time;

    public ReservedSeatRespDto toRespDto() {
        return ReservedSeatRespDto.builder()
                .reservedSeatId(reserved_seat_id)
                .seatId(reserved_seat_id)
                .userId(user_id)
                .build();
    }
}
