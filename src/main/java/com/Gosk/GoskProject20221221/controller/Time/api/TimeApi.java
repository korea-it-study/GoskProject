package com.Gosk.GoskProject20221221.controller.Time.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.Time.TimePriceReqDto;
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

        @PostMapping("/oneday") //Json은 늘 @RequestBody가 따라와야한다
        public ResponseEntity<?> oneday(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
            log.info("[TimeApi] plusInfo(oneday) 데이터: {}", timePriceReqDto);

            timeService.onedayPrice(timePriceReqDto);

            return ResponseEntity.ok(new CMRespDto<>(1, "table7.원데이 상품등록 성공", timePriceReqDto));
        }

    @PostMapping("/commuter/tp")
    public ResponseEntity<?> commuterTp(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(commuterTp) 데이터: {}", timePriceReqDto);

        timeService.commuterTpPrice(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table8 정액권 시간 상품등록 성공", timePriceReqDto));
    }

    @PostMapping("/commuter/dp")
    public ResponseEntity<?> commuterDp(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(commuterDp) 데이터: {}", timePriceReqDto);

        timeService.commuterDpPrice(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table9 정액권 기간 상품등록 성공", timePriceReqDto));
    }

    @PostMapping("/reserved")
    public ResponseEntity<?> donate(@RequestBody TimePriceReqDto timePriceReqDto) throws Exception {
        log.info("[TimeApi] plusInfo(reserved) 데이터: {}", timePriceReqDto);

        timeService.reservedPrice(timePriceReqDto);

        return ResponseEntity.ok(new CMRespDto<>(1, "table10 지정석 상품등록 성공", timePriceReqDto));
    }
}
