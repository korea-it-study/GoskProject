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
    public List<LockerRespDto> getAllLocker() {
        List<Locker> lockers = lockerRepository.getAllLocker();
        List<LockerRespDto> lockersResp = new ArrayList<>();
        lockers.forEach(locker -> {
            lockersResp.add(locker.toLockerResp());
        });


        return lockersResp;
    }
    @Override
    public List<String> getUseLocker() {
        return lockerRepository.getUseLocker();
    }

    @Override
    public List<String> getUsableLocker() {
        return lockerRepository.getUsableLocker();
    }


    @Override
    public String getUserLocker(int userId) {

        return lockerRepository.getUserLocker(userId);
    }


    @Override
    public int insertLocker(List<String> arr) {

        return lockerRepository.insertLocker(arr);
    }


}
