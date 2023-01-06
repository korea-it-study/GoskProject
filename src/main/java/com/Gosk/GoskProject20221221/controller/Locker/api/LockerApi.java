package com.Gosk.GoskProject20221221.controller.Locker.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class LockerApi {
    private final SeatService seatService;
    @GetMapping("/locker")
    public ResponseEntity<?> getLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "getLocker", seatService.getLocker()));
    }
    @GetMapping("/user/locker/{userId}")
    public ResponseEntity<?> getUserLocker(@PathVariable int userId){

        return ResponseEntity.ok().body(new CMRespDto<>(1, "getUserLocker", seatService.getUserLocker(userId)));
    }
}
