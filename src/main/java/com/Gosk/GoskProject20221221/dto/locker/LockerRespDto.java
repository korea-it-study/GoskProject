package com.Gosk.GoskProject20221221.dto.locker;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class LockerRespDto {
    private int userId;

    private LocalDateTime lockerEndTime;
}
