package com.Gosk.GoskProject20221221.controller.MyPage.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;
import com.Gosk.GoskProject20221221.repository.ReceiptRepository;
import com.Gosk.GoskProject20221221.service.reciept.ReceiptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/mypage")
@RestController
@RequiredArgsConstructor
public class MyPageApi {

    private ReceiptService receiptService;

    @PostMapping("/receipt")
    public ResponseEntity<?> payReceipt(@RequestBody ReceiptReqDto receiptReqDto) throws Exception {

        System.out.println("receipt 데이터 받아오십니까? :::" + receiptReqDto);
        receiptService.payReceipt(receiptReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "receipt data success", receiptReqDto));
    }
}
