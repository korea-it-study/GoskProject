package com.Gosk.GoskProject20221221.controller.Admin.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterDpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterTpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.OnedayPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.ReservedPriceRespDto;
import com.Gosk.GoskProject20221221.service.time.TimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequestMapping("/api/admin")
@RestController
@RequiredArgsConstructor
public class AdminApi {
    private final TimeService timeService;

    @GetMapping("/productlist")
    public ResponseEntity<?> getTimePriceListSelect() throws Exception {
        List<Object> timePrice = new ArrayList<>();
        List<OnedayPriceRespDto> onedayPrice = new ArrayList<OnedayPriceRespDto>();
        List<CommuterTpRespDto> commuterTpPrice = new ArrayList<CommuterTpRespDto>();
        List<CommuterDpRespDto> commuterDpPrice = new ArrayList<CommuterDpRespDto>();
        List<ReservedPriceRespDto> reservedPrice = new ArrayList<ReservedPriceRespDto>();

        onedayPrice = timeService.getOnedayPriceListSelect();
        commuterTpPrice = timeService.getCommuterTpListSelect();
        commuterDpPrice = timeService.getCommuterDpListSelect();
        reservedPrice = timeService.getReservedPriceListSelect();

        timePrice.add(onedayPrice);
        timePrice.add(commuterTpPrice);
        timePrice.add(commuterDpPrice);
        timePrice.add(reservedPrice);

        return ResponseEntity.ok(new CMRespDto<>(1, "TimePriceList 정보", timePrice));
    }

}
