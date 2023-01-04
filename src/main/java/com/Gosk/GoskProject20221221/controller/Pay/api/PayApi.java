package com.Gosk.GoskProject20221221.controller.Pay.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.service.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/pay")
@RestController
@RequiredArgsConstructor
public class PayApi {

    private final SeatService seatService;

//    private final SeatService seatService;

    @PostMapping("/seat")
    public ResponseEntity<?> seatPay(@RequestBody SeatReqDto seatReqDto) throws Exception {

        seatService.paySeat(seatReqDto);

        System.out.println("[PAY API] seat pay data :::::::" + seatReqDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data success", seatReqDto));
    }

    @PostMapping("/reserved")
    public ResponseEntity<?> reservedSeatPay(@RequestBody ReservedSeatReqDto reservedSeatReqDto) throws Exception {

        seatService.payReservedSeat(reservedSeatReqDto);

        System.out.println("[PAY API] reserved seat pay data :::::::" + reservedSeatReqDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1, "reserved seat data success", reservedSeatReqDto));
    }
}
