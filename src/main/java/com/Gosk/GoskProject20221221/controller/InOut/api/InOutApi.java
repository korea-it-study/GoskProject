package com.Gosk.GoskProject20221221.controller.InOut.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;

import com.Gosk.GoskProject20221221.service.inout.InoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class InOutApi {

    private final InoutService inoutService;

    @GetMapping("/in/{userId}")
    public ResponseEntity<?> getInfo(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "in success",inoutService.getInInfo(userId) ));
    }

    @GetMapping("/out/{userId}")
    public ResponseEntity<?> getOutInfo(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "out data success",inoutService.getOutInfo(userId)));
    }



    @PutMapping("/terminate/oneday/{userId}")
    public ResponseEntity<?> exitOneday(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "onday terminate",inoutService.terminateOnday(userId)));
    }

    @PutMapping("/terminate/reserve/{userId}")
    public ResponseEntity<?> exitReserved(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "reserved terminate",inoutService.terminateReserved(userId)));
    }
    @PutMapping("/terminate/commutation/{userId}")
    public ResponseEntity<?> exitTime(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "terminate time",inoutService.terminateCommutation(userId)));
    }




    @PutMapping("/out/time")
    public ResponseEntity<?> exitTime(@RequestBody InOutReqDto inOutReqDto){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "exit time",inoutService.exitTime(inOutReqDto)));
    }
    @PutMapping("/out/day")
    public ResponseEntity<?> exitDay(@RequestBody InOutReqDto inOutReqDto){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "exit day",inoutService.exitDay(inOutReqDto)));
    }

}
