package com.Gosk.GoskProject20221221.controller.Seat.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
