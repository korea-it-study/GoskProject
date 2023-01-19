package com.Gosk.GoskProject20221221.controller.Seat.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
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

    @GetMapping("/allSeat")
    public ResponseEntity<?> allSeat() throws Exception {

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success",  seatService.allSeat()));
    }
    @GetMapping("/useSeat")
    public ResponseEntity<?> useSeat(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data load success",seatService.useSeat()));
    }
    @GetMapping("/noUseSeat")
    public ResponseEntity<?> usableSeat(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data load success", seatService.usableSeat()));
    }
    @GetMapping("/allReservedSeat")
    public ResponseEntity<?> allReservedSeat() throws Exception {

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Seat Data Load Success", seatService.allReservedSeat()));
    }
    @GetMapping("/useReservedSeat")
    public ResponseEntity<?> useReservedSeat(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data load success",seatService.useReservedSeat()));
    }
    @GetMapping("/noUseReserved")
    public ResponseEntity<?> usableReserved(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat data load success", seatService.usableReserved()));
    }



    @GetMapping("/basic/{seatId}")
    public ResponseEntity<?> getSeatDtl(@PathVariable String seatId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seat Detail Load Success", seatService.getBasicSeatDetail(seatId)));
    }

    @GetMapping("/special/{seatId}")
    public ResponseEntity<?> getReservedSeatDtl(@PathVariable String seatId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "reserved seat detail load success", seatService.getSpecialSeatDetail(seatId)));
    }
    @PutMapping("/enter")
    public ResponseEntity<?> enter(@RequestBody InOutReqDto reqDto){
        System.out.println("enterData      " + reqDto);
        return ResponseEntity.ok().body(new CMRespDto<>(1, "enter success",seatService.enter(reqDto)));
    }


    @PutMapping("/exit")
    public ResponseEntity<?> forcedExit(@RequestParam(value="data") List<String> arr){

        return ResponseEntity.ok().body(new CMRespDto<>(1, "exit Success",seatService.forcedExit(arr)));
    }



//    @PostMapping("")
//    public ResponseEntity<?> insertNorm(@RequestParam(value="data")List<String> arr){
//        return ResponseEntity.ok().body(new CMRespDto<>(1, "insert ok",seatService.insertSeat(arr)));
//    }
//

}
