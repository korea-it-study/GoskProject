package com.Gosk.GoskProject20221221.service.locker;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.LockerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LockerServiceImpl implements LockerService{

    private final LockerRepository lockerRepository;

    @Override
    public List<LockerRespDto> getLocker() {
        List<Locker> lockers = lockerRepository.getLocker();
        List<LockerRespDto> lockersResp = new ArrayList<>();
        lockers.forEach(locker -> {
            lockersResp.add(locker.toLockerResp());
            System.out.println("사물함 사용중 =========" + locker.getLocker_id());
        });


        return lockersResp;
    }

    @Override
    public String getUserLocker(int userId) {

        return lockerRepository.getUserLocker(userId);
    }

    @Override
    public int repairLocker(List<String> arr) {

        return lockerRepository.repairReq(arr);
    }

    @Override
    public int offRepair(List<String> arr) {
        return lockerRepository.offRepair(arr);
    }


}
