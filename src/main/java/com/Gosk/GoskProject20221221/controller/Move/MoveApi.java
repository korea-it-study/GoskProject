package com.Gosk.GoskProject20221221.controller.Move;

import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.move.MoveService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequestMapping("/api/move")
@RestController
@RequiredArgsConstructor
public class MoveApi {

    private final MoveService moveService;

    @GetMapping("/locker/{lockerId}")
    public ResponseEntity<?> getLocker(@PathVariable String lockerId) {
        return ResponseEntity.ok().body(new CMRespDto<>(1, "getDetail", moveService.getLockerDetail(lockerId)));
    }

    @PutMapping("/locker")
    public ResponseEntity<?> moveLocker(@RequestBody Map<String, String > map){

        return ResponseEntity.ok().body(new CMRespDto<>(1, "move success", moveService.MoveLocker(map)));
    }

    @PutMapping("/seat")
    public ResponseEntity<?> moveSeat(@RequestBody Map<String, String> map){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "move success",moveService.moveSeat(map)));
    }
    @PutMapping("/special")
    public ResponseEntity<?> movepecial(@RequestBody Map<String, String> map){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "move success",moveService.moveSpecial(map)));
    }

}
