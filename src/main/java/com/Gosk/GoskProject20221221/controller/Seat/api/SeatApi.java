package com.Gosk.GoskProject20221221.controller.Seat.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api/seat")
@RestController
@RequiredArgsConstructor
public class SeatApi {

    private final SeatService seatService;

    @GetMapping("/useSeat")
    public ResponseEntity<?> useSeat() throws Exception {

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success",  seatService.useSeat()));
    }

    @GetMapping("/useReservedSeat")
    public ResponseEntity<?> useReservedSeat() throws Exception {

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success", seatService.useReservedSeat()));
    }

    @GetMapping("/basic/{seatId}")
    public ResponseEntity<?> getSeatDtl(@PathVariable String seatId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat Detail Load Success", seatService.getBasicSeatDetail(seatId)));
    }

    @GetMapping("/special/{seatId}")
    public ResponseEntity<?> getReservedSeatDtl(@PathVariable String seatId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "reserved seat detail load success", seatService.getSpecialSeatDetail(seatId)));
    }

    @GetMapping("/exit")
    public ResponseEntity<?> forcedExit(@RequestParam(value="data") List<String> arr){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "exit Success",seatService.forcedExit(arr)));
    }



}
