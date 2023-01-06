package com.Gosk.GoskProject20221221.controller.MyPage.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.reciept.ReceiptReqDto;
import com.Gosk.GoskProject20221221.repository.ReceiptRepository;
import com.Gosk.GoskProject20221221.service.reciept.ReceiptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/mypage")
@RestController
@RequiredArgsConstructor
public class MyPageApi {

    private final ReceiptService receiptService;

    @PostMapping("/receipt")
    public ResponseEntity<?> payReceipt(@RequestBody ReceiptReqDto receiptReqDto) throws Exception {

        System.out.println("receipt 데이터 받아오십니까? ::: " + receiptReqDto);
        receiptService.payReceipt(receiptReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "receipt data success", receiptReqDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getReceiptList(@PathVariable int userId) throws Exception {

        System.out.println("receipt 데이터 가져오는 중?? :::::: " + receiptService.getReceiptList(userId));

        return ResponseEntity.ok().body(new CMRespDto<>(1, "receiptList data load", receiptService.getReceiptList(userId)));
    }

}
