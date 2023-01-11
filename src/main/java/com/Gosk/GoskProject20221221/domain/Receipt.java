package com.Gosk.GoskProject20221221.domain;

import com.Gosk.GoskProject20221221.dto.reciept.ReceiptRespDto;
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
    private int receipt_time;
    private int receipt_day;
    private int receipt_use;
    private String receipt_create_date;
    private int receipt_count;

    public ReceiptRespDto toReceiptGetList() {
        return ReceiptRespDto.builder()
                        .receiptId(receipt_id)
                        .userId(user_id)
                        .receiptKinds(receipt_kinds)
                        .receiptPrice(receipt_price)
                        .receiptTime(receipt_time)
                        .receiptDay(receipt_day)
                        .receiptUse(receipt_use)
                        .receiptCreateDate(receipt_create_date)
                        .build();
    }

    public ReceiptRespDto toSalesListEntity() {
        return ReceiptRespDto.builder()
                .receiptKinds(receipt_kinds)
                .receiptPrice(receipt_price)
                .receiptTime(receipt_time)
                .receiptDay(receipt_day)
                .receiptUse(receipt_use)
                .receiptCreateDate(receipt_create_date)
                .receiptCount(receipt_count)
                .build();
    }
}
