package com.Gosk.GoskProject20221221.dto.seat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ReservedSeatRespDto {
    private String reservedSeatId;
    private int userId;
    private LocalDateTime reservedStartTime;
    private LocalDateTime reservedTotalTime;
}
