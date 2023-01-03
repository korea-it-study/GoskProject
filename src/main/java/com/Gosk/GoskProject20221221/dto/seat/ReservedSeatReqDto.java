package com.Gosk.GoskProject20221221.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ReservedSeatReqDto {
    private String reservedSeatId;
    private int userId;
    private LocalDateTime reservedStartTime;
    private LocalDateTime reservedTotalTime;
}
