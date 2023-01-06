package com.Gosk.GoskProject20221221.service.move;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.MoveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MoveServiceImpl implements MoveService{
    private final MoveRepository moveRepository;

    @Override
    public LockerRespDto getLockerDetail(String lockerId) {
        return moveRepository.getLockerDetail(lockerId).toLockerRespDto();
    }

    @Override
    public int MoveLocker(Map<String, String > map) {

        return moveRepository.moveLocker(map);
    }
}
