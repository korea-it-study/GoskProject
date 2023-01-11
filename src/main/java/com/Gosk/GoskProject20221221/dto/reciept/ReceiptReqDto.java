package com.Gosk.GoskProject20221221.dto.reciept;

import com.Gosk.GoskProject20221221.domain.Receipt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ReceiptReqDto {

    private int receiptId;
    private int userId;
    private String receiptKinds;
    private int receiptPrice;
    private int receiptTime;
    private int receiptDay;
    private String receiptCreateDate;


    public Receipt toReceiptEntity() {
        return Receipt.builder()
                .receipt_id(receiptId)
                .user_id(userId)
                .receipt_kinds(receiptKinds)
                .receipt_price(receiptPrice)
                .receipt_time(receiptTime)
                .receipt_day(receiptDay)
                .receipt_create_date(receiptCreateDate)
                .build();
    }
}
