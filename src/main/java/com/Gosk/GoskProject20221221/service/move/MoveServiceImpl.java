package com.Gosk.GoskProject20221221.service.move;

import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.MoveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MoveServiceImpl implements MoveService{
    private final MoveRepository moveRepository;

    @Override
    public LockerRespDto getLockerDetail(String lockerId) {

        return moveRepository.getLockerDetail(lockerId);
    }

    @Override
    public int MoveLocker(String lockerId) {
        return 0;
    }
}
