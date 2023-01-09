package com.Gosk.GoskProject20221221.domain;

import com.Gosk.GoskProject20221221.domain.user.User;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//allargs, noargs 왜 해주는 거임?????????????/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Locker {
    private String locker_id;
    private int user_id;
    private User user;
    private LocalDateTime locker_start_time;
    private String locker_end_time;


    public LockerRespDto toLockerRespDto(){
        return LockerRespDto.builder()
                .userId(user_id)
                .lockerEndTime(locker_end_time)
                .userPhone(user.getUser_phone())
                .build();
    }
    public LockerRespDto toLockerResp(){
        return LockerRespDto.builder()
                .lockerId(locker_id)
                .userId(user_id)
                .build();
    }
}
