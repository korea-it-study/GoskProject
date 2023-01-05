package com.Gosk.GoskProject20221221.service.reciept;

import com.Gosk.GoskProject20221221.domain.Receipt;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;
import com.Gosk.GoskProject20221221.repository.ReceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Override
    public boolean payReceipt(ReceiptReqDto receiptReqDto) throws Exception {

        Receipt receiptEntity = receiptReqDto.toReceiptEntity();

        int result = receiptRepository.payReceipt(receiptEntity);

        if(result == 0) {
            System.out.println("payReceipt 에러!!!");
        }

        return false;
    }
}
