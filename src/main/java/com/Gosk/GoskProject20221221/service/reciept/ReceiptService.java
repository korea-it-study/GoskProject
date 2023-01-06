package com.Gosk.GoskProject20221221.service.reciept;

import com.Gosk.GoskProject20221221.domain.Receipt;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptRespDto;

import java.util.List;

public interface ReceiptService {

    public boolean payReceipt(ReceiptReqDto receiptReqDto) throws Exception;

    public List<ReceiptRespDto> getReceiptList(int userId) throws Exception;
}
