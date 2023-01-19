package com.Gosk.GoskProject20221221.controller.Locker.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.locker.LockerService;
import com.Gosk.GoskProject20221221.dto.Time.TimePriceReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerPriceReqDto;
import com.Gosk.GoskProject20221221.service.locker.LockerPriceService;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import com.Gosk.GoskProject20221221.service.time.TimeService;
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
    private final LockerPriceService lockerPriceService;

//    @PostMapping("/locker")
//    public ResponseEntity<?> insertLocker(@RequestParam(value="data")List<String> arr){
//        return ResponseEntity.ok().body(new CMRespDto<>(1, "insert locker", lockerService.insertLocker(arr)));
//    }

    //사용중인 라커, 안사용 중인 라커
    @GetMapping("/allLocker")
    public ResponseEntity<?> getLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Locker data load success", lockerService.getAllLocker()));
    }
    @GetMapping("/useLocker")
    public ResponseEntity<?> getUseLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Locker data load success", lockerService.getUseLocker()));
    }
    @GetMapping("/noUseLocker")
    public ResponseEntity<?> getUsableLocker(){
        return ResponseEntity.ok().body(new CMRespDto<>(1, "Locker data load success", lockerService.getUsableLocker()));
    }

    //라커 디테일
    @GetMapping("/locker/{userId}")
    public ResponseEntity<?> getUserLocker(@PathVariable int userId){

        return ResponseEntity.ok().body(new CMRespDto<>(1, "getUserLocker", lockerService.getUserLocker(userId)));
    }



    // 사물함 가격 등록
    @PostMapping("/locker/price")
    public ResponseEntity<?> lockerPrice(@RequestBody LockerPriceReqDto lockerPriceReqDto) throws Exception {
        log.info("[LockerApi] plusInfo(locker) 데이터: {}", lockerPriceReqDto);

        lockerPriceService.lockerPriceInsert(lockerPriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "Table11 사물함 상품등록 성공", lockerPriceReqDto));
    }

    // 사물함 수정 등록
    @PutMapping("/locker/price")
    public ResponseEntity<?> lockerUpdate(@RequestBody LockerPriceReqDto lockerPriceReqDto) throws Exception {
        log.info("[LockerApi] plusInfo(locker) 수정 데이터: {}", lockerPriceReqDto);

        lockerPriceService.lockerPriceUpdate(lockerPriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table11.사물함 상품수정 성공", lockerPriceReqDto));
    }

    // 상품 삭제
    @DeleteMapping("/locker/price/{deleteId}")
    public ResponseEntity<?> lockerPriceDelete(@PathVariable int deleteId) throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "table11.사물함 상품삭제", lockerPriceService.lockerPriceDelete(deleteId)));
    }
}

