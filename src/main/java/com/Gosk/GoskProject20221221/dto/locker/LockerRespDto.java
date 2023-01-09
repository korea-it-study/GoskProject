package com.Gosk.GoskProject20221221.dto.locker;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LockerRespDto {
    private String lockerId;
    private int userId;
    private String userPhone;
    private String lockerEndTime;
}
