package com.Gosk.GoskProject20221221.controller.Pay.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/pay")
@RestController
@RequiredArgsConstructor
public class PayApi {

    private final SeatService seatService;

    @PutMapping("/seat")
    public ResponseEntity<?> seatPay(@RequestBody SeatReqDto seatReqDto) throws Exception {

        seatService.paySeat(seatReqDto);

//        System.out.println("[PAY API] seat pay data :::::::" + seatReqDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data success", seatReqDto));
    }

    @PutMapping("/reserved")
    public ResponseEntity<?> reservedSeatPay(@RequestBody ReservedSeatReqDto reservedSeatReqDto) throws Exception {

        seatService.payReservedSeat(reservedSeatReqDto);

//        System.out.println("[PAY API] reserved seat pay data :::::::" + reservedSeatReqDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1, "reserved seat data success", reservedSeatReqDto));
    }

    @PutMapping("/locker")
    public ResponseEntity<?> lockerPay(@RequestBody LockerReqDto lockerReqDto){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "locker data success", seatService.payLocker(lockerReqDto)));
    }
}
