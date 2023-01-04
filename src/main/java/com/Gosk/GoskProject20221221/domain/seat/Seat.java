package com.Gosk.GoskProject20221221.domain.seat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
public class Seat {
    private String seat_id;
    private int user_id;
    private LocalDateTime seat_start_time;
    private String seat_total_time;
}
