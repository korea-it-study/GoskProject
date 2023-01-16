package com.Gosk.GoskProject20221221.domain.seat;

import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Seat {
    private String seat_id;
    private int user_id;
    private LocalDateTime seat_start_time;
    private String seat_total_time;

    public SeatRespDto toSeatRespDto(){
        return SeatRespDto.builder()
                .seatId(seat_id)
                .userId(user_id)
                .build();
    }

}
