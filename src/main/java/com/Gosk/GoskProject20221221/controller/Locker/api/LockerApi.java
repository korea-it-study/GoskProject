package com.Gosk.GoskProject20221221.controller.Locker.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.SeatService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class LockerApi {
    private final SeatService seatService;
    @GetMapping("/get/locker")
    public ResponseEntity<?> getLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "getLocker", seatService.getLocker()));
    }
}
