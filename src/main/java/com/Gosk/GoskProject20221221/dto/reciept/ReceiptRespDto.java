package com.Gosk.GoskProject20221221.dto.reciept;

import com.Gosk.GoskProject20221221.domain.Receipt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ReceiptRespDto {
    private int receiptId;
    private int userId;
    private String receiptKinds;
    private int receiptPrice;
    private int receiptTime;
    private int receiptDay;
    private int receiptUse;
    private String receiptCreateDate;
    private int receiptCount;

}


