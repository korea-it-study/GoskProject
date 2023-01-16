package com.Gosk.GoskProject20221221.controller.InOut.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.inout.InoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/inout")
@RestController
@RequiredArgsConstructor
public class InOutApi {

    private final InoutService inoutService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getInfo(@PathVariable int userId){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "in success",inoutService.getInfo(userId) ));
    }
}
