package com.Gosk.GoskProject20221221.controller.Admin.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterDpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.CommuterTpRespDto;
import com.Gosk.GoskProject20221221.dto.Time.OnedayPriceRespDto;
import com.Gosk.GoskProject20221221.dto.Time.ReservedPriceRespDto;
import com.Gosk.GoskProject20221221.service.repair.RepairService;
import com.Gosk.GoskProject20221221.service.seat.SeatService;
import com.Gosk.GoskProject20221221.service.time.TimeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequestMapping("/api/repair")
@RestController
@RequiredArgsConstructor
public class RepairApi {
    private final RepairService repairService;

    @PutMapping("/special")
    public int repairSpecial(@RequestParam(value="data") List<String> arr){

        return repairService.repairSpecial(arr);
    }

    @DeleteMapping("/special")
    public int offRepairSpecial(@RequestParam(value="data") List<String> arr){

        return repairService.offRepairSpecial(arr);
    }

    @PutMapping("/basic")
    public int repairBasic(@RequestParam(value="data") List<String> arr){

        return repairService.repairBasic(arr);
    }

    @DeleteMapping("/basic")
    public int offRepairBasic(@RequestParam(value="data") List<String> arr){

        return repairService.offRepairBasic(arr);
    }
    @PutMapping("/locker")
    public int repairLocker(@RequestParam(value="data") List<String> arr){

        return repairService.repairLocker(arr);
    }
    @DeleteMapping("/locker")
    public int offRepairLocker(@RequestParam(value="data") List<String> arr){

        return repairService.offRepairLocker(arr);
    }

}
