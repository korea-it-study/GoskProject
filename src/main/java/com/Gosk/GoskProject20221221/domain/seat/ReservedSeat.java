package com.Gosk.GoskProject20221221.domain.seat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReservedSeat {
    private String reserved_seat_id;
    private int user_id;
    private LocalDateTime reserved_start_time;
    private LocalDateTime reserved_total_time;
}
