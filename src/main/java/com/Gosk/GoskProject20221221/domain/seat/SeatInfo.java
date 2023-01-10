package com.Gosk.GoskProject20221221.domain.seat;

import com.Gosk.GoskProject20221221.dto.seat.SeatInfoRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.sql.Time;
import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatInfo {
    private int user_id;
    private LocalDateTime seat_total_time;
    private String user_phone;
    private int user_time;
    private LocalDateTime user_date;

    /*sm.user_id,
    sm.seat_total_time,
    um.user_phone,
    um.user_time,
    um.user_date*/
    public SeatInfoRespDto toSeatInfoRespDto(){
        return SeatInfoRespDto.builder()
                .userId(user_id)
                .userPhone(user_phone)
                .userDate(user_date)
                .build();
    }


}
