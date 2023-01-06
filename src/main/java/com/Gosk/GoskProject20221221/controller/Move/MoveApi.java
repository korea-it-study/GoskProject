package com.Gosk.GoskProject20221221.controller.Move;

import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.MoveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/move")
@RestController
@RequiredArgsConstructor
public class MoveApi {

    private final MoveService moveService;

    @GetMapping("/locker")
    public ResponseEntity<?> getLocker(String lockerId) {
        return ResponseEntity.ok().body(new CMRespDto<>(1, "getDetail", moveService.getLockerDetail(lockerId)));
    }

    @PutMapping("/locker")
    public ResponseEntity<?> moveLocker(String lockerId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "move success", null));
    }
}
