package com.Gosk.GoskProject20221221.service.inout;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.user.InInfo;
import com.Gosk.GoskProject20221221.dto.User.InInfoRespDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.InoutRepository;
import com.Gosk.GoskProject20221221.repository.LockerRepository;
import com.Gosk.GoskProject20221221.service.locker.LockerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InoutServiceImpl implements InoutService {

    private final InoutRepository inoutRepository;



    @Override
    public InInfoRespDto getInfo(int userId) {
        if(inoutRepository.getInfo(userId) != null){
            return inoutRepository.getInfo(userId).toInInfoRespDto();
        }else{
            return new InInfoRespDto();
        }

    }
}
