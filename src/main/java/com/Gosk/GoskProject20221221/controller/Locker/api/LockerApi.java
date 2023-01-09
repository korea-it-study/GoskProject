package com.Gosk.GoskProject20221221.controller.Locker.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.locker.LockerService;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class LockerApi {

    private final LockerService lockerService;

    @GetMapping("/locker")
    public ResponseEntity<?> getLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "getLocker", lockerService.getLocker()));
    }
    @GetMapping("/locker/{userId}")
    public ResponseEntity<?> getUserLocker(@PathVariable int userId){

        return ResponseEntity.ok().body(new CMRespDto<>(1, "getUserLocker", lockerService.getUserLocker(userId)));
    }
    @PostMapping("/repair/locker")
    public int repairLocker(@RequestParam(value="data") List<String> arr){
        log.info("arr::::::::::::::{}", arr);
        return lockerService.repairLocker(arr);
    }

    @DeleteMapping("/repair/locker")
    public int offRepair(@RequestParam(value="data") List<String> arr){
        log.info("arr::::::::::::::{}", arr);
        return lockerService.offRepair(arr);
    }


}
