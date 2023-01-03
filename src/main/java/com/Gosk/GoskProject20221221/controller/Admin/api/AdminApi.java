package com.Gosk.GoskProject20221221.controller.Admin.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterDpPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterTpPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.OnedayPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.ReservedPriceRespDto;
import com.Gosk.GoskProject20221221.service.TimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        List<CommuterTpPriceRespDto> commuterTpPrice = new ArrayList<CommuterTpPriceRespDto>();
        List<CommuterDpPriceRespDto> commuterDpPrice = new ArrayList<CommuterDpPriceRespDto>();
        List<ReservedPriceRespDto> reservedPrice = new ArrayList<ReservedPriceRespDto>();

        onedayPrice = timeService.getOnedayPriceListSelect();
        commuterTpPrice = timeService.getCommuterTpPriceListSelect();
        commuterDpPrice = timeService.getCommuterDpPriceListSelect();
        reservedPrice = timeService.getReservedPriceListSelect();

        timePrice.add(onedayPrice);
        timePrice.add(commuterTpPrice);
        timePrice.add(commuterDpPrice);
        timePrice.add(reservedPrice);

        return ResponseEntity.ok(new CMRespDto<>(1, "TimePriceList 정보", timePrice));
    }
}
