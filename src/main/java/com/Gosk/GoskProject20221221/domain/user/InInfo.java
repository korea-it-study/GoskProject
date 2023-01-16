package com.Gosk.GoskProject20221221.domain.user;

import com.Gosk.GoskProject20221221.dto.User.InInfoRespDto;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class InInfo {

    private int user_id;
    private Integer user_time;
    private LocalDateTime user_date;
    private String seat_id;
    private LocalDateTime seat_total_time;
    private String reserved_seat_id;
    private LocalDateTime reserved_total_time;
    private String receipt_kinds;
    private int receipt_time;
    private int receipt_day;


//    um.user_id,
//    um.user_time,
//    um.user_date,
//    sm.seat_id,
//    sm.seat_total_time,
//    rm.reserved_seat_id,
//    rm.reserved_total_time,
//    cm.receipt_kinds,
//    cm.receipt_time,
//    cm.receipt_day

    public InInfoRespDto toInInfoRespDto(){
        return InInfoRespDto.builder()
                .userId(user_id)
                .userTime(user_time)
                .userDate(user_date)
                .seatId(seat_id)
                .seatTotalTime(seat_total_time)
                .reservedSeatId(reserved_seat_id)
                .reservedTotalTime(reserved_total_time)
                .receiptKinds(receipt_kinds)
                .receiptTime(receipt_time)
                .receiptDay(receipt_day)
                .build();
    }
}
