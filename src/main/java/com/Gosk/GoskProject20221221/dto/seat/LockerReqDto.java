package com.Gosk.GoskProject20221221.dto.seat;

import com.Gosk.GoskProject20221221.domain.seat.Locker;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class LockerReqDto {
    private String lockerId;
    private int userId;

    private String lockerEndTime;


    public Locker toLockerEntity(){
        return Locker.builder()
                .locker_id(lockerId)
                .user_id(userId)
                .locker_end_time(lockerEndTime)
                .build();
    }
}
