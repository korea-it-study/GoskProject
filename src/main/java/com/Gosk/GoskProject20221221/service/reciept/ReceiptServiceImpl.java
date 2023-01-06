package com.Gosk.GoskProject20221221.service.reciept;

import com.Gosk.GoskProject20221221.domain.Receipt;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptRespDto;
import com.Gosk.GoskProject20221221.exception.CustomValidationException;
import com.Gosk.GoskProject20221221.repository.ReceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<ReceiptRespDto> getReceiptList(int userId) throws Exception {

        List<ReceiptRespDto> receiptList = new ArrayList<>();

        receiptRepository.getReceipt(userId).forEach(receipt -> {
            receiptList.add(receipt.toReceiptGetList());
        });

        return receiptList;
    }
}
