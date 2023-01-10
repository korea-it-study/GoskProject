package com.Gosk.GoskProject20221221.service.repair;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.LockerRepository;
import com.Gosk.GoskProject20221221.repository.RepairRepository;
import com.Gosk.GoskProject20221221.service.locker.LockerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RepairServiceImpl implements RepairService {

    private final RepairRepository repairRepository;


    @Override
    public int repairSpecial(List<String> arr) {
        return repairRepository.repairSpecialReq(arr);
    }

    @Override
    public int offRepairSpecial(List<String> arr) {
        return repairRepository.offRepairSpecial(arr);
    }

    @Override
    public int repairBasic(List<String> arr) {
        return repairRepository.repairBasicReq(arr);
    }

    @Override
    public int offRepairBasic(List<String> arr) {
        return repairRepository.offRepairBasic(arr);
    }

}
