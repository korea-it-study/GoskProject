package com.Gosk.GoskProject20221221.domain.seat;

import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Builder
public class Seat {
    private String seat_id;
    private int user_id;
    private LocalDateTime seat_start_time;
    private String seat_total_time;

}
