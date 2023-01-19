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

public class InOutReqDto {

    private int userId;

    private String pickSeat; //in시 선택한 seat , out시 사용한 seat
    private LocalDateTime seatStartTime = LocalDateTime.now();
    private LocalDateTime seatTotalTime;


    private int userTime; // 남은 시간 초


}
