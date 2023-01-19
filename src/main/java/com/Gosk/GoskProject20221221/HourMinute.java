package com.Gosk.GoskProject20221221;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class HourMinute {
    int hour;
    int minute;
    int second;
}
