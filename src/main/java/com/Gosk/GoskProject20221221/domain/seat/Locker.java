package com.Gosk.GoskProject20221221.domain.seat;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Locker {
    private String locker_id;
    private int user_id;
    private LocalDateTime locker_start_time;
    private String locker_end_time;
}
