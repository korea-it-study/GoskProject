package com.Gosk.GoskProject20221221.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ExitUserReqDto {
    private int userId;
    private LocalDateTime exitTime;
}
