package com.Gosk.GoskProject20221221.controller.Time.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.Time.TimePriceReqDto;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.service.TimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/time")
@RestController
@RequiredArgsConstructor
public class TimeApi {
    private final TimeService timeService;

    // 상품 등록
    @PostMapping("/oneday") //Json은 늘 @RequestBody가 따라와야한다
    public ResponseEntity<?> oneday(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(oneday) 데이터: {}", timePriceReqDto);

        timeService.onedayPrice(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품등록 성공", timePriceReqDto));
    }

    @PostMapping("/commuter/tp")
    public ResponseEntity<?> commuterTp(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(commuterTp) 데이터: {}", timePriceReqDto);

        timeService.commuterTp(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table8 정액권 시간 상품등록 성공", timePriceReqDto));
    }

    @PostMapping("/commuter/dp")
    public ResponseEntity<?> commuterDp(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(commuterDp) 데이터: {}", timePriceReqDto);

        timeService.commuterDp(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table9 정액권 기간 상품등록 성공", timePriceReqDto));
    }

    @PostMapping("/reserved")
    public ResponseEntity<?> donate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(reserved) 데이터: {}", timePriceReqDto);

        timeService.reservedPrice(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table10 지정석 상품등록 성공", timePriceReqDto));
    }

    // 수정 등록
    @PutMapping("/oneday")
    public ResponseEntity<?> onedayUpdate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] updateInfo(oneday) 수정 데이터: {}", timePriceReqDto);

        timeService.onedayPriceUpdate(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품수정 성공", timePriceReqDto));
    }

    @PutMapping("/commuter/tp")
    public ResponseEntity<?> commuterTpUpdate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] updateInfo(commuterTp) 수정 데이터: {}", timePriceReqDto);

        timeService.commuterTpUpdate(timePriceReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "table8 정액권 시간 상품수정 성공", timePriceReqDto));
    }

    @PutMapping("/commuter/dp")
    public ResponseEntity<?> commuterDpUpdate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] updateInfo(commuterDp) 수정 데이터: {}", timePriceReqDto);

        timeService.commuterDpUpdate(timePriceReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "table9 정액권 기간 상품수정 성공", timePriceReqDto));
    }

    @PutMapping("/reserved")
    public ResponseEntity<?> reservedUpdate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] updateInfo(reserved) 수정 데이터: {}", timePriceReqDto);

        timeService.reservedPriceUpdate(timePriceReqDto);
        return ResponseEntity.ok(new CMRespDto<>(1, "table10 지정석 상품수정 성공", timePriceReqDto));
    }

    // 상품 삭제
    @DeleteMapping("/oneday/{deleteId}")
    public ResponseEntity<?> onedayPriceDelete(@PathVariable int deleteId) throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품삭제", timeService.onedayPriceDelete(deleteId)));
    }

    @DeleteMapping("/commuter/tp/{deleteId}")
    public ResponseEntity<?> commuterTpDelete(@PathVariable int deleteId) throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품삭제", timeService.commuterTpDelete(deleteId)));
    }

    @DeleteMapping("/commuter/dp/{deleteId}")
    public ResponseEntity<?> commuterDpDelete(@PathVariable int deleteId) throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품삭제", timeService.commuterDpDelete(deleteId)));
    }

    @DeleteMapping("/reserved/{deleteId}")
    public ResponseEntity<?> reservedDelete(@PathVariable int deleteId) throws Exception{
        return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품삭제", timeService.reservedPriceDelete(deleteId)));
    }
    
}
