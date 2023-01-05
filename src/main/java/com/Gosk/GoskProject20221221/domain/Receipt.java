package com.Gosk.GoskProject20221221.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class Receipt {
    private int receipt_id;
    private int user_id;
    private String receipt_kinds;
    private int receipt_price;
    private String receipt_time;
    private String receipt_day;
    private LocalDateTime receipt_create_date;

}
