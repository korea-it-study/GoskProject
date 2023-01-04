package com.Gosk.GoskProject20221221.controller.Seat.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;
import com.Gosk.GoskProject20221221.service.SeatService;
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

        seatService.useSeat();

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success", null));
    }

    @GetMapping("/useReservedSeat")
    public ResponseEntity<?> useReservedSeat() throws Exception {

        seatService.useReservedSeat();

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success", null));
    }
}
