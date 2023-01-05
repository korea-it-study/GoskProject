package com.Gosk.GoskProject20221221.service.reciept;

import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;

public interface ReceiptService {

    public boolean payReceipt(ReceiptReqDto receiptReqDto) throws Exception;
}
